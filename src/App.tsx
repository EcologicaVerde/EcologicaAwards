import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { CATEGORIES, AWARDS_EDITION } from "@/data/categories";
import type { AppView, VoterProfile, VotesMap } from "@/types/awards";
import { Navbar } from "@/components/Navbar";
import { CategoriesView } from "@/components/CategoriesView";
import { VotingView } from "@/components/VotingView";
import { ResultsView } from "@/components/ResultsView";
import { VoterProfileDialog } from "@/components/VoterProfileDialog";
import { EcologicaLogo } from "@/components/EcologicaLogo";
import { MusicPlayer } from "@/components/MusicPlayer";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";

const STORAGE_VOTES_KEY = "ecologica-awards-votes-v2";
const STORAGE_PROFILE_KEY = "ecologica-awards-profile-v2";

function loadStoredVotes(): VotesMap {
  try {
    const raw = localStorage.getItem(STORAGE_VOTES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function loadStoredProfile(): VoterProfile {
  try {
    localStorage.removeItem("ecologica-awards-profile-v1");
    localStorage.removeItem("ecologica-awards-votes-v1");
    const raw = localStorage.getItem(STORAGE_PROFILE_KEY);
    if (!raw) return { username: "", avatar: null };
    const parsed = JSON.parse(raw);
    return {
      username: typeof parsed?.username === "string" ? parsed.username : "",
      avatar: typeof parsed?.avatar === "string" ? parsed.avatar : null,
    };
  } catch {
    return { username: "", avatar: null };
  }
}

function AppContent() {
  const { t, localizeCategories } = useLanguage();
  const categories = React.useMemo(
    () => localizeCategories(CATEGORIES),
    [localizeCategories]
  );

  const [view, setView] = React.useState<AppView>("categories");
  const [activeCategoryId, setActiveCategoryId] = React.useState<string>(
    CATEGORIES[0].id
  );
  const [votes, setVotes] = React.useState<VotesMap>(loadStoredVotes);
  const [profile, setProfile] = React.useState<VoterProfile>(loadStoredProfile);
  const [profileDialogOpen, setProfileDialogOpen] = React.useState(false);
  const [toast, setToast] = React.useState<string | null>(null);
  const toastTimerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_VOTES_KEY, JSON.stringify(votes));
    } catch {
      return;
    }
  }, [votes]);

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(profile));
    } catch {
      return;
    }
  }, [profile]);

  const showToast = React.useCallback((message: string) => {
    setToast(message);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
    }, 2200);
  }, []);

  const votedCount = React.useMemo(
    () => categories.filter((c) => Boolean(votes[c.id])).length,
    [categories, votes]
  );

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    setView("vote");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStartVoting = () => {
    const firstPending = categories.find((c) => !votes[c.id]);
    setActiveCategoryId(firstPending ? firstPending.id : categories[0].id);
    setView("vote");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleVote = (categoryId: string, nomineeId: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    const nom = cat?.nominees.find((n) => n.id === nomineeId);
    setVotes((prev) => ({
      ...prev,
      [categoryId]: nomineeId,
    }));
    if (nom) {
      showToast(t.toasts.voteRecorded(nom.title));
    }
  };

  const handleResetVotes = () => {
    setVotes({});
    showToast(t.toasts.votesCleared);
  };

  const handleNavigate = (nextView: AppView) => {
    setView(nextView);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-[#fafafa]">
      <Navbar
        activeView={view}
        onNavigate={handleNavigate}
        votedCount={votedCount}
        totalCategories={categories.length}
        profile={profile}
        onOpenProfile={() => setProfileDialogOpen(true)}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {view === "categories" && (
            <motion.div
              key="view-categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CategoriesView
                categories={categories}
                votes={votes}
                profile={profile}
                onProfileChange={setProfile}
                onOpenProfileDialog={() => setProfileDialogOpen(true)}
                onSelectCategory={handleSelectCategory}
                onStartVoting={handleStartVoting}
                onOpenResults={() => handleNavigate("results")}
              />
            </motion.div>
          )}

          {view === "vote" && (
            <motion.div
              key="view-vote"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <VotingView
                categories={categories}
                activeCategoryId={activeCategoryId}
                votes={votes}
                onSelectCategory={setActiveCategoryId}
                onVote={handleVote}
                onBackToCategories={() => handleNavigate("categories")}
                onFinishToResults={() => handleNavigate("results")}
              />
            </motion.div>
          )}

          {view === "results" && (
            <motion.div
              key="view-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ResultsView
                categories={categories}
                votes={votes}
                profile={profile}
                onOpenProfile={() => setProfileDialogOpen(true)}
                onEditCategory={handleSelectCategory}
                onResetVotes={handleResetVotes}
                onBackToCategories={() => handleNavigate("categories")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t border-[#18181b] bg-[#0a0a0a] pb-16 sm:pb-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-xs text-[#6e6e77] sm:flex-row sm:px-6">
          <div className="flex items-center gap-2.5">
            <EcologicaLogo size="sm" withAura={false} />
            <div>
              <p className="font-medium text-[#d4d4d8]">
                Ecológica Awards – {AWARDS_EDITION}
              </p>
              <p className="text-[11px] text-[#6e6e77]">
                {t.footer.communityAwards}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://ecologicaverde.online/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[#81c784]"
            >
              Ecológica Verde
            </a>
            <span className="text-[#27272a]">•</span>
            <button
              type="button"
              onClick={() => setProfileDialogOpen(true)}
              className="transition-colors hover:text-[#e4e4e7] cursor-pointer"
            >
              {t.footer.voterProfile}
            </button>
          </div>
        </div>
      </footer>

      <MusicPlayer />

      <VoterProfileDialog
        open={profileDialogOpen}
        onOpenChange={setProfileDialogOpen}
        profile={profile}
        onSave={(next) => {
          setProfile(next);
          showToast(t.toasts.profileUpdated);
        }}
      />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-lg border border-[#4caf50]/40 bg-[#111611]/95 px-3.5 py-2.5 text-xs font-medium text-[#e8f5e9] shadow-xl shadow-black/70 backdrop-blur-md"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#4caf50] text-[#051608]">
              <Check className="h-3 w-3 stroke-[3]" />
            </span>
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;

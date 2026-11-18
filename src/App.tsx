import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { CATEGORIES, AWARDS_EDITION } from "@/data/categories";
import type {
  AppView,
  CommunityStats,
  VoterProfile,
  VotesMap,
} from "@/types/awards";
import { Navbar } from "@/components/Navbar";
import { CategoriesView } from "@/components/CategoriesView";
import { EcologicaLogo } from "@/components/EcologicaLogo";
import { MusicPlayer } from "@/components/MusicPlayer";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import {
  applyOptimisticVote,
  buildLocalStats,
  clearCommunityVotes,
  fetchCommunityStats,
  submitCommunityVote,
} from "@/services/communityVotes";

const VotingView = React.lazy(() =>
  import("@/components/VotingView").then((m) => ({ default: m.VotingView }))
);
const CommunityView = React.lazy(() =>
  import("@/components/CommunityView").then((m) => ({
    default: m.CommunityView,
  }))
);
const ResultsView = React.lazy(() =>
  import("@/components/ResultsView").then((m) => ({ default: m.ResultsView }))
);
const VoterProfileDialog = React.lazy(() =>
  import("@/components/VoterProfileDialog").then((m) => ({
    default: m.VoterProfileDialog,
  }))
);

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
  const [communityStats, setCommunityStats] = React.useState<CommunityStats>(
    () => buildLocalStats(loadStoredVotes())
  );
  const [isRefreshingStats, setIsRefreshingStats] = React.useState(false);
  const [toast, setToast] = React.useState<string | null>(null);
  const toastTimerRef = React.useRef<number | null>(null);
  const votesRef = React.useRef(votes);

  React.useEffect(() => {
    votesRef.current = votes;
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

  const refreshCommunityStats = React.useCallback(async () => {
    setIsRefreshingStats(true);
    try {
      const next = await fetchCommunityStats(votesRef.current);
      setCommunityStats(next);
    } finally {
      setIsRefreshingStats(false);
    }
  }, []);

  React.useEffect(() => {
    refreshCommunityStats();
  }, [refreshCommunityStats]);

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

  const handleSelectCategory = React.useCallback((categoryId: string) => {
    setActiveCategoryId(categoryId);
    setView("vote");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleStartVoting = React.useCallback(() => {
    const firstPending = categories.find((c) => !votes[c.id]);
    setActiveCategoryId(firstPending ? firstPending.id : categories[0].id);
    setView("vote");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [categories, votes]);

  const handleVote = React.useCallback(
    (categoryId: string, nomineeId: string) => {
      const cat = categories.find((c) => c.id === categoryId);
      const nom = cat?.nominees.find((n) => n.id === nomineeId);
      const prevNomineeId = votesRef.current[categoryId];
      const hadAnyBefore = Object.keys(votesRef.current).length > 0;

      setVotes((prev) => ({
        ...prev,
        [categoryId]: nomineeId,
      }));

      setCommunityStats((prev) =>
        applyOptimisticVote(
          prev,
          categoryId,
          prevNomineeId,
          nomineeId,
          hadAnyBefore
        )
      );

      submitCommunityVote(categoryId, nomineeId).then((synced) => {
        if (synced) {
          refreshCommunityStats();
        }
      });

      if (nom) {
        showToast(t.toasts.voteRecorded(nom.title));
      }
    },
    [categories, refreshCommunityStats, showToast, t]
  );

  const handleResetVotes = React.useCallback(() => {
    setVotes({});
    setCommunityStats((prev) =>
      prev.isLive ? prev : buildLocalStats({})
    );
    clearCommunityVotes().then((synced) => {
      if (synced) {
        refreshCommunityStats();
      }
    });
    showToast(t.toasts.votesCleared);
  }, [refreshCommunityStats, showToast, t]);

  const handleNavigate = React.useCallback(
    (nextView: AppView) => {
      setView(nextView);
      if (nextView === "community") {
        refreshCommunityStats();
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [refreshCommunityStats]
  );

  const handleOpenProfile = React.useCallback(() => {
    setProfileDialogOpen(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-[#fafafa]">
      <Navbar
        activeView={view}
        onNavigate={handleNavigate}
        votedCount={votedCount}
        totalCategories={categories.length}
        profile={profile}
        onOpenProfile={handleOpenProfile}
      />

      <main className="flex-1">
        <React.Suspense
          fallback={
            <div className="mx-auto flex min-h-[50vh] max-w-6xl items-center justify-center px-4">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#233224] border-t-[#4caf50]" />
            </div>
          }
        >
          {view === "categories" && (
            <CategoriesView
              categories={categories}
              votes={votes}
              profile={profile}
              onProfileChange={setProfile}
              onOpenProfileDialog={handleOpenProfile}
              onSelectCategory={handleSelectCategory}
              onStartVoting={handleStartVoting}
              onOpenResults={() => handleNavigate("results")}
            />
          )}

          {view === "vote" && (
            <VotingView
              categories={categories}
              activeCategoryId={activeCategoryId}
              votes={votes}
              tallies={communityStats.tallies}
              onSelectCategory={setActiveCategoryId}
              onVote={handleVote}
              onBackToCategories={() => handleNavigate("categories")}
              onFinishToResults={() => handleNavigate("results")}
              onOpenCommunity={() => handleNavigate("community")}
            />
          )}

          {view === "community" && (
            <CommunityView
              categories={categories}
              votes={votes}
              stats={communityStats}
              isRefreshing={isRefreshingStats}
              onRefresh={refreshCommunityStats}
              onGoToCategory={handleSelectCategory}
              onStartVoting={handleStartVoting}
            />
          )}

          {view === "results" && (
            <ResultsView
              categories={categories}
              votes={votes}
              profile={profile}
              onOpenProfile={handleOpenProfile}
              onEditCategory={handleSelectCategory}
              onResetVotes={handleResetVotes}
              onBackToCategories={() => handleNavigate("categories")}
            />
          )}
        </React.Suspense>
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
              onClick={handleOpenProfile}
              className="transition-colors hover:text-[#e4e4e7] cursor-pointer"
            >
              {t.footer.voterProfile}
            </button>
          </div>
        </div>
      </footer>

      <MusicPlayer />

      {profileDialogOpen && (
        <React.Suspense fallback={null}>
          <VoterProfileDialog
            open={profileDialogOpen}
            onOpenChange={setProfileDialogOpen}
            profile={profile}
            onSave={(next) => {
              setProfile(next);
              showToast(t.toasts.profileUpdated);
            }}
          />
        </React.Suspense>
      )}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-lg border border-[#4caf50]/40 bg-[#111611]/95 px-3.5 py-2.5 text-xs font-medium text-[#e8f5e9] shadow-xl shadow-black/70"
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

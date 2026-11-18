import * as React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Trophy,
  Upload,
  CheckCircle2,
  SlidersHorizontal,
  Search,
} from "lucide-react";
import type { Category, VoterProfile, VotesMap } from "@/types/awards";
import { EcologicaLogo } from "@/components/EcologicaLogo";
import { CategoryCard } from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

interface CategoriesViewProps {
  categories: Category[];
  votes: VotesMap;
  profile: VoterProfile;
  onProfileChange: (profile: VoterProfile) => void;
  onOpenProfileDialog: () => void;
  onSelectCategory: (categoryId: string) => void;
  onStartVoting: () => void;
  onOpenResults: () => void;
}

type FilterMode = "all" | "pending" | "voted";

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  categories,
  votes,
  profile,
  onProfileChange,
  onOpenProfileDialog,
  onSelectCategory,
  onStartVoting,
  onOpenResults,
}) => {
  const { t } = useLanguage();
  const [filter, setFilter] = React.useState<FilterMode>("all");
  const [query, setQuery] = React.useState("");

  const votedCount = categories.filter((c) => Boolean(votes[c.id])).length;
  const totalCount = categories.length;
  const progressPct = Math.round((votedCount / totalCount) * 100);
  const allVoted = votedCount === totalCount;
  const remaining = totalCount - votedCount;

  const filteredCategories = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories.filter((c) => {
      if (filter === "voted" && !votes[c.id]) return false;
      if (filter === "pending" && votes[c.id]) return false;
      if (!q) return true;
      return (
        c.title.toLowerCase().includes(q) ||
        c.shortTitle.toLowerCase().includes(q) ||
        c.nominees.some(
          (n) =>
            n.title.toLowerCase().includes(q) ||
            n.studio.toLowerCase().includes(q)
        )
      );
    });
  }, [categories, votes, filter, query]);

  const initials = (profile.username.trim() || t.defaultUsername)
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-16 h-[420px] overflow-hidden"
      >
        <div className="bg-architectural-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_20%,black_30%,transparent_100%)]" />
        <div
          className="absolute left-1/2 top-0 h-[360px] w-[760px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(76, 175, 80, 0.16) 0%, rgba(27, 94, 32, 0.07) 42%, transparent 72%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
        <section className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <EcologicaLogo size="lg" withAura />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-[#243225] bg-[#101510]/90 px-3 py-1 text-[11px] font-medium text-[#81c784]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#4caf50]" />
            {t.hero.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-[#fafafa] sm:text-5xl"
          >
            Ecológica Awards
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3.5 max-w-xl text-sm leading-relaxed text-[#9a9aa3] sm:text-[15px]"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 flex flex-wrap items-center justify-center gap-3"
          >
            <Button size="lg" onClick={onStartVoting}>
              {votedCount === 0
                ? t.hero.startVoting
                : allVoted
                  ? t.hero.reviewCategories
                  : t.hero.continueVoting}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onOpenResults}
              className={cn(
                allVoted &&
                  "border-[#4caf50]/50 bg-[#4caf50]/10 text-[#a5d6a7] hover:bg-[#4caf50]/18"
              )}
            >
              <Trophy className="h-4 w-4 text-[#66bb6a]" />
              {t.hero.viewResults}
              {votedCount > 0 && (
                <span className="font-mono text-xs opacity-75">
                  ({votedCount}/{totalCount})
                </span>
              )}
            </Button>
          </motion.div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid gap-4 rounded-xl border border-[#1e1e21] bg-[#111111]/95 p-4 sm:p-5 lg:grid-cols-12 lg:items-center"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:col-span-7">
            <button
              type="button"
              onClick={onOpenProfileDialog}
              className="group relative shrink-0 self-start rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4caf50]"
              title={t.identityBar.avatarButtonTitle}
            >
              <Avatar
                src={profile.avatar}
                fallback={initials}
                size="lg"
                className="ring-1 ring-[#4caf50]/30 transition-all group-hover:ring-[#4caf50]"
              />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-[#111111] bg-[#1e2b1f] text-[#81c784] transition-transform group-hover:scale-110">
                <Upload className="h-2.5 w-2.5" />
              </span>
            </button>

            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="inline-username"
                  className="text-xs font-medium text-[#d4d4d8]"
                >
                  {t.identityBar.label}
                </label>
                <button
                  type="button"
                  onClick={onOpenProfileDialog}
                  className="text-[11px] font-medium text-[#66bb6a] transition-colors hover:text-[#81c784] cursor-pointer"
                >
                  {profile.avatar
                    ? t.identityBar.changeAvatar
                    : t.identityBar.uploadAvatar}
                </button>
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-[#66666e]">
                  @
                </span>
                <Input
                  id="inline-username"
                  value={profile.username}
                  onChange={(e) =>
                    onProfileChange({ ...profile, username: e.target.value })
                  }
                  placeholder={t.defaultUsername}
                  maxLength={28}
                  className="h-9 pl-7 text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="hidden h-12 w-px bg-[#1e1e21] lg:col-span-1 lg:mx-auto lg:block" />

          <div className="space-y-2.5 border-t border-[#1c1c1f] pt-4 lg:col-span-4 lg:border-t-0 lg:pt-0">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#c4c4cc]">
                {t.identityBar.progressTitle}
              </span>
              <span className="font-mono text-[#81c784]">
                {votedCount}/{totalCount} ({progressPct}%)
              </span>
            </div>
            <Progress value={progressPct} />
            <div className="flex items-center justify-between text-[11px] text-[#71717a]">
              {allVoted ? (
                <span className="inline-flex items-center gap-1.5 text-[#81c784]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {t.identityBar.allVoted}
                </span>
              ) : (
                <span>
                  {remaining === 1
                    ? t.identityBar.remainingOne
                    : t.identityBar.remainingMany(remaining)}
                </span>
              )}
              <span>{t.identityBar.savedLocally}</span>
            </div>
          </div>
        </motion.section>

        <section className="mt-12">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#66bb6a]">
                <SlidersHorizontal className="h-3 w-3" />
                {t.categoriesSection.eyebrow}
              </div>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#fafafa]">
                {t.categoriesSection.heading}
              </h2>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-56">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#66666e]" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.categoriesSection.searchPlaceholder}
                  className="h-9 bg-[#111111] pl-8 text-xs"
                />
              </div>

              <div
                role="tablist"
                aria-label={t.categoriesSection.eyebrow}
                className="inline-flex self-start rounded-lg border border-[#1e1e21] bg-[#111111] p-1"
              >
                {(
                  [
                    {
                      id: "all",
                      label: t.categoriesSection.filterAll,
                      count: totalCount,
                    },
                    {
                      id: "pending",
                      label: t.categoriesSection.filterPending,
                      count: remaining,
                    },
                    {
                      id: "voted",
                      label: t.categoriesSection.filterVoted,
                      count: votedCount,
                    },
                  ] as const
                ).map((tab) => {
                  const active = filter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setFilter(tab.id)}
                      className={cn(
                        "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all cursor-pointer",
                        active
                          ? "bg-[#1a241b] text-[#e8f5e9] ring-1 ring-[#4caf50]/30"
                          : "text-[#8c8c94] hover:text-[#e4e4e7]"
                      )}
                    >
                      <span>{tab.label}</span>
                      <span className="font-mono text-[10px] opacity-70">
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#242428] bg-[#101011] px-6 py-16 text-center">
              <p className="text-sm font-medium text-[#d4d4d8]">
                {query.trim()
                  ? t.categoriesSection.emptySearchTitle
                  : filter === "pending"
                    ? t.categoriesSection.emptyPendingTitle
                    : t.categoriesSection.emptyVotedTitle}
              </p>
              <p className="mt-1 text-xs text-[#71717a]">
                {query.trim()
                  ? t.categoriesSection.emptySearchDesc
                  : filter === "pending"
                    ? t.categoriesSection.emptyPendingDesc
                    : t.categoriesSection.emptyVotedDesc}
              </p>
              <div className="mt-4">
                {query.trim() ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQuery("")}
                  >
                    {t.categoriesSection.clearSearch}
                  </Button>
                ) : filter === "pending" ? (
                  <Button size="sm" onClick={onOpenResults}>
                    <Trophy className="h-3.5 w-3.5" />
                    {t.categoriesSection.openResults}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setFilter("all")}
                  >
                    {t.categoriesSection.showAll}
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCategories.map((category, idx) => {
                const votedNomineeId = votes[category.id];
                const selectedNominee = category.nominees.find(
                  (n) => n.id === votedNomineeId
                );
                return (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    selectedNominee={selectedNominee}
                    index={idx}
                    onSelect={onSelectCategory}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

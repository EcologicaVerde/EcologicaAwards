import * as React from "react";
import {
  BarChart3,
  Crown,
  Lock,
  RefreshCw,
  Users,
  Vote,
  CheckCircle2,
  Search,
  ArrowRight,
  Check,
} from "lucide-react";
import type { Category, CommunityStats, VotesMap } from "@/types/awards";
import { CategoryVoteChart } from "@/components/CategoryVoteChart";
import { NomineeArtwork } from "@/components/NomineeArtwork";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

interface CommunityViewProps {
  categories: Category[];
  votes: VotesMap;
  stats: CommunityStats;
  isRefreshing: boolean;
  onRefresh: () => void;
  onGoToCategory: (categoryId: string) => void;
  onStartVoting: () => void;
}

type CommunityTab = "leaders" | "by-category";

export const CommunityView: React.FC<CommunityViewProps> = ({
  categories,
  votes,
  stats,
  isRefreshing,
  onRefresh,
  onGoToCategory,
  onStartVoting,
}) => {
  const { t } = useLanguage();
  const [tab, setTab] = React.useState<CommunityTab>("leaders");
  const [query, setQuery] = React.useState("");

  const unlockedCount = React.useMemo(
    () => categories.filter((c) => Boolean(votes[c.id])).length,
    [categories, votes]
  );

  const totalVotesCast = React.useMemo(() => {
    let sum = 0;
    for (const catMap of Object.values(stats.tallies)) {
      for (const count of Object.values(catMap)) {
        sum += count;
      }
    }
    return sum;
  }, [stats.tallies]);

  const filteredCategories = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.shortTitle.toLowerCase().includes(q) ||
        c.number.includes(q)
    );
  }, [categories, query]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">
      <div className="flex flex-col justify-between gap-4 border-b border-[#1c1c1f] pb-6 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-widest text-[#66bb6a]">
              <BarChart3 className="h-3.5 w-3.5" />
              {t.community.eyebrow}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px]",
                stats.isLive
                  ? "border-[#4caf50]/35 bg-[#4caf50]/12 text-[#81c784]"
                  : "border-[#27272a] bg-[#141416] text-[#8c8c94]"
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  stats.isLive ? "bg-[#4caf50]" : "bg-[#71717a]"
                )}
              />
              {stats.isLive ? t.community.liveMode : t.community.localMode}
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#fafafa]">
            {t.community.title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#8c8c94]">
            {t.community.subtitle}
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="self-start sm:self-end"
        >
          <RefreshCw
            className={cn("h-3.5 w-3.5", isRefreshing && "animate-spin")}
          />
          {isRefreshing ? t.community.refreshing : t.community.refresh}
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-3.5 rounded-xl border border-[#1e1e21] bg-[#111111] p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#243426] bg-[#121913] text-[#81c784]">
            <Users className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[11px] text-[#8c8c94]">
              {t.community.participants}
            </p>
            <p className="font-mono text-xl font-bold text-[#fafafa]">
              {stats.totalVoters}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-xl border border-[#1e1e21] bg-[#111111] p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#243426] bg-[#121913] text-[#81c784]">
            <Vote className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[11px] text-[#8c8c94]">
              {t.community.totalVotes}
            </p>
            <p className="font-mono text-xl font-bold text-[#fafafa]">
              {totalVotesCast}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-xl border border-[#1e1e21] bg-[#111111] p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#243426] bg-[#121913] text-[#81c784]">
            <CheckCircle2 className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[11px] text-[#8c8c94]">
              {t.community.unlocked}
            </p>
            <p className="font-mono text-xl font-bold text-[#81c784]">
              {unlockedCount}/{categories.length}
            </p>
          </div>
        </div>
      </div>

      {!stats.isLive && (
        <div className="mt-4 rounded-xl border border-[#252826] bg-[#111311] px-4 py-3 text-xs text-[#9a9aa3]">
          {t.community.localModeNotice}
        </div>
      )}

      {unlockedCount < categories.length && (
        <div className="mt-4 flex flex-col justify-between gap-3 rounded-xl border border-[#233224] bg-[#101410] px-4 py-3.5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5 text-xs text-[#b8cbb9]">
            <Lock className="h-4 w-4 shrink-0 text-[#66bb6a]" />
            <span>{t.community.antiBiasBanner}</span>
          </div>
          <Button
            size="sm"
            variant="emeraldSoft"
            onClick={onStartVoting}
            className="shrink-0"
          >
            {t.community.startVotingCta}
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}

      <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div
          role="tablist"
          aria-label={t.community.title}
          className="inline-flex self-start rounded-lg border border-[#1e1e21] bg-[#111111] p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === "leaders"}
            onClick={() => setTab("leaders")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer",
              tab === "leaders"
                ? "bg-[#1a241b] text-[#e8f5e9] ring-1 ring-[#4caf50]/35"
                : "text-[#8c8c94] hover:text-[#e4e4e7]"
            )}
          >
            <Crown className="h-3.5 w-3.5 text-[#66bb6a]" />
            {t.community.tabLeaders}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={tab === "by-category"}
            onClick={() => setTab("by-category")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer",
              tab === "by-category"
                ? "bg-[#1a241b] text-[#e8f5e9] ring-1 ring-[#4caf50]/35"
                : "text-[#8c8c94] hover:text-[#e4e4e7]"
            )}
          >
            <BarChart3 className="h-3.5 w-3.5 text-[#66bb6a]" />
            {t.community.tabByCategory}
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#66666e]" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.community.searchPlaceholder}
            className="h-9 bg-[#111111] pl-8 text-xs"
          />
        </div>
      </div>

      {tab === "leaders" ? (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((cat) => {
            const userVoteId = votes[cat.id];
            const isUnlocked = Boolean(userVoteId);
            const catTallies = stats.tallies[cat.id] ?? {};
            const totalCatVotes = cat.nominees.reduce(
              (acc, n) => acc + (catTallies[n.id] ?? 0),
              0
            );

            const ranked = [...cat.nominees]
              .map((nominee) => ({
                nominee,
                votes: catTallies[nominee.id] ?? 0,
              }))
              .sort((a, b) => b.votes - a.votes);

            const top = ranked[0];
            const isTie =
              ranked.length > 1 &&
              top.votes > 0 &&
              ranked[1].votes === top.votes;
            const sharePct =
              totalCatVotes > 0 && top
                ? Math.round((top.votes / totalCatVotes) * 100)
                : 0;
            const matchesUser = top && userVoteId === top.nominee.id;

            if (!isUnlocked) {
              return (
                <div
                  key={cat.id}
                  className="card-auto-visibility flex flex-col justify-between rounded-xl border border-dashed border-[#222226] bg-[#0e0e10] p-5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] text-[#5c5c64]">
                        {t.categoryCard.catPrefix} {cat.number}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#242428] bg-[#141416] px-2 py-0.5 text-[10px] font-medium text-[#71717a]">
                        <Lock className="h-2.5 w-2.5" />
                        {t.community.lockedTitle}
                      </span>
                    </div>
                    <h3 className="mt-2 text-base font-semibold text-[#d4d4d8]">
                      {cat.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#6e6e77]">
                      {t.community.lockedDesc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#19191c]">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onGoToCategory(cat.id)}
                      className="w-full justify-between text-xs"
                    >
                      <span>{t.community.voteToUnlock}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#66bb6a]" />
                    </Button>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={cat.id}
                className="card-auto-visibility flex flex-col justify-between rounded-xl border border-[#233224] bg-[#111511] p-5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] text-[#66bb6a]">
                      {t.categoryCard.catPrefix} {cat.number}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#4caf50]/35 bg-[#4caf50]/12 px-2 py-0.5 text-[10px] font-medium text-[#81c784]">
                      <Crown className="h-2.5 w-2.5" />
                      {isTie ? t.community.tiedBadge : t.community.leaderBadge}
                    </span>
                  </div>

                  <h3 className="mt-1.5 text-sm font-semibold text-[#d4d4d8]">
                    {cat.title}
                  </h3>

                  {top && top.votes > 0 ? (
                    <div className="mt-4 flex items-center gap-3.5">
                      <NomineeArtwork
                        nominee={top.nominee}
                        compact
                        className="h-14 w-14 shrink-0 rounded-lg border border-[#304632]"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-[#fafafa]">
                          {top.nominee.title}
                        </p>
                        <p className="truncate text-xs text-[#8c8c94]">
                          {top.nominee.studio}
                        </p>
                        {matchesUser && (
                          <span className="mt-1.5 inline-flex items-center gap-1 rounded border border-[#4caf50]/35 bg-[#4caf50]/15 px-1.5 py-0.2 text-[10px] font-medium text-[#81c784]">
                            <Check className="h-2.5 w-2.5 stroke-[2.6]" />
                            {t.community.yourVoteBadge}
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="mt-4 text-xs text-[#71717a]">
                      {t.community.noVotesYet}
                    </p>
                  )}
                </div>

                <div className="mt-5 space-y-2 border-t border-[#1d261e] pt-3.5">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="font-semibold text-[#81c784]">
                      {sharePct}%
                    </span>
                    <span className="text-[#7c7c85]">
                      {t.community.votesCount(top?.votes ?? 0)} /{" "}
                      {t.community.categoryTotalVotes(totalCatVotes)}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#19201a]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#2e7d32] via-[#4caf50] to-[#66bb6a] transition-all duration-500"
                      style={{ width: `${sharePct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredCategories.map((cat) => {
            const userVoteId = votes[cat.id];
            const isUnlocked = Boolean(userVoteId);

            if (!isUnlocked) {
              return (
                <div
                  key={cat.id}
                  className="card-auto-visibility flex flex-col justify-between gap-4 rounded-xl border border-dashed border-[#222226] bg-[#0e0e10] p-5 sm:flex-row sm:items-center"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-[#5c5c64]">
                        {cat.number}
                      </span>
                      <h3 className="text-sm font-semibold text-[#d4d4d8]">
                        {cat.title}
                      </h3>
                    </div>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-[#6e6e77]">
                      <Lock className="h-3 w-3" />
                      {t.community.lockedDesc}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onGoToCategory(cat.id)}
                    className="shrink-0 text-xs"
                  >
                    {t.community.voteToUnlock}
                    <ArrowRight className="h-3.5 w-3.5 text-[#66bb6a]" />
                  </Button>
                </div>
              );
            }

            return (
              <div key={cat.id} className="card-auto-visibility">
                <CategoryVoteChart
                  category={cat}
                  categoryTallies={stats.tallies[cat.id] ?? {}}
                  userNomineeId={userVoteId}
                  compactHeader
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

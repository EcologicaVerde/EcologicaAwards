import * as React from "react";
import { BarChart3, Crown, Check, ArrowUpRight } from "lucide-react";
import type { Category } from "@/types/awards";
import { NomineeArtwork } from "@/components/NomineeArtwork";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

interface CategoryVoteChartProps {
  category: Category;
  categoryTallies: Record<string, number>;
  userNomineeId?: string;
  compactHeader?: boolean;
  onOpenCommunity?: () => void;
}

export const CategoryVoteChart: React.FC<CategoryVoteChartProps> = React.memo(
  ({
    category,
    categoryTallies,
    userNomineeId,
    compactHeader = false,
    onOpenCommunity,
  }) => {
    const { t } = useLanguage();

    const rows = React.useMemo(() => {
      const items = category.nominees.map((nominee, idx) => ({
        nominee,
        votes: categoryTallies[nominee.id] ?? 0,
        originalIndex: idx,
      }));
      const total = items.reduce((acc, item) => acc + item.votes, 0);
      const sorted = [...items].sort((a, b) => {
        if (b.votes !== a.votes) return b.votes - a.votes;
        return a.originalIndex - b.originalIndex;
      });
      const maxVotes = sorted[0]?.votes ?? 0;
      return { sorted, total, maxVotes };
    }, [category.nominees, categoryTallies]);

    return (
      <div className="rounded-xl border border-[#1f2920] bg-[#111311] p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#1c221d] pb-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-[#4caf50]/30 bg-[#4caf50]/12 text-[#81c784]">
              <BarChart3 className="h-3.5 w-3.5" />
            </span>
            <div>
              {compactHeader ? (
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-[#66bb6a]">
                    {category.number}
                  </span>
                  <h3 className="text-sm font-semibold text-[#fafafa]">
                    {category.title}
                  </h3>
                </div>
              ) : (
                <h3 className="text-sm font-semibold text-[#fafafa]">
                  {t.community.categoryPartialTitle}
                </h3>
              )}
              <p className="font-mono text-[11px] text-[#7c7c85]">
                {t.community.categoryTotalVotes(rows.total)}
              </p>
            </div>
          </div>

          {onOpenCommunity && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenCommunity}
              className="text-xs text-[#81c784] hover:text-[#a5d6a7]"
            >
              {t.community.viewAllCharts}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        <div className="space-y-3">
          {rows.sorted.map(({ nominee, votes }, idx) => {
            const pct =
              rows.total > 0 ? Math.round((votes / rows.total) * 100) : 0;
            const isLeader = rows.maxVotes > 0 && votes === rows.maxVotes;
            const isUserPick = userNomineeId === nominee.id;

            return (
              <div key={nominee.id} className="space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className={cn(
                        "w-5 shrink-0 font-mono text-[11px] font-semibold",
                        isLeader ? "text-[#66bb6a]" : "text-[#5c5c64]"
                      )}
                    >
                      #{idx + 1}
                    </span>
                    <NomineeArtwork
                      nominee={nominee}
                      compact
                      className="h-8 w-8 shrink-0 rounded border border-[#242c25]"
                    />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={cn(
                            "truncate text-xs font-semibold",
                            isLeader || isUserPick
                              ? "text-[#fafafa]"
                              : "text-[#c4c4cc]"
                          )}
                        >
                          {nominee.title}
                        </span>
                        {isLeader && (
                          <Crown className="h-3 w-3 shrink-0 text-[#66bb6a]" />
                        )}
                        {isUserPick && (
                          <span className="inline-flex items-center gap-1 rounded border border-[#4caf50]/35 bg-[#4caf50]/12 px-1.5 py-0.2 text-[10px] font-medium text-[#81c784]">
                            <Check className="h-2.5 w-2.5 stroke-[2.6]" />
                            {t.community.yourVoteBadge}
                          </span>
                        )}
                      </div>
                      <p className="truncate text-[11px] text-[#71717a]">
                        {nominee.studio}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right font-mono">
                    <span
                      className={cn(
                        "text-xs font-semibold",
                        isLeader || isUserPick
                          ? "text-[#81c784]"
                          : "text-[#a1a1aa]"
                      )}
                    >
                      {pct}%
                    </span>
                    <p className="text-[10px] text-[#6e6e77]">
                      {t.community.votesCount(votes)}
                    </p>
                  </div>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-[#171917]">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500 ease-out",
                      isLeader
                        ? "bg-gradient-to-r from-[#2e7d32] via-[#4caf50] to-[#66bb6a]"
                        : isUserPick
                          ? "bg-[#4caf50]/75"
                          : "bg-[#2e3530]"
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
CategoryVoteChart.displayName = "CategoryVoteChart";

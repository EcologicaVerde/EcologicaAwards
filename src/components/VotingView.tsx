import * as React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  LayoutGrid,
  Trophy,
  Award,
} from "lucide-react";
import type { Category, VotesMap } from "@/types/awards";
import { NomineeCard } from "@/components/NomineeCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

interface VotingViewProps {
  categories: Category[];
  activeCategoryId: string;
  votes: VotesMap;
  onSelectCategory: (categoryId: string) => void;
  onVote: (categoryId: string, nomineeId: string) => void;
  onBackToCategories: () => void;
  onFinishToResults: () => void;
}

export const VotingView: React.FC<VotingViewProps> = ({
  categories,
  activeCategoryId,
  votes,
  onSelectCategory,
  onVote,
  onBackToCategories,
  onFinishToResults,
}) => {
  const { t } = useLanguage();
  const currentIndex = Math.max(
    0,
    categories.findIndex((c) => c.id === activeCategoryId)
  );
  const category = categories[currentIndex];
  const selectedNomineeId = votes[category.id];
  const votedCount = categories.filter((c) => Boolean(votes[c.id])).length;
  const progressPct = Math.round((votedCount / categories.length) * 100);

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < categories.length - 1;

  const goPrev = React.useCallback(() => {
    if (hasPrev) {
      onSelectCategory(categories[currentIndex - 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hasPrev, categories, currentIndex, onSelectCategory]);

  const goNext = React.useCallback(() => {
    if (hasNext) {
      onSelectCategory(categories[currentIndex + 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hasNext, categories, currentIndex, onSelectCategory]);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext]);

  const pillsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const activePill = pillsRef.current?.querySelector<HTMLButtonElement>(
      `[data-cat-id="${category.id}"]`
    );
    activePill?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [category.id]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" size="sm" onClick={onBackToCategories}>
          <LayoutGrid className="h-3.5 w-3.5" />
          {t.voting.allCategories}
        </Button>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#8c8c94]">
            {t.voting.votedOf(votedCount, categories.length)}
          </span>
          <div className="hidden w-28 sm:block">
            <Progress value={progressPct} />
          </div>
          <Button
            variant={votedCount === categories.length ? "default" : "outline"}
            size="sm"
            onClick={onFinishToResults}
          >
            <Trophy className="h-3.5 w-3.5" />
            {t.voting.results}
          </Button>
        </div>
      </div>

      <div
        ref={pillsRef}
        className="mt-5 flex items-center gap-1.5 overflow-x-auto pb-2"
      >
        {categories.map((cat) => {
          const isCurrent = cat.id === category.id;
          const isVoted = Boolean(votes[cat.id]);
          return (
            <button
              key={cat.id}
              data-cat-id={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer",
                isCurrent
                  ? "border-[#4caf50]/60 bg-[#172218] text-[#e8f5e9]"
                  : isVoted
                    ? "border-[#233224] bg-[#111511] text-[#9ec7a0] hover:border-[#39553b]"
                    : "border-[#1d1d20] bg-[#111111] text-[#7c7c85] hover:border-[#2c2c30] hover:text-[#d4d4d8]"
              )}
            >
              <span className="font-mono text-[10px] opacity-65">
                {cat.number}
              </span>
              <span>{cat.shortTitle}</span>
              {isVoted && (
                <Check className="h-3 w-3 text-[#66bb6a] stroke-[2.6]" />
              )}
            </button>
          );
        })}
      </div>

      <div key={category.id} className="mt-8">
          <div className="mb-8 flex flex-col justify-between gap-4 border-b border-[#1c1c1f] pb-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-medium tracking-widest text-[#66bb6a]">
                  {t.voting.categoryStep(
                    category.number,
                    String(categories.length).padStart(2, "0")
                  )}
                </span>
                {category.featured && (
                  <span className="inline-flex items-center gap-1 rounded border border-[#4caf50]/30 bg-[#4caf50]/10 px-2 py-0.5 text-[10px] font-medium text-[#81c784]">
                    <Award className="h-3 w-3" />
                    {t.voting.featured}
                  </span>
                )}
              </div>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#fafafa] sm:text-4xl">
                {category.title}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-[#8c8c94]">
                {category.description}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-end">
              <Button
                variant="outline"
                size="sm"
                onClick={goPrev}
                disabled={!hasPrev}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {t.voting.prev}
              </Button>
              {hasNext ? (
                <Button
                  variant={selectedNomineeId ? "default" : "outline"}
                  size="sm"
                  onClick={goNext}
                >
                  {t.voting.next}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              ) : (
                <Button size="sm" onClick={onFinishToResults}>
                  <Trophy className="h-3.5 w-3.5" />
                  {t.voting.finish}
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {category.nominees.map((nominee, idx) => (
              <NomineeCard
                key={nominee.id}
                nominee={nominee}
                isSelected={selectedNomineeId === nominee.id}
                hasOtherSelection={
                  Boolean(selectedNomineeId) && selectedNomineeId !== nominee.id
                }
                index={idx}
                onVote={(nomineeId) => onVote(category.id, nomineeId)}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-[#1d1d20] bg-[#111111] px-5 py-4 sm:flex-row">
            <div className="text-center sm:text-left">
              {selectedNomineeId ? (
                <p className="text-xs text-[#a1a1aa]">
                  {t.voting.yourVoteInCategory}{" "}
                  <span className="font-semibold text-[#81c784]">
                    {
                      category.nominees.find((n) => n.id === selectedNomineeId)
                        ?.title
                    }
                  </span>
                </p>
              ) : (
                <p className="text-xs text-[#7c7c85]">{t.voting.hoverPrompt}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {hasPrev && (
                <Button variant="ghost" size="sm" onClick={goPrev}>
                  <ArrowLeft className="h-3.5 w-3.5" />
                  {t.voting.prev}
                </Button>
              )}
              {hasNext ? (
                <Button
                  variant={selectedNomineeId ? "default" : "secondary"}
                  size="sm"
                  onClick={goNext}
                >
                  {t.voting.nextCategory}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              ) : (
                <Button size="sm" onClick={onFinishToResults}>
                  <Trophy className="h-3.5 w-3.5" />
                  {t.voting.viewBallotCard}
                </Button>
              )}
            </div>
          </div>
      </div>
    </div>
  );
};

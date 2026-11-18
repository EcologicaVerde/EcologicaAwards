import * as React from "react";
import { ArrowUpRight, Check, Award } from "lucide-react";
import type { Category, Nominee } from "@/types/awards";
import { NomineeArtwork } from "@/components/NomineeArtwork";
import { useLanguage } from "@/i18n/LanguageContext";
import { useFinePointer } from "@/hooks/useFinePointer";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  selectedNominee?: Nominee;
  index: number;
  onSelect: (categoryId: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = React.memo(
  ({ category, selectedNominee, onSelect }) => {
    const { t } = useLanguage();
    const finePointer = useFinePointer();
    const cardRef = React.useRef<HTMLButtonElement>(null);

    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!finePointer) return;
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--my", `${e.clientY - rect.top}px`);
      },
      [finePointer]
    );

    const isVoted = Boolean(selectedNominee);

    return (
      <button
        ref={cardRef}
        type="button"
        onClick={() => onSelect(category.id)}
        onMouseMove={finePointer ? handleMouseMove : undefined}
        className={cn(
          "card-auto-visibility group relative flex w-full flex-col justify-between overflow-hidden rounded-xl border p-5 text-left transition-all duration-250 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4caf50] active:scale-[0.99] sm:hover:-translate-y-1",
          isVoted
            ? "border-[#4caf50]/35 bg-[#111511] hover:border-[#4caf50]/65"
            : "border-[#1e1e1e] bg-[#111111] hover:border-[#324634]"
        )}
      >
        {finePointer && (
          <div
            aria-hidden="true"
            className="spotlight-overlay pointer-events-none absolute -inset-px rounded-xl"
          />
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4caf50]/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-medium tracking-wider text-[#66666e] transition-colors duration-200 group-hover:text-[#81c784]">
                {t.categoryCard.catPrefix} {category.number}
              </span>
              {category.featured && (
                <span className="inline-flex items-center gap-1 rounded border border-[#4caf50]/25 bg-[#4caf50]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#81c784]">
                  <Award className="h-2.5 w-2.5" />
                  {t.categoryCard.featured}
                </span>
              )}
            </div>

            {isVoted ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-[#4caf50]/40 bg-[#4caf50]/15 px-2 py-0.5 text-[11px] font-medium text-[#81c784]">
                <Check className="h-3 w-3 stroke-[2.5]" />
                {t.categoryCard.voted}
              </span>
            ) : (
              <span className="font-mono text-[11px] text-[#5c5c64]">
                {t.categoryCard.nomineesCount(category.nominees.length)}
              </span>
            )}
          </div>

          <div>
            <h3 className="text-[17px] font-semibold tracking-tight text-[#fafafa] transition-colors duration-200 group-hover:text-white">
              {category.title}
            </h3>
            <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-[#8c8c94]">
              {category.description}
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-5 border-t border-[#1c1c1e] pt-3.5">
          {selectedNominee ? (
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <NomineeArtwork
                  nominee={selectedNominee}
                  compact
                  className="h-10 w-10 shrink-0 rounded-md border border-[#2c3c2d]"
                />
                <div className="min-w-0">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#66bb6a]">
                    {t.categoryCard.yourPick}
                  </p>
                  <p className="truncate text-xs font-medium text-[#e4e4e7]">
                    {selectedNominee.title}
                  </p>
                </div>
              </div>
              <span className="shrink-0 text-[11px] font-medium text-[#71717a] transition-colors group-hover:text-[#81c784]">
                {t.categoryCard.change}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#7c7c85] transition-colors duration-200 group-hover:text-[#a5d6a7]">
                {t.categoryCard.openAndVote}
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-md border border-[#222226] bg-[#161618] text-[#7c7c85] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-[#4caf50]/50 group-hover:bg-[#4caf50]/15 group-hover:text-[#81c784]">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          )}
        </div>
      </button>
    );
  }
);
CategoryCard.displayName = "CategoryCard";

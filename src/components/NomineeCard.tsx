import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import type { Nominee } from "@/types/awards";
import { NomineeArtwork } from "@/components/NomineeArtwork";
import { useLanguage } from "@/i18n/LanguageContext";
import { useFinePointer } from "@/hooks/useFinePointer";
import { cn } from "@/lib/utils";

interface NomineeCardProps {
  nominee: Nominee;
  isSelected: boolean;
  hasOtherSelection: boolean;
  index: number;
  onVote: (nomineeId: string) => void;
}

const NomineeCardInner: React.FC<{
  nominee: Nominee;
  isSelected: boolean;
  finePointer: boolean;
  voteRecordedLabel: string;
  selectNomineeLabel: string;
}> = ({
  nominee,
  isSelected,
  finePointer,
  voteRecordedLabel,
  selectNomineeLabel,
}) => (
  <>
    {finePointer && (
      <div
        aria-hidden="true"
        className="sheen-overlay pointer-events-none absolute inset-0 z-20"
      />
    )}

    <div className="relative aspect-square w-full overflow-hidden border-b border-[#1c1c1f]">
      <NomineeArtwork nominee={nominee} className="h-full w-full" />

      {isSelected && (
        <div className="absolute right-3 top-3 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-[#4caf50] text-[#051608] shadow-md shadow-[#4caf50]/35">
          <Check className="h-4 w-4 stroke-[2.8]" />
        </div>
      )}

      <div className="pointer-events-none absolute bottom-3 left-3 z-10">
        <span className="inline-flex rounded-md border border-white/12 bg-[#0a0a0a]/82 px-2 py-0.5 text-[10px] font-medium tracking-wide text-white/85">
          {nominee.genre}
        </span>
      </div>
    </div>

    <div className="relative z-10 flex flex-1 flex-col justify-between p-4">
      <div>
        <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-[#fafafa] transition-colors duration-200 group-hover:text-white">
          {nominee.title}
        </h3>
        <p className="mt-1 text-xs text-[#8c8c94]">{nominee.studio}</p>
      </div>

      <div className="mt-4 border-t border-[#1b1b1e] pt-3">
        {isSelected ? (
          <div className="flex items-center justify-between text-xs font-semibold text-[#66bb6a]">
            <span>{voteRecordedLabel}</span>
            <Check className="h-3.5 w-3.5" />
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs font-medium text-[#7c7c85] transition-colors duration-200 group-hover:text-[#81c784]">
            <span>{selectNomineeLabel}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        )}
      </div>
    </div>
  </>
);

const DesktopNomineeCard: React.FC<NomineeCardProps> = ({
  nominee,
  isSelected,
  hasOtherSelection,
  index,
  onVote,
}) => {
  const { t } = useLanguage();
  const cardRef = React.useRef<HTMLButtonElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4.5, -4.5]), {
    stiffness: 260,
    damping: 26,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4.5, 4.5]), {
    stiffness: 260,
    damping: 26,
  });

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;
      mouseX.set(relX - 0.5);
      mouseY.set(relY - 0.5);
      el.style.setProperty("--mx", `${relX * 100}%`);
      el.style.setProperty("--my", `${relY * 100}%`);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = React.useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 900 }}
      className="h-full"
    >
      <motion.button
        ref={cardRef}
        type="button"
        onClick={() => onVote(nominee.id)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileTap={{ scale: 0.985 }}
        className={cn(
          "group relative flex h-full w-full flex-col overflow-hidden rounded-xl border text-left transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4caf50]",
          isSelected
            ? "border-[#4caf50] bg-[#111611] shadow-[0_0_28px_-8px_rgba(76,175,80,0.45)]"
            : hasOtherSelection
              ? "border-[#1d1d20] bg-[#111111] opacity-72 hover:opacity-100 hover:border-[#354c37] hover:shadow-[0_14px_34px_-14px_rgba(0,0,0,0.85)]"
              : "border-[#1f1f22] bg-[#111111] hover:border-[#3b563e] hover:shadow-[0_14px_34px_-14px_rgba(0,0,0,0.85)]"
        )}
      >
        <NomineeCardInner
          nominee={nominee}
          isSelected={isSelected}
          finePointer
          voteRecordedLabel={t.voting.voteRecorded}
          selectNomineeLabel={t.voting.selectNominee}
        />
      </motion.button>
    </motion.div>
  );
};

const TouchNomineeCard: React.FC<NomineeCardProps> = ({
  nominee,
  isSelected,
  hasOtherSelection,
  onVote,
}) => {
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => onVote(nominee.id)}
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-xl border text-left transition-all duration-200 cursor-pointer active:scale-[0.985] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4caf50]",
        isSelected
          ? "border-[#4caf50] bg-[#111611] ring-1 ring-[#4caf50]/35"
          : hasOtherSelection
            ? "border-[#1d1d20] bg-[#111111] opacity-75"
            : "border-[#1f1f22] bg-[#111111]"
      )}
    >
      <NomineeCardInner
        nominee={nominee}
        isSelected={isSelected}
        finePointer={false}
        voteRecordedLabel={t.voting.voteRecorded}
        selectNomineeLabel={t.voting.selectNominee}
      />
    </button>
  );
};

export const NomineeCard: React.FC<NomineeCardProps> = React.memo((props) => {
  const finePointer = useFinePointer();
  if (finePointer) {
    return <DesktopNomineeCard {...props} />;
  }
  return <TouchNomineeCard {...props} />;
});
NomineeCard.displayName = "NomineeCard";

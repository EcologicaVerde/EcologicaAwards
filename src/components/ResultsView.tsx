import * as React from "react";
import { motion } from "framer-motion";
import { toCanvas } from "html-to-image";
import {
  Download,
  UserPen,
  RotateCcw,
  ArrowLeft,
  Award,
  Sparkles,
  Loader2,
} from "lucide-react";
import type { Category, VoterProfile, VotesMap } from "@/types/awards";
import { AWARDS_EDITION } from "@/data/categories";
import { EcologicaLogo } from "@/components/EcologicaLogo";
import { NomineeArtwork } from "@/components/NomineeArtwork";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

interface ResultsViewProps {
  categories: Category[];
  votes: VotesMap;
  profile: VoterProfile;
  onOpenProfile: () => void;
  onEditCategory: (categoryId: string) => void;
  onResetVotes: () => void;
  onBackToCategories: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  categories,
  votes,
  profile,
  onOpenProfile,
  onEditCategory,
  onResetVotes,
  onBackToCategories,
}) => {
  const { t } = useLanguage();
  const ballotRef = React.useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = React.useState(false);
  const [confirmResetOpen, setConfirmResetOpen] = React.useState(false);
  const [exportMessage, setExportMessage] = React.useState<string | null>(null);

  const votedCount = categories.filter((c) => Boolean(votes[c.id])).length;
  const totalCount = categories.length;
  const remainingCategories = categories.filter((c) => !votes[c.id]);

  const gotyCategory = categories[0];
  const gotyNominee = gotyCategory.nominees.find(
    (n) => n.id === votes[gotyCategory.id]
  );
  const otherCategories = categories.slice(1);

  const displayName = profile.username.trim() || t.defaultUsername;
  const initials = displayName.slice(0, 2).toUpperCase();

  const handleDownloadPng = async () => {
    if (!ballotRef.current || isExporting) return;
    try {
      setIsExporting(true);
      setExportMessage(null);
      const pixelRatio = 2;
      const renderedCanvas = await toCanvas(ballotRef.current, {
        cacheBust: true,
        pixelRatio,
        style: {
          margin: "0",
          boxShadow: "none",
        },
      });
      const outputCanvas = document.createElement("canvas");
      outputCanvas.width = renderedCanvas.width;
      outputCanvas.height = renderedCanvas.height;
      const ctx = outputCanvas.getContext("2d");
      if (!ctx) throw new Error("canvas_context_unavailable");
      const radius = 20 * pixelRatio;
      ctx.clearRect(0, 0, outputCanvas.width, outputCanvas.height);
      ctx.beginPath();
      ctx.roundRect(0, 0, outputCanvas.width, outputCanvas.height, radius);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(renderedCanvas, 0, 0);
      const dataUrl = outputCanvas.toDataURL("image/png");
      const safeName = displayName
        .toLowerCase()
        .replace(/[^a-z0-9-_]+/g, "-")
        .replace(/^-|-$/g, "");
      const link = document.createElement("a");
      link.download = `ecologica-awards-${AWARDS_EDITION}-${safeName || "votos"}.png`;
      link.href = dataUrl;
      link.click();
      setExportMessage(t.results.pngSuccess);
      setTimeout(() => setExportMessage(null), 3500);
    } catch {
      setExportMessage(t.results.pngError);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" size="sm" onClick={onBackToCategories}>
          <ArrowLeft className="h-3.5 w-3.5" />
          {t.results.backToCategories}
        </Button>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={onOpenProfile}>
            <UserPen className="h-3.5 w-3.5" />
            {t.results.profile}
          </Button>
          <Button
            size="sm"
            onClick={handleDownloadPng}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                {t.results.generating}
              </>
            ) : (
              <>
                <Download className="h-3.5 w-3.5" />
                {t.results.downloadPng}
              </>
            )}
          </Button>
        </div>
      </div>

      {exportMessage && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-lg border border-[#4caf50]/35 bg-[#121a12] px-4 py-2.5 text-xs text-[#a5d6a7]"
        >
          {exportMessage}
        </motion.div>
      )}

      {remainingCategories.length > 0 && (
        <div className="mt-5 flex flex-col justify-between gap-3 rounded-xl border border-[#242428] bg-[#111111] px-4 py-3.5 sm:flex-row sm:items-center">
          <p className="text-xs text-[#a1a1aa]">
            {t.results.incompletePrompt(
              votedCount,
              totalCount,
              remainingCategories.length
            )}
          </p>
          <Button
            size="sm"
            variant="emeraldSoft"
            onClick={() => onEditCategory(remainingCategories[0].id)}
            className="shrink-0"
          >
            {t.results.voteNextPending}
          </Button>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 rounded-[20px] shadow-2xl shadow-black/70"
      >
        <div
          ref={ballotRef}
          className="relative overflow-hidden rounded-[20px] border border-[#233224] bg-[#0b0d0b] p-6 sm:p-8"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[560px] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(76, 175, 80, 0.24) 0%, rgba(27, 94, 32, 0.08) 52%, transparent 78%)",
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#4caf50] to-transparent opacity-75"
          />

          <div className="relative z-10 flex flex-col justify-between gap-6 border-b border-[#1c241d] pb-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <EcologicaLogo size="md" withAura />
              <div>
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#66bb6a]">
                  {t.results.officialCard(AWARDS_EDITION)}
                </p>
                <h2 className="mt-0.5 text-2xl font-bold tracking-tight text-[#fafafa]">
                  Ecológica Awards
                </h2>
                <p className="text-xs text-[#8c8c94]">{t.brandSubtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-xl border border-[#223023] bg-[#101410]/95 px-4 py-3">
              <Avatar
                src={profile.avatar}
                fallback={initials}
                size="lg"
                className="ring-2 ring-[#4caf50]/50 ring-offset-2 ring-offset-[#101410]"
              />
              <div className="min-w-0">
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#66bb6a]">
                  {t.results.votesBy}
                </p>
                <p className="truncate text-sm font-semibold text-[#fafafa]">
                  @{displayName}
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-[#7c7c85]">
                  {t.results.categoriesCount(votedCount, totalCount)}
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-6">
            <button
              type="button"
              onClick={() => onEditCategory(gotyCategory.id)}
              className="group relative flex w-full flex-col justify-between gap-4 overflow-hidden rounded-xl border border-[#4caf50]/35 bg-gradient-to-br from-[#131c14] via-[#101410] to-[#0e100e] p-4 text-left transition-all duration-200 hover:border-[#4caf50]/70 sm:flex-row sm:items-center sm:p-5 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {gotyNominee ? (
                  <NomineeArtwork
                    nominee={gotyNominee}
                    compact
                    className="h-16 w-16 shrink-0 rounded-lg border border-[#324a34]"
                  />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-dashed border-[#2a332b] bg-[#0e100e] text-[#52525b]">
                    <Award className="h-5 w-5" />
                  </div>
                )}

                <div>
                  <div className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#66bb6a]">
                    <Sparkles className="h-3 w-3" />
                    {t.categoryCard.catPrefix} {gotyCategory.number} •{" "}
                    {gotyCategory.title}
                  </div>
                  <h3 className="mt-1 text-lg font-bold tracking-tight text-[#fafafa] sm:text-xl">
                    {gotyNominee ? gotyNominee.title : t.results.notSelectedYet}
                  </h3>
                  <p className="text-xs text-[#8c8c94]">
                    {gotyNominee
                      ? `${gotyNominee.studio} • ${gotyNominee.genre}`
                      : t.results.clickToChooseGoty}
                  </p>
                </div>
              </div>

              <span className="self-start rounded-md border border-[#4caf50]/30 bg-[#4caf50]/10 px-2.5 py-1 text-[11px] font-medium text-[#81c784] transition-colors group-hover:bg-[#4caf50]/20 sm:self-center">
                {gotyNominee ? t.results.changeVote : t.results.vote}
              </span>
            </button>
          </div>

          <div className="relative z-10 mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {otherCategories.map((cat) => {
              const pick = cat.nominees.find((n) => n.id === votes[cat.id]);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onEditCategory(cat.id)}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 cursor-pointer",
                    cat.featured && "sm:col-span-2 lg:col-span-2",
                    pick
                      ? "border-[#1f2920] bg-[#111411] hover:border-[#3c563e]"
                      : "border-dashed border-[#202024] bg-[#0e0e10] hover:border-[#34343a]"
                  )}
                >
                  {pick ? (
                    <NomineeArtwork
                      nominee={pick}
                      compact
                      className="h-12 w-12 shrink-0 rounded-md border border-[#2a382b]"
                    />
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[#1f1f23] bg-[#121214] font-mono text-[10px] text-[#52525b]">
                      {cat.number}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-[10px] uppercase tracking-wider text-[#66bb6a]/85">
                      {cat.number} • {cat.shortTitle}
                    </p>
                    <p
                      className={cn(
                        "mt-0.5 truncate text-xs font-semibold",
                        pick ? "text-[#f4f4f5]" : "text-[#5c5c64]"
                      )}
                    >
                      {pick ? pick.title : t.results.noVote}
                    </p>
                    <p className="truncate text-[11px] text-[#7c7c85]">
                      {pick ? pick.studio : t.results.clickToVote}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-[#1a221b] pt-4 text-[11px] text-[#6a726b]">
            <span className="font-medium text-[#81c784]/80">
              Ecológica Awards – {AWARDS_EDITION}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest">
              ecologicaverde.online • {t.brandSubtitle}
            </span>
          </div>
        </div>
      </motion.div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-[#71717a]">
        <span>{t.results.footerHint}</span>
        {votedCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setConfirmResetOpen(true)}
            className="text-[#8c8c94] hover:text-red-400"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {t.results.clearAllVotes}
          </Button>
        )}
      </div>

      <Dialog
        open={confirmResetOpen}
        onOpenChange={setConfirmResetOpen}
        title={t.results.confirmResetTitle}
        description={t.results.confirmResetDesc}
      >
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setConfirmResetOpen(false)}
          >
            {t.results.cancel}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              onResetVotes();
              setConfirmResetOpen(false);
            }}
          >
            {t.results.confirmClear}
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

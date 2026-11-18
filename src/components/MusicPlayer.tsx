import * as React from "react";
import { Play, Pause, Volume2, Volume1, VolumeX } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const STORAGE_VOLUME_KEY = "ecologica-awards-volume-v1";

function getInitialVolume(): number {
  try {
    const raw = localStorage.getItem(STORAGE_VOLUME_KEY);
    if (!raw) return 0.32;
    const parsed = Number(raw);
    if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 1) return parsed;
  } catch {
    return 0.32;
  }
  return 0.32;
}

export const MusicPlayer: React.FC = () => {
  const { t } = useLanguage();
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const userPausedRef = React.useRef(false);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState<number>(getInitialVolume);
  const [muted, setMuted] = React.useState(false);
  const [awaitingGesture, setAwaitingGesture] = React.useState(false);

  React.useEffect(() => {
    const audio = new Audio("./audio/theme.m4a");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = volume;
    audioRef.current = audio;

    const onPlay = () => {
      setIsPlaying(true);
      setAwaitingGesture(false);
    };
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    const tryAutoplay = async () => {
      if (userPausedRef.current) return;
      try {
        await audio.play();
      } catch {
        setAwaitingGesture(true);
      }
    };

    const handleFirstInteraction = () => {
      if (userPausedRef.current || !audioRef.current) return;
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => undefined);
      }
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };

    tryAutoplay();
    window.addEventListener("pointerdown", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : volume;
    try {
      localStorage.setItem(STORAGE_VOLUME_KEY, String(volume));
    } catch {
      return;
    }
  }, [volume, muted]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      userPausedRef.current = false;
      audio.play().catch(() => undefined);
    } else {
      userPausedRef.current = true;
      audio.pause();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMuted((prev) => !prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    setVolume(next);
    if (next > 0 && muted) {
      setMuted(false);
    }
  };

  const effectiveVolume = muted ? 0 : volume;

  return (
    <div
      className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full border border-[#233224] bg-[#101410]/92 px-2.5 py-1.5 text-xs text-[#e4e4e7] shadow-xl shadow-black/70 backdrop-blur-md transition-colors hover:border-[#39543b]"
      role="region"
      aria-label={t.audio.label}
    >
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? t.audio.pause : t.audio.play}
        title={isPlaying ? t.audio.pause : t.audio.play}
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4caf50]",
          isPlaying
            ? "border-[#4caf50]/50 bg-[#4caf50]/18 text-[#81c784] hover:bg-[#4caf50]/28"
            : "border-[#27272a] bg-[#18181b] text-[#a1a1aa] hover:border-[#3b563e] hover:text-[#fafafa]"
        )}
      >
        {isPlaying ? (
          <Pause className="h-3.5 w-3.5 fill-current" />
        ) : (
          <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
        )}
      </button>

      <div className="hidden items-end gap-[2px] px-0.5 sm:flex" aria-hidden="true">
        <span
          className={cn(
            "w-[2px] rounded-full bg-[#4caf50] transition-all duration-300",
            isPlaying && effectiveVolume > 0
              ? "eq-bar-1 h-3 opacity-90"
              : "h-1.5 opacity-35"
          )}
        />
        <span
          className={cn(
            "w-[2px] rounded-full bg-[#66bb6a] transition-all duration-300",
            isPlaying && effectiveVolume > 0
              ? "eq-bar-2 h-3.5 opacity-95"
              : "h-2 opacity-35"
          )}
        />
        <span
          className={cn(
            "w-[2px] rounded-full bg-[#4caf50] transition-all duration-300",
            isPlaying && effectiveVolume > 0
              ? "eq-bar-3 h-2.5 opacity-90"
              : "h-1.5 opacity-35"
          )}
        />
      </div>

      {awaitingGesture && !isPlaying && (
        <button
          type="button"
          onClick={togglePlay}
          className="hidden pr-1 text-[11px] font-medium text-[#81c784] transition-colors hover:text-[#a5d6a7] cursor-pointer md:inline"
        >
          {t.audio.clickToEnable}
        </button>
      )}

      <div className="h-3.5 w-px bg-[#222823]" />

      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted || volume === 0 ? t.audio.unmute : t.audio.mute}
        title={muted || volume === 0 ? t.audio.unmute : t.audio.mute}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[#8c8c94] transition-colors hover:text-[#e8f5e9] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4caf50]"
      >
        {effectiveVolume === 0 ? (
          <VolumeX className="h-3.5 w-3.5 text-[#71717a]" />
        ) : effectiveVolume < 0.45 ? (
          <Volume1 className="h-3.5 w-3.5 text-[#81c784]" />
        ) : (
          <Volume2 className="h-3.5 w-3.5 text-[#81c784]" />
        )}
      </button>

      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={effectiveVolume}
        onChange={handleVolumeChange}
        aria-label={t.audio.volume}
        className="audio-range mr-1 w-16 cursor-pointer sm:w-20"
      />
    </div>
  );
};

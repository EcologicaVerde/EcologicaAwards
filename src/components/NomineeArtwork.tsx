import * as React from "react";
import type { ArtworkMotif, Nominee } from "@/types/awards";
import { cn } from "@/lib/utils";

interface NomineeArtworkProps {
  nominee: Nominee;
  className?: string;
  compact?: boolean;
}

function MotifIllustration({
  motif,
  primary,
}: {
  motif: ArtworkMotif;
  primary: string;
}) {
  switch (motif) {
    case "eclipse":
      return (
        <svg
          viewBox="0 0 240 300"
          className="h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="120"
            cy="126"
            r="64"
            stroke={primary}
            strokeOpacity="0.28"
            strokeWidth="1"
          />
          <circle
            cx="120"
            cy="126"
            r="44"
            fill="#0a0a0a"
            stroke={primary}
            strokeOpacity="0.72"
            strokeWidth="1.5"
          />
          <circle cx="132" cy="118" r="36" fill={primary} fillOpacity="0.16" />
          <line
            x1="28"
            y1="220"
            x2="212"
            y2="220"
            stroke={primary}
            strokeOpacity="0.25"
            strokeWidth="1"
          />
          <line
            x1="120"
            y1="38"
            x2="120"
            y2="220"
            stroke={primary}
            strokeOpacity="0.16"
            strokeWidth="1"
            strokeDasharray="3 5"
          />
        </svg>
      );
    case "spire":
      return (
        <svg
          viewBox="0 0 240 300"
          className="h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          <polygon
            points="120,44 166,222 120,198 74,222"
            stroke={primary}
            strokeOpacity="0.65"
            strokeWidth="1.3"
            fill={primary}
            fillOpacity="0.08"
          />
          <polygon
            points="120,76 144,206 120,190 96,206"
            stroke={primary}
            strokeOpacity="0.35"
            strokeWidth="1"
          />
          <circle
            cx="120"
            cy="126"
            r="72"
            stroke={primary}
            strokeOpacity="0.14"
            strokeWidth="1"
          />
        </svg>
      );
    case "orbit":
      return (
        <svg
          viewBox="0 0 240 300"
          className="h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          <ellipse
            cx="120"
            cy="134"
            rx="78"
            ry="32"
            transform="rotate(-24 120 134)"
            stroke={primary}
            strokeOpacity="0.55"
            strokeWidth="1.2"
          />
          <ellipse
            cx="120"
            cy="134"
            rx="78"
            ry="32"
            transform="rotate(24 120 134)"
            stroke={primary}
            strokeOpacity="0.3"
            strokeWidth="1"
          />
          <circle
            cx="120"
            cy="134"
            r="16"
            fill={primary}
            fillOpacity="0.22"
            stroke={primary}
            strokeOpacity="0.8"
            strokeWidth="1.2"
          />
          <circle cx="182" cy="106" r="4" fill={primary} fillOpacity="0.85" />
        </svg>
      );
    case "horizon":
      return (
        <svg
          viewBox="0 0 240 300"
          className="h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M20 176 Q120 124 220 176"
            stroke={primary}
            strokeOpacity="0.6"
            strokeWidth="1.3"
          />
          <path
            d="M20 194 Q120 148 220 194"
            stroke={primary}
            strokeOpacity="0.32"
            strokeWidth="1"
          />
          <path
            d="M20 212 Q120 172 220 212"
            stroke={primary}
            strokeOpacity="0.16"
            strokeWidth="1"
          />
          <circle
            cx="120"
            cy="110"
            r="26"
            fill={primary}
            fillOpacity="0.14"
            stroke={primary}
            strokeOpacity="0.55"
            strokeWidth="1.2"
          />
        </svg>
      );
    case "prism":
      return (
        <svg
          viewBox="0 0 240 300"
          className="h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          <polygon
            points="120,56 188,186 52,186"
            stroke={primary}
            strokeOpacity="0.6"
            strokeWidth="1.3"
            fill={primary}
            fillOpacity="0.07"
          />
          <polygon
            points="120,94 158,172 82,172"
            stroke={primary}
            strokeOpacity="0.35"
            strokeWidth="1"
          />
          <line
            x1="120"
            y1="56"
            x2="120"
            y2="186"
            stroke={primary}
            strokeOpacity="0.25"
            strokeWidth="1"
          />
        </svg>
      );
    case "grid":
      return (
        <svg
          viewBox="0 0 240 300"
          className="h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="54"
            y="64"
            width="132"
            height="132"
            stroke={primary}
            strokeOpacity="0.45"
            strokeWidth="1.2"
            fill={primary}
            fillOpacity="0.05"
          />
          <rect
            x="78"
            y="88"
            width="84"
            height="84"
            stroke={primary}
            strokeOpacity="0.65"
            strokeWidth="1.2"
          />
          <rect
            x="102"
            y="112"
            width="36"
            height="36"
            fill={primary}
            fillOpacity="0.22"
            stroke={primary}
            strokeOpacity="0.85"
            strokeWidth="1.2"
          />
        </svg>
      );
    case "waves":
      return (
        <svg
          viewBox="0 0 240 300"
          className="h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4].map((idx) => (
            <path
              key={idx}
              d={`M20 ${106 + idx * 22} C70 ${84 + idx * 22}, 170 ${128 + idx * 22}, 220 ${106 + idx * 22}`}
              stroke={primary}
              strokeOpacity={0.62 - idx * 0.1}
              strokeWidth={idx === 0 ? "1.4" : "1"}
            />
          ))}
        </svg>
      );
    case "monolith":
    default:
      return (
        <svg
          viewBox="0 0 240 300"
          className="h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="88"
            y="54"
            width="64"
            height="164"
            rx="2"
            fill={primary}
            fillOpacity="0.09"
            stroke={primary}
            strokeOpacity="0.62"
            strokeWidth="1.3"
          />
          <line
            x1="120"
            y1="74"
            x2="120"
            y2="198"
            stroke={primary}
            strokeOpacity="0.35"
            strokeWidth="1"
          />
          <circle
            cx="120"
            cy="104"
            r="10"
            stroke={primary}
            strokeOpacity="0.7"
            strokeWidth="1.2"
          />
        </svg>
      );
  }
}

export const NomineeArtwork: React.FC<NomineeArtworkProps> = ({
  nominee,
  className,
  compact = false,
}) => {
  const [imgFailed, setImgFailed] = React.useState(false);

  if (nominee.image && !imgFailed) {
    return (
      <div className={cn("relative overflow-hidden bg-[#0c0c0d]", className)}>
        <img
          src={nominee.image}
          alt={nominee.title}
          loading="lazy"
          decoding="async"
          onError={() => setImgFailed(true)}
          className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
        {!compact && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-black/10 to-transparent" />
        )}
      </div>
    );
  }

  const { primary, secondary, motif } = nominee.palette;
  const initials = nominee.title
    .split(/[\s:]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn("relative overflow-hidden select-none", className)}
      style={{
        background: `radial-gradient(circle at 50% 24%, ${primary}28 0%, ${secondary} 52%, #0a0a0b 100%)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "100% 18px",
        }}
      />

      <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.06]">
        <MotifIllustration motif={motif} primary={primary} />
      </div>

      {!compact && (
        <div className="pointer-events-none absolute inset-x-3.5 top-3.5 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-white/45">
          <span>{nominee.year ?? "2026"}</span>
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: primary }}
          />
        </div>
      )}

      {compact && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span
            className="font-mono text-xs font-semibold tracking-wider"
            style={{ color: primary }}
          >
            {initials}
          </span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/25" />
    </div>
  );
};

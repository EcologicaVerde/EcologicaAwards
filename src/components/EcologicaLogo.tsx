import * as React from "react";
import logoImg from "@/assets/logo-ecologica.png";
import { cn } from "@/lib/utils";

interface EcologicaLogoProps {
  size?: "sm" | "md" | "lg";
  withAura?: boolean;
  className?: string;
}

const sizeMap = {
  sm: {
    wrapper: "h-9 w-9",
    img: "h-8 w-8",
    aura: "-inset-2.5",
  },
  md: {
    wrapper: "h-14 w-14",
    img: "h-12 w-12",
    aura: "-inset-5",
  },
  lg: {
    wrapper: "h-24 w-24 sm:h-28 sm:w-28",
    img: "h-20 w-20 sm:h-24 sm:w-24",
    aura: "-inset-10 sm:-inset-12",
  },
};

export const EcologicaLogo: React.FC<EcologicaLogoProps> = ({
  size = "md",
  withAura = true,
  className,
}) => {
  const s = sizeMap[size];

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center select-none",
        s.wrapper,
        className
      )}
    >
      {withAura && (
        <>
          <div
            aria-hidden="true"
            className={cn(
              "logo-ecologica-aura pointer-events-none absolute rounded-full blur-2xl",
              s.aura
            )}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-[#1b5e20]/40 via-[#4caf50]/35 to-[#81c784]/25 blur-md"
          />
        </>
      )}

      <img
        src={logoImg}
        alt="Logo Ecológica Verde"
        className={cn(
          "relative z-10 object-contain",
          withAura && "logo-ecologica-glow",
          s.img
        )}
      />
    </div>
  );
};

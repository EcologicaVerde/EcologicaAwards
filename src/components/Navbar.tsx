import * as React from "react";
import { LayoutGrid, Vote, Trophy, UserPen, Globe } from "lucide-react";
import { EcologicaLogo } from "@/components/EcologicaLogo";
import { Avatar } from "@/components/ui/avatar";
import { useLanguage } from "@/i18n/LanguageContext";
import { LANGUAGES } from "@/i18n/translations";
import type { AppView, VoterProfile } from "@/types/awards";
import { cn } from "@/lib/utils";

interface NavbarProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  votedCount: number;
  totalCategories: number;
  profile: VoterProfile;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  votedCount,
  totalCategories,
  profile,
  onOpenProfile,
}) => {
  const { lang, setLang, t } = useLanguage();

  const navItems: { id: AppView; label: string; icon: React.ReactNode }[] = [
    {
      id: "categories",
      label: t.nav.categories,
      icon: <LayoutGrid className="h-3.5 w-3.5" />,
    },
    {
      id: "vote",
      label: t.nav.vote,
      icon: <Vote className="h-3.5 w-3.5" />,
    },
    {
      id: "results",
      label: t.nav.results,
      icon: <Trophy className="h-3.5 w-3.5" />,
    },
  ];

  const displayName = profile.username.trim() || t.defaultUsername;
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1a1a1d] bg-[#0a0a0a]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6">
        <button
          type="button"
          onClick={() => onNavigate("categories")}
          className="group flex shrink-0 items-center gap-2.5 text-left cursor-pointer focus-visible:outline-none sm:gap-3"
        >
          <EcologicaLogo size="sm" withAura />
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-[#fafafa] transition-colors group-hover:text-white">
              Ecológica Awards
            </span>
            <span className="hidden text-[11px] text-[#71717a] md:block">
              {t.brandSubtitle}
            </span>
          </div>
        </button>

        <nav
          aria-label={t.nav.categories}
          className="flex items-center rounded-lg border border-[#1d1d20] bg-[#111111] p-1"
        >
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "relative flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer sm:px-3",
                  isActive
                    ? "bg-[#1a241b] text-[#e8f5e9] shadow-xs ring-1 ring-[#4caf50]/30"
                    : "text-[#8c8c94] hover:text-[#e4e4e7]"
                )}
              >
                <span className={cn(isActive && "text-[#66bb6a]")}>
                  {item.icon}
                </span>
                <span className="hidden lg:inline">{item.label}</span>
                {item.id === "results" && votedCount > 0 && (
                  <span
                    className={cn(
                      "ml-0.5 rounded-full px-1.5 py-0.2 font-mono text-[10px]",
                      votedCount === totalCategories
                        ? "bg-[#4caf50] text-[#051608] font-semibold"
                        : "bg-[#222226] text-[#a1a1aa]"
                    )}
                  >
                    {votedCount}/{totalCategories}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div
            className="flex items-center rounded-lg border border-[#1d1d20] bg-[#111111] p-0.5"
            role="group"
            aria-label={t.nav.languageLabel}
          >
            <Globe className="ml-1.5 mr-1 hidden h-3 w-3 text-[#66666e] sm:block" />
            {LANGUAGES.map((item) => {
              const active = lang === item.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setLang(item.code)}
                  title={item.nativeName}
                  className={cn(
                    "rounded-md px-1.5 py-1 font-mono text-[10px] font-semibold transition-all duration-150 cursor-pointer",
                    active
                      ? "bg-[#1a241b] text-[#81c784] ring-1 ring-[#4caf50]/35"
                      : "text-[#71717a] hover:text-[#e4e4e7]"
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onOpenProfile}
            className="group flex items-center gap-2 rounded-full border border-[#1f1f22] bg-[#111111] py-1 pl-1.5 pr-2.5 text-left transition-all duration-200 hover:border-[#344a36] hover:bg-[#141814] cursor-pointer sm:pr-3"
            title={t.nav.editProfileTooltip}
          >
            <Avatar src={profile.avatar} fallback={initials} size="sm" />
            <div className="hidden max-w-[110px] flex-col sm:flex">
              <span className="truncate text-xs font-medium text-[#e4e4e7] group-hover:text-white">
                @{displayName}
              </span>
            </div>
            <UserPen className="h-3.5 w-3.5 text-[#66666e] transition-colors group-hover:text-[#81c784]" />
          </button>
        </div>
      </div>
    </header>
  );
};

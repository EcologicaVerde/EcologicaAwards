import * as React from "react";
import {
  TRANSLATIONS,
  type Language,
  type UITranslations,
} from "@/i18n/translations";
import { CATEGORY_TRANSLATIONS } from "@/i18n/categoryTranslations";
import type { Category } from "@/types/awards";

const STORAGE_LANG_KEY = "ecologica-awards-lang-v1";

function isLanguage(value: string | null): value is Language {
  return value === "pt" || value === "en" || value === "es" || value === "ru";
}

function getInitialLanguage(): Language {
  try {
    const params = new URLSearchParams(window.location.search);
    const paramLang = params.get("lang")?.toLowerCase() ?? null;
    if (isLanguage(paramLang)) return paramLang;
    const stored = localStorage.getItem(STORAGE_LANG_KEY);
    if (isLanguage(stored)) return stored;
  } catch {
    return "pt";
  }
  return "pt";
}

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: UITranslations;
  localizeCategories: (categories: Category[]) => Category[];
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = React.useState<Language>(getInitialLanguage);

  const setLang = React.useCallback((next: Language) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_LANG_KEY, next);
    } catch {
      return;
    }
  }, []);

  const t = TRANSLATIONS[lang];

  React.useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    document.title = t.pageTitle;
  }, [t]);

  const localizeCategories = React.useCallback(
    (categories: Category[]): Category[] => {
      if (lang === "pt") return categories;
      const catDict = CATEGORY_TRANSLATIONS[lang];
      return categories.map((cat) => {
        const localized = catDict[cat.id];
        return {
          ...cat,
          title: localized?.title ?? cat.title,
          shortTitle: localized?.shortTitle ?? cat.shortTitle,
          description: localized?.description ?? cat.description,
          nominees: cat.nominees.map((nom) => ({
            ...nom,
            genre: t.genres[nom.genre] ?? nom.genre,
            studio: t.genres[nom.studio] ?? nom.studio,
            year: nom.year ? (t.years[nom.year] ?? nom.year) : nom.year,
          })),
        };
      });
    },
    [lang, t]
  );

  const value = React.useMemo(
    () => ({ lang, setLang, t, localizeCategories }),
    [lang, setLang, t, localizeCategories]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextValue {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}

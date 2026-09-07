// Client-safe: only types and the language list. Dictionaries live in lib/i18n.ts (server only).
export const languages = ["uz", "ru", "en"] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = "uz";

export function isLang(value: string | undefined): value is Lang {
  return languages.includes(value as Lang);
}

export const languageNames: Record<Lang, string> = {
  uz: "O'zbekcha",
  ru: "Русский",
  en: "English",
};

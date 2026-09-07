// Store-level facts shared by every section. Values marked TODO are not in the
// E-COMMERCE repo (they are admin settings there, currently empty) and must be
// confirmed with the store owner before launch.
export const site = {
  name: "Avenir Store",
  /** TODO: real bot username. The E-COMMERCE backend keeps it in admin settings (bot_link). */
  botUrl: "https://t.me/avenirstore_bot",
  /** Current storefront (Telegram Mini App) domain from E-COMMERCE/DEPLOY.md. */
  storeUrl: "https://fetch-group.uz",
  /** TODO: contact details are admin-configurable in E-COMMERCE and empty today. Leave null to hide. */
  contacts: {
    phone: null as string | null,
    telegram: null as string | null,
    instagram: null as string | null,
    email: null as string | null,
    address: null as string | null,
  },
  city: "Toshkent",
  /** Word joiners (U+2060) keep the ranges from breaking after the dash. */
  delivery: { expressDays: "1–⁠2", standardDays: "5–⁠7" },
  returnDays: 3,
  payments: ["Click", "Payme", "Uzcard", "Humo"] as const,
  developer: { name: "Avenir Soft", url: "https://avenir.uz" },
};

// Store-level facts shared by every section. Values marked TODO are not in the
// E-COMMERCE repo (they are admin settings there, currently empty) and must be
// confirmed with the store owner before launch.
export const site = {
  name: "Avenir Store",
  /**
   * The online store itself (the E-COMMERCE storefront). Every "open the store"
   * action on the landing points here. TODO: switch to the Avenir Store domain
   * once it is set up; today the storefront still lives on fetch-group.uz.
   */
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

/** Attribution for the CC-BY 3D models in public/models (see public/models/CREDITS.txt). */
export const modelCredits = [
  { title: "iPhone 16 Pro Max", author: "MajdyModels", url: "https://sketchfab.com/3d-models/iphone-16-pro-max-41a071ae12794b668502f58d1e0fd1a3" },
  { title: "MacBook Air 15", author: "akshatmittal", url: "https://sketchfab.com/3d-models/apple-macbook-air-15-space-gray-2023-e8d82e341c794141a2561c2c9d01d79e" },
  { title: "iPad Pro 12.9", author: "Konstantin Koretskyi", url: "https://sketchfab.com/3d-models/ipad-pro-129-2020-f0f7674522124f3bbc2d0f898963457e" },
  { title: "Apple Watch Ultra", author: "alboxer2000_", url: "https://sketchfab.com/3d-models/apple-watch-ultra-orange-4656191de2e94767a8c16003fca1f268" },
  { title: "AirPods Pro", author: "Valentine_crut", url: "https://sketchfab.com/3d-models/headphones-airpods-pro-a6f024575e904a31b44b25a29d52e718" },
];

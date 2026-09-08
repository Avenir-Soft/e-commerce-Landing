// Facts about the product shared by every section. Values marked TODO are not
// in the E-COMMERCE repo and must be confirmed with Avenir Soft before launch.
export const site = {
  name: "Avenir Store",
  developer: { name: "Avenir Soft", url: "https://avenir.uz" },
  /**
   * A live instance of the platform that visitors can click through.
   * TODO: point at a dedicated demo shop once one exists; today the only
   * public instance is the client store on fetch-group.uz.
   */
  demoUrl: "https://fetch-group.uz",
  /** TODO: where a demo request should land (form, Telegram, phone). */
  contactUrl: "https://avenir.uz/#aloqa",
  /** Payment rails the platform integrates with (E-COMMERCE admin settings). */
  payments: ["Click", "Payme", "Uzcard", "Humo"] as const,
  /** Interface languages the storefront ships with. */
  storeLanguages: ["UZ", "RU"] as const,
};

export const links = {
  demo: site.demoUrl,
  contact: site.contactUrl,
  developer: site.developer.url,
};

/** Attribution for the CC-BY 3D models in public/models (see public/models/CREDITS.txt). */
export const modelCredits = [
  { title: "iPhone 16 Pro Max", author: "MajdyModels", url: "https://sketchfab.com/3d-models/iphone-16-pro-max-41a071ae12794b668502f58d1e0fd1a3" },
  { title: "MacBook Air 15", author: "akshatmittal", url: "https://sketchfab.com/3d-models/apple-macbook-air-15-space-gray-2023-e8d82e341c794141a2561c2c9d01d79e" },
  { title: "iPad Pro 12.9", author: "Konstantin Koretskyi", url: "https://sketchfab.com/3d-models/ipad-pro-129-2020-f0f7674522124f3bbc2d0f898963457e" },
];

/**
 * Absolute origin, for the things that cannot be relative: the OG image,
 * canonical URLs and the JSON-LD. Netlify sets `URL` at build time, so a
 * custom domain starts being used the moment it is attached without a code
 * change; `NEXT_PUBLIC_SITE_URL` overrides it, and the fallback is today's
 * temporary host.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  "https://avenir-store.netlify.app"
).replace(/\/$/, "");

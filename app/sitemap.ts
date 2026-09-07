import type { MetadataRoute } from "next";
import { languages } from "@/lib/languages";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return languages.map((lang) => ({
    url: `/${lang}`,
    lastModified,
    changeFrequency: "weekly",
    priority: lang === "uz" ? 1 : 0.8,
    alternates: { languages: Object.fromEntries(languages.map((l) => [l, `/${l}`])) },
  }));
}

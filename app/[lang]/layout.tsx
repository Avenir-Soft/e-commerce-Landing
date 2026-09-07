import type { Metadata } from "next";
import { preload } from "react-dom";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Manrope, Unbounded } from "next/font/google";
import { isLang, languages, type Lang } from "@/lib/languages";
import { getDictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

/** Editorial accent: italic serif for eyebrows, taglines and pull-lines. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
  style: ["italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getDictionary(lang);
  const alternates = Object.fromEntries(languages.map((l) => [l, `/${l}`]));
  return {
    title: t.meta.title,
    description: t.meta.description,
    applicationName: site.name,
    alternates: { canonical: `/${lang}`, languages: { ...alternates, "x-default": "/uz" } },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      siteName: site.name,
      locale: lang === "uz" ? "uz_UZ" : lang === "ru" ? "ru_RU" : "en_US",
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDictionary(lang as Lang);
  // start the first two showroom models before the 3D bundle is even parsed
  preload("/models/iphone.glb", { as: "fetch", crossOrigin: "anonymous" });
  preload("/models/macbook15.glb", { as: "fetch", crossOrigin: "anonymous" });

  return (
    <html lang={lang} className={`${unbounded.variable} ${manrope.variable} ${cormorant.variable}`}>
      <body>
        <SmoothScroll />
        <Header lang={lang} nav={t.nav} />
        {children}
        <Footer lang={lang} t={t.footer} />
      </body>
    </html>
  );
}

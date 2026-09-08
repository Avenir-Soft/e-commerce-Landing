import type { Metadata } from "next";
import { preload } from "react-dom";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Inter, Inter_Tight, Unbounded } from "next/font/google";
import { isLang, languages, type Lang } from "@/lib/languages";
import { getDictionary } from "@/lib/i18n";
import { site, siteUrl } from "@/lib/site";
import { included } from "@/lib/product";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Cursor } from "@/components/motion/Cursor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

/** The brand lockup only ("AVENIR" is Latin, so no Cyrillic cut is loaded). */
const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-unbounded",
  display: "swap",
});

/** Interface and body copy. */
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

/** Headings: the same voice as the body, cut tighter for display sizes. */
const interTight = Inter_Tight({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter-tight",
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
    // `/og.jpg` and the canonical have to resolve to an absolute URL for a
    // crawler; without a base, Next falls back to localhost.
    metadataBase: new URL(siteUrl),
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
      // Without a card this link is a grey line of text wherever it is pasted,
      // and in this market it is pasted into Telegram. The image is a shot of
      // the hero itself (tools/pw/avenir-og.mjs), so it cannot drift from the
      // page: real headline, real showroom, real buttons.
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: t.meta.title }],
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description, images: ["/og.jpg"] },
    robots: { index: true, follow: true },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDictionary(lang as Lang);
  // Start the first two showroom models before the 3D bundle is even parsed —
  // but behind everything the page needs to be readable. At default priority
  // 1.5 MB of models raced the 1.6 MB bundle that reveals the copy, on a pipe
  // that fits neither; the models can afford to wait, the text cannot.
  preload("/models/iphone.glb", { as: "fetch", crossOrigin: "anonymous", fetchPriority: "low" });
  preload("/models/macbook15.glb", { as: "fetch", crossOrigin: "anonymous", fetchPriority: "low" });

  return (
    <html
      lang={lang}
      className={`${unbounded.variable} ${inter.variable} ${interTight.variable} ${cormorant.variable}`}
    >
      <body>
        {/* What this page is, in the form a search engine reads. Without it a
            crawler sees a marketing page and has to guess that Avenir Store is
            software a business subscribes to, who publishes it and what it
            does. No `offers` block: it would have to carry a price, and the
            price is deliberately not public. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: site.name,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web, Telegram Mini App",
              description: t.meta.description,
              url: `${siteUrl}/${lang}`,
              inLanguage: lang,
              image: `${siteUrl}/og.jpg`,
              featureList: included[lang],
              provider: {
                "@type": "Organization",
                name: site.developer.name,
                url: site.developer.url,
              },
            }),
          }}
        />
        {/*
          Lifts the loading screen without waiting for React.

          The curtain is a component, so it could only ever leave once the
          bundle had been fetched, parsed and hydrated — 1.6 MB of it. On a
          phone that is most of the wait it was supposed to be hiding.

          This runs from the HTML: after the same budget Loader.tsx uses, it
          marks the curtain and CSS fades it out. When React does arrive it
          finds the budget already spent, goes straight to "done" and sets
          `hidden`, which agrees with what the visitor is already looking at.
          The attribute is one React never writes, so hydration leaves it be.

          Kept in step with waitBudgetMs() in components/hero/Loader.tsx.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
var n=navigator.connection||{},
b=(n.saveData||/(^|\\W)(slow-)?2g$/.test(n.effectiveType||""))?1200:(innerWidth>=1024?7000:2500);
setTimeout(function(){var l=document.querySelector(".loader");
if(l&&!l.hasAttribute("hidden"))l.setAttribute("data-timeout","")},Math.max(b-performance.now(),0))
}catch(e){}})()`,
          }}
        />
        <SmoothScroll />
        <span className="cur" id="cur" aria-hidden="true" />
        <Cursor />
        <Header lang={lang} nav={t.nav} />
        {children}
        <Footer lang={lang} t={t.footer} ask={t.hero.primary} />
      </body>
    </html>
  );
}

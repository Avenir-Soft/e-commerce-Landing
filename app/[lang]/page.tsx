import { notFound } from "next/navigation";
import { isLang } from "@/lib/languages";
import { getDictionary } from "@/lib/i18n";
import { moments } from "@/lib/product";
import { Loader } from "@/components/hero/Loader";
import { Hero } from "@/components/hero/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Features } from "@/components/sections/Features";
import { Spotlight } from "@/components/sections/Spotlight";
import { Included } from "@/components/sections/Included";
import { WhyUs } from "@/components/sections/WhyUs";
import { SearchDemo } from "@/components/sections/SearchDemo";
import { Steps } from "@/components/sections/Steps";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Motion } from "@/components/motion/Motion";

export default async function LandingPage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDictionary(lang);
  const heroMoments = moments.map((m) => ({ id: m.id, title: m.title[lang], note: m.note[lang] }));

  return (
    <main id="top">
      <Loader t={t.loader} />
      <Hero t={t.hero} moments={heroMoments} />
      <Marquee t={t.marquee} />
      <Features lang={lang} t={t.features} />
      <Spotlight t={t.spotlight} ask={t.hero.primary} />
      <Included lang={lang} t={t.included} ask={t.hero.primary} />
      <WhyUs t={t.why} />
      <SearchDemo lang={lang} t={t.search} />
      <Steps t={t.steps} />
      <Faq t={t.faq} />
      <FinalCta t={t.cta} />
      <Motion />
    </main>
  );
}

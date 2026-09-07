import { notFound } from "next/navigation";
import { isLang } from "@/lib/languages";
import { getDictionary } from "@/lib/i18n";
import { Intro } from "@/components/hero/Intro";
import { Hero } from "@/components/hero/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Lineup } from "@/components/sections/Lineup";
import { Featured } from "@/components/sections/Featured";
import { Trust } from "@/components/sections/Trust";
import { SearchDemo } from "@/components/sections/SearchDemo";
import { Steps } from "@/components/sections/Steps";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Motion } from "@/components/motion/Motion";

export default async function LandingPage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <main id="top">
      <Intro t={t.intro} />
      <Hero lang={lang} t={t.hero} />
      <Marquee lang={lang} t={t.marquee} />
      <Lineup lang={lang} t={t.lineup} />
      <Featured lang={lang} t={t.featured} />
      <Trust t={t.trust} />
      <SearchDemo lang={lang} t={t.search} />
      <Steps lang={lang} t={t.steps} />
      <Faq t={t.faq} />
      <FinalCta t={t.cta} />
      <Motion />
    </main>
  );
}

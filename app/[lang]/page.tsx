import { notFound } from "next/navigation";
import { isLang } from "@/lib/languages";
import { getDictionary } from "@/lib/i18n";
import { Hero } from "@/components/hero/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Lineup } from "@/components/sections/Lineup";
import { Spotlight } from "@/components/sections/Spotlight";
import { Arrivals } from "@/components/sections/Arrivals";
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

  return (
    <main id="top">
      <Hero lang={lang} t={t.hero} />
      <Marquee lang={lang} t={t.marquee} />
      <Lineup lang={lang} t={t.lineup} />
      <Spotlight t={t.spotlight} look={t.hero.look} />
      <Arrivals lang={lang} t={t.arrivals} />
      <WhyUs t={t.why} />
      <SearchDemo lang={lang} t={t.search} />
      <Steps lang={lang} t={t.steps} />
      <Faq t={t.faq} />
      <FinalCta t={t.cta} />
      <Motion />
    </main>
  );
}

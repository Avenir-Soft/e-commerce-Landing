import Image from "next/image";
import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { categoryOf, featuredProducts } from "@/lib/catalog";
import { storeLinks } from "@/lib/site";
import { Price } from "@/components/ui/Price";
import { SectionHead } from "@/components/ui/SectionHead";

export function Arrivals({ lang, t }: { lang: Lang; t: Dictionary["arrivals"] }) {
  return (
    <section className="day py-24 md:py-32" aria-labelledby="arrivals-title">
      <div className="shell">
        <SectionHead id="arrivals-title" eyebrow={t.eyebrow} heading={t.heading} lead={t.lead} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.slice(0, 6).map((p) => {
            const c = categoryOf(p.category);
            return (
              <li key={p.id} data-reveal>
                <a
                  href={storeLinks.search(p.name)}
                  target="_blank"
                  rel="noopener"
                  className="tile-day group relative flex min-h-[11rem] items-center gap-5 overflow-hidden p-5"
                  data-tilt
                >
                  <div className="relative h-24 w-24 shrink-0">
                    <Image
                      src={c.render}
                      alt=""
                      width={400}
                      height={400}
                      sizes="96px"
                      className="tile-day__render h-full w-full object-contain drop-shadow-[0_16px_24px_rgb(11_28_51/0.25)]"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="t-eyebrow-day">{c.storeName[lang]}</p>
                    <h3 className="mt-1 font-display text-[1.2rem] font-medium leading-snug tracking-[-0.015em]">{p.name}</h3>
                    <p className="mt-1 text-[0.95rem] text-day-ink-2">{p.spec[lang]}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <span className="link-day">{t.open}</span>
                      <Price value={p.price} lang={lang} className="text-[0.95rem] font-semibold text-day-ink" />
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
        <div className="mt-10" data-reveal>
          <a href={storeLinks.catalog} target="_blank" rel="noopener" className="btn btn-day">
            {t.all}
          </a>
        </div>
      </div>
    </section>
  );
}

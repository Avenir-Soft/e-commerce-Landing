import Image from "next/image";
import type { CSSProperties } from "react";
import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { categories } from "@/lib/catalog";
import { storeLinks } from "@/lib/site";
import { Price } from "@/components/ui/Price";
import { SectionHead } from "@/components/ui/SectionHead";

/*
 * The catalog chapter is the one light room before the showcase: white tiles
 * on the store's own off-white, like the storefront itself. iPhone takes the
 * tall tile, the rest sit around it, and the last tile is the door to the
 * full catalog.
 */

const glow: Record<string, [string, string]> = {
  iphone: ["70%", "20%"],
  mac: ["80%", "80%"],
  ipad: ["20%", "80%"],
  watch: ["50%", "10%"],
  airpods: ["90%", "40%"],
};

export function Lineup({ lang, t }: { lang: Lang; t: Dictionary["lineup"] }) {
  const items = [...categories].sort((a, b) => a.order - b.order);
  const [iphone, ...rest] = items;

  return (
    <section id="catalog" className="day scroll-mt-20 py-24 md:py-32" aria-labelledby="lineup-title">
      <div className="shell">
        <SectionHead id="lineup-title" eyebrow={t.eyebrow} heading={t.heading} lead={t.lead} />

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-[repeat(3,minmax(15rem,auto))]">
          <a
            href={storeLinks.search(iphone.query)}
            target="_blank"
            rel="noopener"
            className="tile-day group relative flex min-h-[26rem] flex-col justify-end overflow-hidden p-7 md:col-span-2 md:row-span-2 md:p-9"
            style={{ "--gx": glow.iphone[0], "--gy": glow.iphone[1] } as CSSProperties}
            data-reveal
            data-tilt
          >
            <Image
              src={iphone.render}
              alt=""
              width={1200}
              height={1200}
              sizes="(min-width: 768px) 60vw, 100vw"
              priority={false}
              className="tile-day__render pointer-events-none absolute -right-[6%] -top-[8%] w-[62%] max-w-[36rem] drop-shadow-[0_40px_60px_rgb(11_28_51/0.35)]"
            />
            <div className="relative">
              <p className="t-eyebrow-day">{iphone.storeName[lang]}</p>
              <h3 className="t-display mt-2">{iphone.name}</h3>
              <p className="mt-3 max-w-[26rem] text-day-ink-2">{iphone.models[lang]}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span className="btn btn-day btn-sm">{t.open}</span>
                <Price value={iphone.from} lang={lang} from className="font-semibold text-day-ink" />
              </div>
            </div>
          </a>

          {rest.map((c) => (
            <a
              key={c.id}
              href={storeLinks.search(c.query)}
              target="_blank"
              rel="noopener"
              className="tile-day group relative flex min-h-[17rem] flex-col justify-end overflow-hidden p-6 md:p-7"
              style={{ "--gx": glow[c.id][0], "--gy": glow[c.id][1] } as CSSProperties}
              data-reveal
              data-tilt
            >
              <Image
                src={c.render}
                alt=""
                width={1200}
                height={1200}
                sizes="(min-width: 768px) 30vw, 100vw"
                className="tile-day__render pointer-events-none absolute -right-[4%] -top-[4%] w-[46%] max-w-[13rem] drop-shadow-[0_30px_40px_rgb(11_28_51/0.3)]"
              />
              <div className="relative max-w-[62%]">
                <p className="t-eyebrow-day">{c.storeName[lang]}</p>
                <h3 className="t-h2 mt-1">{c.name}</h3>
                <p className="mt-2 text-[0.95rem] text-day-ink-2">{c.models[lang]}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="link-day">{t.open}</span>
                  <Price value={c.from} lang={lang} from className="text-[0.95rem] font-semibold text-day-ink" />
                </div>
              </div>
            </a>
          ))}

          <a
            href={storeLinks.catalog}
            target="_blank"
            rel="noopener"
            className="tile-cta group relative flex min-h-[15rem] flex-col justify-between overflow-hidden p-6 md:p-7"
            data-reveal
          >
            <span className="shine" aria-hidden="true" />
            <div className="relative">
              <p className="t-eyebrow">{t.all}</p>
              <p className="mt-3 max-w-[16rem] text-ink-2">{t.allLead}</p>
            </div>
            <span className="btn btn-solid btn-sm relative self-start">{t.all}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

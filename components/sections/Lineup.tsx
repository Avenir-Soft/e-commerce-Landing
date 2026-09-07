import type { CSSProperties } from "react";
import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { categories } from "@/lib/catalog";
import { formatFrom } from "@/lib/format";
import { site } from "@/lib/site";
import { SectionHead } from "@/components/ui/SectionHead";

/** Each tile is lit from a different corner so the grid does not read as five clones. */
const glow: Record<string, [string, string]> = {
  iphone: ["18%", "0%"],
  mac: ["90%", "10%"],
  ipad: ["50%", "100%"],
  watch: ["0%", "60%"],
  airpods: ["100%", "80%"],
};

export function Lineup({ lang, t }: { lang: Lang; t: Dictionary["lineup"] }) {
  const items = [...categories].sort((a, b) => a.order - b.order);
  return (
    <section id="catalog" className="scroll-mt-20 py-24 md:py-32" aria-labelledby="lineup-title">
      <div className="shell">
        <div data-reveal>
          <SectionHead id="lineup-title" heading={t.heading} lead={t.lead} />
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {items.map((c, i) => (
            <a
              key={c.id}
              href={site.storeUrl}
              target="_blank"
              rel="noopener"
              className={`tile flex min-h-[15rem] min-w-0 flex-col justify-between p-6 md:p-8 ${i === 0 ? "md:col-span-2" : ""}`}
              style={{ "--gx": glow[c.id][0], "--gy": glow[c.id][1] } as CSSProperties}
              data-reveal
              data-tilt
            >
              <div>
                <h3 className="t-h2">{c.name}</h3>
                <p className="mt-3 max-w-[30rem] text-ink-2">{c.models[lang]}</p>
              </div>
              <div className="mt-10 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
                <span className="t-num text-lg font-semibold">{formatFrom(c.from, lang)}</span>
                <span className="btn btn-quiet btn-sm">{t.open}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { categoryOf, products } from "@/lib/catalog";
import { storeLinks } from "@/lib/site";
import { Mark } from "@/components/brand/Logo";
import { Price } from "@/components/ui/Price";
import { SectionHead } from "@/components/ui/SectionHead";

export function Steps({ lang, t }: { lang: Lang; t: Dictionary["steps"] }) {
  const shown = ["iphone-17-pro", "macbook-air-13-m5"].map((id) => products.find((p) => p.id === id)!);
  return (
    <section id="steps" className="day scroll-mt-20 py-24 md:py-32" aria-labelledby="steps-title">
      <div className="shell grid items-center gap-14 lg:grid-cols-[6fr_5fr] lg:gap-20">
        <div>
          <SectionHead id="steps-title" eyebrow={t.eyebrow} heading={t.heading} lead={t.lead} />
          <ol className="mt-12 grid gap-8">
            {t.items.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-[3rem_1fr] gap-4 border-t border-day-ink/10 pt-5"
                data-reveal
              >
                <span className="t-figure-sm">{i + 1}</span>
                <div>
                  <h3 className="t-h3">{step.title}</h3>
                  <p className="mt-2 max-w-md text-day-ink-2">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div data-reveal>
            <a href={storeLinks.catalog} target="_blank" rel="noopener" className="btn btn-day mt-10">
              {t.phone.button}
            </a>
          </div>
        </div>

        {/* A still of the store on a phone, drawn in CSS so it stays in sync with the real fonts and copy. */}
        <div className="flex justify-center lg:justify-end" aria-hidden="true" data-reveal>
          <div className="phone">
            <div className="phone__screen">
              <div className="flex items-center justify-between px-4 pt-4 text-[0.7rem] text-ink-2">
                <span className="font-semibold text-ink">9:41</span>
                <span className="inline-flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                  <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                  <span className="h-1.5 w-1.5 rounded-full bg-ink/40" />
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 pt-4">
                <Mark size={22} />
                <span className="font-display text-[0.85rem] font-semibold">Avenir Store</span>
              </div>
              <div className="px-4 pt-4">
                <p className="font-display text-[0.95rem] font-semibold leading-tight">{t.phone.greeting}</p>
                <p className="text-[0.75rem] text-ink-2">{t.phone.sub}</p>
              </div>
              <div className="mx-4 mt-3 flex items-center gap-2 rounded-xl bg-white/[0.07] px-3 py-2 text-[0.75rem] text-ink">
                <span className="h-3 w-3 rounded-full border-2 border-ink-3" />
                <span className="truncate">{t.phone.search}</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 px-4">
                {shown.map((p) => (
                  <div key={p.id} className="rounded-xl bg-white/[0.06] p-2.5">
                    <div className="mb-2 flex aspect-[4/3] items-center justify-center rounded-lg bg-white/[0.05]">
                      <Image src={categoryOf(p.category).render} alt="" width={200} height={200} sizes="120px" className="h-[85%] w-auto object-contain" />
                    </div>
                    <p className="truncate text-[0.72rem] font-semibold">{p.name}</p>
                    <p className="text-[0.7rem] text-ink-2">{p.spec[lang]}</p>
                    <Price value={p.price} lang={lang} className="text-[0.7rem] text-ink-2" />
                  </div>
                ))}
              </div>
              <div className="mt-auto p-4">
                <div className="rounded-xl bg-mark py-2.5 text-center text-[0.8rem] font-semibold text-white">
                  {t.phone.button}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

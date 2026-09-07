import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { included } from "@/lib/product";
import { links } from "@/lib/site";
import { SectionHead } from "@/components/ui/SectionHead";
import { CheckIcon } from "@/components/ui/Icons";

/** The light checklist room: everything a merchant gets, in two columns that reveal row by row. */
export function Included({ lang, t, ask }: { lang: Lang; t: Dictionary["included"]; ask: string }) {
  return (
    <section id="included" className="day py-24 md:py-32" aria-labelledby="included-title">
      <div className="shell grid gap-10 lg:grid-cols-[4fr_7fr] lg:gap-20">
        <div>
          <SectionHead id="included-title" eyebrow={t.eyebrow} heading={t.heading} lead={t.lead} />
          <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal>
            <a href={links.contact} target="_blank" rel="noopener" className="btn btn-day">
              {ask}
            </a>
            <p className="text-day-ink-2">{t.more}</p>
          </div>
        </div>
        <ul className="grid gap-x-10 sm:grid-cols-2">
          {included[lang].map((item) => (
            <li key={item} className="flex items-center gap-3 border-t border-day-ink/10 py-3.5" data-reveal>
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mark/10 text-mark">
                <CheckIcon />
              </span>
              <span className="font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

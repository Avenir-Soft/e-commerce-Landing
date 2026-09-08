import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { included } from "@/lib/product";
import { links } from "@/lib/site";
import { SectionHead } from "@/components/ui/SectionHead";
import { CheckIcon } from "@/components/ui/Icons";

/** The light checklist room: everything a merchant gets, in two columns that reveal row by row. */
export function Included({ lang, t, ask }: { lang: Lang; t: Dictionary["included"]; ask: string }) {
  return (
    <section id="included" className="day section-y" aria-labelledby="included-title">
      <div className="shell grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead id="included-title" eyebrow={t.eyebrow} heading={t.heading} lead={t.lead} />
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3" data-reveal>
            <a href={links.contact} target="_blank" rel="noopener" className="btn btn-day">
              {ask}
            </a>
            <p className="text-[0.9375rem] text-day-ink-2">{t.more}</p>
          </div>
        </div>
        <ul className="grid gap-x-10 sm:grid-cols-2">
          {included[lang].map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 border-b border-day-line py-3.5 first:border-t sm:[&:nth-child(2)]:border-t"
              data-reveal="tick"
            >
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mark/10 text-mark" data-tick>
                <CheckIcon className="h-3 w-3" />
              </span>
              <span className="text-[0.9375rem] font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

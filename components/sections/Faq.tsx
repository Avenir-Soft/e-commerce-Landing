import type { Dictionary } from "@/lib/i18n";

export function Faq({ t }: { t: Dictionary["faq"] }) {
  return (
    <section id="faq" className="scroll-mt-20 py-24 md:py-32" aria-labelledby="faq-title">
      <div className="shell grid gap-10 lg:grid-cols-[4fr_7fr] lg:gap-20">
        <div>
          <p className="t-eyebrow" data-reveal>
            {t.eyebrow}
          </p>
          <h2 id="faq-title" className="t-h2 mt-3" data-split>
            {t.heading}
          </h2>
          <p className="mt-4 hidden text-ink-3 t-small lg:block" data-reveal>
            {t.hint}
          </p>
        </div>
        <div>
          {t.items.map((item, i) => (
            <details key={item.q} className="faq group border-t border-line last:border-b" data-reveal>
              <summary className="flex items-center gap-5 py-5 text-left">
                <span className="t-figure-sm w-8 shrink-0 text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                <span className="t-h3 flex-1">{item.q}</span>
                <span className="faq__icon grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/[0.06] text-ink" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <div className="faq__content">
                <p className="max-w-2xl pb-6 pl-[3.25rem] text-ink-2">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

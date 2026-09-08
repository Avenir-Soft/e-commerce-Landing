import type { Dictionary } from "@/lib/i18n";

export function Faq({ t }: { t: Dictionary["faq"] }) {
  return (
    <section id="faq" className="section-y scroll-mt-16" aria-labelledby="faq-title">
      <div className="shell grid gap-10 lg:grid-cols-[4fr_7fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="t-eyebrow" data-reveal="write">
            {t.eyebrow}
          </p>
          <h2 id="faq-title" className="t-h2 mt-4" data-split>
            {t.heading}
          </h2>
          <p className="mt-5 hidden text-ink-3 t-small lg:block" data-reveal>
            {t.hint}
          </p>
        </div>
        <div>
          {t.items.map((item, i) => (
            <details key={item.q} className="faq group border-t border-line last:border-b" data-reveal="slide">
              <summary className="flex items-center gap-5 py-5 text-left">
                <span className="faq__n t-num w-7 shrink-0 text-[0.8125rem] font-medium tabular-nums text-ink-3 transition-colors duration-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="faq__q flex-1 text-[1.0625rem] font-medium leading-snug text-ink md:text-[1.125rem]">
                  {item.q}
                </span>
                <span
                  className="faq__icon grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/[0.05] text-ink-2 ring-1 ring-line"
                  aria-hidden="true"
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <div className="faq__content">
                <p className="max-w-2xl pb-6 pl-12 text-[0.9375rem] leading-relaxed text-ink-2">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

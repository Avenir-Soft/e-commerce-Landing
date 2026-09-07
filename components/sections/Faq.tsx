import type { Dictionary } from "@/lib/i18n";

export function Faq({ t }: { t: Dictionary["faq"] }) {
  return (
    <section id="faq" className="scroll-mt-20 py-24 md:py-32" aria-labelledby="faq-title">
      <div className="shell grid gap-10 lg:grid-cols-[4fr_7fr] lg:gap-20">
        <h2 id="faq-title" className="t-h2" data-reveal>
          {t.heading}
        </h2>
        <div>
          {t.items.map((item) => (
            <details key={item.q} className="faq group border-t border-line last:border-b" data-reveal>
              <summary className="flex items-center justify-between gap-6 py-5 text-left">
                <span className="t-h3">{item.q}</span>
                <span className="faq__icon grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/[0.06] text-ink" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <div className="faq__content">
                <p className="max-w-2xl pb-6 text-ink-2">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

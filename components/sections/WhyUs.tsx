import type { CSSProperties } from "react";
import type { Dictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import { SectionHead } from "@/components/ui/SectionHead";

/*
 * Bento of the five store promises. Sizes differ on purpose: the original
 * guarantee is the big card, the two numbers (days) get the serif figures,
 * payments show the four rails, support closes the row.
 */

export function WhyUs({ t }: { t: Dictionary["why"] }) {
  return (
    <section id="trust" className="scroll-mt-20 py-24 md:py-32" aria-labelledby="why-title">
      <div className="shell">
        <SectionHead id="why-title" eyebrow={t.eyebrow} heading={t.heading} />

        <div className="mt-12 grid gap-4 md:grid-cols-6">
          <article
            className="tile relative overflow-hidden p-7 md:col-span-4 md:p-9"
            style={{ "--gx": "85%", "--gy": "20%" } as CSSProperties}
            data-reveal
            data-tilt
          >
            <span className="shine" aria-hidden="true" />
            <svg className="absolute -right-6 -top-6 h-48 w-48 text-mark-2/25" viewBox="0 0 200 200" fill="none" aria-hidden="true">
              <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="1" />
              <circle cx="100" cy="100" r="54" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
              <path d="M100 40 Q100 100 160 100 Q100 100 100 160 Q100 100 40 100 Q100 100 100 40 Z" fill="currentColor" opacity="0.6" />
            </svg>
            <div className="relative max-w-[30rem]">
              <h3 className="t-h2">{t.original.title}</h3>
              <p className="mt-4 text-ink-2">{t.original.text}</p>
            </div>
          </article>

          <article
            className="tile relative flex flex-col justify-between p-7 md:col-span-2"
            style={{ "--gx": "20%", "--gy": "90%" } as CSSProperties}
            data-reveal
            data-tilt
          >
            <p className="t-figure">
              {t.delivery.figure}
              <span className="t-figure__unit">{t.delivery.unit}</span>
            </p>
            <div>
              <h3 className="t-h3">{t.delivery.title}</h3>
              <p className="mt-2 text-ink-2 t-small">{t.delivery.text}</p>
            </div>
          </article>

          <article
            className="tile beam relative flex flex-col justify-between p-7 md:col-span-2"
            style={{ "--gx": "50%", "--gy": "0%" } as CSSProperties}
            data-reveal
            data-tilt
          >
            <ul className="flex flex-wrap gap-2" aria-label={t.payments.title}>
              {site.payments.map((p) => (
                <li key={p} className="pay">
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <h3 className="t-h3">{t.payments.title}</h3>
              <p className="mt-2 text-ink-2 t-small">{t.payments.text}</p>
            </div>
          </article>

          <article
            className="tile relative flex flex-col justify-between p-7 md:col-span-2"
            style={{ "--gx": "90%", "--gy": "80%" } as CSSProperties}
            data-reveal
            data-tilt
          >
            <p className="t-figure">
              {t.returns.figure}
              <span className="t-figure__unit">{t.returns.unit}</span>
            </p>
            <div>
              <h3 className="t-h3">{t.returns.title}</h3>
              <p className="mt-2 text-ink-2 t-small">{t.returns.text}</p>
            </div>
          </article>

          <article
            className="tile relative flex flex-col justify-end p-7 md:col-span-2"
            style={{ "--gx": "50%", "--gy": "50%" } as CSSProperties}
            data-reveal
            data-tilt
          >
            <h3 className="t-h3">{t.support.title}</h3>
            <p className="mt-2 text-ink-2 t-small">{t.support.text}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

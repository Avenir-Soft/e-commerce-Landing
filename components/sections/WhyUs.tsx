import type { CSSProperties } from "react";
import type { Dictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import { SectionHead } from "@/components/ui/SectionHead";
import { LockIcon } from "@/components/ui/Icons";

/*
 * Bento of the five platform promises. Sizes differ on purpose: "your brand"
 * is the big card, the two numbers (payment rails, languages) get the serif
 * figures, hosting shows the merchant's own domain, support closes the row.
 */

export function WhyUs({ t }: { t: Dictionary["why"] }) {
  return (
    <section id="why" className="scroll-mt-20 py-24 md:py-32" aria-labelledby="why-title">
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
              <h3 className="t-h2">{t.brand.title}</h3>
              <p className="mt-4 text-ink-2">{t.brand.text}</p>
            </div>
          </article>

          <article
            className="tile beam relative flex flex-col justify-between p-7 md:col-span-2"
            style={{ "--gx": "20%", "--gy": "90%" } as CSSProperties}
            data-reveal
            data-tilt
          >
            <p className="t-figure">
              {t.payments.figure}
              <span className="t-figure__unit">{t.payments.unit}</span>
            </p>
            <div className="mt-8">
              <ul className="mb-4 flex flex-wrap gap-2" aria-label={t.payments.title}>
                {site.payments.map((p) => (
                  <li key={p} className="pay">
                    {p}
                  </li>
                ))}
              </ul>
              <h3 className="t-h3">{t.payments.title}</h3>
              <p className="mt-2 text-ink-2 t-small">{t.payments.text}</p>
            </div>
          </article>

          <article
            className="tile relative flex flex-col justify-between p-7 md:col-span-2"
            style={{ "--gx": "50%", "--gy": "0%" } as CSSProperties}
            data-reveal
            data-tilt
          >
            <div>
              <div className="flex items-center gap-2 rounded-full bg-night/70 px-3.5 py-2 text-[0.85rem] ring-1 ring-line">
                <span className="text-mark-2">
                  <LockIcon />
                </span>
                <span className="text-ink-3">https://</span>
                <span className="font-semibold text-ink">{t.hosting.domain}</span>
              </div>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-hidden="true">
                {t.hosting.rails.map((r) => (
                  <li key={r} className="chip">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <h3 className="t-h3">{t.hosting.title}</h3>
              <p className="mt-2 text-ink-2 t-small">{t.hosting.text}</p>
            </div>
          </article>

          <article
            className="tile relative flex flex-col justify-between p-7 md:col-span-2"
            style={{ "--gx": "90%", "--gy": "80%" } as CSSProperties}
            data-reveal
            data-tilt
          >
            <p className="t-figure">
              {t.languages.figure}
              <span className="t-figure__unit">{t.languages.unit}</span>
            </p>
            <div className="mt-8">
              <h3 className="t-h3">{t.languages.title}</h3>
              <p className="mt-2 text-ink-2 t-small">{t.languages.text}</p>
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

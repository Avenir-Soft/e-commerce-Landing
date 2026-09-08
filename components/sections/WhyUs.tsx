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
    <section id="why" className="section-y scroll-mt-16" aria-labelledby="why-title">
      <div className="shell">
        <SectionHead id="why-title" eyebrow={t.eyebrow} heading={t.heading} />

        <div className="after-head grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-6">
          <article
            className="tile relative flex flex-col justify-end overflow-hidden p-6 sm:col-span-2 sm:min-h-[15rem] lg:col-span-4 md:p-8"
            style={{ "--gx": "80%", "--gy": "25%" } as CSSProperties}
            data-reveal="rise-3d"
            data-tilt
          >
            {/* the mark, drawn large and cropped by the card — decoration only,
                so it is hidden on phones where it would sit under the heading */}
            <svg
              className="pointer-events-none absolute -right-10 -top-10 hidden h-56 w-56 text-mark-2/20 sm:block"
              viewBox="0 0 200 200"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="1" />
              <circle cx="100" cy="100" r="54" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
              <path d="M100 40 Q100 100 160 100 Q100 100 100 160 Q100 100 40 100 Q100 100 100 40 Z" fill="currentColor" opacity="0.6" />
            </svg>
            <div className="relative max-w-[28rem]">
              <h3 className="t-h3-lg">{t.brand.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{t.brand.text}</p>
            </div>
          </article>

          <article
            className="tile relative flex flex-col justify-between gap-8 p-6 lg:col-span-2 md:p-7"
            style={{ "--gx": "25%", "--gy": "85%" } as CSSProperties}
            data-reveal="rise-3d"
            data-tilt
          >
            <p className="t-figure">
              <span data-count={t.payments.figure}>{t.payments.figure}</span>
              <span className="t-figure__unit">{t.payments.unit}</span>
            </p>
            <div>
              <ul className="mb-4 flex flex-wrap gap-1.5" aria-label={t.payments.title}>
                {site.payments.map((p) => (
                  <li key={p} className="pay" data-tick>
                    {p}
                  </li>
                ))}
              </ul>
              <h3 className="t-h3">{t.payments.title}</h3>
              <p className="mt-2 text-ink-2 t-small">{t.payments.text}</p>
            </div>
          </article>

          <article
            className="tile relative flex flex-col justify-between gap-8 p-6 lg:col-span-2 md:p-7"
            style={{ "--gx": "50%", "--gy": "0%" } as CSSProperties}
            data-reveal="rise-3d"
            data-tilt
          >
            <div>
              <div className="flex items-center gap-2 rounded-lg bg-night/60 px-3 py-2 text-[0.8125rem] ring-1 ring-line">
                <span className="text-mark-2">
                  <LockIcon />
                </span>
                <span className="text-ink-3">https://</span>
                <span className="truncate font-semibold text-ink">{t.hosting.domain}</span>
              </div>
              <ul className="mt-2.5 flex flex-wrap gap-1.5" aria-hidden="true">
                {t.hosting.rails.map((r) => (
                  <li key={r} className="chip">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="t-h3">{t.hosting.title}</h3>
              <p className="mt-2 text-ink-2 t-small">{t.hosting.text}</p>
            </div>
          </article>

          <article
            className="tile relative flex flex-col justify-between gap-8 p-6 lg:col-span-2 md:p-7"
            style={{ "--gx": "85%", "--gy": "80%" } as CSSProperties}
            data-reveal="rise-3d"
            data-tilt
          >
            <p className="t-figure">
              <span data-count={t.languages.figure}>{t.languages.figure}</span>
              <span className="t-figure__unit">{t.languages.unit}</span>
            </p>
            <div>
              <h3 className="t-h3">{t.languages.title}</h3>
              <p className="mt-2 text-ink-2 t-small">{t.languages.text}</p>
            </div>
          </article>

          <article
            className="tile relative flex flex-col justify-end p-6 sm:min-h-[11rem] lg:col-span-2 md:p-7"
            style={{ "--gx": "50%", "--gy": "40%" } as CSSProperties}
            data-reveal="rise-3d"
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

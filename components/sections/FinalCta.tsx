import type { CSSProperties } from "react";
import type { Dictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import { BagIcon } from "@/components/layout/Header";

export function FinalCta({ t }: { t: Dictionary["cta"] }) {
  return (
    <section className="pb-24 md:pb-32" aria-labelledby="cta-title">
      <div className="shell">
        <div
          className="tile cta relative overflow-hidden px-6 py-16 sm:px-10 md:px-16 md:py-24"
          style={{ "--gx": "85%", "--gy": "50%" } as CSSProperties}
          data-reveal
        >
          <div className="cta__orb" aria-hidden="true" />
          <div className="relative max-w-3xl">
            <h2 id="cta-title" className="t-display">
              {t.heading}
            </h2>
            <p className="t-lead mt-6">{t.lead}</p>
            <a href={site.storeUrl} target="_blank" rel="noopener" className="btn btn-solid mt-8">
              <BagIcon />
              {t.button}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

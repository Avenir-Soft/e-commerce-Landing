import type { CSSProperties } from "react";
import type { Dictionary } from "@/lib/i18n";
import { links } from "@/lib/site";
import { ArrowIcon } from "@/components/ui/Icons";

export function FinalCta({ t }: { t: Dictionary["cta"] }) {
  return (
    <section className="pb-24 md:pb-32" aria-labelledby="cta-title">
      <div className="shell">
        <div
          className="tile cta relative overflow-hidden px-6 py-16 sm:px-10 md:px-16 md:py-24"
          style={{ "--gx": "85%", "--gy": "50%" } as CSSProperties}
          data-reveal
        >
          <span className="shine" aria-hidden="true" />
          <div className="cta__orb" aria-hidden="true" />
          <div className="relative max-w-3xl">
            <p className="t-eyebrow">{t.eyebrow}</p>
            <h2 id="cta-title" className="t-display mt-3" data-split>
              {t.heading}
            </h2>
            <p className="t-lead mt-6">{t.lead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={links.contact} target="_blank" rel="noopener" className="btn btn-solid">
                {t.button}
                <ArrowIcon />
              </a>
              <a href={links.demo} target="_blank" rel="noopener" className="btn btn-quiet">
                {t.secondary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { modules, type Module } from "@/lib/product";
import { links, site } from "@/lib/site";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowIcon, PinIcon, SendIcon } from "@/components/ui/Icons";

/*
 * The features chapter is the first light room: white tiles on the
 * platform's own off-white, one per module. Tiles with a device still show
 * the platform screen on that device (a different device each time); the
 * text-only modules get an icon. The last tile is the door to a demo.
 */

const glow: Record<string, [string, string]> = {
  storefront: ["70%", "15%"],
  admin: ["85%", "80%"],
  payments: ["25%", "85%"],
  delivery: ["50%", "10%"],
  ai: ["90%", "30%"],
  telegram: ["20%", "20%"],
};

const icons: Record<string, ReactNode> = {
  delivery: <PinIcon />,
  telegram: <SendIcon />,
};

/**
 * Where the still sits inside each tile. On phones every tile stacks the
 * device above the text; from md the wide tiles put the device on the right
 * and the text on the left. The stills are 1200px squares with the device in
 * the middle, so the boxes are larger than the visible device.
 */
const art: Record<string, { box: string; text: string; sizes: string }> = {
  storefront: {
    box: "-right-[16%] -top-[4%] w-[86%] max-w-[22rem]",
    text: "max-w-[90%]",
    sizes: "(min-width: 768px) 30vw, 80vw",
  },
  admin: {
    box: "-right-[6%] -top-[2%] w-[80%] md:-bottom-[3rem] md:-right-[3%] md:top-auto md:w-[48%] md:max-w-[25rem]",
    text: "md:max-w-[48%]",
    sizes: "(min-width: 768px) 30vw, 80vw",
  },
  payments: {
    box: "-right-[8%] top-[3%] w-[46%] max-w-[11rem]",
    text: "max-w-[58%]",
    sizes: "(min-width: 768px) 15vw, 45vw",
  },
  ai: {
    box: "-right-[4%] -top-[4%] w-[62%] md:-bottom-[4rem] md:-right-[2%] md:top-auto md:w-[40%] md:max-w-[21rem]",
    text: "md:max-w-[52%]",
    sizes: "(min-width: 768px) 25vw, 60vw",
  },
};

const place: Record<Module["size"], string> = {
  tall: "min-h-[28rem] md:row-span-2 md:p-9",
  wide: "min-h-[24rem] md:col-span-2 md:min-h-[19rem]",
  small: "min-h-[17rem]",
};

export function Features({ lang, t }: { lang: Lang; t: Dictionary["features"] }) {
  return (
    <section id="features" className="day scroll-mt-20 py-24 md:py-32" aria-labelledby="features-title">
      <div className="shell">
        <SectionHead id="features-title" eyebrow={t.eyebrow} heading={t.heading} lead={t.lead} />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {modules.map((m) => {
            const a = m.render ? art[m.id] : null;
            return (
              <article
                key={m.id}
                className={`tile-day group relative flex flex-col justify-end overflow-hidden p-6 md:p-7 ${place[m.size]}`}
                style={{ "--gx": glow[m.id][0], "--gy": glow[m.id][1] } as CSSProperties}
                data-reveal="clip"
                data-tilt
              >
                {m.render && a && (
                  <>
                    <Image
                      src={m.render}
                      alt=""
                      width={1200}
                      height={1200}
                      sizes={a.sizes}
                      className={`tile-day__render pointer-events-none absolute drop-shadow-[0_30px_45px_rgb(11_28_51/0.3)] ${a.box}`}
                    />
                    <span
                      className={`sheen tile-day__render absolute hidden aspect-square md:block ${a.box}`}
                      style={{ "--mask": `url(${m.render})` } as CSSProperties}
                      aria-hidden="true"
                    />
                  </>
                )}
                {!m.render && (
                  <span className="absolute left-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-mark/10 text-mark md:left-7 md:top-7">
                    {icons[m.id]}
                  </span>
                )}
                <div className={`relative ${a ? a.text : "max-w-[24rem]"}`}>
                  {m.id === "payments" && (
                    <ul className="mb-4 flex flex-wrap gap-1.5" aria-label={m.title[lang]}>
                      {site.payments.map((p) => (
                        <li
                          key={p}
                          className="rounded-md bg-day-ink/[0.06] px-2 py-1 font-display text-[0.72rem] font-semibold text-day-ink"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                  <h3 className={m.size === "tall" ? "t-h2 text-[1.75rem] md:text-[2rem]" : "t-h3"}>{m.title[lang]}</h3>
                  <p className="mt-2 text-[0.95rem] text-day-ink-2">{m.text[lang]}</p>
                </div>
              </article>
            );
          })}

          <a
            href={links.contact}
            target="_blank"
            rel="noopener"
            className="tile-cta group relative flex min-h-[12rem] flex-col justify-between gap-6 overflow-hidden p-6 md:col-span-3 md:flex-row md:items-center md:p-8"
            data-reveal="clip"
          >
            <span className="shine" aria-hidden="true" />
            <div className="relative">
              <p className="t-eyebrow">{t.ctaTitle}</p>
              <p className="mt-3 max-w-[30rem] text-ink-2">{t.ctaLead}</p>
            </div>
            <span className="btn btn-solid relative shrink-0 self-start md:self-auto">
              {t.cta}
              <ArrowIcon />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

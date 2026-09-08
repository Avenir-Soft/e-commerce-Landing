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
  /* At md the tall tile is a full-width row (see `place`), so the device moves
     to the right of the copy; at lg it is the narrow column again and the
     device sits above the copy. */
  storefront: {
    box: "-right-[6%] top-[1%] w-[82%] max-w-[21rem] md:-right-[2%] md:top-[8%] md:w-[40%] md:max-w-[19rem] lg:-right-[6%] lg:top-[1%] lg:w-[82%] lg:max-w-[21rem]",
    text: "max-w-[92%] md:max-w-[52%] lg:max-w-[92%]",
    sizes: "(min-width: 1024px) 30vw, (min-width: 768px) 26vw, 80vw",
  },
  admin: {
    box: "-right-[6%] -top-[2%] w-[78%] md:-bottom-[2.5rem] md:-right-[6%] md:top-auto md:w-[46%] md:max-w-[23rem]",
    text: "md:max-w-[50%]",
    sizes: "(min-width: 768px) 30vw, 80vw",
  },
  payments: {
    box: "-right-[8%] top-[8%] w-[34%] max-w-[8.5rem]",
    text: "max-w-[74%]",
    sizes: "(min-width: 768px) 12vw, 40vw",
  },
  ai: {
    box: "-right-[4%] -top-[4%] w-[58%] md:-bottom-[3rem] md:-right-[4%] md:top-auto md:w-[38%] md:max-w-[20rem]",
    text: "md:max-w-[54%]",
    sizes: "(min-width: 768px) 25vw, 60vw",
  },
};

/*
 * The bento is three columns only from lg. Between sm and lg it is two, with
 * every non-small tile taking the full row — at 768px a third of the shell is
 * too narrow for a device and a paragraph side by side.
 */
const place: Record<Module["size"], string> = {
  tall: "min-h-[24rem] sm:col-span-2 sm:min-h-[19rem] lg:col-span-1 lg:row-span-2 lg:min-h-[30rem]",
  wide: "min-h-[20rem] sm:col-span-2 sm:min-h-[18rem] lg:min-h-[17rem]",
  small: "min-h-[15rem]",
};

/** The last small tile has no partner left in its row, so it takes the row at sm. */
const spanFix: Record<string, string> = {
  telegram: "sm:col-span-2 sm:min-h-[11rem] lg:col-span-1 lg:min-h-[15rem]",
};

export function Features({ lang, t }: { lang: Lang; t: Dictionary["features"] }) {
  return (
    <section id="features" className="day section-y scroll-mt-16" aria-labelledby="features-title">
      <div className="shell">
        <SectionHead id="features-title" eyebrow={t.eyebrow} heading={t.heading} lead={t.lead} />

        <div className="after-head grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {modules.map((m) => {
            const a = m.render ? art[m.id] : null;
            return (
              <article
                key={m.id}
                className={`tile-day group relative flex flex-col justify-end overflow-hidden p-6 md:p-7 lg:p-8 ${place[m.size]} ${
                  spanFix[m.id] ?? ""
                }`}
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
                  <span className="absolute left-6 top-6 grid h-10 w-10 place-items-center rounded-lg bg-mark/10 text-mark md:left-7 md:top-7 lg:left-8 lg:top-8">
                    {icons[m.id]}
                  </span>
                )}
                <div className={`relative ${a ? a.text : "max-w-[24rem]"}`}>
                  {m.id === "payments" && (
                    <ul className="mb-5 flex flex-wrap gap-1.5" aria-label={m.title[lang]}>
                      {site.payments.map((p) => (
                        <li key={p} className="pay">
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                  <h3 className={m.size === "tall" ? "t-h3-lg" : "t-h3"}>{m.title[lang]}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-day-ink-2">{m.text[lang]}</p>
                </div>
              </article>
            );
          })}

          <a
            href={links.contact}
            target="_blank"
            rel="noopener"
            className="tile-cta group flex flex-col justify-between gap-6 overflow-hidden p-6 sm:col-span-2 md:flex-row md:items-center md:p-8 lg:col-span-3"
            data-reveal="clip"
          >
            <div>
              <p className="t-h3-lg text-ink">{t.ctaTitle}</p>
              <p className="mt-2.5 max-w-[32rem] text-[0.9375rem] leading-relaxed text-ink-2">{t.ctaLead}</p>
            </div>
            <span className="btn btn-solid shrink-0 self-start md:self-auto">
              {t.cta}
              <ArrowIcon />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

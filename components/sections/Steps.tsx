import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { links } from "@/lib/site";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowIcon } from "@/components/ui/Icons";

export function Steps({ t }: { t: Dictionary["steps"] }) {
  return (
    <section id="steps" className="day section-y scroll-mt-16 overflow-clip" aria-labelledby="steps-title">
      <div className="shell grid items-center gap-14 lg:grid-cols-[6fr_5fr] lg:gap-20">
        <div>
          <SectionHead id="steps-title" eyebrow={t.eyebrow} heading={t.heading} lead={t.lead} />
          <ol className="after-head grid gap-7">
            {t.items.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-[2.25rem_1fr] gap-4 border-t border-day-line pt-5"
                data-reveal="slide"
              >
                <span className="t-figure-sm inline-block origin-left leading-[1.35]" data-tick>
                  {i + 1}
                </span>
                <div>
                  <h3 className="t-h3">{step.title}</h3>
                  <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-day-ink-2">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div data-reveal>
            <a href={links.contact} target="_blank" rel="noopener" className="btn btn-day mt-9">
              {t.button}
              <ArrowIcon />
            </a>
          </div>
        </div>

        {/* The storefront of the demo shop on a phone: the same still the 3D phone wears in the hero. */}
        <div className="flex justify-center lg:justify-end" aria-hidden="true" data-reveal="float-in">
          <div className="phone" data-parallax="-36">
            <div className="phone__screen">
              <Image
                src="/screens/home.webp"
                alt=""
                width={590}
                height={1278}
                sizes="(min-width: 1024px) 19rem, 80vw"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

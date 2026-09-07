import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { links } from "@/lib/site";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowIcon } from "@/components/ui/Icons";

export function Steps({ t }: { t: Dictionary["steps"] }) {
  return (
    <section id="steps" className="day scroll-mt-20 py-24 md:py-32" aria-labelledby="steps-title">
      <div className="shell grid items-center gap-14 lg:grid-cols-[6fr_5fr] lg:gap-20">
        <div>
          <SectionHead id="steps-title" eyebrow={t.eyebrow} heading={t.heading} lead={t.lead} />
          <ol className="mt-12 grid gap-8">
            {t.items.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-[3rem_1fr] gap-4 border-t border-day-ink/10 pt-5"
                data-reveal
              >
                <span className="t-figure-sm">{i + 1}</span>
                <div>
                  <h3 className="t-h3">{step.title}</h3>
                  <p className="mt-2 max-w-md text-day-ink-2">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div data-reveal>
            <a href={links.contact} target="_blank" rel="noopener" className="btn btn-day mt-10">
              {t.button}
              <ArrowIcon />
            </a>
          </div>
        </div>

        {/* The storefront of the demo shop on a phone: the same still the 3D phone wears in the hero. */}
        <div className="flex justify-center lg:justify-end" aria-hidden="true" data-reveal>
          <div className="phone">
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

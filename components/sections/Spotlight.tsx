"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { storeLinks } from "@/lib/site";
import { SectionHead } from "@/components/ui/SectionHead";

/*
 * Apple-style product story: on desktop the render stays pinned on the left
 * (CSS sticky, no scroll hijacking) while three feature beats scroll past on
 * the right; whichever beat is in the middle of the viewport decides which
 * product is shown, with a crossfade. On smaller screens each beat carries
 * its own picture.
 */

const renders = ["/renders/iphone.webp", "/renders/macbook.webp", "/renders/watch.webp"];
const queries = ["iPhone 17 Pro", "MacBook Air", "Apple Watch Ultra"];

export function Spotlight({ t, look }: { t: Dictionary["spotlight"]; look: string }) {
  const beats = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = beats.current.indexOf(entry.target as HTMLElement);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    beats.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="spot relative overflow-clip py-24 md:py-32" aria-labelledby="spotlight-title">
      <div className="spot__glow" aria-hidden="true" />
      <div className="shell">
        <SectionHead id="spotlight-title" eyebrow={t.eyebrow} heading={t.heading} />

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="hidden lg:sticky lg:top-24 lg:block lg:h-[calc(100svh-8rem)]">
            <div className="spot__stage relative h-full w-full">
              {renders.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  width={1200}
                  height={1200}
                  sizes="45vw"
                  className={`spot__render absolute inset-0 m-auto h-full w-auto object-contain ${i === active ? "is-active" : ""}`}
                />
              ))}
            </div>
          </div>

          <ol className="grid gap-16 lg:gap-0">
            {t.beats.map((beat, i) => (
              <li
                key={beat.title}
                ref={(el) => {
                  beats.current[i] = el;
                }}
                className={`spot__beat flex flex-col justify-center lg:min-h-[70svh] ${i === active ? "is-active" : ""}`}
                data-reveal
              >
                <Image
                  src={renders[i]}
                  alt=""
                  width={1200}
                  height={1200}
                  sizes="(max-width: 1024px) 80vw, 0px"
                  className="mb-6 h-64 w-auto max-w-full self-start object-contain drop-shadow-[0_30px_50px_rgb(0_0_0/0.5)] lg:hidden"
                />
                <p className="t-eyebrow">{beat.note}</p>
                <h3 className="t-display mt-3" data-split>
                  {beat.title}
                </h3>
                <p className="t-lead mt-5">{beat.text}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {beat.points.map((p) => (
                    <li key={p} className="chip">
                      {p}
                    </li>
                  ))}
                </ul>
                <a href={storeLinks.search(queries[i])} target="_blank" rel="noopener" className="btn btn-quiet mt-8 self-start">
                  {look}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

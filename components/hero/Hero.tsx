"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Lang } from "@/lib/languages";
import type { Dictionary } from "@/lib/i18n";
import { categories, showroomItems } from "@/lib/catalog";
import { formatFrom } from "@/lib/format";
import { site } from "@/lib/site";
import { BagIcon } from "@/components/layout/Header";
import { RING_COUNT, showroomState } from "./store";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Showroom = dynamic(() => import("./Showroom").then((m) => m.Showroom), {
  ssr: false,
  loading: () => null,
});

/** How many viewport heights the hero stays pinned while the row slides. */
const PIN_LENGTH_DESKTOP = 3;
const PIN_LENGTH_MOBILE = 2.2;

export function Hero({ lang, t }: { lang: Lang; t: Dictionary["hero"] }) {
  const root = useRef<HTMLElement>(null);
  const [beat, setBeat] = useState(0);
  const [started, setStarted] = useState(false);

  useGSAP(
    () => {
      const el = root.current!;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      showroomState.reduced = reduce;
      // ---- load choreography ----
      el.removeAttribute("data-pending");
      if (!reduce) {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(el.querySelectorAll(".hero__line > span"), { yPercent: 112, duration: 1.2, stagger: 0.12 }, 0.05)
          .from(el.querySelector("[data-load='lead']"), { y: 28, opacity: 0, duration: 0.9 }, 0.4)
          .from(el.querySelectorAll("[data-load='cta'] > *"), { y: 22, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.55)
          .from(el.querySelector("[data-load='label']"), { y: 30, opacity: 0, duration: 0.9 }, 0.8)
          .from(el.querySelector("[data-load='hint']"), { opacity: 0, duration: 0.8 }, 1.1);
      }

      // ---- scroll choreography: pin the hero, scrub progress into the carousel ----
      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 64rem) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 63.99rem) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { desktop } = ctx.conditions as { desktop: boolean };
          const length = desktop ? PIN_LENGTH_DESKTOP : PIN_LENGTH_MOBILE;
          const proxy = { p: 0 };
          gsap.to(proxy, {
            p: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: () => `+=${Math.round(window.innerHeight * length)}`,
              pin: true,
              pinSpacing: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                showroomState.progress = self.progress;
                const next = Math.min(RING_COUNT - 1, Math.round(self.progress * (RING_COUNT - 1)));
                setBeat((prev) => (prev === next ? prev : next));
                setStarted((prev) => (prev === self.progress > 0.02 ? prev : self.progress > 0.02));
              },
            },
            onUpdate: () => {
              showroomState.progress = proxy.p;
            },
          });
        }
      );

      // ---- pointer parallax + visibility pause ----
      const onMove = (e: PointerEvent) => {
        showroomState.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        showroomState.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      const io = new IntersectionObserver(([entry]) => {
        showroomState.visible = entry.isIntersecting;
      });
      io.observe(el);

      return () => {
        window.removeEventListener("pointermove", onMove);
        io.disconnect();
        mm.revert();
      };
    },
    { scope: root }
  );

  const item = showroomItems[beat];
  const category = categories.find((c) => c.id === item.category)!;
  const counter = t.counter.replace("{n}", String(beat + 1)).replace("{total}", String(RING_COUNT));

  return (
    <section ref={root} className="hero" data-pending="" aria-labelledby="hero-title">
      <div className="hero__aurora" aria-hidden="true" />
      <div className="hero__canvas" aria-hidden="true">
        <Showroom />
      </div>

      <div className="shell hero__grid">
        <div className="hero__copy">
          <h1 id="hero-title" className="t-display">
            {t.title.map((line) => (
              <span key={line} className="hero__line">
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <p className="t-lead mt-5" data-load="lead">
            {t.lead}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3" data-load="cta">
            <a href={site.storeUrl} target="_blank" rel="noopener" className="btn btn-solid">
              <BagIcon />
              {t.primary}
            </a>
            <a href="#catalog" className="btn btn-quiet">
              {t.secondary}
            </a>
          </div>
        </div>

        <div className="hero__label min-w-0" data-load="label">
          <div
            className="flex items-end justify-between gap-6 rounded-2xl border border-line bg-night-2/55 px-5 py-4 backdrop-blur-md lg:min-w-[24rem]"
            aria-live="polite"
          >
            <div className="min-w-0">
              <p className="text-ink-3 t-small">
                {category.name}
                <span className="mx-2 opacity-50">·</span>
                <span className="t-num">{counter}</span>
              </p>
              <p className="t-h3 mt-0.5 truncate" key={item.product.id}>
                {item.product.name}
              </p>
              <p className="t-num mt-1 font-semibold text-ink">{formatFrom(item.product.price, lang)}</p>
            </div>
            <a href={site.storeUrl} target="_blank" rel="noopener" className="btn btn-quiet btn-sm shrink-0">
              {t.look}
            </a>
          </div>
          <div className="mt-3 flex gap-1.5 px-1" aria-hidden="true">
            {showroomItems.map((s, i) => (
              <span
                key={s.product.id}
                className="h-0.5 rounded-full bg-ink transition-[width,opacity] duration-500"
                style={{ width: i === beat ? "2rem" : "0.75rem", opacity: i === beat ? 1 : 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        data-load="hint"
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-ink-3 t-small transition-opacity duration-700 lg:flex"
        style={{ opacity: started ? 0 : 1 }}
      >
        <span className="block h-px w-10 bg-ink-3/60" />
        {t.scroll}
        <span className="block h-px w-10 bg-ink-3/60" />
      </div>
    </section>
  );
}

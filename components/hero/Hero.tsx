"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Dictionary } from "@/lib/i18n";
import { links } from "@/lib/site";
import { ArrowIcon, CheckIcon } from "@/components/ui/Icons";
import { INTRO_DONE_EVENT, RING_COUNT, showroomState } from "./store";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Showroom = dynamic(() => import("./Showroom").then((m) => m.Showroom), {
  ssr: false,
  loading: () => null,
});

/** One screen of the platform in the showroom, already in the page language. */
export interface HeroMoment {
  id: string;
  title: string;
  note: string;
}

/** How many viewport heights the hero stays pinned while the row slides. */
const PIN_LENGTH_DESKTOP = 3;
const PIN_LENGTH_MOBILE = 2.2;

export function Hero({ t, moments }: { t: Dictionary["hero"]; moments: HeroMoment[] }) {
  const root = useRef<HTMLElement>(null);
  const [beat, setBeat] = useState(0);
  const [started, setStarted] = useState(false);

  useGSAP(
    () => {
      const el = root.current!;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      showroomState.reduced = reduce;

      // ---- load choreography, held back until the loading screen has left ----
      let intro: gsap.core.Timeline | undefined;
      const play = () => {
        el.removeAttribute("data-pending");
        ScrollTrigger.refresh();
        if (reduce) return;
        // The 3D row arrives on its own clock (Showroom reads introDone); this is the copy side:
        // the room lights up, a beam sweeps across, the headline rises line by line out of its
        // mask with a slight tilt, the rest settles in behind it.
        intro = gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo(el.querySelector(".hero__aurora"), { opacity: 0 }, { opacity: 1, duration: 2.4, ease: "power2.out" }, 0)
          .fromTo(el.querySelector(".hero__flare"), { xPercent: -140 }, { xPercent: 140, duration: 2.2, ease: "power2.inOut" }, 0.1)
          .from(el.querySelector("[data-load='tagline']"), { y: 18, opacity: 0, duration: 1 }, 0.15)
          .from(
            el.querySelectorAll(".hero__line > span"),
            { yPercent: 115, rotate: 4, transformOrigin: "0% 100%", duration: 1.4, stagger: 0.14 },
            0.25
          )
          .from(el.querySelector("[data-load='lead']"), { y: 30, opacity: 0, filter: "blur(10px)", duration: 1.1 }, 0.65)
          .from(el.querySelectorAll("[data-load='cta'] > *"), { y: 24, opacity: 0, duration: 0.9, stagger: 0.1 }, 0.85)
          .from(el.querySelector("[data-load='label']"), { y: 34, opacity: 0, duration: 1 }, 1.15)
          .from(el.querySelector("[data-load='hint']"), { opacity: 0, duration: 0.8 }, 1.5);
      };
      if (showroomState.introDone) play();
      else window.addEventListener(INTRO_DONE_EVENT, play, { once: true });

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
        window.removeEventListener(INTRO_DONE_EVENT, play);
        window.removeEventListener("pointermove", onMove);
        io.disconnect();
        intro?.kill();
        mm.revert();
      };
    },
    { scope: root }
  );

  const moment = moments[Math.min(beat, moments.length - 1)];
  const counter = t.counter.replace("{n}", String(beat + 1)).replace("{total}", String(moments.length));

  return (
    <section ref={root} className="hero" data-pending="" aria-labelledby="hero-title">
      <div className="hero__aurora" aria-hidden="true" />
      <div className="hero__flare" aria-hidden="true" />
      <div className="hero__canvas" aria-hidden="true">
        <Showroom />
      </div>

      <div className="shell hero__grid">
        <div className="hero__copy">
          <p className="t-eyebrow" data-load="tagline">
            {t.tagline}
          </p>
          <h1 id="hero-title" className="t-display mt-3">
            {t.title.map((line) => (
              <span key={line} className="hero__line">
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <p className="t-lead mt-5" data-load="lead">
            {t.lead}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3" data-load="cta">
            <a href={links.contact} target="_blank" rel="noopener" className="btn btn-solid">
              {t.primary}
              <ArrowIcon />
            </a>
            <a href={links.demo} target="_blank" rel="noopener" className="btn btn-quiet">
              {t.secondary}
            </a>
          </div>
          {/* What costs nothing before anyone signs anything. A shop owner
              weighing a platform is mostly weighing risk, and the two things
              that stop the call are "how much" and "who moves my catalog";
              both are answered here rather than three screens down. */}
          <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2" data-load="cta">
            {t.assurance.map((line) => (
              <li key={line} className="t-label flex items-center gap-2 text-ink-2">
                <CheckIcon />
                {line}
              </li>
            ))}
          </ul>
        </div>

        {/* row 3 of the hero grid: the scroll hint on the left, the moment caption on the right */}
        <div
          data-load="hint"
          className="t-label hero__hint pointer-events-none hidden items-center gap-3 self-end transition-opacity duration-700 lg:flex"
          style={{ opacity: started ? 0 : 1 }}
        >
          <span className="block h-px w-8 bg-ink-3/50" />
          {t.scroll}
        </div>

        <div className="hero__label min-w-0" data-load="label">
          <div className="hero__label-card" aria-live="polite">
            <div className="min-w-0">
              {/* Not truncated on phones: the widest note, "MIJOZ KO'RADIGAN
                  DO'KON", was cut to "MIJOZ KO'RADIGAN DO..." on a 390px
                  screen, which is where the label matters most. It wraps to a
                  second line there and truncates again from md, where the card
                  is wide enough for one. */}
              <p className="t-label max-md:whitespace-normal md:truncate">
                <span className="t-num">{counter}</span>
                <span className="mx-2 opacity-40">·</span>
                {moment.note}
              </p>
              <p className="t-h3 mt-1 truncate" key={moment.id}>
                {moment.title}
              </p>
            </div>
            <a href={links.demo} target="_blank" rel="noopener" className="btn btn-quiet btn-sm shrink-0">
              {t.look}
            </a>
          </div>
          <div className="mt-2.5 flex gap-1.5" aria-hidden="true">
            {moments.map((m, i) => (
              <span
                key={m.id}
                className="h-0.5 rounded-full bg-ink transition-[width,opacity] duration-500"
                style={{ width: i === beat ? "1.75rem" : "0.625rem", opacity: i === beat ? 1 : 0.28 }}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

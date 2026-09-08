import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*
 * The page's motion vocabulary. Every section reveals with its own verb so
 * the scroll never repeats itself (owner correction, 2026-09-08: "the
 * animations have all become the same"):
 *
 *   data-reveal            rise     — the default: up out of a fade (leads, copy)
 *   data-reveal="write"    write    — wiped open left to right (serif eyebrows)
 *   data-reveal="clip"     clip     — a tile unmasks upward and settles (bento tiles, cards)
 *   data-reveal="tick"     tick     — a row slides in and its [data-tick] child pops (checklists, steps)
 *   data-reveal="rise-3d"  rise-3d  — leans back and stands up (dark bento)
 *   data-reveal="slide"    slide    — in from the left (FAQ, step rows)
 *   data-reveal="float-in" float-in — drifts in from the right with a tilt (the phone)
 *   data-count="4"         counts a serif figure up from zero
 *   data-parallax="-40"    scrubbed drift (px) while its section scrolls by
 */

export type Variant = "rise" | "write" | "clip" | "tick" | "rise-3d" | "slide" | "float-in";

const TILE = "inset(100% 0 0 0 round 1.5rem)";
const TILE_OPEN = "inset(0% 0 0 0 round 1.5rem)";

const FROM: Record<Variant, gsap.TweenVars> = {
  rise: { opacity: 0, y: 40 },
  write: { opacity: 0, x: -10, clipPath: "inset(0 100% 0 0)" },
  clip: { opacity: 0, y: 36, scale: 0.97, clipPath: TILE },
  tick: { opacity: 0, x: -18 },
  "rise-3d": { opacity: 0, y: 50, rotateX: 10, transformPerspective: 900, transformOrigin: "50% 100%" },
  slide: { opacity: 0, x: -36 },
  "float-in": { opacity: 0, x: 64, rotate: 5, transformOrigin: "50% 100%" },
};

const TO: Record<Variant, gsap.TweenVars> = {
  rise: { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.07 },
  write: { opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.out", stagger: 0.1 },
  clip: {
    opacity: 1,
    y: 0,
    scale: 1,
    clipPath: TILE_OPEN,
    duration: 1.2,
    ease: "expo.out",
    stagger: { each: 0.09, grid: "auto", from: "start" },
  },
  tick: { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", stagger: 0.06 },
  "rise-3d": { opacity: 1, y: 0, rotateX: 0, duration: 1.3, ease: "expo.out", stagger: 0.1 },
  slide: { opacity: 1, x: 0, duration: 0.9, ease: "expo.out", stagger: 0.08 },
  "float-in": { opacity: 1, x: 0, rotate: 0, duration: 1.5, ease: "expo.out" },
};

function variantOf(el: HTMLElement): Variant {
  const v = el.dataset.reveal as Variant | "";
  return v && v in FROM ? v : "rise";
}

/** Wires every reveal, counter and parallax on the page. Call inside a gsap.context. */
export function setupReveals(reduce: boolean) {
  const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
  const counters = gsap.utils.toArray<HTMLElement>("[data-count]");
  if (reduce) {
    gsap.set(items, { opacity: 1, clearProps: "transform,clipPath" });
    return;
  }

  const groups = new Map<Variant, HTMLElement[]>();
  items.forEach((el) => {
    const v = variantOf(el);
    gsap.set(el, FROM[v]);
    groups.set(v, [...(groups.get(v) ?? []), el]);
  });

  groups.forEach((els, v) => {
    ScrollTrigger.batch(els, {
      start: "top 90%",
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, { ...TO[v], overwrite: true, clearProps: v === "clip" ? "clipPath" : "" });
        const ticks = batch.flatMap((el) => Array.from(el.querySelectorAll<HTMLElement>("[data-tick]")));
        if (ticks.length) {
          gsap.from(ticks, { scale: 0, duration: 0.7, ease: "back.out(2.4)", stagger: 0.06, delay: 0.12 });
        }
      },
    });
  });

  counters.forEach((el) => {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;
    const proxy = { n: 0 };
    gsap.to(proxy, {
      n: target,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: () => {
        el.textContent = String(Math.round(proxy.n));
      },
    });
  });

  gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
    const drift = Number(el.dataset.parallax) || -40;
    gsap.fromTo(
      el,
      { y: -drift },
      {
        y: drift,
        ease: "none",
        scrollTrigger: { trigger: el.closest("section") ?? el, start: "top bottom", end: "bottom top", scrub: true },
      }
    );
  });
}

"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { setupReveals } from "./reveals";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Page-wide motion: masked line reveals for headings, the per-section reveal
 * vocabulary (see reveals.ts), magnetic buttons, tilting tiles and
 * hover-opened FAQ panels. Everything is disabled under reduced motion;
 * pointer effects only run for fine pointers.
 */
export function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const cleanups: (() => void)[] = [];
    let cancelled = false;

    // ---- headings: each line rises out of a mask once the fonts are in ----
    const splits: SplitText[] = [];
    const ctx = gsap.context(() => setupReveals(reduce));
    cleanups.push(() => ctx.revert());

    document.fonts.ready.then(() => {
      if (cancelled) return;
      const heads = gsap.utils.toArray<HTMLElement>("[data-split]");
      if (reduce) {
        heads.forEach((h) => h.classList.add("is-split"));
        return;
      }
      ctx.add(() => {
        heads.forEach((h) => {
          const split = SplitText.create(h, { type: "lines", mask: "lines", linesClass: "split-line" });
          splits.push(split);
          h.classList.add("is-split");
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.09,
            scrollTrigger: { trigger: h, start: "top 88%", once: true },
          });
        });
      });
    });
    cleanups.push(() => {
      cancelled = true;
      splits.forEach((s) => s.revert());
    });

    // ---- FAQ panels: click (or Enter) toggles ------------------------------
    // Opening used to happen on pointerenter. Sweeping down the list then
    // opened and closed a row per crossing, and every one of those reflowed
    // the rows below it, so questions jumped out from under the cursor.
    // Hover now only lights the row up (CSS); the geometry changes on intent.
    document.querySelectorAll<HTMLDetailsElement>("details.faq").forEach((details) => {
      const summary = details.querySelector("summary");
      const content = details.querySelector<HTMLElement>(".faq__content");
      if (!summary || !content) return;
      const open = () => {
        if (details.open) return;
        details.open = true;
        if (!reduce) gsap.from(content, { height: 0, opacity: 0, duration: 0.6, ease: "expo.out", clearProps: "all", overwrite: true });
      };
      const close = () => {
        if (!details.open) return;
        if (reduce) {
          details.open = false;
          return;
        }
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "expo.out",
          overwrite: true,
          onComplete: () => {
            details.open = false;
            gsap.set(content, { clearProps: "all" });
          },
        });
      };
      const onClick = (e: Event) => {
        e.preventDefault();
        if (details.open) close();
        else open();
      };
      summary.addEventListener("click", onClick);
      cleanups.push(() => summary.removeEventListener("click", onClick));
    });

    if (!fine || reduce) return () => cleanups.forEach((fn) => fn());

    // ---- tiles: a pool of light follows the pointer, nothing moves ---------
    // The tiles used to tilt in 3D and the button under the cursor used to be
    // pulled toward it. Both meant that pointing at something made it (and, on
    // a tilted card, everything inside it) shift, which read as the page
    // wobbling. Hover now changes light only; geometry is left alone.
    document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((tile) => {
      const onMove = (e: PointerEvent) => {
        const r = tile.getBoundingClientRect();
        tile.style.setProperty("--gx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
        tile.style.setProperty("--gy", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
      };
      tile.addEventListener("pointermove", onMove, { passive: true });
      cleanups.push(() => tile.removeEventListener("pointermove", onMove));
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}

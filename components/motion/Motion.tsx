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

    // ---- FAQ panels: hover opens on fine pointers, tap toggles everywhere ----
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
      if (fine) {
        details.addEventListener("pointerenter", open);
        details.addEventListener("pointerleave", close);
        cleanups.push(() => {
          details.removeEventListener("pointerenter", open);
          details.removeEventListener("pointerleave", close);
        });
      }
    });

    if (!fine || reduce) return () => cleanups.forEach((fn) => fn());

    // ---- magnetic buttons: a hint of pull, not a pet that follows the cursor ----
    document.querySelectorAll<HTMLElement>(".btn").forEach((btn) => {
      const onMove = (e: PointerEvent) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        gsap.to(btn, { x: dx * 0.08, y: dy * 0.08, duration: 0.5, ease: "expo.out", overwrite: "auto" });
      };
      const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "expo.out", overwrite: "auto" });
      btn.addEventListener("pointermove", onMove, { passive: true });
      btn.addEventListener("pointerleave", onLeave, { passive: true });
      cleanups.push(() => {
        btn.removeEventListener("pointermove", onMove);
        btn.removeEventListener("pointerleave", onLeave);
      });
    });

    // ---- tilting tiles with a glow that follows the pointer ----
    document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((tile) => {
      const onMove = (e: PointerEvent) => {
        const r = tile.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        tile.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
        tile.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
        // the product still drifts against the pointer, as if it sat above the card
        tile.style.setProperty("--tx", `${((0.5 - px) * 14).toFixed(1)}px`);
        tile.style.setProperty("--ty", `${((0.5 - py) * 10).toFixed(1)}px`);
        gsap.to(tile, {
          rotateY: (px - 0.5) * 3,
          rotateX: (0.5 - py) * 3,
          transformPerspective: 1400,
          duration: 0.6,
          ease: "expo.out",
          overwrite: "auto",
        });
      };
      const onLeave = () => {
        tile.style.setProperty("--tx", "0px");
        tile.style.setProperty("--ty", "0px");
        gsap.to(tile, { rotateX: 0, rotateY: 0, duration: 0.9, ease: "expo.out", overwrite: "auto" });
      };
      tile.addEventListener("pointermove", onMove, { passive: true });
      tile.addEventListener("pointerleave", onLeave, { passive: true });
      cleanups.push(() => {
        tile.removeEventListener("pointermove", onMove);
        tile.removeEventListener("pointerleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}

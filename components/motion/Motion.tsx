"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Page-wide motion: scroll reveals, magnetic buttons, tilting tiles and
 * animated FAQ panels. Everything is disabled under reduced motion; pointer
 * effects only run for fine pointers.
 */
export function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const cleanups: (() => void)[] = [];

    // ---- scroll reveals ----
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      if (reduce) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }
      gsap.set(items, { opacity: 0, y: 40 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.07, overwrite: true }),
      });
    });
    cleanups.push(() => ctx.revert());

    // ---- FAQ panels ----
    document.querySelectorAll<HTMLDetailsElement>("details.faq").forEach((details) => {
      const summary = details.querySelector("summary");
      const content = details.querySelector<HTMLElement>(".faq__content");
      if (!summary || !content) return;
      const onClick = (e: Event) => {
        e.preventDefault();
        if (reduce) {
          details.open = !details.open;
          return;
        }
        if (details.open) {
          gsap.to(content, {
            height: 0,
            opacity: 0,
            duration: 0.45,
            ease: "expo.out",
            onComplete: () => {
              details.open = false;
              gsap.set(content, { clearProps: "all" });
            },
          });
        } else {
          details.open = true;
          gsap.from(content, { height: 0, opacity: 0, duration: 0.65, ease: "expo.out", clearProps: "all" });
        }
      };
      summary.addEventListener("click", onClick);
      cleanups.push(() => summary.removeEventListener("click", onClick));
    });

    if (!fine || reduce) return () => cleanups.forEach((fn) => fn());

    // ---- magnetic buttons ----
    document.querySelectorAll<HTMLElement>(".btn").forEach((btn) => {
      const onMove = (e: PointerEvent) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        gsap.to(btn, { x: dx * 0.2, y: dy * 0.2, duration: 0.5, ease: "expo.out", overwrite: "auto" });
      };
      const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.45)", overwrite: "auto" });
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
        gsap.to(tile, {
          rotateY: (px - 0.5) * 8,
          rotateX: (0.5 - py) * 8,
          transformPerspective: 1100,
          duration: 0.6,
          ease: "expo.out",
          overwrite: "auto",
        });
      };
      const onLeave = () =>
        gsap.to(tile, { rotateX: 0, rotateY: 0, duration: 0.9, ease: "expo.out", overwrite: "auto" });
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

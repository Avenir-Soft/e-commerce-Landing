"use client";

import { useEffect } from "react";

/*
 * The pointer from avenir.uz, carried over: a small light that trails the real
 * cursor and swells over anything you can act on.
 *
 * The gate is the same media query the CSS uses, and the component subscribes
 * to it. That is not tidiness — on avenir.uz the two disagreed (JS checked
 * `innerWidth > 900`, CSS `min-width: 1024px`), so opening the window narrow and
 * widening it past 1024 hid the real pointer while nothing was drawing the fake
 * one, and the page was left with no pointer at all until a reload.
 */
const FINE = "(hover: hover) and (pointer: fine) and (min-width: 64rem)";

/** What makes the dot swell. The hero canvas is in the list because it can be dragged. */
const TARGETS = "a, button, input, textarea, label, summary, [role='button'], .hero__canvas";

export function Cursor() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dot = document.getElementById("cur");
    if (!dot) return;

    const fine = window.matchMedia(FINE);
    let alive = true;
    let running = false;
    let cx = -60;
    let cy = -60;
    let tx = -60;
    let ty = -60;

    const loop = () => {
      if (!alive || !fine.matches || document.hidden) {
        running = false;
        return;
      }
      // trails rather than tracks: the lag is what reads as a light, not a sprite
      cx += (tx - cx) * 0.24;
      cy += (ty - cy) * 0.24;
      dot.style.setProperty("--cx", `${cx.toFixed(1)}px`);
      dot.style.setProperty("--cy", `${cy.toFixed(1)}px`);
      requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || !alive || !fine.matches || document.hidden) return;
      running = true;
      requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      start();
    };
    const onOver = (e: Event) => {
      const t = (e.target as Element | null)?.closest?.bind(e.target as Element);
      if (!t) return;
      dot.classList.toggle("is-big", !!t(TARGETS));
      // a white dot on a white room is no dot at all
      dot.classList.toggle("is-day", !!t(".day"));
      dot.classList.remove("is-hidden");
    };
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) dot.classList.add("is-hidden");
    };
    const hide = () => dot.classList.add("is-hidden");
    const show = () => dot.classList.remove("is-hidden");
    const onGate = () => {
      if (fine.matches) start();
      else dot.classList.add("is-hidden");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("blur", hide);
    window.addEventListener("focus", show);
    document.addEventListener("visibilitychange", start);
    fine.addEventListener("change", onGate);
    start();

    return () => {
      alive = false;
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("blur", hide);
      window.removeEventListener("focus", show);
      document.removeEventListener("visibilitychange", start);
      fine.removeEventListener("change", onGate);
    };
  }, []);

  return null;
}

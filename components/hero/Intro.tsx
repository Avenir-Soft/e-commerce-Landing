"use client";

import { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import type { Dictionary } from "@/lib/i18n";
import { MODELS_READY_EVENT, finishIntro, showroomState } from "./store";

const MIN_SHOW_MS = 1500;
const MAX_WAIT_MS = 5000;
const EXIT_MS = 950;
const STORAGE_KEY = "avenir-intro";

type Phase = "pending" | "show" | "exit" | "done";

/**
 * Brand curtain that covers the first paint: the reticle draws itself while the
 * 3D models download, then the curtain lifts and the hero choreography starts.
 * Shown once per session; skipped under reduced motion or with a click.
 */
export function Intro({ t }: { t: Dictionary["intro"] }) {
  const [phase, setPhase] = useState<Phase>("pending");
  const [ready, setReady] = useState(false);
  const { progress } = useProgress();
  const shownAt = useRef(0);

  // decide whether to show at all
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {}
    const id = window.setTimeout(() => {
      if (reduce || seen) {
        finishIntro();
        setPhase("done");
      } else {
        shownAt.current = performance.now();
        document.documentElement.style.overflow = "hidden";
        setPhase("show");
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  // the showroom tells us when every model is parsed
  useEffect(() => {
    const onReady = () => setReady(true);
    if (showroomState.modelsReady) {
      const id = window.setTimeout(onReady, 0);
      return () => window.clearTimeout(id);
    }
    window.addEventListener(MODELS_READY_EVENT, onReady, { once: true });
    return () => window.removeEventListener(MODELS_READY_EVENT, onReady);
  }, []);

  // leave when the models are in (or we have waited long enough)
  useEffect(() => {
    if (phase !== "show") return;
    const elapsed = performance.now() - shownAt.current;
    const wait = Math.max(ready ? MIN_SHOW_MS - elapsed : MAX_WAIT_MS - elapsed, 0);
    const id = window.setTimeout(() => setPhase("exit"), wait);
    return () => window.clearTimeout(id);
  }, [phase, ready]);

  // exit → done
  useEffect(() => {
    if (phase !== "exit") return;
    document.documentElement.style.overflow = "";
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    finishIntro();
    const id = window.setTimeout(() => setPhase("done"), EXIT_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "show") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") setPhase("exit");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  if (phase === "done") return null;

  const shown = ready ? 100 : Math.min(96, progress);

  return (
    <div
      className={`intro ${phase === "exit" ? "intro--exit" : ""}`}
      aria-hidden={phase !== "show"}
      onClick={() => phase === "show" && setPhase("exit")}
    >
      <div className="intro__inner">
        <svg className="intro__mark" viewBox="0 0 120 120" fill="none" aria-hidden="true">
          <line className="intro__axis" x1="60" y1="60" x2="60" y2="8" />
          <line className="intro__axis" x1="60" y1="60" x2="60" y2="112" />
          <line className="intro__axis" x1="60" y1="60" x2="8" y2="60" />
          <line className="intro__axis" x1="60" y1="60" x2="112" y2="60" />
          {[
            [60, 8],
            [60, 112],
            [8, 60],
            [112, 60],
          ].map(([x, y]) => (
            <rect
              key={`${x}-${y}`}
              className="intro__tip"
              x={x - 3.2}
              y={y - 3.2}
              width="6.4"
              height="6.4"
              transform={`rotate(45 ${x} ${y})`}
            />
          ))}
          <path className="intro__star" d="M60 28 Q60 60 92 60 Q60 60 60 92 Q60 60 28 60 Q60 60 60 28 Z" />
        </svg>
        <div className="intro__bar" aria-hidden="true">
          <span style={{ transform: `scaleX(${Math.max(0.04, shown / 100)})` }} />
        </div>
        <p className="intro__text">
          {t.loading}
          <span className="t-num ml-2 opacity-60">{Math.round(shown)}%</span>
        </p>
      </div>
      <button type="button" className="intro__skip" onClick={() => setPhase("exit")}>
        {t.skip}
      </button>
    </div>
  );
}

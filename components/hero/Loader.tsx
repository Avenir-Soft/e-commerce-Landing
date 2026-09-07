"use client";

import { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import type { Dictionary } from "@/lib/i18n";
import { MODELS_READY_EVENT, finishIntro, showroomState } from "./store";

const MIN_SHOW_MS = 500;
const MAX_WAIT_MS = 7000;
const EXIT_MS = 800;

type Phase = "pending" | "show" | "exit" | "done";

/**
 * Loading screen: covers the page while the product models download and
 * their shaders compile, so the showroom starts smooth instead of stuttering
 * through its first seconds. It never appears when the models are already
 * cached, and a click or key skips it.
 */
export function Loader({ t }: { t: Dictionary["loader"] }) {
  const [phase, setPhase] = useState<Phase>("pending");
  const [ready, setReady] = useState(false);
  const { progress } = useProgress();
  const shownAt = useRef(0);

  // decide on mount: skip entirely when the models are already in
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(() => {
      if (showroomState.modelsReady || reduce) {
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

  useEffect(() => {
    const onReady = () => setReady(true);
    if (showroomState.modelsReady) {
      const id = window.setTimeout(onReady, 0);
      return () => window.clearTimeout(id);
    }
    window.addEventListener(MODELS_READY_EVENT, onReady, { once: true });
    return () => window.removeEventListener(MODELS_READY_EVENT, onReady);
  }, []);

  // leave as soon as the models are ready (or after the safety timeout)
  useEffect(() => {
    if (phase !== "show") return;
    const elapsed = performance.now() - shownAt.current;
    const wait = Math.max(ready ? MIN_SHOW_MS - elapsed : MAX_WAIT_MS - elapsed, 0);
    const id = window.setTimeout(() => setPhase("exit"), wait);
    return () => window.clearTimeout(id);
  }, [phase, ready]);

  useEffect(() => {
    if (phase !== "exit") return;
    document.documentElement.style.overflow = "";
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

  const shown = ready ? 100 : Math.min(96, progress);

  // Always mounted: the hero next to it gets wrapped by ScrollTrigger's pin
  // spacer, and inserting a new sibling before it later would break React's
  // reconciliation. Server-rendered visible, so the page is covered before
  // hydration; hidden with the attribute once done.
  return (
    <div
      className={`loader ${phase === "exit" ? "loader--exit" : ""}`}
      hidden={phase === "done"}
      aria-hidden={phase !== "show"}
      onClick={() => phase === "show" && setPhase("exit")}
    >
      <div className="loader__inner">
        <svg className="loader__mark" viewBox="0 0 120 120" fill="none" aria-hidden="true">
          <line className="loader__axis" x1="60" y1="60" x2="60" y2="8" />
          <line className="loader__axis" x1="60" y1="60" x2="60" y2="112" />
          <line className="loader__axis" x1="60" y1="60" x2="8" y2="60" />
          <line className="loader__axis" x1="60" y1="60" x2="112" y2="60" />
          {[
            [60, 8],
            [60, 112],
            [8, 60],
            [112, 60],
          ].map(([x, y]) => (
            <rect
              key={`${x}-${y}`}
              className="loader__tip"
              x={x - 3.2}
              y={y - 3.2}
              width="6.4"
              height="6.4"
              transform={`rotate(45 ${x} ${y})`}
            />
          ))}
          <path className="loader__star" d="M60 28 Q60 60 92 60 Q60 60 60 92 Q60 60 28 60 Q60 60 60 28 Z" />
        </svg>
        <div className="loader__bar" aria-hidden="true">
          <span style={{ transform: `scaleX(${Math.max(0.04, shown / 100)})` }} />
        </div>
        <p className="loader__text">
          {t.loading}
          <span className="t-num ml-2 opacity-60">{Math.round(shown)}%</span>
        </p>
      </div>
      <button type="button" className="loader__skip" onClick={() => setPhase("exit")}>
        {t.skip}
      </button>
    </div>
  );
}

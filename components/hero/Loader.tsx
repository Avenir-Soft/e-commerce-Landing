"use client";

import { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import type { Dictionary } from "@/lib/i18n";
import { MODELS_READY_EVENT, finishIntro, showroomState } from "./store";

const MIN_SHOW_MS = 500;
const MAX_WAIT_MS = 7000;
/** Burst (0.7 s) + curtain (0.25 s delay + 0.8 s); the element hides only after both. */
const EXIT_MS = 1100;
/** Radius of the progress ring in the mark's 120-unit viewBox. */
const RING_R = 66;
const RING_LEN = 2 * Math.PI * RING_R;

type Phase = "pending" | "show" | "exit" | "done";

/** The four hollow diamonds of the reticle, with the direction each one arrives from. */
const TIPS: { x: number; y: number; dx: number; dy: number }[] = [
  { x: 60, y: 10, dx: 0, dy: -46 },
  { x: 60, y: 110, dx: 0, dy: 46 },
  { x: 10, y: 60, dx: -46, dy: 0 },
  { x: 110, y: 60, dx: 46, dy: 0 },
];

/**
 * Loading screen: covers the page while the product models download and
 * their shaders compile, so the showroom starts smooth instead of stuttering
 * through its first seconds. It never appears when the models are already
 * cached, and a click or key skips it.
 *
 * The mark "locks focus": the four tips fly in from outside and snap to the
 * axes, the axes draw inward, the star ignites with a flash, and a ring
 * around it fills with the download. On exit the star bursts into the light
 * that becomes the showroom.
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

  // drei's progress often sits at 0 until the meshopt models land all at once, so the
  // ring also creeps forward on its own clock (fast at first, slowing toward 92%), and
  // the figure never runs backwards: drei's ratio drops whenever a new asset joins the queue
  const [peak, setPeak] = useState(0);
  const latest = useRef(0);
  useEffect(() => {
    latest.current = progress;
  }, [progress]);
  useEffect(() => {
    if (phase !== "show") return;
    const id = window.setInterval(() => {
      const t = (performance.now() - shownAt.current) / 1000;
      const creep = 92 * (1 - Math.exp(-t / 2.2));
      setPeak((prev) => Math.max(prev, Math.min(96, Math.max(latest.current, creep))));
    }, 80);
    return () => window.clearInterval(id);
  }, [phase]);
  const shown = ready ? 100 : peak;

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
      <div className="loader__halo" aria-hidden="true" />
      <div className="loader__inner">
        <svg className="loader__mark" viewBox="0 0 120 120" fill="none" aria-hidden="true">
          {/* focus rings: a faint track, a slow dashed orbit, and the progress arc */}
          <circle className="loader__track" cx="60" cy="60" r={RING_R} />
          <circle className="loader__orbit" cx="60" cy="60" r={RING_R + 8} />
          <circle
            className="loader__ring"
            cx="60"
            cy="60"
            r={RING_R}
            strokeDasharray={RING_LEN}
            style={{ strokeDashoffset: RING_LEN * (1 - shown / 100) }}
          />
          {/* the axes draw from each tip toward the centre */}
          <line className="loader__axis" x1="60" y1="10" x2="60" y2="60" />
          <line className="loader__axis" x1="60" y1="110" x2="60" y2="60" />
          <line className="loader__axis" x1="10" y1="60" x2="60" y2="60" />
          <line className="loader__axis" x1="110" y1="60" x2="60" y2="60" />
          {TIPS.map((tip, i) => (
            <rect
              key={`${tip.x}-${tip.y}`}
              className="loader__tip"
              x={tip.x - 3.2}
              y={tip.y - 3.2}
              width="6.4"
              height="6.4"
              style={
                {
                  "--dx": `${tip.dx}px`,
                  "--dy": `${tip.dy}px`,
                  "--i": i,
                  transformOrigin: `${tip.x}px ${tip.y}px`,
                } as React.CSSProperties
              }
            />
          ))}
          <path className="loader__star" d="M60 28 Q60 60 92 60 Q60 60 60 92 Q60 60 28 60 Q60 60 60 28 Z" />
          <path className="loader__flash" d="M60 28 Q60 60 92 60 Q60 60 60 92 Q60 60 28 60 Q60 60 60 28 Z" />
        </svg>
        <p className="loader__count" aria-hidden="true">
          <span className="loader__num t-num">{Math.round(shown)}</span>
          <span className="loader__pct">%</span>
        </p>
        <p className="loader__text">{t.loading}</p>
      </div>
      <button type="button" className="loader__skip" onClick={() => setPhase("exit")}>
        {t.skip}
      </button>
    </div>
  );
}

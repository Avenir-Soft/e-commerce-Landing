/**
 * Mutable, render-free channel between the scroll/pointer world (Hero) and the
 * per-frame world (Showroom). Nothing here triggers React renders.
 */
export const showroomState = {
  /** 0..1 progress through the pinned hero; drives the carousel position. */
  progress: 0,
  /** Pointer position normalized to -1..1. */
  mouseX: 0,
  mouseY: 0,
  /** Extra turn of the lit device from dragging, with its momentum. */
  spin: 0,
  spinVelocity: 0,
  dragging: false,
  /** Set false when the hero leaves the viewport to pause rendering. */
  visible: true,
  reduced: false,
};

/** Same idea for the showcase chapter: scroll progress and drag through the section. */
export const spotState = {
  progress: 0,
  spin: 0,
  spinVelocity: 0,
  dragging: false,
};

export const RING_COUNT = 5;

/**
 * Drag-to-rotate with momentum, shared by both stages. Horizontal drags turn
 * the device; vertical movement is left to the page so scrolling still works.
 */
export function attachDragSpin(
  el: HTMLElement,
  state: { spin: number; spinVelocity: number; dragging: boolean }
) {
  let lastX = 0;
  let lastT = 0;
  let pointerId: number | null = null;
  const onDown = (e: PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    pointerId = e.pointerId;
    lastX = e.clientX;
    lastT = performance.now();
    state.dragging = true;
    state.spinVelocity = 0;
  };
  const onMove = (e: PointerEvent) => {
    if (pointerId !== e.pointerId) return;
    const now = performance.now();
    const dx = e.clientX - lastX;
    const dt = Math.max(1, now - lastT);
    state.spin += dx * 0.008;
    state.spinVelocity = (dx / dt) * 8;
    lastX = e.clientX;
    lastT = now;
  };
  const onUp = (e: PointerEvent) => {
    if (pointerId !== e.pointerId) return;
    pointerId = null;
    state.dragging = false;
  };
  el.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointercancel", onUp);
  return () => {
    el.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onUp);
  };
}

/** Frame-rate independent exponential approach. */
export function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

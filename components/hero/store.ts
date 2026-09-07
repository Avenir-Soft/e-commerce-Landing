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
  /** Set false when the hero leaves the viewport to pause rendering. */
  visible: true,
  reduced: false,
  /** True once the intro overlay has left (or was skipped). */
  introDone: false,
  /** True once every product model is parsed and usable (or 3D is unavailable). */
  modelsReady: false,
};

export const INTRO_DONE_EVENT = "avenir:intro-done";
export const MODELS_READY_EVENT = "avenir:models-ready";

export function finishIntro() {
  if (showroomState.introDone) return;
  showroomState.introDone = true;
  window.dispatchEvent(new Event(INTRO_DONE_EVENT));
}

export function markModelsReady() {
  if (showroomState.modelsReady) return;
  showroomState.modelsReady = true;
  window.dispatchEvent(new Event(MODELS_READY_EVENT));
}

export const RING_COUNT = 5;

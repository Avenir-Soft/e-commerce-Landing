/**
 * Mutable, render-free channel between the scroll/pointer world (Hero) and the
 * per-frame world (Showroom). Nothing here triggers React renders.
 */
export const showroomState = {
  /** 0..1 progress through the pinned hero; drives ring rotation. */
  progress: 0,
  /** Pointer position normalized to -1..1. */
  mouseX: 0,
  mouseY: 0,
  /** Set false when the hero leaves the viewport to pause rendering. */
  visible: true,
  reduced: false,
};

export const RING_COUNT = 5;

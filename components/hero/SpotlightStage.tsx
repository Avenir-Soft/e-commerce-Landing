"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { attachDragSpin, damp, spotState } from "./store";
import { DeviceModel } from "./DeviceModel";
import { MODELS } from "./Showroom";
import { BlobShadow, Dust, Studio } from "./Studio";

/*
 * The showcase stage: one real model at a time on a turntable. Scrolling
 * through the chapter turns it a full circle (like Apple's scroll-driven
 * product views), a drag adds momentum, and switching beats crossfades to
 * the next model by scale. Renders only while on screen.
 */

const STAGE_IDS = ["phone-home", "laptop-dashboard", "tablet-editor"] as const;
/* The stage only ever mounts from lg, so it takes the desktop cap straight: a
   flat 1.25 drew it at 700x1130 and stretched that over a 1120x1808 slot. */
const DPR_MAX = 2;

const BEATS = STAGE_IDS.length;

/*
 * Target size on the stage, per device, in world units.
 *
 * It used to be a flat 1.9 for all three, applied to each model's LARGEST
 * dimension. That makes them equal in the wrong axis: the laptop's largest
 * dimension is its width, the phone's and the tablet's is their height. So the
 * laptop filled the stage sideways while the phone and the tablet sat in the
 * middle of it at half height — small and lost on a wide screen. Sized per
 * device now: the laptop stays width-limited, the two portrait devices grow
 * into the room they always had. 2.7/2.6 overshot — a phone standing taller
 * than the laptop is wide reads as a prop, not a product — so the portrait
 * pair sits a notch back from the ceiling with air above and below. Measured
 * on a 1920×1080 stage (560×904): the phone went from 72% of the stage's
 * height to 60%, the tablet from 49% to 43%. The tablet reads smaller than its
 * number suggests because the iPad GLB normalises on a bounding box larger
 * than its own screen — compare on screen, not in world units.
 */
const STAGE_SIZE: Record<(typeof STAGE_IDS)[number], number> = {
  "phone-home": 2.25,
  "laptop-dashboard": 1.95,
  "tablet-editor": 2.3,
};

function Turntable({ active }: { active: number }) {
  const groups = useRef<(THREE.Group | null)[]>([]);
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    if (!spotState.dragging) {
      spotState.spin += spotState.spinVelocity * dt;
      spotState.spinVelocity *= Math.exp(-2.2 * dt);
    }
    /*
     * Each product turns around its front face while its own beat scrolls by.
     * The sweep was 0.7π — ±63°, and the comment above it claimed ±80°. A phone
     * survives that; a tablet and a laptop do not. At 63° a flat screen is
     * almost edge-on, and this is the one chapter whose whole job is to let you
     * read the platform's UI. ±29° still reads as a turntable and keeps the
     * screen legible at both ends of the sweep. Dragging can still spin it
     * right round — that is the visitor's choice, not the default state.
     */
    const local = Math.min(1, Math.max(0, spotState.progress * BEATS - active));
    const turn = (local - 0.5) * Math.PI * 0.32 + spotState.spin;
    groups.current.forEach((g, i) => {
      if (!g) return;
      const on = i === active;
      // the one leaving collapses about twice as fast as the one arriving grows:
      // both sit at the same point on the turntable, and at these sizes a slow
      // symmetrical crossfade puts a whole phone on top of the laptop's screen
      const s = damp(g.scale.x, on ? 1 : 0.001, on ? 5 : 11, dt);
      g.scale.setScalar(s);
      g.visible = s > 0.01;
      g.rotation.y = damp(g.rotation.y, turn + Math.sin(t * 0.5 + i) * 0.08, spotState.dragging ? 12 : 4, dt);
      g.rotation.x = Math.sin(t * 0.4 + i) * 0.04;
      g.position.y = Math.sin(t * 0.8 + i * 1.3) * 0.03;
    });
  });
  return (
    <>
      {STAGE_IDS.map((id, i) => {
        const spec = MODELS.find((m) => m.id === id)!;
        return (
          <group
            key={id}
            ref={(el) => {
              groups.current[i] = el;
            }}
            scale={i === 0 ? 1 : 0.001}
          >
            <group scale={STAGE_SIZE[id] / spec.size}>
              <Suspense fallback={null}>
                <DeviceModel spec={spec} />
              </Suspense>
            </group>
            <BlobShadow size={1.8} y={-1.05} />
          </group>
        );
      })}
    </>
  );
}

function CameraRig() {
  const placed = useRef(false);
  useFrame((state) => {
    if (placed.current) return;
    placed.current = true;
    state.camera.position.set(0, 0.9, 7.1);
    state.camera.lookAt(0, -0.05, 0);
  });
  return null;
}

/** Compiles this canvas's shaders right after the models mount, so scrolling into the chapter does not hitch. */
function Precompile() {
  const get = useThree((s) => s.get);
  useEffect(() => {
    const id = window.setTimeout(() => {
      const { gl, scene, camera } = get();
      if (typeof gl.compileAsync === "function") {
        gl.compileAsync(scene, camera).catch(() => {});
        return;
      }
      try {
        gl.compile(scene, camera);
      } catch {}
    }, 300);
    return () => window.clearTimeout(id);
  }, [get]);
  return null;
}

export function SpotlightStage({ active }: { active: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [dpr, setDpr] = useState(() => Math.min(DPR_MAX, typeof window === "undefined" ? 1 : window.devicePixelRatio));

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    const detach = attachDragSpin(el, spotState);
    setDpr(Math.min(DPR_MAX, window.devicePixelRatio));
    return () => {
      io.disconnect();
      detach();
    };
  }, []);

  return (
    <div ref={wrap} className="h-full w-full cursor-grab active:cursor-grabbing" style={{ touchAction: "pan-y" }}>
      <Canvas
        dpr={dpr}
        camera={{ fov: 30, near: 0.1, far: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          stencil: false,
          powerPreference: "high-performance",
          // the same Khronos PBR Neutral curve the hero uses; this canvas kept
          // ACES, which is why the showcase laptop read grey next to the hero's
          toneMapping: THREE.NeutralToneMapping,
          toneMappingExposure: 1.15,
        }}
        frameloop={visible ? "always" : "never"}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <CameraRig />
        <Studio />
        <Dust count={120} spread={10} />
        <Turntable active={active} />
        <Suspense fallback={null}>
          <Precompile />
        </Suspense>
      </Canvas>
    </div>
  );
}

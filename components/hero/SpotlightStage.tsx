"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
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

const STAGE_IDS = ["iphone", "macbook", "watch"] as const;
const DPR_MAX = 1.25;

const BEATS = STAGE_IDS.length;

function Turntable({ active }: { active: number }) {
  const groups = useRef<(THREE.Group | null)[]>([]);
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    if (!spotState.dragging) {
      spotState.spin += spotState.spinVelocity * dt;
      spotState.spinVelocity *= Math.exp(-2.2 * dt);
    }
    // each product sweeps about ±80° around its front face while its own beat scrolls by
    const local = Math.min(1, Math.max(0, spotState.progress * BEATS - active));
    const turn = (local - 0.5) * Math.PI * 0.7 + spotState.spin;
    groups.current.forEach((g, i) => {
      if (!g) return;
      const on = i === active;
      const s = damp(g.scale.x, on ? 1 : 0.001, 5, dt);
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
            <group scale={1.9 / spec.size}>
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
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        frameloop={visible ? "always" : "never"}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <CameraRig />
        <Studio />
        <Dust count={120} spread={10} />
        <Turntable active={active} />
      </Canvas>
    </div>
  );
}

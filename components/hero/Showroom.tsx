"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, PerformanceMonitor, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { RING_COUNT, showroomState } from "./store";
import { DeviceModel, type ModelSpec } from "./DeviceModel";

/*
 * A horizontal showroom: the five real product models stand in a row above a
 * pool of light. Scrolling the pinned hero slides the row sideways so the next
 * device glides into the spotlight; the pointer turns the lit device.
 *
 * Budget: one render pass, no post-processing, no reflections, DPR capped at
 * 1.25 and lowered further by PerformanceMonitor when frames drop.
 */

export const MODELS: ModelSpec[] = [
  { id: "iphone", url: "/models/iphone.glb", size: 1.75, rotation: [0, Math.PI / 2, 0] },
  { id: "macbook", url: "/models/macbook15.glb", size: 2.3, rotation: [0, -0.35, 0] },
  { id: "ipad", url: "/models/ipad.glb", size: 1.85, rotation: [0, 0, 0] },
  { id: "watch", url: "/models/watch.glb", size: 1.35, rotation: [0, 0, 0] },
  { id: "airpods", url: "/models/airpods.glb", size: 1.25, rotation: [0, -0.5, 0] },
];
MODELS.forEach((m) => useGLTF.preload(m.url, false, true));

const SPACING = 3.1;
const ROW_Y = -0.9;
const FLOOR_Y = -1.85;
const DESKTOP_MIN_WIDTH = 1024;
const ENTRANCE_DELAY = 0.15;
const ENTRANCE_STAGGER = 0.12;
const ENTRANCE_DURATION = 1.2;
const DPR_MAX = 1.25;

function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

function Carousel() {
  const row = useRef<THREE.Group>(null);
  const items = useRef<(THREE.Group | null)[]>([]);
  const t0 = useRef<number | null>(null);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const r = row.current;
    if (!r) return;
    if (t0.current === null) t0.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - t0.current;
    const reduced = showroomState.reduced;

    const target = -showroomState.progress * (RING_COUNT - 1) * SPACING;
    r.position.x = reduced ? target : damp(r.position.x, target, 5, dt);
    const current = -r.position.x / SPACING;
    const mx = reduced ? 0 : showroomState.mouseX;
    const my = reduced ? 0 : showroomState.mouseY;

    items.current.forEach((g, i) => {
      if (!g) return;
      const d = Math.min(1, Math.abs(i - current));
      const focus = 1 - d;
      const enter = reduced
        ? 1
        : easeOutExpo(Math.max(0, (elapsed - ENTRANCE_DELAY - i * ENTRANCE_STAGGER) / ENTRANCE_DURATION));
      g.scale.setScalar((0.6 + 0.4 * focus) * enter);
      g.position.y = ROW_Y - 0.3 * d - (1 - enter) * 0.9;
      g.position.z = -1.1 * d;
      const idle = reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.4 + i * 1.3) * 0.2;
      g.rotation.y = damp(g.rotation.y, idle + mx * 0.4 * focus, 3, dt);
      g.rotation.x = damp(g.rotation.x, -my * 0.12 * focus, 3, dt);
      // items far off-screen do not need to render at all
      g.visible = Math.abs(i - current) < 2.2;
    });
  });

  return (
    <group ref={row}>
      {MODELS.map((spec, i) => (
        <group
          key={spec.id}
          ref={(el) => {
            items.current[i] = el;
          }}
          position={[i * SPACING, ROW_Y, 0]}
          scale={0}
        >
          <Suspense fallback={null}>
            <DeviceModel spec={spec} />
          </Suspense>
        </group>
      ))}
    </group>
  );
}

/** A soft pool of blue light under the lit device: one additive disc, no reflections. */
function LightPool() {
  const texture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(96,165,250,0.55)");
    g.addColorStop(0.35, "rgba(37,99,235,0.28)");
    g.addColorStop(1, "rgba(2,16,31,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, FLOOR_Y, -0.4]}>
      <planeGeometry args={[7.5, 4.5]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function Studio() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 6, 5]} intensity={0.9} />
      <spotLight position={[0, 6, 3]} angle={0.42} penumbra={1} intensity={90} color="#eef3ff" />
      <spotLight position={[-7, 3, -1]} angle={0.5} penumbra={1} intensity={40} color="#3b82f6" />
      <spotLight position={[7, 2, 2]} angle={0.5} penumbra={1} intensity={25} color="#93c5fd" />
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.4} form="rect" scale={[8, 3, 1]} position={[0, 5, -1]} rotation-x={Math.PI / 2} color="#e8eefc" />
        <Lightformer intensity={1.2} form="rect" scale={[2, 7, 1]} position={[-6, 1, 2]} rotation-y={Math.PI / 2} color="#7fb3ff" />
        <Lightformer intensity={1.6} form="rect" scale={[3, 6, 1]} position={[6, 0, 1]} rotation-y={-Math.PI / 2} color="#ffffff" />
      </Environment>
      <fog attach="fog" args={["#02101f", 8, 17]} />
    </>
  );
}

function CameraRig({ desktop }: { desktop: boolean }) {
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    camera.position.set(0, 1.15, desktop ? 8.4 : 10.5);
    camera.lookAt(0, 0.05, 0);
  }, [camera, desktop]);
  return null;
}

function Scene() {
  const width = useThree((s) => s.size.width);
  const desktop = width >= DESKTOP_MIN_WIDTH;
  return (
    <>
      <CameraRig desktop={desktop} />
      <Studio />
      <group scale={desktop ? 1 : 0.82} position={[0, desktop ? 0 : -0.2, 0]}>
        <Carousel />
        <LightPool />
      </group>
    </>
  );
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Client-only (loaded with ssr:false), so the WebGL probe never runs on the server. */
export function Showroom() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [dpr, setDpr] = useState(() => Math.min(DPR_MAX, typeof window === "undefined" ? 1 : window.devicePixelRatio));
  const [webgl] = useState(supportsWebGL);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!webgl) return null;

  return (
    <div ref={wrap} className="h-full w-full">
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
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(Math.min(DPR_MAX, window.devicePixelRatio))} />
        <Scene />
      </Canvas>
    </div>
  );
}

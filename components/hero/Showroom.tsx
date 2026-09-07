"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { RING_COUNT, attachDragSpin, damp, markModelsReady, showroomState } from "./store";
import { DeviceModel, type ModelSpec } from "./DeviceModel";
import { BlobShadow, Dust, Studio, useRadialTexture } from "./Studio";

/*
 * A horizontal showroom: the five real product models stand in a row above a
 * pool of light. Scrolling the pinned hero slides the row sideways so the next
 * device glides into the spotlight; the pointer turns the lit device and a
 * horizontal drag spins it with momentum. A warm light orbits the scene so
 * highlights travel across the glass and metal.
 *
 * Budget: one render pass, no post-processing, no reflections, DPR capped at
 * 1.25 and lowered further by PerformanceMonitor when frames drop.
 */

/*
 * The devices are only canvases: each one wears a screen of the platform.
 * The same phone appears twice with different screens; that is the point.
 */
export const MODELS: ModelSpec[] = [
  {
    id: "phone-home",
    url: "/models/iphone.glb",
    size: 1.75,
    rotation: [0, Math.PI / 2, 0],
    screen: { material: "screen.001", url: "/screens/home.webp", flipY: true },
  },
  {
    id: "laptop-dashboard",
    url: "/models/macbook15.glb",
    size: 2.3,
    rotation: [0, -0.35, 0],
    screen: { material: "VNZklasZKSWjWUk", url: "/screens/dashboard.webp", emissive: true, flipY: true },
  },
  {
    id: "tablet-editor",
    url: "/models/ipad.glb",
    size: 1.85,
    rotation: [0, 0, 0],
    screen: { material: "screen", url: "/screens/editor.webp", flipY: true },
  },
  {
    id: "phone-checkout",
    url: "/models/iphone.glb",
    size: 1.75,
    rotation: [0, Math.PI / 2, 0],
    screen: { material: "screen.001", url: "/screens/checkout.webp", flipY: true },
  },
  {
    id: "laptop-orders",
    url: "/models/macbook15.glb",
    size: 2.3,
    rotation: [0, -0.35, 0],
    screen: { material: "VNZklasZKSWjWUk", url: "/screens/orders.webp", emissive: true, flipY: true },
  },
];
new Set(MODELS.map((m) => m.url)).forEach((url) => useGLTF.preload(url, false, true));

const SPACING = 3.1;
const ROW_Y = -0.9;
const FLOOR_Y = -1.85;
const DESKTOP_MIN_WIDTH = 1024;
const ENTRANCE_DELAY = 0.15;
const ENTRANCE_STAGGER = 0.12;
const ENTRANCE_DURATION = 1.2;
const DPR_MAX = 1.25;

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
    const time = state.clock.elapsedTime;
    const reduced = showroomState.reduced;

    // momentum from a drag decays on its own
    if (!showroomState.dragging) {
      showroomState.spin += showroomState.spinVelocity * dt;
      showroomState.spinVelocity *= Math.exp(-2.2 * dt);
    }

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
      const bob = reduced ? 0 : Math.sin(time * 0.8 + i * 1.7) * 0.03;
      g.scale.setScalar((0.6 + 0.4 * focus) * enter);
      g.position.y = ROW_Y - 0.3 * d - (1 - enter) * 0.9 + bob;
      g.position.z = -1.1 * d;
      const idle = reduced ? 0 : Math.sin(time * 0.4 + i * 1.3) * 0.2;
      const targetY = idle + mx * 0.4 * focus + showroomState.spin * focus;
      g.rotation.y = damp(g.rotation.y, targetY, showroomState.dragging ? 12 : 3, dt);
      g.rotation.x = damp(g.rotation.x, -my * 0.12 * focus, 3, dt);
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
          <BlobShadow size={spec.size} y={FLOOR_Y - ROW_Y + 0.01} />
        </group>
      ))}
    </group>
  );
}

/** A soft pool of blue light under the lit device. */
function LightPool() {
  const texture = useRadialTexture("rgba(96,165,250,0.55)", "rgba(37,99,235,0.28)", "rgba(2,16,31,0)");
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, FLOOR_Y, -0.4]}>
      <planeGeometry args={[7.5, 4.5]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

/**
 * Renders only once every model is parsed; then compiles every shader in one
 * go (instead of on the first visible frame) and lifts the loading screen.
 */
function ReadySignal() {
  useGLTF(
    MODELS.map((m) => m.url),
    false,
    true
  );
  const get = useThree((s) => s.get);
  useEffect(() => {
    const { gl, scene, camera } = get();
    const id = window.setTimeout(() => {
      try {
        gl.compile(scene, camera);
      } catch {}
      markModelsReady();
    }, 50);
    return () => window.clearTimeout(id);
  }, [get]);
  return null;
}

function CameraRig({ desktop }: { desktop: boolean }) {
  const placed = useRef<boolean | null>(null);
  useFrame((state, delta) => {
    const camera = state.camera;
    const baseZ = desktop ? 8.4 : 10.5;
    if (placed.current !== desktop) {
      placed.current = desktop;
      camera.position.set(0, 1.15, baseZ);
      camera.lookAt(0, 0.05, 0);
    }
    if (showroomState.reduced) return;
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    // a breathing dolly plus a slight parallax against the pointer
    const tx = showroomState.mouseX * 0.18 + Math.sin(t * 0.21) * 0.05;
    const ty = 1.15 - showroomState.mouseY * 0.1 + Math.sin(t * 0.17) * 0.04;
    const tz = baseZ - showroomState.progress * 0.35;
    camera.position.x = damp(camera.position.x, tx, 2, dt);
    camera.position.y = damp(camera.position.y, ty, 2, dt);
    camera.position.z = damp(camera.position.z, tz, 2, dt);
    camera.lookAt(0, 0.05, 0);
  });
  return null;
}

function Scene() {
  const width = useThree((s) => s.size.width);
  const desktop = width >= DESKTOP_MIN_WIDTH;
  return (
    <>
      <CameraRig desktop={desktop} />
      <Suspense fallback={null}>
        <ReadySignal />
      </Suspense>
      <Studio />
      <fog attach="fog" args={["#02101f", 8, 17]} />
      <Dust />
      {/* on phones the row sits lower and smaller, between the copy and the label */}
      <group scale={desktop ? 1 : 0.75} position={[0, desktop ? 0 : -0.6, 0]}>
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
    const detach = attachDragSpin(el, showroomState);
    return () => {
      io.disconnect();
      detach();
    };
  }, []);

  useEffect(() => {
    if (!webgl) markModelsReady();
  }, [webgl]);

  if (!webgl) return null;

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
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(Math.min(DPR_MAX, window.devicePixelRatio))} />
        <Scene />
      </Canvas>
    </div>
  );
}

"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { INTRO_DONE_EVENT, RING_COUNT, attachDragSpin, damp, markModelsReady, showroomState } from "./store";
import { DeviceModel, type ModelSpec } from "./DeviceModel";
import { BlobShadow, Dust, Studio, useRadialTexture } from "./Studio";

/*
 * A horizontal showroom: the five real product models stand in a row above a
 * pool of light. Scrolling the pinned hero slides the row sideways so the next
 * device glides into the spotlight; the pointer turns the lit device and a
 * horizontal drag spins it with momentum. A warm light orbits the scene so
 * highlights travel across the glass and metal.
 *
 * Budget: one render pass, no post-processing, no reflections; DPR capped at 2
 * on desktop and 1.25 on phones, lowered further by PerformanceMonitor when
 * frames drop.
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
    rotation: [0, -0.2, 0],
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
    rotation: [0, -0.2, 0],
    screen: { material: "VNZklasZKSWjWUk", url: "/screens/orders.webp", emissive: true, flipY: true },
  },
];
new Set(MODELS.map((m) => m.url)).forEach((url) => useGLTF.preload(url, false, true));

const SPACING = 2.85;
const ROW_Y = -0.8;
const FLOOR_Y = -1.78;
const DESKTOP_MIN_WIDTH = 1024;
/** The lit device fills the frame; its neighbours stand back. */
const FOCUS_SCALE = 1.14;
const SIDE_SCALE = 0.6;
/** How far the lit device turns after the pointer, and its idle sway; small so the screen stays readable. */
const POINTER_TURN = 0.22;
const IDLE_TURN = 0.07;
const ENTRANCE_DELAY = 0.15;
const ENTRANCE_STAGGER = 0.22;
const ENTRANCE_DURATION = 2.1;
/*
 * How many device pixels the scene is drawn at, per CSS pixel.
 *
 * This was a flat 1.25 everywhere, and it was the single biggest reason the
 * devices looked soft: on a 2x display the canvas was drawn at 1800x1125 and
 * stretched over 2880x1800 of screen. Desktop now draws 1:1 — measured on this
 * machine at 60.3 fps with no frame over 17ms, so the "must not stutter" budget
 * holds. Phones keep the old cap: their devicePixelRatio is often 3, which
 * would be nine times the pixels on the weakest hardware that loads this page.
 * PerformanceMonitor still drops to 1 if frames slip either way.
 */
const DPR_MAX_DESKTOP = 2;
const DPR_MAX_MOBILE = 1.25;
const capDpr = () =>
  Math.min(window.innerWidth >= DESKTOP_MIN_WIDTH ? DPR_MAX_DESKTOP : DPR_MAX_MOBILE, window.devicePixelRatio);

/** Gentler than expo: the arrival stays visible for most of its duration instead of snapping in. */
const easeOutCubic = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(1 - t, 3));

/**
 * Seconds since the loading screen lifted, on the scene clock. Before that
 * the scene is covered, so the entrance waits instead of playing unseen
 * (which is what made the intro look flat: the devices were already standing
 * there by the time the loader left).
 */
function introElapsed(clockTime: number, reduced: boolean) {
  if (reduced) return Infinity;
  if (!showroomState.introDone) return -1;
  if (showroomState.introAt === null) showroomState.introAt = clockTime;
  return clockTime - showroomState.introAt;
}

function Carousel() {
  const row = useRef<THREE.Group>(null);
  const items = useRef<(THREE.Group | null)[]>([]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const r = row.current;
    if (!r) return;
    const time = state.clock.elapsedTime;
    const reduced = showroomState.reduced;
    const elapsed = introElapsed(time, reduced);

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
      // the lit device comes first, its neighbours follow outwards
      const order = Math.abs(i - Math.round(current));
      const enter = easeOutCubic(Math.max(0, (elapsed - ENTRANCE_DELAY - order * ENTRANCE_STAGGER) / ENTRANCE_DURATION));
      const bob = reduced ? 0 : Math.sin(time * 0.8 + i * 1.7) * 0.03;
      g.scale.setScalar((SIDE_SCALE + (FOCUS_SCALE - SIDE_SCALE) * focus) * (0.4 + 0.6 * enter));
      g.position.y = ROW_Y - 0.3 * d - (1 - enter) * 1.4 + bob;
      g.position.z = -1.1 * d - (1 - enter) * 3;
      const idle = reduced ? 0 : Math.sin(time * 0.4 + i * 1.3) * IDLE_TURN;
      // devices arrive turned away and settle to face the camera
      const arrive = (1 - enter) * -1.3;
      const targetY = idle + arrive + mx * POINTER_TURN * focus + showroomState.spin * focus;
      g.rotation.y = enter < 1 ? targetY : damp(g.rotation.y, targetY, showroomState.dragging ? 12 : 3, dt);
      g.rotation.x = damp(g.rotation.x, -my * 0.08 * focus, 3, dt);
      g.visible = enter > 0 && Math.abs(i - current) < 2.2;
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

/** A soft pool of blue light under the lit device; it blooms open as the devices arrive. */
function LightPool() {
  const texture = useRadialTexture("rgba(96,165,250,0.55)", "rgba(37,99,235,0.28)", "rgba(2,16,31,0)");
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const m = mesh.current;
    if (!m) return;
    const elapsed = introElapsed(state.clock.elapsedTime, showroomState.reduced);
    const open = easeOutCubic(Math.max(0, elapsed / 2.4));
    m.scale.setScalar(0.2 + 0.8 * open);
    (m.material as THREE.MeshBasicMaterial).opacity = open;
    m.visible = open > 0;
  });
  return (
    <mesh ref={mesh} rotation-x={-Math.PI / 2} position={[0, FLOOR_Y, -0.4]} scale={0.2}>
      <planeGeometry args={[7.5, 4.5]} />
      <meshBasicMaterial map={texture} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
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
    // compileAsync lets the driver build the programs off the main thread
    // (KHR_parallel_shader_compile); the synchronous compile froze the page,
    // loader included, for 4+ seconds on ANGLE/Direct3D
    const id = window.setTimeout(() => {
      performance.mark("avenir:compile-start");
      const done = () => {
        performance.measure("avenir:compile", "avenir:compile-start");
        markModelsReady();
      };
      if (typeof gl.compileAsync === "function") {
        gl.compileAsync(scene, camera).then(done, done);
      } else {
        try {
          gl.compile(scene, camera);
        } catch {}
        done();
      }
    }, 50);
    return () => window.clearTimeout(id);
  }, [get]);
  return null;
}

function CameraRig({ desktop }: { desktop: boolean }) {
  const placed = useRef<boolean | null>(null);
  useFrame((state, delta) => {
    const camera = state.camera;
    // closer than before so the lit screen is readable (owner correction, 2026-09-08)
    const baseZ = desktop ? 7.2 : 9.4;
    const reduced = showroomState.reduced;
    if (placed.current !== desktop) {
      placed.current = desktop;
      // starts pulled back and high; dollies in when the loader lifts
      camera.position.set(0, reduced ? 1.05 : 2.2, reduced ? baseZ : baseZ + 3.5);
      camera.lookAt(0, 0.05, 0);
    }
    if (reduced) return;
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    if (introElapsed(t, reduced) < 0) return;
    // a breathing dolly plus a slight parallax against the pointer
    const tx = showroomState.mouseX * 0.16 + Math.sin(t * 0.21) * 0.05;
    const ty = 1.05 - showroomState.mouseY * 0.08 + Math.sin(t * 0.17) * 0.04;
    const tz = baseZ - showroomState.progress * 0.3;
    camera.position.x = damp(camera.position.x, tx, 2, dt);
    camera.position.y = damp(camera.position.y, ty, 1.3, dt);
    camera.position.z = damp(camera.position.z, tz, 1.3, dt);
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
      {/* On phones the row is smaller and sits between the copy and the caption.
          It used to be pushed down to -0.7 and the caption card cut the bottom
          off the device; -0.25 clears the card and still leaves the copy alone. */}
      <group scale={desktop ? 1 : 0.78} position={[0, desktop ? 0 : -0.25, 0]}>
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
  // no frames while the loading screen is up: the main thread belongs to the loader's
  // animation and the model decode; the scene starts drawing the moment the curtain lifts
  const [intro, setIntro] = useState(() => showroomState.introDone);
  useEffect(() => {
    if (showroomState.introDone) return;
    const on = () => setIntro(true);
    window.addEventListener(INTRO_DONE_EVENT, on, { once: true });
    return () => window.removeEventListener(INTRO_DONE_EVENT, on);
  }, []);
  const [dpr, setDpr] = useState(() => (typeof window === "undefined" ? 1 : capDpr()));
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
          // Khronos PBR Neutral, not ACES: ACES is a film curve — it desaturates
          // and greys down everything bright, which on a device whose whole job
          // is to show a white UI full of product photos reads as a dull screen.
          // Neutral keeps whites white and colour where it was.
          toneMapping: THREE.NeutralToneMapping,
          toneMappingExposure: 1.15,
        }}
        frameloop={visible && intro ? "always" : "never"}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(capDpr())} />
        <Scene />
      </Canvas>
    </div>
  );
}

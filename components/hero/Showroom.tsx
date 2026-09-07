"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { RING_COUNT, showroomState } from "./store";
import { Earbuds, Laptop, Phone, Tablet, Watch } from "./devices";

/*
 * A vertical wheel of five devices on the right half of the hero. Scrolling
 * the pinned hero turns the wheel: the next device rolls up from below, the
 * previous one rolls away over the top. Only the device facing the camera is
 * at full scale, so the wheel reads as "one object at a time".
 */

const WHEEL_RADIUS = 2.3;
const STEP = (Math.PI * 2) / RING_COUNT;
const DESKTOP_MIN_WIDTH = 1024;
const WHEEL_OFFSET_DESKTOP: [number, number, number] = [1.45, -0.25, 0];
const WHEEL_OFFSET_MOBILE: [number, number, number] = [0, 1.24, 0];
const WHEEL_SCALE_MOBILE = 0.48;
const ENTRANCE_DELAY = 0.25;
const ENTRANCE_STAGGER = 0.1;
const ENTRANCE_DURATION = 1.1;
const FRONT_SCALE_BOOST = 0.32;
const REST_SCALE_DESKTOP = 0.8;
const REST_SCALE_MOBILE = 0.6;

const devices = [Phone, Laptop, Tablet, Watch, Earbuds];

/** Frame-rate independent exponential approach. */
function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

function Wheel() {
  const sway = useRef<THREE.Group>(null);
  const wheel = useRef<THREE.Group>(null);
  const width = useThree((s) => s.size.width);
  const desktop = width >= DESKTOP_MIN_WIDTH;
  const t0 = useRef<number | null>(null);
  const restScale = desktop ? REST_SCALE_DESKTOP : REST_SCALE_MOBILE;

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const w = wheel.current;
    const g = sway.current;
    if (!w || !g) return;
    if (t0.current === null) t0.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - t0.current;

    // item i sits at angle -i*STEP; it faces the camera when the wheel is turned by -i*STEP
    const target = -showroomState.progress * (RING_COUNT - 1) * STEP;
    w.rotation.x = showroomState.reduced ? target : damp(w.rotation.x, target, 4.2, dt);

    const mx = showroomState.reduced ? 0 : showroomState.mouseX;
    const my = showroomState.reduced ? 0 : showroomState.mouseY;
    g.rotation.y = damp(g.rotation.y, mx * 0.16, 2.6, dt);
    g.rotation.x = damp(g.rotation.x, -my * 0.05, 2.6, dt);

    w.children.forEach((child, i) => {
      const facing = Math.max(0, Math.cos(-i * STEP - w.rotation.x));
      const focus = restScale + FRONT_SCALE_BOOST * facing * facing;
      const enter = showroomState.reduced
        ? 1
        : easeOutExpo(Math.max(0, (elapsed - ENTRANCE_DELAY - i * ENTRANCE_STAGGER) / ENTRANCE_DURATION));
      child.scale.setScalar(focus * enter);
    });
  });

  return (
    <group
      ref={sway}
      position={desktop ? WHEEL_OFFSET_DESKTOP : WHEEL_OFFSET_MOBILE}
      scale={desktop ? 1 : WHEEL_SCALE_MOBILE}
    >
      <group ref={wheel}>
        {devices.map((Device, i) => {
          const a = -i * STEP;
          return (
            <group
              key={i}
              position={[0, Math.sin(a) * WHEEL_RADIUS, Math.cos(a) * WHEEL_RADIUS]}
              rotation={[-a, 0, 0]}
              scale={0}
            >
              <Float speed={showroomState.reduced ? 0 : 1.1} rotationIntensity={0.12} floatIntensity={0.35}>
                <Device />
              </Float>
            </group>
          );
        })}
      </group>
    </group>
  );
}

function Studio() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} />
      <spotLight position={[-5, 3, 3]} intensity={18} angle={0.5} penumbra={1} color="#60a5fa" />
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.6} form="rect" scale={[7, 3, 1]} position={[0, 5, -1]} rotation-x={Math.PI / 2} color="#e8eefc" />
        <Lightformer intensity={1.4} form="rect" scale={[2, 7, 1]} position={[-6, 1, 2]} rotation-y={Math.PI / 2} color="#7fb3ff" />
        <Lightformer intensity={1.8} form="rect" scale={[3, 6, 1]} position={[6, 0, 1]} rotation-y={-Math.PI / 2} color="#ffffff" />
        <Lightformer intensity={0.6} form="ring" scale={9} position={[0, -5, 0]} rotation-x={-Math.PI / 2} color="#2563eb" />
      </Environment>
    </>
  );
}

function CameraRig() {
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
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
        dpr={[1, 1.6]}
        camera={{ fov: 30, position: [0, 0.2, 7.8], near: 0.1, far: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        frameloop={visible ? "always" : "never"}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <CameraRig />
        <Studio />
        <Wheel />
      </Canvas>
    </div>
  );
}

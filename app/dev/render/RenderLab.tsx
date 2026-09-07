"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { DeviceModel } from "@/components/hero/DeviceModel";
import { MODELS } from "@/components/hero/Showroom";

declare global {
  interface Window {
    __renderReady?: boolean;
  }
}

function Ready() {
  useEffect(() => {
    const id = window.setTimeout(() => {
      window.__renderReady = true;
    }, 1500);
    return () => window.clearTimeout(id);
  }, []);
  return null;
}

function Rig({ yaw, pitch, dist }: { yaw: number; pitch: number; dist: number }) {
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    camera.position.set(Math.sin(yaw) * dist, Math.sin(pitch) * dist, Math.cos(yaw) * Math.cos(pitch) * dist);
    camera.lookAt(0, 0, 0);
  }, [camera, yaw, pitch, dist]);
  return null;
}

export function RenderLab() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("model") ?? "iphone";
  const yaw = Number(params.get("yaw") ?? 0.35);
  const pitch = Number(params.get("pitch") ?? 0.12);
  const dist = Number(params.get("dist") ?? 5.2);
  const spec = MODELS.find((m) => m.id === id) ?? MODELS[0];
  const wrap = useRef<HTMLDivElement>(null);

  return (
    <div ref={wrap} id="render" style={{ width: 1200, height: 1200, background: "transparent" }}>
      <Canvas
        dpr={1}
        camera={{ fov: 28, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Rig yaw={yaw} pitch={pitch} dist={dist} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 5]} intensity={1.0} />
        <spotLight position={[0, 6, 4]} angle={0.5} penumbra={1} intensity={70} color="#eef3ff" />
        <spotLight position={[-6, 3, 1]} angle={0.5} penumbra={1} intensity={30} color="#3b82f6" />
        <Environment resolution={256} frames={1}>
          <Lightformer intensity={2.4} form="rect" scale={[8, 3, 1]} position={[0, 5, -1]} rotation-x={Math.PI / 2} color="#e8eefc" />
          <Lightformer intensity={1.2} form="rect" scale={[2, 7, 1]} position={[-6, 1, 2]} rotation-y={Math.PI / 2} color="#7fb3ff" />
          <Lightformer intensity={1.6} form="rect" scale={[3, 6, 1]} position={[6, 0, 1]} rotation-y={-Math.PI / 2} color="#ffffff" />
        </Environment>
        <Suspense fallback={null}>
          <group scale={1 / spec.size} position={[0, 0, 0]}>
            <group scale={1.9}>
              <DeviceModel spec={spec} />
            </group>
          </group>
          <Ready />
        </Suspense>
      </Canvas>
    </div>
  );
}

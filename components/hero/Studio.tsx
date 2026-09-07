"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

/*
 * Shared lighting for both stages: a static studio (soft top box, cool left
 * fill, white right fill) plus one warm light that slowly orbits, so specular
 * highlights travel across glass and metal the way they do under a moving
 * light in a real showroom.
 */

export function Studio({ sweep = true }: { sweep?: boolean }) {
  const orbit = useRef<THREE.SpotLight>(null);
  useFrame((state) => {
    const l = orbit.current;
    if (!l || !sweep) return;
    const t = state.clock.elapsedTime * 0.3;
    l.position.set(Math.cos(t) * 5.5, 3.6 + Math.sin(t * 0.7) * 0.8, Math.sin(t) * 4 + 2.5);
  });
  return (
    <>
      <ambientLight intensity={0.28} />
      <directionalLight position={[4, 6, 5]} intensity={0.8} />
      <spotLight position={[0, 6, 3]} angle={0.42} penumbra={1} intensity={80} color="#eef3ff" />
      <spotLight position={[-7, 3, -1]} angle={0.5} penumbra={1} intensity={40} color="#3b82f6" />
      <spotLight ref={orbit} position={[5, 4, 3]} angle={0.6} penumbra={1} intensity={55} color="#ffe9c9" />
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.4} form="rect" scale={[8, 3, 1]} position={[0, 5, -1]} rotation-x={Math.PI / 2} color="#e8eefc" />
        <Lightformer intensity={1.2} form="rect" scale={[2, 7, 1]} position={[-6, 1, 2]} rotation-y={Math.PI / 2} color="#7fb3ff" />
        <Lightformer intensity={1.6} form="rect" scale={[3, 6, 1]} position={[6, 0, 1]} rotation-y={-Math.PI / 2} color="#ffffff" />
        <Lightformer intensity={0.8} form="rect" scale={[4, 1, 1]} position={[0, -3, 4]} rotation-x={-Math.PI / 3} color="#c9a96e" />
      </Environment>
    </>
  );
}

/** Soft radial texture reused for light pools and contact shadows. */
export function useRadialTexture(inner: string, mid: string, outer: string) {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, inner);
    g.addColorStop(0.4, mid);
    g.addColorStop(1, outer);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [inner, mid, outer]);
}

/** A blurred contact shadow under a device: darkens the floor, no extra render pass. */
export function BlobShadow({ size, y }: { size: number; y: number }) {
  const texture = useRadialTexture("rgba(0,0,0,0.55)", "rgba(0,0,0,0.22)", "rgba(0,0,0,0)");
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, y, 0]}>
      <planeGeometry args={[size * 1.3, size * 0.7]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
  );
}

/** Slow dust in the air: a few hundred points drifting and turning. */
/** Deterministic pseudo-random so the dust is identical on every render (mulberry32). */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function Dust({ count = 220, spread = 14 }: { count?: number; spread?: number }) {
  const group = useRef<THREE.Group>(null);
  const positions = useMemo(() => {
    const rand = seeded(count * 31 + Math.round(spread * 7));
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * spread;
      arr[i * 3 + 1] = (rand() - 0.5) * spread * 0.5;
      arr[i * 3 + 2] = (rand() - 0.5) * spread * 0.6 - 2;
    }
    return arr;
  }, [count, spread]);
  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.rotation.y = t * 0.02;
    g.position.y = Math.sin(t * 0.15) * 0.25;
  });
  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.035} color="#9dbcff" transparent opacity={0.45} sizeAttenuation depthWrite={false} />
      </points>
    </group>
  );
}

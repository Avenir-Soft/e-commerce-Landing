"use client";

import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/*
 * Stylised silhouettes of the five product lines, built from rounded boxes and
 * a handful of shared physical materials. No trademarks, no model files:
 * the materials and proportions do the recognising.
 */

const titanium = new THREE.MeshPhysicalMaterial({
  color: "#a3a8b1",
  metalness: 0.92,
  roughness: 0.3,
  clearcoat: 0.5,
  clearcoatRoughness: 0.25,
  envMapIntensity: 1.3,
});
const aluminium = new THREE.MeshPhysicalMaterial({
  color: "#c9ccd3",
  metalness: 0.85,
  roughness: 0.38,
  clearcoat: 0.25,
  envMapIntensity: 1.1,
});
const glass = new THREE.MeshPhysicalMaterial({
  color: "#05080f",
  metalness: 0.25,
  roughness: 0.1,
  clearcoat: 1,
  clearcoatRoughness: 0.05,
  emissive: new THREE.Color("#0a1b36"),
  emissiveIntensity: 0.55,
  envMapIntensity: 1.6,
});
const lens = new THREE.MeshPhysicalMaterial({
  color: "#0b0f18",
  metalness: 0.4,
  roughness: 0.15,
  clearcoat: 1,
  envMapIntensity: 2,
});
const plateau = new THREE.MeshPhysicalMaterial({
  color: "#7d838d",
  metalness: 0.9,
  roughness: 0.42,
});
const whiteGloss = new THREE.MeshPhysicalMaterial({
  color: "#f4f5f7",
  metalness: 0.05,
  roughness: 0.22,
  clearcoat: 1,
  clearcoatRoughness: 0.08,
  envMapIntensity: 1.2,
});
const rubber = new THREE.MeshStandardMaterial({
  color: "#1b2f4d",
  metalness: 0.05,
  roughness: 0.92,
});
const keys = new THREE.MeshStandardMaterial({
  color: "#1a1f29",
  metalness: 0.2,
  roughness: 0.7,
});

const SMOOTH = 6;

export function Phone() {
  return (
    <group scale={1.02}>
      <RoundedBox args={[0.76, 1.56, 0.082]} radius={0.11} smoothness={SMOOTH} material={titanium} />
      {/* front glass */}
      <RoundedBox args={[0.7, 1.5, 0.014]} radius={0.085} smoothness={SMOOTH} position={[0, 0, 0.042]} material={glass} />
      {/* back glass */}
      <RoundedBox args={[0.7, 1.5, 0.014]} radius={0.085} smoothness={SMOOTH} position={[0, 0, -0.042]} material={keys} />
      {/* camera plateau */}
      <group position={[-0.17, 0.53, -0.055]}>
        <RoundedBox args={[0.34, 0.34, 0.03]} radius={0.08} smoothness={SMOOTH} material={plateau} />
        {[
          [-0.075, 0.075],
          [-0.075, -0.075],
          [0.075, 0],
        ].map(([x, y]) => (
          <mesh key={`${x}-${y}`} position={[x, y, -0.02]} rotation={[Math.PI / 2, 0, 0]} material={lens}>
            <cylinderGeometry args={[0.055, 0.055, 0.02, 32]} />
          </mesh>
        ))}
      </group>
      {/* side buttons */}
      <RoundedBox args={[0.012, 0.16, 0.03]} radius={0.005} position={[0.383, 0.32, 0]} material={titanium} />
      <RoundedBox args={[0.012, 0.1, 0.03]} radius={0.005} position={[-0.383, 0.45, 0]} material={titanium} />
      <RoundedBox args={[0.012, 0.1, 0.03]} radius={0.005} position={[-0.383, 0.3, 0]} material={titanium} />
    </group>
  );
}

export function Laptop() {
  const lidAngle = THREE.MathUtils.degToRad(-104);
  return (
    <group position={[0, -0.42, 0]} rotation={[0.12, -0.32, 0]} scale={0.98}>
      {/* base */}
      <RoundedBox args={[1.76, 0.07, 1.14]} radius={0.035} smoothness={SMOOTH} material={aluminium} />
      <RoundedBox args={[1.42, 0.006, 0.56]} radius={0.01} position={[0, 0.038, -0.12]} material={keys} />
      <RoundedBox args={[0.6, 0.004, 0.36]} radius={0.01} position={[0, 0.038, 0.34]} material={plateau} />
      {/* lid, hinged at the back edge */}
      <group position={[0, 0.035, -0.55]} rotation={[lidAngle, 0, 0]}>
        <RoundedBox args={[1.76, 0.05, 1.12]} radius={0.035} smoothness={SMOOTH} position={[0, 0, 0.56]} material={aluminium} />
        <RoundedBox args={[1.64, 0.012, 1.0]} radius={0.02} position={[0, 0.028, 0.56]} material={glass} />
      </group>
    </group>
  );
}

export function Tablet() {
  return (
    <group rotation={[0, 0, 0]} scale={1.0}>
      <RoundedBox args={[1.12, 1.54, 0.062]} radius={0.075} smoothness={SMOOTH} material={aluminium} />
      <RoundedBox args={[1.02, 1.44, 0.012]} radius={0.05} smoothness={SMOOTH} position={[0, 0, 0.032]} material={glass} />
      <mesh position={[0.42, 0.62, -0.04]} rotation={[Math.PI / 2, 0, 0]} material={lens}>
        <cylinderGeometry args={[0.045, 0.045, 0.02, 32]} />
      </mesh>
    </group>
  );
}

export function Watch() {
  return (
    <group scale={1.25}>
      <RoundedBox args={[0.64, 0.76, 0.16]} radius={0.2} smoothness={SMOOTH} material={titanium} />
      <RoundedBox args={[0.56, 0.68, 0.014]} radius={0.16} smoothness={SMOOTH} position={[0, 0, 0.08]} material={glass} />
      {/* crown + button */}
      <mesh position={[0.35, 0.12, 0]} rotation={[0, 0, Math.PI / 2]} material={titanium}>
        <cylinderGeometry args={[0.055, 0.055, 0.07, 24]} />
      </mesh>
      <RoundedBox args={[0.04, 0.16, 0.06]} radius={0.015} position={[0.34, -0.14, 0]} material={titanium} />
      {/* band */}
      <RoundedBox args={[0.42, 0.62, 0.07]} radius={0.06} smoothness={SMOOTH} position={[0, 0.66, -0.1]} rotation={[-0.32, 0, 0]} material={rubber} />
      <RoundedBox args={[0.42, 0.62, 0.07]} radius={0.06} smoothness={SMOOTH} position={[0, -0.66, -0.1]} rotation={[0.32, 0, 0]} material={rubber} />
    </group>
  );
}

export function Earbuds() {
  return (
    <group scale={1.35} rotation={[0.1, 0, 0]}>
      <RoundedBox args={[0.74, 0.6, 0.28]} radius={0.2} smoothness={SMOOTH} material={whiteGloss} />
      {/* lid seam */}
      <RoundedBox args={[0.745, 0.012, 0.285]} radius={0.004} position={[0, 0.06, 0]} material={keys} />
      {/* status light */}
      <mesh position={[0, -0.09, 0.142]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.014, 0.014, 0.004, 16]} />
        <meshStandardMaterial color="#60a5fa" emissive="#2563eb" emissiveIntensity={2.2} />
      </mesh>
    </group>
  );
}

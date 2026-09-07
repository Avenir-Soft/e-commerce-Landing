"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export interface ModelSpec {
  id: string;
  url: string;
  /** Largest dimension after normalisation, in world units. */
  size: number;
  /** Orientation fix for the source model, applied around its centre. */
  rotation: [number, number, number];
}

const ENV_MAP_INTENSITY = 1.4;

/**
 * Loads a meshopt-compressed GLB, centres it and scales it to `spec.size`, so
 * every product line sits on the carousel at a comparable size regardless of
 * the units the artist exported in.
 */
export function DeviceModel({ spec }: { spec: ModelSpec }) {
  const { scene } = useGLTF(spec.url, false, true);

  const object = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((node) => {
      const mesh = node as THREE.Mesh;
      if (!mesh.isMesh) return;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const material of materials) {
        const std = material as THREE.MeshStandardMaterial;
        if (std.isMeshStandardMaterial) std.envMapIntensity = ENV_MAP_INTENSITY;
      }
    });
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = spec.size / Math.max(size.x, size.y, size.z);
    clone.scale.setScalar(scale);
    clone.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    return clone;
  }, [scene, spec.size]);

  return (
    <group rotation={spec.rotation}>
      <primitive object={object} />
    </group>
  );
}

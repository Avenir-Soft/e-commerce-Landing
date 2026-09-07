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
 * the units the artist exported in. Expensive material features that need an
 * extra render pass (transmission) are switched off: on this page the models
 * only ever face the camera, so plain glossy glass looks the same for a
 * fraction of the cost.
 */
export function DeviceModel({ spec }: { spec: ModelSpec }) {
  const { scene } = useGLTF(spec.url, false, true);

  const object = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((node) => {
      const mesh = node as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.frustumCulled = true;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const material of materials) {
        const std = material as THREE.MeshPhysicalMaterial;
        if (!std.isMeshStandardMaterial) continue;
        std.envMapIntensity = ENV_MAP_INTENSITY;
        if ("transmission" in std && std.transmission > 0) {
          std.transmission = 0;
          std.transparent = true;
          std.opacity = Math.max(std.opacity, 0.85);
          std.needsUpdate = true;
        }
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

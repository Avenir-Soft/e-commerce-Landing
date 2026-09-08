"use client";

import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export interface ScreenSpec {
  /** Name of the material that is the display in the source model. */
  material: string;
  /** Still of a platform screen (public/screens). */
  url: string;
  /** UV fixes for the source model: quarter turns and mirroring. */
  rotation?: number;
  flipX?: boolean;
  flipY?: boolean;
  /** Models whose display is an emissive surface need the still on the emissive slot. */
  emissive?: boolean;
}

export interface ModelSpec {
  id: string;
  url: string;
  /** Largest dimension after normalisation, in world units. */
  size: number;
  /** Orientation fix for the source model, applied around its centre. */
  rotation: [number, number, number];
  /** Platform screen shown on the device's display. */
  screen?: ScreenSpec;
}

const ENV_MAP_INTENSITY = 1.4;
const loader = new THREE.TextureLoader();

function loadScreen(screen: ScreenSpec) {
  const tex = loader.load(screen.url);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.flipY = false;
  tex.center.set(0.5, 0.5);
  tex.rotation = screen.rotation ?? 0;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(screen.flipX ? -1 : 1, screen.flipY ? -1 : 1);
  tex.anisotropy = 16;
  return tex;
}

/**
 * Loads a meshopt-compressed GLB, centres it and scales it to `spec.size`, so
 * every device sits on the stage at a comparable size regardless of the units
 * the artist exported in. The display material is cloned per instance and
 * given the platform screen, so the same phone can show the storefront in one
 * place and the checkout in another. Transmission is switched off: it needs
 * an extra render pass and plain glossy glass looks the same head-on.
 */
export function DeviceModel({ spec }: { spec: ModelSpec }) {
  const { scene } = useGLTF(spec.url, false, true);

  const { object, screenTexture } = useMemo(() => {
    const clone = scene.clone(true);
    const screenTexture = spec.screen ? loadScreen(spec.screen) : null;
    clone.traverse((node) => {
      const mesh = node as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.frustumCulled = true;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((material, i) => {
        const std = material as THREE.MeshPhysicalMaterial;
        if (!std.isMeshStandardMaterial) return;
        std.envMapIntensity = ENV_MAP_INTENSITY;
        if ("transmission" in std && std.transmission > 0) {
          std.transmission = 0;
          std.transparent = true;
          std.opacity = Math.max(std.opacity, 0.85);
          std.needsUpdate = true;
        }
        if (spec.screen && screenTexture && std.name === spec.screen.material) {
          const own = std.clone();
          own.map = screenTexture;
          own.color = new THREE.Color("#ffffff");
          own.emissive = new THREE.Color("#ffffff");
          own.emissiveMap = screenTexture;
          // The display is a light source of its own: bright enough to read under
          // the studio lights, matte enough that the orbiting highlight never
          // washes the UI out. Raised with the move to Neutral tone mapping,
          // which no longer compresses the top end the way ACES did.
          own.emissiveIntensity = spec.screen.emissive ? 1.5 : 1.3;
          // less diffuse and less reflection on the glass: both only add the
          // room's grey to a surface that should be showing its own picture
          own.roughness = 0.3;
          own.metalness = 0;
          own.envMapIntensity = 0.06;
          own.needsUpdate = true;
          if (Array.isArray(mesh.material)) mesh.material[i] = own;
          else mesh.material = own;
        }
      });
    });
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = spec.size / Math.max(size.x, size.y, size.z);
    clone.scale.setScalar(scale);
    clone.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    return { object: clone, screenTexture };
  }, [scene, spec]);

  useEffect(() => () => screenTexture?.dispose(), [screenTexture]);

  return (
    <group rotation={spec.rotation}>
      <primitive object={object} />
    </group>
  );
}

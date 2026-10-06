'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useM4Store } from '@/store/useM4Store';

/* ============================================================================
   CANVAS ERROR BOUNDARY
   ============================================================================ */
class GLTFErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.log('GLTF loader encountered error:', error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

/* ============================================================================
   BMW M4 GLTF / GLB MODEL RENDERER
   ============================================================================ */
function M4GLTFModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const { paint, wheel, brake } = useM4Store();
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    // 1. Calculate Bounding Box of actual loaded BMW M4 GLB model
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    // 2. Scale car automatically to occupy ~70% of hero visual area (~4.8 units wide)
    const targetScale = 4.8 / (maxDim || 1);
    clonedScene.scale.set(targetScale, targetScale, targetScale);

    // 3. Center model horizontally and position bottom tires flat on ground plane (y = 0)
    box.setFromObject(clonedScene);
    const center = box.getCenter(new THREE.Vector3());
    clonedScene.position.x = -center.x;
    clonedScene.position.y = -box.min.y;
    clonedScene.position.z = -center.z;

    // 4. Enable PBR shadows and dynamic material bindings
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const name = (mesh.name || '').toLowerCase();
        const matName = (
          Array.isArray(mesh.material) ? mesh.material[0]?.name : mesh.material?.name || ''
        ).toLowerCase();

        // Dynamically apply customizer paint finish to car body panel meshes
        if (
          name.includes('body') ||
          name.includes('paint') ||
          name.includes('car_body') ||
          matName.includes('paint') ||
          matName.includes('body')
        ) {
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(paint.hex),
            roughness: paint.roughness,
            metalness: paint.metalness,
            clearcoat: paint.clearcoat,
            clearcoatRoughness: 0.08,
            reflectivity: 1.0,
          });
        } else if (name.includes('brake') || name.includes('caliper')) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(brake.colorHex),
            roughness: 0.2,
            metalness: 0.8,
          });
        } else if (name.includes('wheel') || name.includes('rim')) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(wheel.spokeColor),
            roughness: 0.2,
            metalness: 0.9,
          });
        }
      }
    });
  }, [clonedScene, paint, wheel, brake]);

  return <primitive object={clonedScene} />;
}

/* ============================================================================
   MAIN BMW M4 MODEL CONTAINER (WITH ASSET VALIDATION PREVENTING CRASHES)
   ============================================================================ */
export function BMW4Model() {
  const [isAssetAvailable, setIsAssetAvailable] = useState<boolean | null>(null);
  const gltfPath = '/models/bmw-m4.glb';

  useEffect(() => {
    fetch(gltfPath, { method: 'HEAD' })
      .then((res) => {
        if (res.ok && res.status === 200) {
          setIsAssetAvailable(true);
        } else {
          setIsAssetAvailable(false);
        }
      })
      .catch(() => setIsAssetAvailable(false));
  }, [gltfPath]);

  if (isAssetAvailable === true) {
    return (
      <GLTFErrorBoundary>
        <React.Suspense fallback={null}>
          <M4GLTFModel url={gltfPath} />
        </React.Suspense>
      </GLTFErrorBoundary>
    );
  }

  if (isAssetAvailable === false) {
    return (
      <group position={[0, 0.6, 0]}>
        <Html center position={[0, 0, 0]} zIndexRange={[100, 0]}>
          <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/10 bg-black/80 backdrop-blur-md text-center max-w-xs shadow-2xl">
            <span className="font-mono text-[10px] text-bmw-cyan tracking-widest uppercase font-bold mb-1">
              BMW M4 3D LOADER
            </span>
            <span className="font-mono text-[11px] text-gray-300">
              Awaiting model at public/models/bmw-m4.glb
            </span>
          </div>
        </Html>
      </group>
    );
  }

  return null;
}

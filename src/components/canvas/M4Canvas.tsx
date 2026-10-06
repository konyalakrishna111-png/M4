'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { useM4Store } from '@/store/useM4Store';
import { BMW4Model } from './BMW4Model';
import { StudioEnvironment } from './StudioEnvironment';

function CameraController() {
  const { currentSection, activeHotspot, interiorView, explodedView } = useM4Store();
  const controlsRef = useRef<OrbitControlsImpl>(null!);

  useFrame((state, delta) => {
    if (!controlsRef.current) return;

    // Cinematic 3/4 Front Camera Position: [x: 4.0, y: 1.5, z: 6.0], target: [x: 0, y: 0.7, z: 0]
    let targetCamPos = new THREE.Vector3(4.0, 1.5, 6.0);
    let targetLookAt = new THREE.Vector3(0, 0.7, 0);

    if (interiorView) {
      targetCamPos = new THREE.Vector3(-0.35, 0.75, 0.25);
      targetLookAt = new THREE.Vector3(-0.3, 0.55, 0.7);
    } else if (explodedView) {
      targetCamPos = new THREE.Vector3(5.0, 3.0, 5.0);
      targetLookAt = new THREE.Vector3(0, 0.8, 0);
    } else if (activeHotspot) {
      const [hx, hy, hz] = activeHotspot.position;
      targetCamPos = new THREE.Vector3(
        hx === 0 ? 0.8 : hx * 1.8,
        hy + 0.35,
        hz === 0 ? 1.8 : hz * 1.5
      );
      targetLookAt = new THREE.Vector3(hx, hy, hz);
    } else {
      // Timeline position mapping for journey
      switch (currentSection) {
        case 1: // FRONT
          targetCamPos = new THREE.Vector3(0, 0.8, 4.2);
          targetLookAt = new THREE.Vector3(0, 0.5, 1.6);
          break;
        case 2: // SILHOUETTE
          targetCamPos = new THREE.Vector3(-4.8, 1.3, 0.8);
          targetLookAt = new THREE.Vector3(0, 0.55, 0);
          break;
        case 3: // WHEELS
          targetCamPos = new THREE.Vector3(-2.2, 0.5, 2.0);
          targetLookAt = new THREE.Vector3(-0.92, 0.36, 1.35);
          break;
        case 4: // AERODYNAMICS
          targetCamPos = new THREE.Vector3(3.2, 1.8, -2.8);
          targetLookAt = new THREE.Vector3(0, 0.5, -1.0);
          break;
        case 5: // REAR
          targetCamPos = new THREE.Vector3(0, 0.9, -4.2);
          targetLookAt = new THREE.Vector3(0, 0.55, -1.6);
          break;
        default: // HERO 0 (3/4 Front Cinematic View)
          targetCamPos = new THREE.Vector3(4.0, 1.5, 6.0);
          targetLookAt = new THREE.Vector3(0, 0.7, 0);
          break;
      }
    }

    // Smooth camera interpolation
    state.camera.position.lerp(targetCamPos, delta * 3.5);
    controlsRef.current.target.lerp(targetLookAt, delta * 3.5);
    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={1.8}
      maxDistance={10.0}
      maxPolarAngle={Math.PI / 2 + 0.01} // Restrict camera from going below floor plane
      rotateSpeed={0.8}
      dampingFactor={0.05}
    />
  );
}

export function M4Canvas() {
  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [4.0, 1.5, 6.0], fov: 35 }}
        shadows
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.25;
        }}
      >
        <StudioEnvironment />
        <BMW4Model />
        <CameraController />
      </Canvas>
    </div>
  );
}

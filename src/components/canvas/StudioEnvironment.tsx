'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useM4Store } from '@/store/useM4Store';

export function StudioEnvironment() {
  const { lightingTime, environmentMode, currentSection } = useM4Store();
  const particlesRef = useRef<THREE.Points>(null!);

  // Aero airflow particle movement
  useFrame((_, delta) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] -= delta * 6; // Move back along Z axis
        if (positions[i + 2] < -3) {
          positions[i + 2] = 3; // Loop back front
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Lighting intensities based on selected time/preset
  const getLightingProps = () => {
    switch (lightingTime) {
      case 'day':
        return {
          ambientIntensity: 0.8,
          dirIntensity: 2.5,
          bgColor: '#0a0d14',
          lightColor: '#f0f4ff',
        };
      case 'sunset':
        return {
          ambientIntensity: 0.5,
          dirIntensity: 2.0,
          bgColor: '#140b08',
          lightColor: '#ff8a50',
        };
      case 'night':
      default:
        return {
          ambientIntensity: 0.2,
          dirIntensity: 1.5,
          bgColor: '#050507',
          lightColor: '#19d5ff',
        };
    }
  };

  const lights = getLightingProps();

  // Create airflow particle geometry
  const particleCount = 120;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 2.2;
    particlePositions[i * 3 + 1] = 0.2 + Math.random() * 1.2;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }

  return (
    <>
      <color attach="background" args={[lights.bgColor]} />
      <fog attach="fog" args={[lights.bgColor, 6, 22]} />

      {/* AMBIENT & DIRECTIONAL LIGHTING */}
      <ambientLight intensity={lights.ambientIntensity} />

      {/* Main Studio Key Light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={lights.dirIntensity}
        color={lights.lightColor}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />

      {/* Blue Rim Accent Light for BMW M Vibe */}
      <spotLight
        position={[-6, 4, -5]}
        intensity={3.5}
        color="#0066b1"
        angle={0.6}
        penumbra={0.8}
      />

      {/* Red Rear Accent Light */}
      <spotLight
        position={[6, 3, -6]}
        intensity={2.5}
        color="#e60000"
        angle={0.6}
        penumbra={0.8}
      />

      {/* SOFT CONTACT SHADOWS ON FLOOR */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.85}
        scale={12}
        blur={2}
        far={4}
        resolution={1024}
        color="#000000"
      />

      {/* STUDIO FLOOR GRID & REFLECTION */}
      <gridHelper args={[30, 30, '#19d5ff', '#1a202c']} position={[0, -0.01, 0]} />

      {/* HDRI ENVIRONMENT PRESETS */}
      <Environment preset={lightingTime === 'sunset' ? 'sunset' : environmentMode === 'city' ? 'city' : 'studio'} />

      {/* AERODYNAMICS STREAMLINES (VISIBLE IN AERO SECTION OR ALL THE TIME SUBTLY) */}
      {(currentSection === 4 || currentSection === 3) && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={particlePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.04}
            color="#19d5ff"
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </>
  );
}

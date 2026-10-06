'use client';

import React, { useEffect, useState } from 'react';
import { useM4Store } from '@/store/useM4Store';
import { soundEngine } from '@/utils/soundEngine';

export function CinematicLoader() {
  const { hasEntered, setHasEntered, soundEnabled } = useM4Store();
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate high quality 3D asset progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
    if (soundEnabled) {
      soundEngine.startEngineSound();
    }
  };

  if (hasEntered) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#050507] p-8 text-white transition-opacity duration-1000">
      {/* Top Brand Tag */}
      <div className="mt-8 flex items-center space-x-3">
        <div className="flex space-x-1">
          <span className="h-4 w-1.5 bg-[#0066B1]" />
          <span className="h-4 w-1.5 bg-[#003366]" />
          <span className="h-4 w-1.5 bg-[#E60000]" />
        </div>
        <span className="font-mono text-xs tracking-[0.3em] text-gray-400">BMW M PERFORMANCE</span>
      </div>

      {/* Main Title & Silhouette Reveal */}
      <div className="relative flex flex-col items-center text-center">
        <h1 className="font-display text-4xl tracking-[0.4em] font-extrabold sm:text-6xl md:text-8xl">
          BMW M4
        </h1>
        <p className="mt-4 font-mono text-xs tracking-[0.5em] text-bmw-cyan uppercase sm:text-sm">
          THE ART OF PERFORMANCE
        </p>

        {/* Light Sweep Silhouette Frame with Hero Image */}
        <div className="relative mt-12 h-44 w-80 overflow-hidden rounded-2xl border border-white/20 bg-black/60 backdrop-blur-xl sm:h-56 sm:w-[28rem] shadow-[0_0_40px_rgba(0,0,0,0.9)]">
          <div className="absolute inset-0">
            <img
              src="/images/bmw-m4-hero.png"
              alt="BMW M4 Sunset Rooftop Edition"
              className="h-full w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
            />
          </div>
          {/* Animated Light Sweep Effect */}
          <div
            className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-bmw-cyan/40 to-transparent transition-transform duration-1000 pointer-events-none"
            style={{
              transform: `translateX(${progress * 5 - 100}%)`,
            }}
          />
          {/* Subtle bottom gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-4 flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-bmw-cyan animate-pulse" />
            <span className="font-mono text-[9px] tracking-widest text-gray-300 uppercase">
              M4 COMPETITION ROOFTOP EDITION
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Progress & Enter CTA */}
      <div className="mb-12 flex flex-col items-center space-y-6">
        {!isReady ? (
          <div className="flex flex-col items-center space-y-2">
            <span className="font-mono text-3xl font-light text-white sm:text-4xl">
              {progress < 10 ? `0${progress}` : progress}%
            </span>
            <div className="h-0.5 w-48 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full bg-bmw-cyan transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase">
              INITIALIZING WebGL 3D ENGINE
            </span>
          </div>
        ) : (
          <button
            onClick={handleEnter}
            className="group relative inline-flex items-center space-x-4 border border-white/30 bg-white/5 px-8 py-4 text-xs font-bold tracking-[0.4em] text-white backdrop-blur-md transition-all hover:border-bmw-cyan hover:bg-bmw-blue/20 hover:shadow-[0_0_25px_rgba(0,102,177,0.6)]"
          >
            <span>ENTER EXPERIENCE</span>
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </button>
        )}
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { useM4Store } from '@/store/useM4Store';
import { soundEngine } from '@/utils/soundEngine';
import { Volume2, VolumeX, Box, Eye, Sparkles } from 'lucide-react';

export function Navbar({ onOpenConfigurator }: { onOpenConfigurator: () => void }) {
  const {
    currentSection,
    setCurrentSection,
    soundEnabled,
    toggleSound,
    explodedView,
    toggleExplodedView,
    interiorView,
    toggleInteriorView,
  } = useM4Store();

  const handleSoundToggle = () => {
    toggleSound();
    if (!soundEnabled) {
      soundEngine.startEngineSound();
    } else {
      soundEngine.stopEngineSound();
    }
  };

  const navItems = [
    { label: 'MODEL', section: 0 },
    { label: 'DESIGN', section: 2 },
    { label: 'PERFORMANCE', section: 3 },
    { label: 'AERODYNAMICS', section: 4 },
    { label: 'REAR', section: 5 },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5 backdrop-blur-md border-b border-white/10 bg-black/30 text-white">
      {/* Left Brand */}
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentSection(0)}>
        <div className="flex space-x-1">
          <span className="h-5 w-1.5 bg-[#0066B1]" />
          <span className="h-5 w-1.5 bg-[#003366]" />
          <span className="h-5 w-1.5 bg-[#E60000]" />
        </div>
        <span className="font-display text-lg font-bold tracking-[0.2em]">BMW M4</span>
      </div>

      {/* Center Nav Links */}
      <nav className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <button
            key={item.section}
            onClick={() => {
              setCurrentSection(item.section);
              soundEngine.playClickSound();
            }}
            className={`font-mono text-xs tracking-[0.3em] transition-colors relative py-1 ${
              currentSection === item.section ? 'text-bmw-cyan font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            {item.label}
            {currentSection === item.section && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-bmw-cyan" />
            )}
          </button>
        ))}
      </nav>

      {/* Right Controls */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Exploded Engine View Toggle */}
        <button
          onClick={() => {
            toggleExplodedView();
            soundEngine.playClickSound();
          }}
          className={`flex items-center space-x-2 rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-wider transition-all ${
            explodedView
              ? 'border-bmw-cyan bg-bmw-blue/30 text-bmw-cyan shadow-[0_0_15px_rgba(25,213,255,0.4)]'
              : 'border-white/20 bg-black/40 text-gray-300 hover:border-white/50'
          }`}
          title="Exploded Technical Engine View"
        >
          <Box className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">EXPLODED VIEW</span>
        </button>

        {/* Interior Cabin Toggle */}
        <button
          onClick={() => {
            toggleInteriorView();
            soundEngine.playClickSound();
          }}
          className={`flex items-center space-x-2 rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-wider transition-all ${
            interiorView
              ? 'border-bmw-cyan bg-bmw-blue/30 text-bmw-cyan shadow-[0_0_15px_rgba(25,213,255,0.4)]'
              : 'border-white/20 bg-black/40 text-gray-300 hover:border-white/50'
          }`}
          title="360 Cabin Interior Mode"
        >
          <Eye className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">INTERIOR</span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={handleSoundToggle}
          className="rounded-full border border-white/20 bg-black/40 p-2 text-gray-300 transition-colors hover:border-white hover:text-white"
          title={soundEnabled ? 'Mute Engine Sound' : 'Enable TwinTurbo Sound'}
        >
          {soundEnabled ? <Volume2 className="h-4 w-4 text-bmw-cyan" /> : <VolumeX className="h-4 w-4" />}
        </button>

        {/* Configurator Trigger */}
        <button
          onClick={() => {
            onOpenConfigurator();
            soundEngine.playClickSound();
          }}
          className="flex items-center space-x-2 rounded-full border border-bmw-blue bg-bmw-blue/20 px-4 py-1.5 font-mono text-xs font-bold tracking-widest text-white backdrop-blur-md transition-all hover:bg-bmw-blue hover:shadow-[0_0_20px_rgba(0,102,177,0.8)]"
        >
          <Sparkles className="h-3.5 w-3.5 text-bmw-cyan" />
          <span>CONFIGURE</span>
        </button>
      </div>
    </header>
  );
}

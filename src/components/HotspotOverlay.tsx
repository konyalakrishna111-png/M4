'use client';

import React from 'react';
import { useM4Store } from '@/store/useM4Store';
import { X, CheckCircle2, ChevronRight } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

export function HotspotOverlay() {
  const { activeHotspot, setActiveHotspot } = useM4Store();

  if (!activeHotspot) return null;

  return (
    <div className="fixed bottom-8 left-6 z-40 max-w-md w-[calc(100vw-3rem)] rounded-2xl border border-white/15 bg-black/80 p-6 text-white backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom-6 duration-300">
      {/* Header with Close */}
      <div className="flex items-start justify-between border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-[10px] tracking-[0.3em] text-bmw-cyan uppercase font-bold">
            {activeHotspot.subtitle}
          </span>
          <h3 className="mt-1 font-display text-lg font-extrabold tracking-wider text-white">
            {activeHotspot.title}
          </h3>
        </div>
        <button
          onClick={() => {
            setActiveHotspot(null);
            soundEngine.playClickSound();
          }}
          className="rounded-full border border-white/20 bg-white/5 p-1.5 text-gray-400 transition-colors hover:border-white hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Description */}
      <p className="mt-4 text-xs leading-relaxed text-gray-300">
        {activeHotspot.description}
      </p>

      {/* Technical Highlights */}
      <div className="mt-4 space-y-2">
        {activeHotspot.specs.map((spec, i) => (
          <div key={i} className="flex items-center space-x-2 text-[11px] text-gray-300">
            <CheckCircle2 className="h-3.5 w-3.5 text-bmw-cyan shrink-0" />
            <span>{spec}</span>
          </div>
        ))}
      </div>

      {/* Action CTA */}
      <div className="mt-6 flex items-center justify-between pt-2">
        <button
          onClick={() => {
            setActiveHotspot(null);
            soundEngine.playClickSound();
          }}
          className="group inline-flex items-center space-x-2 font-mono text-xs text-bmw-cyan hover:underline"
        >
          <span>CLOSE SPECIFICATION</span>
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </button>

        <span className="font-mono text-[10px] text-gray-500">M4-SPEC #{activeHotspot.id}</span>
      </div>
    </div>
  );
}

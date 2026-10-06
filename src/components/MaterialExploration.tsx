'use client';

import React from 'react';
import { useM4Store } from '@/store/useM4Store';
import { soundEngine } from '@/utils/soundEngine';
import { Shield, Sparkles, Circle, Box } from 'lucide-react';

export function MaterialExploration() {
  const { materialFocus, setMaterialFocus } = useM4Store();

  const materials = [
    { id: 'paint', name: 'METALLIC PAINTWORK', desc: 'Deep multi-layer clearcoat reflectivity' },
    { id: 'carbon', name: 'CFRP CARBON FIBER', desc: 'Ultra-lightweight structural weave roof & trim' },
    { id: 'metal', name: 'FORGED M ALLOY', desc: 'Precision machined 826M high-tensile alloy' },
    { id: 'leather', name: 'MERINO LEATHER', desc: 'Supple fine-grain leather with M stitching' },
    { id: 'glass', name: 'SOLAR GLASS', desc: 'Acoustic double-glazed UV protective glass' },
    { id: 'rubber', name: 'PILOT SPORT RUBBER', desc: 'High-grip Cup 2 track tire compound' },
  ];

  return (
    <div className="fixed bottom-8 right-6 z-30 hidden lg:flex flex-col items-end space-y-3">
      <div className="flex items-center space-x-2 rounded-full border border-white/10 bg-black/60 px-4 py-1.5 backdrop-blur-md">
        <Sparkles className="h-3.5 w-3.5 text-bmw-cyan" />
        <span className="font-mono text-[10px] tracking-widest text-gray-300 uppercase">
          MATERIAL EXPLORER
        </span>
      </div>

      <div className="flex flex-wrap max-w-sm justify-end gap-2">
        {materials.map((mat) => (
          <button
            key={mat.id}
            onClick={() => {
              const newMat = materialFocus === mat.id ? null : (mat.id as typeof materialFocus);
              setMaterialFocus(newMat);
              soundEngine.playClickSound();
            }}
            className={`rounded-xl border px-3 py-2 font-mono text-[11px] tracking-wider transition-all backdrop-blur-md ${
              materialFocus === mat.id
                ? 'border-bmw-cyan bg-bmw-blue/40 text-white shadow-[0_0_15px_rgba(25,213,255,0.4)]'
                : 'border-white/10 bg-black/50 text-gray-400 hover:border-white/30 hover:text-white'
            }`}
          >
            {mat.name}
          </button>
        ))}
      </div>
    </div>
  );
}

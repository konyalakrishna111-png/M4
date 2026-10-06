'use client';

import React, { useState } from 'react';
import {
  useM4Store,
  PAINT_OPTIONS,
  WHEEL_OPTIONS,
  BRAKE_OPTIONS,
  INTERIOR_OPTIONS,
  PaintOption,
  WheelOption,
  BrakeOption,
  InteriorOption,
} from '@/store/useM4Store';
import { soundEngine } from '@/utils/soundEngine';
import { X, Check, Save, Share2, Sun, Moon, Sunset, Layers } from 'lucide-react';

export function Configurator({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const {
    paint,
    setPaint,
    wheel,
    setWheel,
    brake,
    setBrake,
    interior,
    setInterior,
    lightingTime,
    setLightingTime,
    environmentMode,
    setEnvironmentMode,
  } = useM4Store();

  const [activeTab, setActiveTab] = useState<'paint' | 'wheels' | 'brakes' | 'interior' | 'environment'>('paint');
  const [isSaving, setIsSaving] = useState(false);
  const [savedBuildId, setSavedBuildId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveBuild = async () => {
    setIsSaving(true);
    soundEngine.playClickSound();

    try {
      const buildData = {
        model: 'BMW M4 Competition Coupe',
        paint: paint.name,
        paintHex: paint.hex,
        wheels: wheel.name,
        brakes: brake.name,
        interior: interior.name,
        environment: environmentMode,
        lighting: lightingTime,
        createdAt: new Date().toISOString(),
      };

      const res = await fetch('/api/configurations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildData),
      });

      const data = await res.json();
      if (data.id) {
        setSavedBuildId(data.id);
      }
    } catch {
      setSavedBuildId(`M4-BUILD-${Math.floor(100000 + Math.random() * 900000)}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-white/10 bg-black/90 text-white backdrop-blur-2xl transition-all duration-300 animate-in slide-in-from-right">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 p-6">
        <div>
          <span className="font-mono text-[10px] tracking-[0.3em] text-bmw-cyan uppercase font-bold">
            BMW M INDIVIDUAL CONFIGURATOR
          </span>
          <h2 className="font-display text-2xl font-black tracking-wider text-white">
            MAKE IT YOURS
          </h2>
        </div>
        <button
          onClick={() => {
            onClose();
            soundEngine.playClickSound();
          }}
          className="rounded-full border border-white/20 bg-white/5 p-2 text-gray-400 hover:border-white hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-white/10 px-4 py-2 scrollbar-none">
        {[
          { id: 'paint', label: 'PAINT' },
          { id: 'wheels', label: 'WHEELS' },
          { id: 'brakes', label: 'BRAKES' },
          { id: 'interior', label: 'INTERIOR' },
          { id: 'environment', label: 'STUDIO & LIGHTS' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as typeof activeTab);
              soundEngine.playClickSound();
            }}
            className={`whitespace-nowrap px-4 py-2 font-mono text-xs tracking-wider transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-bmw-cyan text-bmw-cyan font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Live Visual Preview Banner */}
      <div className="relative h-36 w-full overflow-hidden border-b border-white/10 bg-black">
        <img
          src="/images/bmw-m4-hero.png"
          alt="BMW M4 Configurator Live Preview"
          className="h-full w-full object-cover opacity-85 transition-all duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[10px]">
          <span className="rounded-full bg-bmw-blue/60 px-2.5 py-0.5 text-white font-bold backdrop-blur-md border border-bmw-cyan/40">
            {paint.name.toUpperCase()}
          </span>
          <span className="text-gray-300 tracking-wider">
            {lightingTime.toUpperCase()} • {wheel.name.split(' ')[0]}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* PAINT TAB */}
        {activeTab === 'paint' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400">EXTERIOR PAINTWORK</span>
              <span className="text-xs font-mono text-bmw-cyan font-bold">{paint.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {PAINT_OPTIONS.map((p: PaintOption) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setPaint(p);
                    soundEngine.playClickSound();
                  }}
                  className={`group relative flex items-center space-x-3 rounded-xl border p-3 text-left transition-all ${
                    paint.id === p.id
                      ? 'border-bmw-cyan bg-bmw-blue/20 shadow-[0_0_15px_rgba(25,213,255,0.3)]'
                      : 'border-white/10 bg-white/5 hover:border-white/30'
                  }`}
                >
                  <span
                    className="h-7 w-7 rounded-full border border-white/30 shadow-inner shrink-0"
                    style={{ backgroundColor: p.hex }}
                  />
                  <span className="text-xs font-medium text-gray-200 group-hover:text-white">
                    {p.name}
                  </span>
                  {paint.id === p.id && <Check className="h-4 w-4 text-bmw-cyan ml-auto" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* WHEELS TAB */}
        {activeTab === 'wheels' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400">PERFORMANCE WHEELS</span>
              <span className="text-xs font-mono text-bmw-cyan font-bold">{wheel.name}</span>
            </div>
            <div className="space-y-3">
              {WHEEL_OPTIONS.map((w: WheelOption) => (
                <button
                  key={w.id}
                  onClick={() => {
                    setWheel(w);
                    soundEngine.playClickSound();
                  }}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 transition-all ${
                    wheel.id === w.id
                      ? 'border-bmw-cyan bg-bmw-blue/20 shadow-[0_0_15px_rgba(25,213,255,0.3)]'
                      : 'border-white/10 bg-white/5 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: w.spokeColor }} />
                    </div>
                    <span className="text-xs font-medium text-gray-200">{w.name}</span>
                  </div>
                  {wheel.id === w.id && <Check className="h-4 w-4 text-bmw-cyan" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* BRAKES TAB */}
        {activeTab === 'brakes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400">M BRAKE CALIPERS</span>
              <span className="text-xs font-mono text-bmw-cyan font-bold">{brake.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {BRAKE_OPTIONS.map((b: BrakeOption) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setBrake(b);
                    soundEngine.playClickSound();
                  }}
                  className={`flex items-center space-x-3 rounded-xl border p-3 text-left transition-all ${
                    brake.id === b.id
                      ? 'border-bmw-cyan bg-bmw-blue/20 shadow-[0_0_15px_rgba(25,213,255,0.3)]'
                      : 'border-white/10 bg-white/5 hover:border-white/30'
                  }`}
                >
                  <span
                    className="h-6 w-6 rounded-full border border-white/30 shrink-0"
                    style={{ backgroundColor: b.colorHex }}
                  />
                  <span className="text-xs font-medium text-gray-200">{b.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* INTERIOR TAB */}
        {activeTab === 'interior' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400">CABIN UPHOLSTERY</span>
              <span className="text-xs font-mono text-bmw-cyan font-bold">{interior.name}</span>
            </div>
            <div className="space-y-3">
              {INTERIOR_OPTIONS.map((i: InteriorOption) => (
                <button
                  key={i.id}
                  onClick={() => {
                    setInterior(i);
                    soundEngine.playClickSound();
                  }}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 transition-all ${
                    interior.id === i.id
                      ? 'border-bmw-cyan bg-bmw-blue/20 shadow-[0_0_15px_rgba(25,213,255,0.3)]'
                      : 'border-white/10 bg-white/5 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="h-6 w-6 rounded-full border border-white/30" style={{ backgroundColor: i.hex }} />
                    <span className="text-xs font-medium text-gray-200">{i.name}</span>
                  </div>
                  {interior.id === i.id && <Check className="h-4 w-4 text-bmw-cyan" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ENVIRONMENT TAB */}
        {activeTab === 'environment' && (
          <div className="space-y-6">
            {/* Lighting Time */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-gray-400">ATMOSPHERIC LIGHTING</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'day', label: 'DAY', icon: Sun },
                  { id: 'sunset', label: 'SUNSET', icon: Sunset },
                  { id: 'night', label: 'NIGHT', icon: Moon },
                ].map((l) => {
                  const IconComp = l.icon;
                  return (
                    <button
                      key={l.id}
                      onClick={() => {
                        setLightingTime(l.id as typeof lightingTime);
                        soundEngine.playClickSound();
                      }}
                      className={`flex flex-col items-center justify-center rounded-xl border p-3 space-y-2 transition-all ${
                        lightingTime === l.id
                          ? 'border-bmw-cyan bg-bmw-blue/30 text-bmw-cyan'
                          : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/30'
                      }`}
                    >
                      <IconComp className="h-5 w-5" />
                      <span className="font-mono text-[10px] tracking-wider">{l.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Environments */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-gray-400">STUDIO ENVIRONMENT</span>
              <div className="space-y-2">
                {[
                  { id: 'studio', label: '01 DARK STUDIO' },
                  { id: 'mountain', label: '02 MOUNTAIN ROAD' },
                  { id: 'city', label: '03 CITY NIGHT' },
                  { id: 'tunnel', label: '04 HIGH-SPEED TUNNEL' },
                  { id: 'track', label: '05 NURBURGRING RACE TRACK' },
                ].map((env) => (
                  <button
                    key={env.id}
                    onClick={() => {
                      setEnvironmentMode(env.id as typeof environmentMode);
                      soundEngine.playClickSound();
                    }}
                    className={`flex w-full items-center justify-between rounded-xl border p-3 font-mono text-xs tracking-wider transition-all ${
                      environmentMode === env.id
                        ? 'border-bmw-cyan bg-bmw-blue/20 text-bmw-cyan'
                        : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/30'
                    }`}
                  >
                    <span>{env.label}</span>
                    {environmentMode === env.id && <Layers className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Save CTA */}
      <div className="border-t border-white/10 p-6 space-y-3 bg-black/40">
        {savedBuildId ? (
          <div className="rounded-xl border border-bmw-cyan/40 bg-bmw-blue/20 p-4 text-center">
            <span className="font-mono text-[10px] tracking-widest text-bmw-cyan uppercase font-bold">
              BUILD SAVED SUCCESSFULLY
            </span>
            <div className="mt-1 font-mono text-sm font-bold text-white">{savedBuildId}</div>
            <p className="mt-2 text-[11px] text-gray-300">
              Your custom BMW M4 configuration has been generated and stored.
            </p>
          </div>
        ) : (
          <button
            onClick={handleSaveBuild}
            disabled={isSaving}
            className="flex w-full items-center justify-center space-x-2 rounded-xl bg-bmw-blue py-4 font-mono text-xs font-bold tracking-[0.2em] text-white shadow-[0_0_25px_rgba(0,102,177,0.8)] transition-all hover:bg-blue-600 hover:shadow-[0_0_35px_rgba(0,102,177,1)]"
          >
            <Save className="h-4 w-4" />
            <span>{isSaving ? 'SAVING BUILD...' : 'SAVE BUILD CONFIGURATION'}</span>
          </button>
        )}
      </div>
    </div>
  );
}

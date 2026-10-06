'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useM4Store } from '@/store/useM4Store';
import { CinematicLoader } from '@/components/CinematicLoader';
import { Navbar } from '@/components/Navbar';
import { HotspotOverlay } from '@/components/HotspotOverlay';
import { Configurator } from '@/components/Configurator';
import { PerformanceSection } from '@/components/PerformanceSection';
import { MaterialExploration } from '@/components/MaterialExploration';
import { CustomCursor } from '@/components/CustomCursor';
import { ChevronDown, Sparkles, Move3d } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

// Dynamically import Three.js Canvas to prevent SSR issues
const M4Canvas = dynamic(
  () => import('@/components/canvas/M4Canvas').then((mod) => mod.M4Canvas),
  { ssr: false }
);

export default function Home() {
  const { currentSection, setCurrentSection, hasEntered } = useM4Store();
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);

  // Scroll listener to update camera journey section index dynamically
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollPos < windowHeight * 0.8) {
        setCurrentSection(0);
      } else if (scrollPos < windowHeight * 1.8) {
        setCurrentSection(1);
      } else if (scrollPos < windowHeight * 2.8) {
        setCurrentSection(2);
      } else if (scrollPos < windowHeight * 3.8) {
        setCurrentSection(3);
      } else if (scrollPos < windowHeight * 4.8) {
        setCurrentSection(4);
      } else {
        setCurrentSection(5);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setCurrentSection]);

  return (
    <main className="relative min-h-screen bg-[#050507] text-white selection:bg-bmw-blue selection:text-white overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Cinematic Intro Loader */}
      <CinematicLoader />

      {/* Fixed Luxury Navbar */}
      <Navbar onOpenConfigurator={() => setIsConfiguratorOpen(true)} />

      {/* FIXED 3D WEBGL CANVAS BACKGROUND */}
      <div className="fixed inset-0 z-0 h-screen w-screen">
        <M4Canvas />
      </div>

      {/* HOTSPOT MODAL OVERLAY */}
      <HotspotOverlay />

      {/* MATERIAL EXPLORATION TOOLBAR */}
      <MaterialExploration />

      {/* CONFIGURATOR DRAWER */}
      <Configurator isOpen={isConfiguratorOpen} onClose={() => setIsConfiguratorOpen(false)} />

      {/* SCROLL-LINKED CINEMATIC CAR JOURNEY OVERLAY SECTIONS */}
      {hasEntered && (
        <div className="relative z-10">
          {/* SECTION 0: HERO */}
          <section className="relative flex h-screen w-full flex-col justify-between p-8 pt-28">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center space-x-2">
                <span className="h-4 w-1.5 bg-[#0066B1]" />
                <span className="h-4 w-1.5 bg-[#003366]" />
                <span className="h-4 w-1.5 bg-[#E60000]" />
                <span className="font-mono text-xs tracking-[0.4em] text-bmw-cyan uppercase font-bold">
                  THE ULTIMATE DRIVING MACHINE
                </span>
              </div>
              <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl font-black tracking-tight uppercase leading-none">
                BMW M4
              </h1>
              <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gray-300 max-w-lg">
                COMPETITION COUPE WITH M XDRIVE. 503 HP INLINE-6 TWINPOWER TURBO.
              </p>
            </div>

            {/* Interaction Hint */}
            <div className="flex items-end justify-between border-t border-white/10 pt-6">
              <div className="flex items-center space-x-3 text-xs font-mono text-gray-400">
                <Move3d className="h-4 w-4 text-bmw-cyan animate-bounce" />
                <span>DRAG TO ROTATE &amp; EXPLORE 3D VEHICLE</span>
              </div>
              <div className="flex items-center space-x-2 font-mono text-xs text-gray-400">
                <span>SCROLL FOR CINEMATIC JOURNEY</span>
                <ChevronDown className="h-4 w-4 text-bmw-cyan animate-bounce" />
              </div>
            </div>
          </section>

          {/* SECTION 1: FRONT */}
          <section className="relative flex h-screen w-full flex-col justify-center px-8 sm:px-16">
            <div className="max-w-xl rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur-xl space-y-4">
              <span className="font-mono text-xs tracking-[0.3em] text-bmw-cyan uppercase font-bold">
                SECTION 01 — FRONT ARCHITECTURE
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black tracking-wider uppercase">
                TWIN-LOUVER M GRILLE
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-mono">
                Vertical kidney grille optimized for high-volume cooling air intake. Flanked by adaptive M Laserlight headlights projecting up to 650 meters.
              </p>
              <div className="flex items-center space-x-4 pt-2 font-mono text-[11px] text-bmw-cyan">
                <span>• 650m LASER BEAM</span>
                <span>• HIGH-GLOSS SHADOWLINE</span>
              </div>
            </div>
          </section>

          {/* SECTION 2: SILHOUETTE */}
          <section className="relative flex h-screen w-full flex-col justify-center items-end px-8 sm:px-16">
            <div className="max-w-xl rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur-xl space-y-4 text-right">
              <span className="font-mono text-xs tracking-[0.3em] text-bmw-cyan uppercase font-bold">
                SECTION 02 — AERODYNAMIC SILHOUETTE
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black tracking-wider uppercase">
                SCULPTED FOR SPEED
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-mono">
                Contoured CFRP Carbon Fiber roof lowers vehicle center of gravity. Extended side skirts direct laminar airflow with razor-sharp precision.
              </p>
              <div className="flex items-center justify-end space-x-4 pt-2 font-mono text-[11px] text-bmw-cyan">
                <span>• 5KG ROOF WEIGHT SAVINGS</span>
                <span>• LOW CENTER OF GRAVITY</span>
              </div>
            </div>
          </section>

          {/* SECTION 3: WHEELS & BRAKES */}
          <section className="relative flex h-screen w-full flex-col justify-center px-8 sm:px-16">
            <div className="max-w-xl rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur-xl space-y-4">
              <span className="font-mono text-xs tracking-[0.3em] text-bmw-cyan uppercase font-bold">
                SECTION 03 — FOOTPRINT &amp; CHASSIS
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black tracking-wider uppercase">
                826M M FORGED WHEELS
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-mono">
                Staggered 19&quot; Front / 20&quot; Rear forged wheels with available 6-piston fixed caliper M Carbon Ceramic brake rotors.
              </p>
              <div className="flex items-center space-x-4 pt-2 font-mono text-[11px] text-bmw-cyan">
                <span>• 400MM FRONT ROTORS</span>
                <span>• 42% ROTATING MASS REDUCTION</span>
              </div>
            </div>
          </section>

          {/* SECTION 4: AERODYNAMICS */}
          <section className="relative flex h-screen w-full flex-col justify-center items-end px-8 sm:px-16">
            <div className="max-w-xl rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur-xl space-y-4 text-right">
              <span className="font-mono text-xs tracking-[0.3em] text-bmw-cyan uppercase font-bold">
                SECTION 04 — FLUID DYNAMICS
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black tracking-wider uppercase">
                FORM FOLLOWS PERFORMANCE
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-mono">
                Integrated rear carbon diffuser with quad vertical fins channels high-velocity airflow underbody to generate downforce at 180 mph.
              </p>
              <div className="flex items-center justify-end space-x-4 pt-2 font-mono text-[11px] text-bmw-cyan">
                <span>• CARBON REAR DIFFUSER</span>
                <span>• HIGH-SPEED STABILITY</span>
              </div>
            </div>
          </section>

          {/* SECTION 5: REAR */}
          <section className="relative flex h-screen w-full flex-col justify-center px-8 sm:px-16">
            <div className="max-w-xl rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur-xl space-y-4">
              <span className="font-mono text-xs tracking-[0.3em] text-bmw-cyan uppercase font-bold">
                SECTION 05 — ACOUSTIC REAR STANCE
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black tracking-wider uppercase">
                QUAD M EXHAUST
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-mono">
                Dual twin tailpipes featuring active exhaust flap control. Signature high-revving Inline-6 roar accompanied by sculpted OLED rear light clusters.
              </p>
              <div className="flex items-center space-x-4 pt-2 font-mono text-[11px] text-bmw-cyan">
                <span>• 100MM TAILPIPE DIAMETER</span>
                <span>• ACTIVE ACOUSTIC FLAPS</span>
              </div>
            </div>
          </section>

          {/* PHOTOREALISTIC ROAD SHOWCASE SECTION (FEATURING HERO IMAGE) */}
          <section className="relative z-30 min-h-screen flex flex-col justify-center px-6 py-20 bg-gradient-to-b from-black/80 via-black to-black/90 text-white border-t border-white/10">
            <div className="max-w-7xl mx-auto w-full space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="h-4 w-1.5 bg-[#0066B1]" />
                    <span className="h-4 w-1.5 bg-[#003366]" />
                    <span className="h-4 w-1.5 bg-[#E60000]" />
                    <span className="font-mono text-xs tracking-[0.4em] text-bmw-cyan uppercase font-bold">
                      PHOTOREALISTIC GALLERY
                    </span>
                  </div>
                  <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight uppercase">
                    SUNSET ROOFTOP EDITION
                  </h2>
                </div>
                <p className="max-w-md font-mono text-xs text-gray-400 leading-relaxed">
                  Captured at twilight in Brooklyn Grey metallic with yellow M Carbon Ceramic caliper accents.
                </p>
              </div>

              {/* Large Hero Image Card with Interactive Feature Tags */}
              <div className="relative group overflow-hidden rounded-3xl border border-white/15 bg-black/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
                <img
                  src="/images/bmw-m4-hero.png"
                  alt="BMW M4 Competition Sunset Rooftop Edition"
                  className="w-full h-auto max-h-[70vh] object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Gradient vignette overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />

                {/* Floating Hotspot Callout Badges over the image */}
                <div className="absolute top-8 left-8 flex items-center space-x-3 rounded-full border border-white/20 bg-black/60 px-4 py-2 backdrop-blur-md">
                  <span className="h-2.5 w-2.5 rounded-full bg-bmw-cyan animate-pulse" />
                  <span className="font-mono text-xs tracking-wider text-white font-bold">
                    BROOKLYN GREY METALLIC
                  </span>
                </div>

                <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-bmw-cyan uppercase font-bold">
                      BMW M4 COMPETITION COUPE
                    </span>
                    <h3 className="font-display text-2xl font-bold tracking-wider text-white">
                      M xDRIVE ALL-WHEEL DRIVE
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 font-mono text-[11px]">
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-gray-200">
                      M LASERLIGHTS
                    </span>
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-gray-200">
                      826M M FORGED WHEELS
                    </span>
                    <span className="rounded-full border border-bmw-cyan/40 bg-bmw-blue/20 px-3 py-1.5 text-bmw-cyan font-bold">
                      CARBON CERAMIC GOLD
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PERFORMANCE SPECS OVERLAY SECTION */}
          <PerformanceSection />

          {/* FINAL HERO CTA SECTION */}
          <section className="relative z-30 min-h-screen flex flex-col items-center justify-center bg-black/90 p-8 text-center border-t border-white/10">
            <div className="max-w-4xl space-y-8">
              <div className="flex items-center justify-center space-x-2">
                <span className="h-5 w-2 bg-[#0066B1]" />
                <span className="h-5 w-2 bg-[#003366]" />
                <span className="h-5 w-2 bg-[#E60000]" />
                <span className="font-mono text-xs tracking-[0.4em] text-bmw-cyan uppercase font-bold">
                  BMW M PERFORMANCE
                </span>
              </div>

              <h2 className="font-display text-4xl sm:text-7xl font-black tracking-tight uppercase">
                ENGINEERED FOR EMOTION.
              </h2>

              <p className="font-mono text-xs sm:text-sm text-gray-400 max-w-xl mx-auto tracking-wider">
                Craft your bespoke BMW M4 Competition Coupe in full photorealistic 3D.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => {
                    setIsConfiguratorOpen(true);
                    soundEngine.playClickSound();
                  }}
                  className="flex items-center space-x-3 rounded-full bg-bmw-blue px-8 py-4 font-mono text-xs font-bold tracking-[0.2em] text-white shadow-[0_0_30px_rgba(0,102,177,0.8)] transition-all hover:bg-blue-600 hover:shadow-[0_0_40px_rgba(0,102,177,1)]"
                >
                  <Sparkles className="h-4 w-4 text-bmw-cyan" />
                  <span>CONFIGURE YOUR M4</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentSection(0);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    soundEngine.playClickSound();
                  }}
                  className="flex items-center space-x-2 rounded-full border border-white/30 bg-white/5 px-8 py-4 font-mono text-xs font-bold tracking-[0.2em] text-white backdrop-blur-md transition-all hover:border-white hover:bg-white/10"
                >
                  <span>REPLAY EXPERIENCE</span>
                </button>
              </div>
            </div>

            {/* Footer Credits */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-between px-8 text-[10px] font-mono text-gray-500 border-t border-white/5 pt-4">
              <span>BMW M4 COMPETITION 3D SHOWROOM</span>
              <span>© 2026 BMW M GMBH</span>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

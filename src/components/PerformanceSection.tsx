'use client';

import React from 'react';
import { Zap, Gauge, Flame, Wind } from 'lucide-react';

export function PerformanceSection() {
  const stats = [
    {
      value: '503',
      unit: 'HP',
      title: 'MAX HORSEPOWER',
      desc: 'M TwinPower Turbo 3.0L Inline 6-Cylinder Engine',
      icon: Zap,
    },
    {
      value: '479',
      unit: 'LB-FT',
      title: 'PEAK TORQUE',
      desc: 'Immediate Throttle Response Across 2,750 – 5,500 RPM',
      icon: Flame,
    },
    {
      value: '3.4',
      unit: 'SEC',
      title: '0 – 60 MPH',
      desc: 'M xDrive Intelligent All-Wheel Drive Launch Control',
      icon: Wind,
    },
    {
      value: '180',
      unit: 'MPH',
      title: 'TOP SPEED',
      desc: 'Electronically Limited with M Driver’s Package',
      icon: Gauge,
    },
  ];

  return (
    <section className="relative z-30 min-h-screen flex flex-col justify-center px-6 py-24 bg-gradient-to-b from-transparent via-black/80 to-black text-white">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-16 space-y-3 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <span className="h-4 w-1.5 bg-[#0066B1]" />
            <span className="h-4 w-1.5 bg-[#003366]" />
            <span className="h-4 w-1.5 bg-[#E60000]" />
            <span className="font-mono text-xs tracking-[0.4em] text-bmw-cyan uppercase">
              PURE ENGINEERING
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight uppercase">
            POWER & PRECISION
          </h2>
          <p className="max-w-xl text-sm text-gray-400 font-mono tracking-wider">
            Engineered on the Nürburgring Nordschleife. Delivered for uncompromised road dominance.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:border-bmw-cyan/50 hover:bg-bmw-blue/10 hover:shadow-[0_0_30px_rgba(0,102,177,0.3)]"
              >
                <div className="flex items-center justify-between text-gray-400 group-hover:text-bmw-cyan">
                  <span className="font-mono text-xs tracking-widest uppercase">{stat.title}</span>
                  <Icon className="h-5 w-5" />
                </div>

                <div className="mt-6 flex items-baseline space-x-2">
                  <span className="font-display text-5xl sm:text-6xl font-black tracking-tight text-white group-hover:text-bmw-cyan transition-colors">
                    {stat.value}
                  </span>
                  <span className="font-mono text-lg font-bold text-bmw-cyan">{stat.unit}</span>
                </div>

                <p className="mt-4 text-xs text-gray-400 font-mono leading-relaxed">
                  {stat.desc}
                </p>

                {/* Corner accent glow */}
                <div className="absolute top-0 right-0 h-16 w-16 bg-bmw-cyan/5 rounded-bl-full group-hover:bg-bmw-cyan/20 transition-all" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

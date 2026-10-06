'use client';

import React, { useEffect, useState } from 'react';

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [label, setLabel] = useState<string>('ROTATE');

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, select')) {
        setIsHovered(true);
        if (target.closest('button')?.innerText.includes('CONFIGURE')) {
          setLabel('OPEN');
        } else {
          setLabel('EXPLORE');
        }
      } else if (target.closest('canvas')) {
        setIsHovered(true);
        setLabel('ROTATE');
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-50 transition-transform duration-75 ease-out hidden md:block"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      <div
        className={`relative -top-1/2 -left-1/2 flex items-center justify-center rounded-full transition-all duration-300 ${
          isHovered
            ? 'h-14 w-14 border border-bmw-cyan bg-bmw-blue/20 backdrop-blur-sm shadow-[0_0_20px_rgba(25,213,255,0.6)]'
            : 'h-4 w-4 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
        }`}
      >
        {isHovered && (
          <span className="font-mono text-[9px] font-bold tracking-widest text-bmw-cyan uppercase animate-in fade-in">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

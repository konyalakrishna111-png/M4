import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bmw: {
          black: '#050507',
          dark: '#0B0C10',
          card: '#12141C',
          blue: '#0066B1',
          navy: '#003366',
          red: '#E60000',
          gold: '#C5A059',
          silver: '#E0E0E0',
          cyan: '#19D5FF',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-orbitron)', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-sweep': 'glowSweep 3s ease-in-out infinite alternate',
      },
      keyframes: {
        glowSweep: {
          '0%': { opacity: '0.2', transform: 'scale(0.98)' },
          '100%': { opacity: '0.8', transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

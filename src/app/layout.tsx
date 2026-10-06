import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BMW M4 Competition — The Ultimate Driving Machine',
  description:
    'Experience the BMW M4 in an immersive 3D digital showroom. Featuring real-time 360° customization, exploded TwinPower Turbo engine view, 360° cabin interior, and track performance specs.',
  keywords: [
    'BMW M4',
    'BMW M Performance',
    '3D Car Configurator',
    'BMW M4 Competition',
    'Automotive 3D Experience',
    'Next.js Three.js',
  ],
  openGraph: {
    title: 'BMW M4 Competition — The Ultimate Driving Machine',
    description: 'Immersive 3D hypercar product presentation and real-time configurator.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050507] text-white antialiased selection:bg-bmw-blue selection:text-white">
        {children}
      </body>
    </html>
  );
}

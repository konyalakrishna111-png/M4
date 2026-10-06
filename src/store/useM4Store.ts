import { create } from 'zustand';

export interface PaintOption {
  id: string;
  name: string;
  hex: string;
  roughness: number;
  metalness: number;
  clearcoat: number;
}

export interface WheelOption {
  id: string;
  name: string;
  rimColor: string;
  spokeColor: string;
}

export interface BrakeOption {
  id: string;
  name: string;
  colorHex: string;
}

export interface InteriorOption {
  id: string;
  name: string;
  hex: string;
  accentHex: string;
}

export const PAINT_OPTIONS: PaintOption[] = [
  { id: 'green', name: 'Isle of Man Green', hex: '#113b29', roughness: 0.25, metalness: 0.9, clearcoat: 1.0 },
  { id: 'red', name: 'Toronto Red', hex: '#b31217', roughness: 0.2, metalness: 0.85, clearcoat: 1.0 },
  { id: 'blue', name: 'Portimao Blue', hex: '#0a3d6b', roughness: 0.22, metalness: 0.9, clearcoat: 1.0 },
  { id: 'grey', name: 'Brooklyn Grey', hex: '#585e66', roughness: 0.35, metalness: 0.7, clearcoat: 0.9 },
  { id: 'black', name: 'Black Sapphire', hex: '#0a0a0c', roughness: 0.15, metalness: 0.95, clearcoat: 1.0 },
  { id: 'white', name: 'Alpine White', hex: '#f0f2f5', roughness: 0.2, metalness: 0.8, clearcoat: 1.0 },
  { id: 'yellow', name: 'Sao Paulo Yellow', hex: '#c5d800', roughness: 0.2, metalness: 0.85, clearcoat: 1.0 },
];

export const WHEEL_OPTIONS: WheelOption[] = [
  { id: '826m-black', name: '826M M Double-Spoke Black', rimColor: '#121214', spokeColor: '#1a1a1e' },
  { id: '825m-bicolor', name: '825M M Double-Spoke Bicolor', rimColor: '#22252a', spokeColor: '#d0d4dc' },
  { id: 'carbon-aero', name: 'M Carbon Performance Aero', rimColor: '#0a0a0c', spokeColor: '#333842' },
];

export const BRAKE_OPTIONS: BrakeOption[] = [
  { id: 'red', name: 'M Compound Red', colorHex: '#e60000' },
  { id: 'blue', name: 'M Performance Blue', colorHex: '#0055b8' },
  { id: 'gold', name: 'M Carbon Ceramic Gold', colorHex: '#d4af37' },
  { id: 'black', name: 'M High-Gloss Black', colorHex: '#141416' },
];

export const INTERIOR_OPTIONS: InteriorOption[] = [
  { id: 'orange', name: 'Kyalami Orange / Black', hex: '#cc5500', accentHex: '#111113' },
  { id: 'blue', name: 'Yas Marina Blue', hex: '#1e5f8a', accentHex: '#0d0e12' },
  { id: 'black', name: 'Black Merino Leather', hex: '#161619', accentHex: '#26262b' },
  { id: 'silver', name: 'Silverstone / Black', hex: '#c8cbd0', accentHex: '#121316' },
];

export interface Hotspot {
  id: number;
  title: string;
  subtitle: string;
  position: [number, number, number]; // [x, y, z]
  description: string;
  specs: string[];
}

export const HOTSPOTS: Hotspot[] = [
  {
    id: 1,
    title: '01 FRONT KIDNEY GRILLE',
    subtitle: 'ICONIC M AERO INTAKE',
    position: [0, 0.4, 2.2],
    description: 'Frameless twin-louver BMW M kidney grille optimized for high-volume cooling to the TwinPower Turbo engine.',
    specs: ['Direct Air Channeling', 'High-Gloss Shadowline', 'Track-Tested Aerodynamics'],
  },
  {
    id: 2,
    title: '02 M LASERLIGHTS',
    subtitle: 'PRECISION ILLUMINATION',
    position: [0.7, 0.5, 2.05],
    description: 'Adaptive M Laserlight technology with iconic blue accent elements and dynamic headlight range control up to 650 meters.',
    specs: ['650m Beam Distance', 'Iconic Hexagonal DRL', 'Selective Beam Tech'],
  },
  {
    id: 3,
    title: '03 CARBON FIBER ROOF',
    subtitle: 'ULTRA-LIGHTWEIGHT STRUCTURE',
    position: [0, 1.3, -0.2],
    description: 'Contoured CFRP (Carbon Fiber Reinforced Plastic) roof lowers center of gravity and vehicle curb weight.',
    specs: ['5kg Weight Reduction', 'Lower Center of Gravity', 'Aerodynamic Twin-Fins'],
  },
  {
    id: 4,
    title: '04 M CARBON CERAMIC BRAKES',
    subtitle: 'RACE-GRADE STOPPING POWER',
    position: [0.85, 0.35, 1.4],
    description: '6-piston fixed front caliper setup with perforated carbon-ceramic discs engineered for fade-free track decelerations.',
    specs: ['400mm Front Rotors', '6-Piston Fixed Calipers', '42% Weight Savings'],
  },
  {
    id: 5,
    title: '05 826M M FORGED WHEELS',
    subtitle: 'STAGGERED PERFORMANCE FITMENT',
    position: [-0.85, 0.35, 1.4],
    description: 'Ultra-lightweight forged alloy wheels (19" Front / 20" Rear) wrapped in Michelin Pilot Sport Cup 2 rubber.',
    specs: ['19" Front / 20" Rear', 'Forged Alloy Construction', 'High-Lateral Grip Compound'],
  },
  {
    id: 6,
    title: '06 AERODYNAMIC SIDE SKIRTS',
    subtitle: 'GROUND EFFECT EFFICIENCY',
    position: [-0.95, 0.2, 0.1],
    description: 'Extended carbon fiber side sills direct laminar airflow around rear tires while enhancing high-speed stability.',
    specs: ['CFRP Weave Construction', 'Turbulence Reduction', 'Aggressive Stance'],
  },
  {
    id: 7,
    title: '07 QUAD M EXHAUST',
    subtitle: 'ACOUSTIC THUNDER',
    position: [0.4, 0.35, -2.25],
    description: 'Electrically controlled flap-system quad exhaust system delivering the signature high-revving M Inline-6 roar.',
    specs: ['100mm Dual Tailpipes', 'Active Valve Control', 'Titanium Option Available'],
  },
  {
    id: 8,
    title: '08 REAR CARBON DIFFUSER',
    subtitle: 'DOWNFORCE ENGINEERING',
    position: [0, 0.25, -2.3],
    description: 'Functional high-gloss carbon rear diffuser generating clean downforce and reducing rear lift at speeds above 150 mph.',
    specs: ['Integrated Vertical Fins', 'Carbon Fiber Composite', 'Downforce Enhancement'],
  },
  {
    id: 9,
    title: '09 M CARBON BUCKET CABIN',
    subtitle: 'RACE COCKPIT ERGONOMICS',
    position: [0.35, 0.75, 0.1],
    description: 'Electrically adjustable driver cockpit with heated M Carbon bucket seats, illumination badges, and curved dual display.',
    specs: ['CFRP Shell Construction', '9.6kg Lighter Seats', 'BMW iDrive 8.5 M View'],
  },
  {
    id: 10,
    title: '10 3.0L TWINPOWER TURBO ENGINE',
    subtitle: '503 HP INLINE-6 POWERHOUSE',
    position: [0, 0.7, 1.5],
    description: 'S58 3.0-liter M TwinPower Turbo inline 6-cylinder engine with forged lightweight crankshaft and 3D-printed cylinder head core.',
    specs: ['503 Horsepower @ 6,250 RPM', '479 lb-ft Torque', '7,200 Redline RPM'],
  },
];

interface M4State {
  // Intro & Loading
  isLoading: boolean;
  loadingProgress: number;
  hasEntered: boolean;
  setLoadingProgress: (progress: number) => void;
  setHasEntered: (entered: boolean) => void;

  // Customizer selections
  paint: PaintOption;
  wheel: WheelOption;
  brake: BrakeOption;
  interior: InteriorOption;
  environmentMode: 'studio' | 'mountain' | 'city' | 'tunnel' | 'track';
  lightingTime: 'day' | 'sunset' | 'night';
  
  // Interactive views
  explodedView: boolean;
  interiorView: boolean;
  headlightsOn: boolean;
  materialFocus: 'carbon' | 'metal' | 'leather' | 'glass' | 'rubber' | 'paint' | null;
  activeHotspot: Hotspot | null;
  currentSection: number;
  soundEnabled: boolean;
  
  // Actions
  setPaint: (paint: PaintOption) => void;
  setWheel: (wheel: WheelOption) => void;
  setBrake: (brake: BrakeOption) => void;
  setInterior: (interior: InteriorOption) => void;
  setEnvironmentMode: (env: 'studio' | 'mountain' | 'city' | 'tunnel' | 'track') => void;
  setLightingTime: (time: 'day' | 'sunset' | 'night') => void;
  toggleExplodedView: () => void;
  setExplodedView: (val: boolean) => void;
  toggleInteriorView: () => void;
  setInteriorView: (val: boolean) => void;
  toggleHeadlights: () => void;
  photoMode: boolean;
  togglePhotoMode: () => void;
  setMaterialFocus: (mat: 'carbon' | 'metal' | 'leather' | 'glass' | 'rubber' | 'paint' | null) => void;
  setActiveHotspot: (hotspot: Hotspot | null) => void;
  setCurrentSection: (section: number) => void;
  toggleSound: () => void;
}

export const useM4Store = create<M4State>((set) => ({
  isLoading: true,
  loadingProgress: 0,
  hasEntered: false,
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),
  setHasEntered: (entered) => set({ hasEntered: entered, isLoading: false }),

  paint: PAINT_OPTIONS[0],
  wheel: WHEEL_OPTIONS[0],
  brake: BRAKE_OPTIONS[0],
  interior: INTERIOR_OPTIONS[0],
  environmentMode: 'studio',
  lightingTime: 'night',

  explodedView: false,
  interiorView: false,
  headlightsOn: true,
  photoMode: true,
  materialFocus: null,
  activeHotspot: null,
  currentSection: 0,
  soundEnabled: false,

  setPaint: (paint) => set({ paint }),
  setWheel: (wheel) => set({ wheel }),
  setBrake: (brake) => set({ brake }),
  setInterior: (interior) => set({ interior }),
  setEnvironmentMode: (environmentMode) => set({ environmentMode }),
  setLightingTime: (lightingTime) => set({ lightingTime }),
  toggleExplodedView: () => set((state) => ({ explodedView: !state.explodedView, interiorView: false })),
  setExplodedView: (explodedView) => set({ explodedView, interiorView: false }),
  toggleInteriorView: () => set((state) => ({ interiorView: !state.interiorView, explodedView: false })),
  setInteriorView: (interiorView) => set({ interiorView, explodedView: false }),
  toggleHeadlights: () => set((state) => ({ headlightsOn: !state.headlightsOn })),
  togglePhotoMode: () => set((state) => ({ photoMode: !state.photoMode })),
  setMaterialFocus: (materialFocus) => set({ materialFocus }),
  setActiveHotspot: (activeHotspot) => set({ activeHotspot }),
  setCurrentSection: (currentSection) => set({ currentSection }),
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
}));

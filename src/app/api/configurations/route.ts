import { NextResponse } from 'next/server';

interface CarConfig {
  id: string;
  model: string;
  paint: string;
  paintHex: string;
  wheels: string;
  brakes: string;
  interior: string;
  environment: string;
  lighting: string;
  createdAt: string;
}

// In-memory array store for builds (supported for runtime demo)
const configurationsStore: CarConfig[] = [];

export async function GET() {
  return NextResponse.json({
    success: true,
    count: configurationsStore.length,
    data: configurationsStore,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = `M4-BUILD-${Math.floor(100000 + Math.random() * 900000)}`;

    const newConfig: CarConfig = {
      id,
      model: body.model || 'BMW M4 Competition Coupe',
      paint: body.paint || 'Isle of Man Green',
      paintHex: body.paintHex || '#113b29',
      wheels: body.wheels || '826M Black',
      brakes: body.brakes || 'M Red',
      interior: body.interior || 'Kyalami Orange',
      environment: body.environment || 'studio',
      lighting: body.lighting || 'night',
      createdAt: new Date().toISOString(),
    };

    configurationsStore.push(newConfig);

    return NextResponse.json({
      success: true,
      message: 'Configuration saved successfully',
      id,
      data: newConfig,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid configuration payload' },
      { status: 400 }
    );
  }
}

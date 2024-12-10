import { NextResponse } from 'next/server';
import { squareClient } from '@/lib/square/client';

export async function GET() {
  try {
    // Test the Square client by fetching locations
    const { result } = await squareClient.locationsApi.listLocations();
    
    return NextResponse.json({ 
      message: 'Square client initialized successfully',
      locations: result.locations,
      accessTokenPresent: !!process.env.DEVELOPMENT_SQUARE_ACCESS_TOKEN
    });
  } catch (error) {
    console.error('Square API Error:', error);
    return NextResponse.json({ error: 'Failed to connect to Square API' }, { status: 500 });
  }
}

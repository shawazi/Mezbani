interface ZipCodeCoordinates {
  lat: number;
  lng: number;
}

interface ZipCodeApiResponse {
  places: Array<{
    latitude: string;
    longitude: string;
  }>;
}

const WATERTOWN_ZIP = "02472";
const ZIPCODE_API_BASE = "https://api.zippopotam.us/us/";

export class ZipCodeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ZipCodeError";
  }
}

async function getZipCodeCoordinates(zipCode: string): Promise<ZipCodeCoordinates> {
  try {
    const response = await fetch(`${ZIPCODE_API_BASE}${zipCode}`);
    if (!response.ok) {
      throw new ZipCodeError(`Invalid ZIP code: ${zipCode}`);
    }
    
    const data = (await response.json()) as ZipCodeApiResponse;
    if (!data.places?.[0]) {
      throw new ZipCodeError(`No location data found for ZIP code: ${zipCode}`);
    }

    return {
      lat: parseFloat(data.places[0].latitude),
      lng: parseFloat(data.places[0].longitude)
    };
  } catch (error) {
    if (error instanceof ZipCodeError) {
      throw error;
    }
    throw new ZipCodeError(`Error fetching ZIP code data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Haversine formula to calculate distance between two points on Earth
function calculateDistance(coord1: ZipCodeCoordinates, coord2: ZipCodeCoordinates): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lng - coord1.lng);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c); // Return rounded miles
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export async function calculateDistanceFromWatertown(zipCode: string): Promise<number> {
  try {
    const [watertownCoords, destinationCoords] = await Promise.all([
      getZipCodeCoordinates(WATERTOWN_ZIP),
      getZipCodeCoordinates(zipCode)
    ]);
    
    return calculateDistance(watertownCoords, destinationCoords);
  } catch (error) {
    if (error instanceof ZipCodeError) {
      throw error;
    }
    throw new ZipCodeError(error instanceof Error ? error.message : 'Unknown error');
  }
}

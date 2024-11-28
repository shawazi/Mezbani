import { onCall, HttpsOptions } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { Client, Environment, ApiError } from "square";

// Define secret
const SQUARE_ACCESS_TOKEN = defineSecret("SQUARE_ACCESS_TOKEN");

interface BookingData {
  locationId: string;
  serviceId: string;
  staffId: string;
  startAt: string;
  customerEmail?: string;
}

// Function configuration
const functionConfig: HttpsOptions = {
  region: 'us-east4',
  memory: '256MiB',
  secrets: [SQUARE_ACCESS_TOKEN],
  minInstances: 0,
  maxInstances: 10,
  cors: [
    'http://localhost:3000',
    'http://localhost:5173',  // Vite's default port
    'https://mezbani-14d1e.web.app',
    'https://mezbani-14d1e.firebaseapp.com'
  ]
};

export const getAvailableBookingSlots = onCall(
  functionConfig, 
  async (request) => {
    try {
      const token = SQUARE_ACCESS_TOKEN.value();
      if (!token) {
        throw new Error("Square access token not available");
      }

      // Initialize Square client with the secret
      const squareClient = new Client({
        accessToken: token,
        environment: Environment.Production
      });

      if (!request.auth) {
        throw new Error("User must be logged in to book appointments");
      }

      const data = request.data as BookingData;
      if (!data?.locationId || !data?.serviceId || !data?.staffId || !data?.startAt) {
        throw new Error("Missing required booking data");
      }

      const { result } = await squareClient.bookingsApi.searchAvailability({
        query: {
          filter: {
            startAtRange: {
              startAt: data.startAt,
              endAt: new Date(new Date(data.startAt).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            },
            locationId: data.locationId,
            segmentFilters: [
              {
                serviceVariationId: data.serviceId,
                teamMemberIdFilter: {
                  any: [data.staffId],
                },
              },
            ],
          },
        },
      });

      return {
        availabilities: result.availabilities || []
      };
    } catch (error) {
      console.error("Error getting booking availabilities:", error);
      if (error instanceof ApiError) {
        throw new Error(error.message || "Failed to get booking availabilities");
      }
      throw new Error("Failed to get booking availabilities");
    }
  }
);

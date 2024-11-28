import {onRequest, HttpsOptions} from "firebase-functions/v2/https";
import {defineSecret} from "firebase-functions/params";
import {Client, Environment, ApiError} from "square";
import {getAuth} from "firebase-admin/auth";

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
  region: "us-east4",
  memory: "256MiB" as const,
  secrets: [SQUARE_ACCESS_TOKEN],
  minInstances: 0,
  maxInstances: 10,
};

// Square API constants
const SQUARE_LOCATION_ID = "LTYDJVJKJ1YQE";
const SQUARE_SERVICE_ID = "NPDWPGNVK7K5TQHDUKVHJ5BN";
const SQUARE_STAFF_ID = "TMZfT_bNGi9oE9";

// Build the base URL for Square booking
const SQUARE_HOST = "https://square.site";
const SQUARE_ID_PATH = `${SQUARE_LOCATION_ID}/${SQUARE_SERVICE_ID}`;
const SQUARE_PATH = `book/${SQUARE_ID_PATH}`;
const SQUARE_BASE_URL = `${SQUARE_HOST}/${SQUARE_PATH}`;

// Helper function to handle CORS
const handleCors = (req: any, res: any) => {
  const allowedOrigins = ['http://localhost:3000', 'https://mezbani.shawaz.org'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.set('Access-Control-Allow-Credentials', 'true');
  }

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return true;
  }
  return false;
};

export const getSquareBookingUrlHttp = onRequest(
  functionConfig,
  async (req, res) => {
    // Handle CORS
    if (handleCors(req, res)) return;

    try {
      const bookingUrl = `${SQUARE_BASE_URL}?staff=${SQUARE_STAFF_ID}`;
      res.json({bookingUrl});
    } catch (error) {
      console.error("Error generating booking URL:", error);
      const errorMsg = error instanceof Error ?
        error.message : "Failed to generate URL";
      res.status(500).json({error: errorMsg});
    }
  }
);

export const getAvailableBookingSlotsHttp = onRequest(
  functionConfig,
  async (req, res) => {
    // Handle CORS
    if (handleCors(req, res)) return;

    try {
      // Verify Firebase ID token
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith("Bearer ")) {
        res.status(401).json({error: "Unauthorized - No token provided"});
        return;
      }

      const idToken = authHeader.split("Bearer ")[1];
      try {
        await getAuth().verifyIdToken(idToken);
      } catch (error) {
        res.status(401).json({error: "Unauthorized - Invalid token"});
        return;
      }

      const token = SQUARE_ACCESS_TOKEN.value();
      if (!token) {
        throw new Error("Square access token not available");
      }

      // Initialize Square client with the secret
      const squareClient = new Client({
        accessToken: token,
        environment: Environment.Production,
      });

      const data = req.body as BookingData;
      const requiredFields = [
        data?.locationId,
        data?.serviceId,
        data?.staffId,
        data?.startAt,
      ];
      if (requiredFields.some((field) => !field)) {
        throw new Error("Missing required booking data");
      }

      const endTime = new Date(data.startAt);
      endTime.setDate(endTime.getDate() + 7);

      const {result} = await squareClient.bookingsApi.searchAvailability({
        query: {
          filter: {
            startAtRange: {
              startAt: data.startAt,
              endAt: endTime.toISOString(),
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

      res.json({availabilities: result.availabilities || []});
    } catch (error) {
      console.error("Error getting booking availabilities:", error);
      if (error instanceof ApiError) {
        const msg = error.message || "Failed to get booking availabilities";
        res.status(500).json({error: msg});
      } else {
        res.status(500).json({error: "Failed to get booking availabilities"});
      }
    }
  }
);

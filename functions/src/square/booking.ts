import * as functions from 'firebase-functions';
import { Client, Environment } from 'square';

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Production, // or Environment.Sandbox for testing
});

export const getSquareBookingUrl = functions.https.onCall(async (data, context) => {
  // Verify authentication if needed
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be logged in to book appointments'
    );
  }

  try {
    // Get your booking page URL from Square
    // You'll need to replace this with your actual Square Booking page URL
    const bookingUrl = process.env.SQUARE_BOOKING_URL;

    if (!bookingUrl) {
      throw new Error('Booking URL not configured');
    }

    // You can add additional parameters to the URL if needed
    const finalUrl = `${bookingUrl}?mode=embedded`;

    return {
      bookingUrl: finalUrl
    };
  } catch (error) {
    console.error('Error getting booking URL:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to get booking URL'
    );
  }
});

// Handle webhook notifications from Square for booking updates
export const squareBookingWebhook = functions.https.onRequest(async (req, res) => {
  const signature = req.headers['x-square-signature'];
  
  // Verify webhook signature (implement this based on Square's documentation)
  // if (!verifySignature(signature, req.rawBody)) {
  //   res.status(401).send('Invalid signature');
  //   return;
  // }

  const event = req.body;
  
  try {
    switch (event.type) {
      case 'booking.created':
        // Handle new booking
        await handleBookingCreated(event.data);
        break;
      case 'booking.updated':
        // Handle booking update
        await handleBookingUpdated(event.data);
        break;
      case 'booking.canceled':
        // Handle booking cancellation
        await handleBookingCanceled(event.data);
        break;
      default:
        console.log('Unhandled event type:', event.type);
    }

    res.status(200).send('Webhook processed');
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).send('Error processing webhook');
  }
});

async function handleBookingCreated(data: any) {
  // Implement booking creation logic
  // This might include:
  // - Updating your Firebase database
  // - Sending confirmation emails
  // - Creating calendar events
  console.log('New booking created:', data);
}

async function handleBookingUpdated(data: any) {
  // Implement booking update logic
  console.log('Booking updated:', data);
}

async function handleBookingCanceled(data: any) {
  // Implement booking cancellation logic
  console.log('Booking canceled:', data);
}

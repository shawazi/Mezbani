import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin
const apps = getApps();

if (!apps.length) {
  try {
    console.log('Initializing Firebase Admin...');
    
    // Get service account from environment
    const serviceAccount = {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: (process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY)?.replace(/\\n/g, '\n'),
    };

    // Log environment variable presence (not values)
    console.log('Environment check:', {
      projectId: !!serviceAccount.projectId,
      clientEmail: !!serviceAccount.clientEmail,
      privateKey: !!serviceAccount.privateKey,
    });

    if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
      throw new Error('Missing required Firebase Admin environment variables');
    }

    console.log('Private key format check:', {
      hasBeginMarker: serviceAccount.privateKey.includes('-----BEGIN PRIVATE KEY-----'),
      hasEndMarker: serviceAccount.privateKey.includes('-----END PRIVATE KEY-----'),
      length: serviceAccount.privateKey.length,
    });

    initializeApp({
      credential: cert(serviceAccount),
    });
    console.log('Firebase Admin initialized successfully');
  } catch (error: any) {
    console.error('Error initializing Firebase Admin:', {
      name: error?.name || 'UnknownError',
      message: error?.message || 'No error message available',
      stack: error?.stack || 'No stack trace available',
    });
    throw error;
  }
}

export const adminDb = getFirestore();

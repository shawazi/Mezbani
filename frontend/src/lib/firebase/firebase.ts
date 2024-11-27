import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Debug logging
console.log('Environment variables loaded:', {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? 'present' : 'missing',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? 'present' : 'missing',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'present' : 'missing',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ? 'present' : 'missing',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? 'present' : 'missing',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ? 'present' : 'missing',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ? 'present' : 'missing',
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('Firebase config used:', {
  apiKey: firebaseConfig.apiKey ? 'present' : 'missing',
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
});

// Initialize Auth and sign in anonymously
export const auth = getAuth(app);
signInAnonymously(auth)
  .then(() => {
    console.log('Signed in anonymously');
  })
  .catch((error) => {
    console.error('Error signing in:', error);
  });

export const db = getFirestore(app);

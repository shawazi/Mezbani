import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB83XVIfDE2Y6CpzfiIjVlPANCxzyrIAqE",
  authDomain: "mezbani-14d1e.firebaseapp.com",
  projectId: "mezbani-14d1e",
  storageBucket: "mezbani-14d1e.appspot.com",
  messagingSenderId: "1078482850381",
  appId: "1:1078482850381:web:c1b2f1b1b2f1b1b2f1b1b2",
  measurementId: "G-MEASUREMENT_ID"
};

// Debug logging
console.log('Firebase config loaded:', {
  apiKey: firebaseConfig.apiKey ? 'present' : 'missing',
  authDomain: firebaseConfig.authDomain ? 'present' : 'missing',
  projectId: firebaseConfig.projectId ? 'present' : 'missing',
  storageBucket: firebaseConfig.storageBucket ? 'present' : 'missing',
  messagingSenderId: firebaseConfig.messagingSenderId ? 'present' : 'missing',
  appId: firebaseConfig.appId ? 'present' : 'missing',
  measurementId: firebaseConfig.measurementId ? 'present' : 'missing',
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('Firebase initialized with project:', firebaseConfig.projectId);

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

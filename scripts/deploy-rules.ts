import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as url from 'url';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get current directory
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Initialize Firebase Admin
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
};

const app = initializeApp({
  credential: cert(serviceAccount)
});

// Set security rules
const rules = `rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /menu/{menuItem} {
      allow read: if
        // Check if the request is coming from your app domain
        request.auth != null &&
        request.auth.token.firebase.sign_in_provider != 'anonymous' &&
        // You can also check specific domains
        request.origin.matches('https://mezbani-14d1e.web.app') || 
        request.origin.matches('https://mezbani-14d1e.firebaseapp.com') ||
        // Allow localhost for development
        request.origin.matches('http://localhost:*');
      
      allow write: if false;  // Only allow writes through admin SDK
    }
  }
}`;

async function deployRules() {
  try {
    console.log('Writing rules to firestore.rules...');
    
    // Write rules to the frontend directory
    const rulesPath = path.resolve(__dirname, '../frontend/firestore.rules');
    await fs.writeFile(rulesPath, rules);
    
    console.log('Successfully wrote rules to firestore.rules');
    console.log('To deploy the rules, run:');
    console.log('cd ../frontend && firebase deploy --only firestore:rules');
    
  } catch (error) {
    console.error('Error writing rules:', error);
    process.exit(1);
  }
}

deployRules();

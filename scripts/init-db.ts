import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Firebase Admin with service account
const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
};

const app = initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore(app);

const menuItems = [
  {
    name: "Karwa Chai",
    description: "Experience the soul-warming essence of our rich, black Assam chai.",
    price: 4.00,
    category: "chai",
    available: true,
  },
  {
    name: "Dood Pati Chai",
    description: "The simplest, yet most comforting. Taste the flavor of robust black Assam leaves, simmered in milk until the shade is just right.",
    price: 3.00,
    category: "chai",
    available: true,
  },
  {
    name: "Masala Chai",
    description: "A classic milk tea blend of warming spices - cardamom, cinnamon, cloves, ginger, fennel, and nutmeg.",
    price: 5.00,
    category: "chai",
    available: true,
  },
  {
    name: "Hyderbadi Irani Chai",
    description: "Taste a rich history between the Iranians and Indians. A medley of spices including black cardamom, cinnamon, cloves, and peppercorn.",
    price: 4.00,
    category: "chai",
    available: true,
  },
  {
    name: "Lamsa Chai",
    description: "A special hyderbadi Assam tea blend with hints of chocolate.",
    price: 4.00,
    category: "chai",
    available: true,
  },
  {
    name: "Zafron Rose Chai",
    description: "Delicate saffron, fragrant rose water, aromatic cardamom, and spicy ginger, all purposely paired with the richness of Assam tea simmered in milk.",
    price: 5.00,
    category: "chai",
    available: true,
  },
  // Snacks
  {
    name: "Rusk Cake",
    description: "A twice-baked bread with a crisp, golden texture, perfect for dunking in chai. Lightly sweet and wonderfully crunchy.",
    price: 1.00,
    category: "food",
    available: true,
  },
  {
    name: "Osmania Biscuits",
    description: "Originating from Hyderabad, these soft and crumbly biscuits are mildly sweet with a hint of salt, making them a perfect companion to a hot cup of chai.",
    price: 0.50,
    category: "food",
    available: true,
  },
  {
    name: "Parle-G Cookies",
    description: "A classic Indian tea-time treat, these simple, slightly sweet biscuits are loved for their nostalgic taste. They're light, crisp, and perfect for dunking in chai.",
    price: 1.00,
    category: "food",
    available: true,
  },
  {
    name: "Bakar Khani",
    description: "A rich, flaky pastry with layers of crispiness, often flavored with cardamom.",
    price: 1.00,
    category: "food",
    available: true,
  },
  {
    name: "Biscoff Cookies",
    description: "European spiced biscuits with a distinctive caramelized flavor and a crunchy texture.",
    price: 2.00,
    category: "food",
    available: true,
  },
  {
    name: "Karachi's Fruit Biscuits",
    description: "These popular biscuits from Karachi are studded with colorful candied fruit bits, offering a delightful blend of sweetness and crunch.",
    price: 2.00,
    category: "food",
    available: true,
  },
];

async function initializeDatabase() {
  try {
    // Delete existing menu collection
    const menuCollection = db.collection('menu');
    const menuDocs = await menuCollection.get();
    const batch = db.batch();
    
    menuDocs.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    console.log('Cleared existing menu items');

    // Add new menu items
    const newBatch = db.batch();
    menuItems.forEach(item => {
      const docRef = menuCollection.doc();
      newBatch.set(docRef, item);
    });

    await newBatch.commit();
    console.log('Successfully initialized menu items');

  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }

  process.exit(0);
}

initializeDatabase();

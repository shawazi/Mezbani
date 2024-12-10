import { collection, getDocs } from 'firebase/firestore';
import { db } from './config';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'chai' | 'food';
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const menuCollection = collection(db, 'menu');
  const menuSnapshot = await getDocs(menuCollection);
  return menuSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as MenuItem));
}
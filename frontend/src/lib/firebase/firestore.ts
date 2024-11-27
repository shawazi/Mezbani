import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'food' | 'chai';
  imageUrl?: string;
  available: boolean;
  spiceLevel?: 1 | 2 | 3;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  capacity: number;
  imageUrl?: string;
  status: 'upcoming' | 'past';
}

export const getMenuItems = async (category?: 'food' | 'chai'): Promise<MenuItem[]> => {
  try {
    console.log('Fetching menu items for category:', category);
    const menuCollection = collection(db, 'menu');
    let menuQuery = query(
      menuCollection,
      where('available', '==', true),
      orderBy('name')
    );

    if (category) {
      menuQuery = query(
        menuCollection,
        where('category', '==', category),
        where('available', '==', true),
        orderBy('name')
      );
    }

    const snapshot = await getDocs(menuQuery);
    console.log('Fetched menu items:', snapshot.docs.length);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as MenuItem));
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw new Error('Failed to fetch menu items. Please try again later.');
  }
};

export const getEvents = async (status: 'upcoming' | 'past' = 'upcoming'): Promise<Event[]> => {
  try {
    console.log('Fetching events for status:', status);
    const eventsCollection = collection(db, 'events');
    const eventsQuery = query(
      eventsCollection,
      where('status', '==', status),
      orderBy('date')
    );

    const snapshot = await getDocs(eventsQuery);
    console.log('Fetched events:', snapshot.docs.length);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Event));
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events. Please try again later.');
  }
};

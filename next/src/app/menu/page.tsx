import { Suspense } from 'react';
import { Container } from '@mui/material';
import LoadingSpinner from '@/components/LoadingSpinner';
import MenuSection from '@/components/MenuSection';
import ParallaxBanner from '@/components/ParallaxBanner';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string | null;
}

async function getMenuItems() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'}/api/menu`, {
      next: { revalidate: 3600 } // Revalidate every hour instead of every minute
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch menu items');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return { chaiItems: [], snackItems: [] };
  }
}

export default async function Menu() {
  const menuItems = await getMenuItems();
  
  const chaiItems = Array.isArray(menuItems) 
    ? menuItems.filter((item: MenuItem) => item.category === 'Chai')
    : [];
  const snackItems = Array.isArray(menuItems)
    ? menuItems.filter((item: MenuItem) => item.category === 'Snacks')
    : [];

  return (
    <Container maxWidth="lg">
      <ParallaxBanner imagePath="/images/chai-banner.jpg" title="Our Menu" />
      
      <Suspense fallback={<LoadingSpinner />}>
        <MenuSection title="Chai Selection" items={chaiItems} />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <MenuSection title="Snacks & Treats" items={snackItems} />
      </Suspense>
    </Container>
  );
}

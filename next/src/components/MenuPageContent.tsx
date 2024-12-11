'use client';

import { useState, useEffect } from 'react';
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

export default function MenuPageContent() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/api/menu');
        if (!res.ok) throw new Error('Failed to fetch menu');
        const data = await res.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const chaiItems = menuItems.filter(item => item.category === 'Chai');
  const snackItems = menuItems.filter(item => item.category === 'Snacks');

  if (loading) {
    return (
      <Container maxWidth="lg">
        <ParallaxBanner imagePath="/images/chai-banner.jpg" title="Our Menu" />
        <LoadingSpinner />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <ParallaxBanner imagePath="/images/chai-banner.jpg" title="Our Menu" />
      <MenuSection title="Chai Selection" items={chaiItems} />
      <MenuSection title="Snacks & Treats" items={snackItems} />
    </Container>
  );
}

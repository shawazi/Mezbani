'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import LoadingSpinner from '@/components/LoadingSpinner';
import Image from 'next/image';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string | null;
}

// Move this to a separate component to reduce main bundle size
const ParallaxBanner = ({ imagePath, title, height = 400 }: { imagePath: string; title: string; height?: number }) => {
  return (
    <Box 
      sx={{ 
        position: 'relative',
        height: `${height}px`,
        overflow: 'hidden',
        mb: 4
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <Image
          src={imagePath}
          alt={title}
          fill
          priority={imagePath === '/images/chai-banner.jpg'}
          sizes="100vw"
          style={{
            objectFit: 'cover',
          }}
          quality={85}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              color: 'white',
              textAlign: 'center',
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const MenuItemCard = ({ item }: { item: MenuItem }) => (
  <Box sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: 'background.paper', boxShadow: 1 }}>
    <Typography variant="h6" component="h3" gutterBottom>
      {item.name}
    </Typography>
    <Typography variant="body2" color="text.secondary" paragraph>
      {item.description}
    </Typography>
    <Typography variant="subtitle1" color="primary">
      ${(item.price / 100).toFixed(2)}
    </Typography>
  </Box>
);

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/menu');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch menu items');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  // Filter items by category
  const chaiItems = menuItems.filter(item => item.category === 'chai');
  const foodItems = menuItems.filter(item => item.category === 'food');

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <ParallaxBanner imagePath="/images/chai-banner.jpg" title="Our Menu" />
      
      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 2, md: 3 } }}>
        {/* Chai Section */}
        <Typography 
          variant="h2" 
          component="h2" 
          align="center"
          sx={{ 
            mb: 4,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 600
          }}
        >
          Chai Selection
        </Typography>
        {chaiItems.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}

        {/* Food Section */}
        <Typography 
          variant="h2" 
          component="h2" 
          align="center"
          sx={{ 
            mt: 6,
            mb: 4,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 600
          }}
        >
          Food Menu
        </Typography>
        {foodItems.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </Container>
    </Box>
  );
};

export default Menu;

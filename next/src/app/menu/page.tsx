'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
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
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
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

const MenuSection = ({ title, items }: { title: string, items: MenuItem[] }) => {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography 
        variant="h4" 
        component="h2" 
        sx={{ 
          mb: 3, 
          textTransform: 'capitalize',
          fontWeight: 'bold',
          color: '#4A4A4A'
        }}
      >
        {title}
      </Typography>
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} md={6} key={item.id}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mb: 2,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'repeating-linear-gradient(to right, #ccc 0, #ccc 4px, transparent 4px, transparent 8px)',
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: '#2C2C2C',
                    flex: 1,
                    pr: 2
                  }}
                >
                  {item.name}
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: '#2C2C2C',
                    whiteSpace: 'nowrap'
                  }}
                >
                  ${(item.price / 100).toFixed(2)}
                </Typography>
              </Box>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#666',
                  fontSize: '0.95rem',
                  lineHeight: 1.5
                }}
              >
                {item.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/menu');
        if (!response.ok) {
          throw new Error('HTTP error! status: ' + response.status);
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        setError('Failed to load menu items');
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
      <Container>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  // Group items by category
  const groupedItems = menuItems.reduce<Record<string, MenuItem[]>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <>
      <ParallaxBanner 
        imagePath="/images/chai-banner.jpg"
        title="Our Menu"
      />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {Object.entries(groupedItems).map(([category, items]) => (
          <MenuSection key={category} title={category} items={items} />
        ))}
      </Container>
    </>
  );
}

export default Menu;

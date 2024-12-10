'use client';

import { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { MenuItem, getMenuItems } from '@/lib/firebase/firestore';
import LoadingSpinner from '@/components/LoadingSpinner';

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const chaiBannerRef = useRef<HTMLDivElement>(null);
  const snacksBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const items = await getMenuItems();
      setMenuItems(items);
      setLoading(false);
    };

    fetchMenuItems();

    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        if (chaiBannerRef.current) {
          const chaiBannerRect = chaiBannerRef.current.getBoundingClientRect();
          const chaiOffset = chaiBannerRect.top + scrolled;
          const chaiParallax = (scrolled - chaiOffset) * 0.5;
          chaiBannerRef.current.style.transform = `translate3d(0, ${chaiParallax}px, 0)`;
        }
        if (snacksBannerRef.current) {
          const snacksBannerRect = snacksBannerRef.current.getBoundingClientRect();
          const snacksOffset = snacksBannerRect.top + scrolled;
          const snacksParallax = (scrolled - snacksOffset) * 0.5;
          snacksBannerRef.current.style.transform = `translate3d(0, ${snacksParallax}px, 0)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const chaiItems = menuItems.filter(item => item.category === 'chai');
  const foodItems = menuItems.filter(item => item.category === 'food');

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 2, md: 3 } }}>
        <Typography 
          variant="h2" 
          component="h1" 
          align="center" 
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 500,
            mb: { xs: 3, sm: 4 },
            color: 'common.white'
          }}
        >
          Our Menu
        </Typography>
      </Container>

      {/* Chai Section with Parallax */}
      <Box 
        sx={{ 
          position: 'relative',
          height: '400px',
          overflow: 'hidden',
          mb: 4
        }}
      >
        <Box
          ref={chaiBannerRef}
          sx={{
            position: 'absolute',
            top: '-100px',
            left: 0,
            width: '100%',
            height: '600px',
            backgroundImage: 'url(/images/chai-banner.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1,
            willChange: 'transform',
          }}
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
            variant="h3"
            component="h2"
            sx={{
              color: 'common.white',
              textAlign: 'center',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 500,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            Authentic Chai
          </Typography>
        </Box>
      </Box>

      {/* Chai Menu Items */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
          {chaiItems.map((item) => (
            <Box
              key={item.id}
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                boxShadow: 1,
              }}
            >
              <Typography variant="h6" component="h3" gutterBottom>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {item.description}
              </Typography>
              <Typography variant="h6" color="primary">
                ${item.price.toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Food Section with Parallax */}
      <Box 
        sx={{ 
          position: 'relative',
          height: '400px',
          overflow: 'hidden',
          mb: 4
        }}
      >
        <Box
          ref={snacksBannerRef}
          sx={{
            position: 'absolute',
            top: '-100px',
            left: 0,
            width: '100%',
            height: '600px',
            backgroundImage: 'url(/images/snacks-banner.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1,
            willChange: 'transform',
          }}
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
            variant="h3"
            component="h2"
            sx={{
              color: 'common.white',
              textAlign: 'center',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 500,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            Delicious Snacks
          </Typography>
        </Box>
      </Box>

      {/* Food Menu Items */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
          {foodItems.map((item) => (
            <Box
              key={item.id}
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                boxShadow: 1,
              }}
            >
              <Typography variant="h6" component="h3" gutterBottom>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {item.description}
              </Typography>
              <Typography variant="h6" color="primary">
                ${item.price.toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Menu;

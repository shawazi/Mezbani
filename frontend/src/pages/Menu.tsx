import { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { MenuItem, getMenuItems } from '../lib/firebase/firestore';
import LoadingSpinner from '../components/LoadingSpinner';

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
            variant="h2"
            sx={{
              color: 'white',
              fontSize: { xs: '2rem', sm: '2.5rem' },
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
            Chai Selection
          </Typography>
        </Box>
      </Box>

      {/* Chai Items */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ py: 4 }}>
          {chaiItems.map((item, index) => (
            <Box
              key={item.id}
              sx={{
                py: 3,
                borderBottom: index < chaiItems.length - 1 ? '2px dashed rgba(0, 0, 0, 0.12)' : 'none',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
                <Typography variant="h6" component="h3">
                  {item.name}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  ${item.price.toFixed(2)}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {item.description}
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
            variant="h2"
            sx={{
              color: 'white',
              fontSize: { xs: '2rem', sm: '2.5rem' },
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
            Food & Snacks
          </Typography>
        </Box>
      </Box>

      {/* Food Items */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ py: 4 }}>
          {foodItems.map((item, index) => (
            <Box
              key={item.id}
              sx={{
                py: 3,
                borderBottom: index < foodItems.length - 1 ? '2px dashed rgba(0, 0, 0, 0.12)' : 'none',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
                <Typography variant="h6" component="h3">
                  {item.name}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  ${item.price.toFixed(2)}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
              {item.spiceLevel && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  Spice Level: {'🌶️'.repeat(item.spiceLevel)}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Menu;

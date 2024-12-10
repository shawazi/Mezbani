'use client';

import {
  Typography,
  Box,
  Paper,
  Button,
  Grid,
} from '@mui/material';
import Link from 'next/link';
import { useEffect } from 'react';
import { bangladeshRed } from '@/theme';
import PageLayout from '@/components/PageLayout';

export default function Home() {
  useEffect(() => {
    const testSquareIntegration = async () => {
      try {
        const response = await fetch('/api/square-test');
        const data = await response.json();
        console.log('Square Integration Test:', data);
      } catch (error) {
        console.error('Square Integration Test Error:', error);
      }
    };

    testSquareIntegration();
  }, []);

  return (
    <PageLayout>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ 
          bgcolor: 'background.paper',
          pt: { xs: 6, sm: 8 },
          pb: { xs: 8, sm: 12 },
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            px: { xs: 2, sm: 3 },
            margin: '0 auto',
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h1"
                component="h1"
                align="center"
                gutterBottom
                sx={{ 
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: { xs: '2.5rem', sm: '3.75rem' }
                }}
              >
                Mezbani Chai House
              </Typography>
              <Typography 
                component="p" 
                sx={{ 
                  color: 'text.secondary',
                  mb: 4,
                  fontSize: { xs: '1.1rem', sm: '1.5rem' },
                  maxWidth: '800px',
                  mx: 'auto',
                }}
              >
                Experience the authentic taste of Bangladesh in every cup of our
                handcrafted chai
              </Typography>
              <Link href="/order" passHref style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 4,
                    backgroundColor: bangladeshRed,
                    '&:hover': {
                      backgroundColor: bangladeshRed,
                      filter: 'brightness(1.1)',
                    },
                    px: { xs: 3, sm: 6 },
                    py: { xs: 1.5, sm: 2 },
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                  }}
                >
                  Order Now
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>

        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          py: { xs: 4, md: 6 },
          px: { xs: 2, sm: 3 },
          margin: '0 auto',
        }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  backgroundColor: 'rgba(0, 106, 78, 0.1)',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Typography variant="h5" gutterBottom color="white">
                  Our Story
                </Typography>
                <Typography component="p" color="text.secondary">
                  Founded with a passion for authentic Bangladeshi chai, Mezbani brings
                  the rich tradition of tea culture to Watertown, MA. Every cup tells a
                  story of heritage and craftsmanship.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  backgroundColor: 'rgba(244, 42, 65, 0.1)',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Typography variant="h5" gutterBottom color="white">
                  Special Events
                </Typography>
                <Typography component="p" color="text.secondary">
                  Host your next gathering with us! From corporate events to intimate
                  celebrations, we offer chai catering services that will make your
                  event memorable.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  backgroundColor: 'rgba(0, 106, 78, 0.1)',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Typography variant="h5" gutterBottom color="white">
                  Catering
                </Typography>
                <Typography component="p" color="text.secondary">
                  Bring the warmth of Mezbani to your workplace or special event.
                  Our catering services include a variety of chai options and
                  traditional Bangladeshi snacks.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PageLayout>
  );
}

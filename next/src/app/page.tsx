'use client';

import {
  Typography,
  Box,
  Paper,
  Button,
  Grid,
} from '@mui/material';
import Link from 'next/link';
import { bangladeshRed } from '@/theme';

export default function Home() {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ 
        bgcolor: bangladeshRed[900],
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
          maxWidth: 'lg',
          px: { xs: 2, sm: 3 },
          margin: '0 auto',
        }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h1"
              component="h1"
              align="center"
              gutterBottom
              sx={{ 
                color: 'common.white',
                fontWeight: 'bold',
                fontSize: { xs: '2.5rem', sm: '3.75rem' }
              }}
            >
              Mezbani Chai House
            </Typography>
            <Typography 
              component="p" 
              variant="h5"
              sx={{ 
                color: 'common.white',
                mb: 4,
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              Experience the authentic taste of Bangladeshi chai and snacks
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button
                component={Link}
                href="/menu"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'common.white',
                  color: bangladeshRed[900],
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                  mr: 2,
                }}
              >
                View Menu
              </Button>
              <Button
                component={Link}
                href="/contact"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'common.white',
                  color: 'common.white',
                  '&:hover': {
                    borderColor: 'grey.100',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Contact Us
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ py: 8, px: { xs: 2, sm: 3 } }}>
        <Grid container spacing={4} maxWidth="lg" sx={{ margin: '0 auto' }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Authentic Chai
              </Typography>
              <Typography>
                Our chai is brewed using traditional Bangladeshi methods and spices, 
                creating a perfect blend of flavors that will transport you straight 
                to the streets of Dhaka.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Fresh Snacks
              </Typography>
              <Typography>
                Enjoy our selection of freshly made Bangladeshi snacks, perfect 
                companions to your cup of chai. From samosas to shingaras, we have 
                all your favorites.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Warm Atmosphere
              </Typography>
              <Typography>
                Our cozy space is designed to make you feel at home. Whether you're 
                meeting friends or looking for a quiet spot to work, we've got you covered.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

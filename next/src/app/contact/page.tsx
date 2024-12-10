import { Suspense } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import PageLayout from '@/components/PageLayout';
import ContactInfo from '@/components/ContactInfo';
import dynamic from 'next/dynamic';

export const metadata = {
  title: 'Contact Us - Mezbani',
  description: 'Get in touch with us for any questions or concerns about our chai and snacks.',
};

// Dynamically import the form with custom loading
const DynamicContactForm = dynamic(
  () => import('@/components/DynamicContactForm'),
  {
    loading: () => (
      <Box
        sx={{
          p: 4,
          bgcolor: 'background.paper',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
        }}
      >
        <Typography>Loading contact form...</Typography>
      </Box>
    ),
    ssr: true,
  }
);

export default function Contact() {
  return (
    <PageLayout>
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
        Contact Us
      </Typography>
      
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Suspense fallback={<Typography>Loading contact information...</Typography>}>
            <ContactInfo />
          </Suspense>
        </Grid>

        <Grid item xs={12} md={6}>
          <DynamicContactForm />
        </Grid>
      </Grid>
    </PageLayout>
  );
}

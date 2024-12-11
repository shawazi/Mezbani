'use client';

import { Typography, Grid } from '@mui/material';
import ContactInfo from '@/components/ContactInfo';
import dynamic from 'next/dynamic';

// Dynamically import the form with no SSR
const ContactForm = dynamic(
  () => import('@/components/ContactForm'),
  { ssr: false }
);

export default function ContactPageContent() {
  return (
    <>
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
          <ContactInfo />
        </Grid>

        <Grid item xs={12} md={6}>
          <ContactForm />
        </Grid>
      </Grid>
    </>
  );
}

'use client';

import dynamic from 'next/dynamic';
import { Box, Typography } from '@mui/material';

// Preload the contact form
const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => (
    <Box
      sx={{
        p: 4,
        bgcolor: 'background.paper',
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography>Loading form...</Typography>
    </Box>
  ),
  ssr: true // Enable SSR for faster initial load
});

// Preload the component
const preload = () => void ContactForm.preload?.();
if (typeof window !== 'undefined') {
  // Preload when the page becomes visible
  if (document.visibilityState === 'visible') {
    preload();
  } else {
    document.addEventListener('visibilitychange', preload, { once: true });
  }
}

export default function DynamicContactForm() {
  return <ContactForm />;
}

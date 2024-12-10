'use client';

import { Suspense, lazy } from 'react';
import { Box, Typography } from '@mui/material';

const ContactForm = lazy(() => import('@/components/ContactForm'));

function LoadingFallback() {
  return (
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
  );
}

export default function DynamicContactForm() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ContactForm />
    </Suspense>
  );
}

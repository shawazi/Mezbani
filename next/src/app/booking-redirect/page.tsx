'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import PageLayout from '@/components/PageLayout';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function BookingRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // TODO: Handle Square booking confirmation
    const status = searchParams.get('status');
    const bookingId = searchParams.get('bookingId');

    if (status === 'success' && bookingId) {
      // Handle successful booking
      setTimeout(() => {
        router.push('/');
      }, 5000);
    } else {
      // Handle failed booking
      setTimeout(() => {
        router.push('/order');
      }, 5000);
    }
  }, [router, searchParams]);

  return (
    <PageLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
        }}
      >
        <LoadingSpinner />
        <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
          Processing your booking...
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
          Please wait while we confirm your order.
        </Typography>
      </Box>
    </PageLayout>
  );
}

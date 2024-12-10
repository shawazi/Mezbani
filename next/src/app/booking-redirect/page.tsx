'use client';

import { Suspense } from 'react';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import PageLayout from '@/components/PageLayout';
import LoadingSpinner from '@/components/LoadingSpinner';

function BookingRedirectContent() {
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
          minHeight: '60vh',
          textAlign: 'center',
          p: 4,
        }}
      >
        <LoadingSpinner />
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
          Processing Your Booking
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please wait while we confirm your booking details...
        </Typography>
      </Box>
    </PageLayout>
  );
}

export default function BookingRedirect() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BookingRedirectContent />
    </Suspense>
  );
}

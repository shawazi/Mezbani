'use client';

import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';

export default function ParallaxBanner({ imagePath, title, height = 400 }: { imagePath: string; title: string; height?: number }) {
  return (
    <Box 
      sx={{ 
        position: 'relative',
        width: '100%',
        height: `${height}px`,
        overflow: 'hidden',
        mb: 4
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          position: 'relative',
          height: '100%',
          px: { xs: 0 }, // Remove padding on mobile
        }}
      >
        <Image
          src={imagePath}
          alt={title}
          fill
          loading="eager"
          sizes="(max-width: 1200px) 100vw, 1200px"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          quality={85}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              px: 2, // Add padding for mobile
            }}
          >
            {title}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

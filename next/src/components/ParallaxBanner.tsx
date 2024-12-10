'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default function ParallaxBanner({ imagePath, title, height = 400 }: { imagePath: string; title: string; height?: number }) {
  return (
    <Box 
      sx={{ 
        position: 'relative',
        height: `${height}px`,
        overflow: 'hidden',
        mb: 4
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <Image
          src={imagePath}
          alt={title}
          fill
          priority={imagePath === '/images/chai-banner.jpg'}
          sizes="100vw"
          style={{
            objectFit: 'cover',
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
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

'use client';

import { Typography, Box } from '@mui/material';
import { bangladeshGreen } from '@/theme';

export default function ContactInfo() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ color: bangladeshGreen }}>
          Visit Us
        </Typography>
        <Typography variant="body1" paragraph>
          123 Main Street
          <br />
          Watertown, MA 02472
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ color: bangladeshGreen }}>
          Business Hours
        </Typography>
        <Typography variant="body1" paragraph>
          Monday - Friday: 8:00 AM - 8:00 PM
          <br />
          Saturday - Sunday: 9:00 AM - 6:00 PM
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ color: bangladeshGreen }}>
          Get in Touch
        </Typography>
        <Typography variant="body1" paragraph>
          Phone: (555) 123-4567
          <br />
          Email: info@mezbanichai.com
        </Typography>
      </Box>
    </>
  );
}

'use client';

import { Grid, Box, Typography } from '@mui/material';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string | null;
}

export default function MenuSection({ title, items }: { title: string; items: MenuItem[] }) {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Box
              sx={{
                p: 2,
                height: '100%',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 2,
                },
              }}
            >
              <Typography variant="h6" component="h3" gutterBottom>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {item.description}
              </Typography>
              <Typography variant="h6" color="primary">
                ${(item.price / 100).toFixed(2)}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

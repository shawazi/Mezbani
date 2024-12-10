'use client';

import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
} from '@mui/material';
import { bangladeshGreen, bangladeshRed } from '@/theme';
import PageLayout from '@/components/PageLayout';

const events = [
  {
    title: 'Corporate Catering',
    description:
      'Elevate your corporate events with our premium chai service. Perfect for meetings, conferences, and team building events.',
    image: 'https://placehold.co/600x400',
  },
  {
    title: 'Wedding Services',
    description:
      'Make your special day even more memorable with our traditional chai service. We offer customized packages for weddings and receptions.',
    image: 'https://placehold.co/600x400',
  },
  {
    title: 'Private Parties',
    description:
      "Whether it's a birthday, anniversary, or family gathering, our chai service adds a unique touch to your celebration.",
    image: 'https://placehold.co/600x400',
  },
  {
    title: 'Cultural Events',
    description:
      'Bring authentic Bangladeshi chai culture to your cultural events and festivals. We provide full-service catering.',
    image: 'https://placehold.co/600x400',
  },
];

export default function Events() {
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
        Events
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
        Let us bring the authentic chai experience to your next event
      </Typography>

      <Grid container spacing={4}>
        {events.map((event) => (
          <Grid item xs={12} md={6} key={event.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                bgcolor: 'background.paper',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 3,
                },
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={event.image}
                alt={event.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  sx={{ color: bangladeshGreen }}
                >
                  {event.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {event.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 8, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: bangladeshGreen }}>
          Ready to Book Your Event?
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Contact us to discuss your event requirements and get a customized quote.
        </Typography>
        <Button
          variant="contained"
          size="large"
          href="/contact"
          sx={{
            mt: 2,
            backgroundColor: bangladeshRed,
            '&:hover': {
              backgroundColor: bangladeshRed,
              filter: 'brightness(1.1)',
            },
            px: { xs: 3, sm: 6 },
            py: { xs: 1.5, sm: 2 },
          }}
        >
          Contact Us
        </Button>
      </Box>
    </PageLayout>
  );
}

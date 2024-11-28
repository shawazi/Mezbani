import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
} from '@mui/material'
import { bangladeshGreen, bangladeshRed } from '../theme'

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
]

const Events = () => {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
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
          Custom Event Packages
        </Typography>
        <Typography variant="body1" paragraph>
          We offer customized packages to suit your specific event needs. Our team
          will work with you to create the perfect chai service experience for your
          guests.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            mt: 2,
            backgroundColor: bangladeshRed,
            '&:hover': {
              backgroundColor: bangladeshGreen,
            },
          }}
          href="mailto:events@mezbanichai.com"
        >
          Contact for Event Booking
        </Button>
      </Box>

      <Box
        sx={{
          bgcolor: 'rgba(0, 106, 78, 0.05)',
          p: 4,
          borderRadius: 2,
          mt: 4,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: bangladeshGreen }}>
          Why Choose Our Event Services?
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Professional Service
            </Typography>
            <Typography>
              Our trained staff ensures seamless service and authentic chai
              preparation at your event.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Customizable Options
            </Typography>
            <Typography>
              Choose from our variety of chai flavors and service styles to match
              your event theme.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quality Guaranteed
            </Typography>
            <Typography>
              We use only the finest ingredients and maintain the highest standards
              of quality and hygiene.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Events

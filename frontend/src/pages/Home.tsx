import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import {  bangladeshRed } from '../theme'

const Home = () => {
  return (
    <Box sx={{ width: '100%', margin: 0, padding: 0 }}>
      <Box sx={{ 
        bgcolor: 'rgba(0, 106, 78, 0.1)',
        py: { xs: 6, md: 8 },
        width: '100%'
      }}>
        <Container maxWidth="lg" sx={{ mx: 'auto' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{ 
                color: 'white',
                fontWeight: 'bold',
                fontSize: { xs: '2.5rem', sm: '3.75rem' }
              }}
            >
              Welcome to Mezbani Chai House
            </Typography>
            <Typography 
              variant="h5" 
              color="text.secondary" 
              paragraph
              sx={{ 
                fontSize: { xs: '1.1rem', sm: '1.5rem' },
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              Experience the authentic taste of Bangladesh in every cup of our
              handcrafted chai
            </Typography>
            <Button
              component={RouterLink}
              to="/order"
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                backgroundColor: bangladeshRed,
                '&:hover': {
                  backgroundColor: bangladeshRed,
                  filter: 'brightness(1.1)',
                },
                px: { xs: 3, sm: 6 },
                py: { xs: 1.5, sm: 2 },
                fontSize: { xs: '1rem', sm: '1.25rem' },
              }}
            >
              Order Now
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, mx: 'auto' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: '100%',
                backgroundColor: 'rgba(0, 106, 78, 0.1)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Typography variant="h5" gutterBottom color="white">
                Our Story
              </Typography>
              <Typography color="text.secondary">
                Founded with a passion for authentic Bangladeshi chai, Mezbani brings
                the rich tradition of tea culture to Watertown, MA. Every cup tells a
                story of heritage and craftsmanship.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: '100%',
                backgroundColor: 'rgba(244, 42, 65, 0.1)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Typography variant="h5" gutterBottom color="white">
                Special Events
              </Typography>
              <Typography color="text.secondary">
                Host your next gathering with us! From corporate events to intimate
                celebrations, we offer chai catering services that will make your
                event memorable.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: '100%',
                backgroundColor: 'rgba(0, 106, 78, 0.1)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Typography variant="h5" gutterBottom color="white">
                Our Commitment
              </Typography>
              <Typography color="text.secondary">
                We source the finest ingredients and blend them with care to create
                the perfect cup of chai. Our commitment to quality and authenticity
                is unwavering.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Home

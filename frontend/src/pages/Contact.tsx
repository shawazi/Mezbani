import {
  Container,
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  Paper,
} from '@mui/material'
import { bangladeshGreen, bangladeshRed } from '../theme'

const Contact = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle form submission
    console.log('Form submitted')
  }

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
        Contact Us
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
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
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ color: bangladeshGreen }}>
              Send us a Message
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                      backgroundColor: bangladeshRed,
                      '&:hover': {
                        backgroundColor: bangladeshGreen,
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ color: bangladeshGreen }}>
          Find Us
        </Typography>
        <Paper elevation={3} sx={{ height: '400px', width: '100%' }}>
          {/* Replace this with an actual Google Maps embed */}
          <Box
            sx={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(0, 106, 78, 0.05)',
            }}
          >
            <Typography variant="body1" color="text.secondary">
              Google Maps Embed Placeholder
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default Contact

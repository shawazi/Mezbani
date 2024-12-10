'use client';

import {
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { bangladeshGreen, bangladeshRed } from '@/theme';
import PageLayout from '@/components/PageLayout';

export default function Contact() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Handle form submission
    console.log('Form submitted');
  };

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
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4,
              bgcolor: 'background.paper',
            }}
          >
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.23)',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.23)',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.23)',
                        },
                      },
                    }}
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.23)',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                      mt: 2,
                      backgroundColor: bangladeshRed,
                      '&:hover': {
                        backgroundColor: bangladeshRed,
                        filter: 'brightness(1.1)',
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
    </PageLayout>
  );
}

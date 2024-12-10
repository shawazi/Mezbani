'use client';

import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { bangladeshGreen, bangladeshRed } from '@/theme';

const textFieldStyles = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.23)',
    },
  },
};

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Handle form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
  };

  return (
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
              disabled={isSubmitting}
              sx={textFieldStyles}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Last Name"
              variant="outlined"
              disabled={isSubmitting}
              sx={textFieldStyles}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              disabled={isSubmitting}
              sx={textFieldStyles}
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
              disabled={isSubmitting}
              sx={textFieldStyles}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isSubmitting}
              sx={{
                mt: 2,
                backgroundColor: bangladeshRed,
                '&:hover': {
                  backgroundColor: bangladeshRed,
                  filter: 'brightness(1.1)',
                },
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

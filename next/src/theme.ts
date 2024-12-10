import { createTheme } from '@mui/material/styles';

// Bangladesh flag colors
export const bangladeshGreen = '#006a4e';
export const bangladeshRed = '#f42a41';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: bangladeshGreen,
      light: '#338d6f',
      dark: '#004a37',
      contrastText: '#ffffff',
    },
    secondary: {
      main: bangladeshRed,
      light: '#f65464',
      dark: '#aa1d2d',
      contrastText: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      marginBottom: '1.5rem',
      marginTop: '2rem'
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      marginBottom: '1.25rem',
      marginTop: '1.75rem'
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
      marginBottom: '1rem',
      marginTop: '1.5rem'
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
      marginBottom: '0.75rem',
      marginTop: '1.25rem'
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
    body1: {
      marginBottom: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
  },
});

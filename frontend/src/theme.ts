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
    fontFamily: "'Montserrat', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

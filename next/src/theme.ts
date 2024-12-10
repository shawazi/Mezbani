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
    fontFamily: 'var(--font-montserrat)',
    h1: {
      fontFamily: 'var(--font-playfair)',
      fontWeight: 600,
      marginBottom: '1.5rem',
      marginTop: '2rem'
    },
    h2: {
      fontFamily: 'var(--font-playfair)',
      fontWeight: 600,
      marginBottom: '1.25rem',
      marginTop: '1.75rem'
    },
    h3: {
      fontFamily: 'var(--font-playfair)',
      fontWeight: 500,
      marginBottom: '1rem',
      marginTop: '1.5rem'
    },
    h4: {
      fontFamily: 'var(--font-playfair)',
      fontWeight: 500,
      marginBottom: '0.75rem',
      marginTop: '1.25rem'
    },
    h5: {
      fontFamily: 'var(--font-playfair)',
      fontWeight: 500
    },
    h6: {
      fontFamily: 'var(--font-playfair)',
      fontWeight: 500
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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#6b6b6b",
            minHeight: 24,
            border: "3px solid #2b2b2b",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
        },
      },
    },
  },
});

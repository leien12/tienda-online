import { createTheme } from '@mui/material/styles';

// Definir la paleta de colores atractiva para la tienda
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e', // Azul Profundo (Indigo 900) - Estilo Admin
      light: '#534bae',
      dark: '#000051',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff6f00', // Ámbar/Naranja - Contraste vibrante
      light: '#ffa040',
      dark: '#c43e00',
      contrastText: '#ffffff',
    },
    tertiary: {
      main: '#2e3b55', // Azul Grisáceo del Sidebar Admin
      light: '#576682',
      dark: '#03152c',
    },
    background: {
      default: '#f4f6f8', // Gris muy claro (Admin style)
      paper: '#ffffff',
      alternate: '#e8eaf6',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#5e6b77',
      disabled: '#9e9e9e',
    },
    success: {
      main: '#2e7d32', // Verde éxito estándar
    },
    warning: {
      main: '#ed6c02', // Naranja advertencia
    },
    error: {
      main: '#d32f2f', // Rojo error
    },
    info: {
      main: '#0288d1', // Azul info
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: '-0.00833em',
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.35,
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px -1px rgba(0,0,0,0.1), 0px 4px 5px 0px rgba(0,0,0,0.05), 0px 1px 10px 0px rgba(0,0,0,0.05)',
    '0px 3px 5px -1px rgba(0,0,0,0.1), 0px 6px 10px 0px rgba(0,0,0,0.05), 0px 1px 18px 0px rgba(0,0,0,0.05)',
    '0px 3px 5px -1px rgba(0,0,0,0.12), 0px 5px 8px 0px rgba(0,0,0,0.07), 0px 1px 14px 0px rgba(0,0,0,0.06)',
    '0px 2px 4px -1px rgba(0,0,0,0.12), 0px 4px 5px 0px rgba(0,0,0,0.07), 0px 1px 10px 0px rgba(0,0,0,0.06)',
    '0px 3px 5px -1px rgba(0,0,0,0.12), 0px 5px 8px 0px rgba(0,0,0,0.07), 0px 1px 14px 0px rgba(0,0,0,0.06)',
    '0px 3px 5px -1px rgba(0,0,0,0.14), 0px 6px 10px 0px rgba(0,0,0,0.08), 0px 1px 18px 0px rgba(0,0,0,0.07)',
    '0px 4px 5px -2px rgba(0,0,0,0.14), 0px 7px 10px 1px rgba(0,0,0,0.08), 0px 2px 16px 1px rgba(0,0,0,0.07)',
    '0px 5px 5px -3px rgba(0,0,0,0.14), 0px 8px 10px 1px rgba(0,0,0,0.08), 0px 3px 14px 2px rgba(0,0,0,0.07)',
    '0px 5px 6px -3px rgba(0,0,0,0.14), 0px 9px 12px 1px rgba(0,0,0,0.08), 0px 3px 16px 2px rgba(0,0,0,0.07)',
    '0px 6px 6px -3px rgba(0,0,0,0.16), 0px 10px 14px 1px rgba(0,0,0,0.09), 0px 4px 18px 3px rgba(0,0,0,0.08)',
    '0px 6px 7px -4px rgba(0,0,0,0.16), 0px 11px 15px 1px rgba(0,0,0,0.09), 0px 4px 20px 3px rgba(0,0,0,0.08)',
    '0px 7px 8px -4px rgba(0,0,0,0.16), 0px 12px 17px 2px rgba(0,0,0,0.09), 0px 5px 22px 4px rgba(0,0,0,0.08)',
    '0px 7px 8px -4px rgba(0,0,0,0.18), 0px 13px 19px 2px rgba(0,0,0,0.10), 0px 5px 24px 4px rgba(0,0,0,0.09)',
    '0px 7px 9px -4px rgba(0,0,0,0.18), 0px 14px 21px 2px rgba(0,0,0,0.10), 0px 5px 26px 4px rgba(0,0,0,0.09)',
    '0px 8px 9px -5px rgba(0,0,0,0.18), 0px 15px 22px 2px rgba(0,0,0,0.10), 0px 6px 28px 5px rgba(0,0,0,0.09)',
    '0px 8px 10px -5px rgba(0,0,0,0.20), 0px 16px 24px 2px rgba(0,0,0,0.11), 0px 6px 30px 5px rgba(0,0,0,0.10)',
    '0px 8px 11px -5px rgba(0,0,0,0.20), 0px 17px 26px 2px rgba(0,0,0,0.11), 0px 6px 32px 5px rgba(0,0,0,0.10)',
    '0px 9px 11px -5px rgba(0,0,0,0.20), 0px 18px 28px 2px rgba(0,0,0,0.11), 0px 7px 34px 6px rgba(0,0,0,0.10)',
    '0px 9px 12px -6px rgba(0,0,0,0.22), 0px 19px 29px 2px rgba(0,0,0,0.12), 0px 7px 36px 6px rgba(0,0,0,0.11)',
    '0px 10px 13px -6px rgba(0,0,0,0.22), 0px 20px 31px 3px rgba(0,0,0,0.12), 0px 8px 38px 7px rgba(0,0,0,0.11)',
    '0px 10px 13px -6px rgba(0,0,0,0.24), 0px 21px 33px 3px rgba(0,0,0,0.13), 0px 8px 40px 7px rgba(0,0,0,0.12)',
    '0px 10px 14px -6px rgba(0,0,0,0.24), 0px 22px 35px 3px rgba(0,0,0,0.13), 0px 8px 42px 7px rgba(0,0,0,0.12)',
    '0px 11px 14px -7px rgba(0,0,0,0.24), 0px 23px 36px 3px rgba(0,0,0,0.13), 0px 9px 44px 8px rgba(0,0,0,0.12)',
    '0px 11px 15px -7px rgba(0,0,0,0.26), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.13)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
          fontSize: '1rem',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          },
        },
        contained: {
          boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#212121',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            '&:hover fieldset': {
              borderColor: '#2E7D32',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2E7D32',
              borderWidth: 2,
            },
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;

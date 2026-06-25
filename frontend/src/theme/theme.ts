import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#60a5fa', // Azul mais claro para destacar no fundo escuro
      light: '#93c5fd',
      dark: '#2563eb',
    },
    secondary: {
      main: '#f97316', // Laranja vibrante
      light: '#fb923c',
      dark: '#c2410c',
    },
    background: {
      default: '#0f172a', // Fundo principal (slate muito escuro)
      paper: '#1e293b',   // Fundo de cards e menus (slate)
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
    divider: '#334155', // Bordas mais sutis
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          backgroundImage: 'none', // Remove a sobreposição padrão do MUI dark mode
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1e293b',
          borderRight: '1px solid #334155',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e293b',
          borderBottom: '1px solid #334155',
          boxShadow: 'none',
        },
      },
    },
  },
});

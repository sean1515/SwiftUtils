import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      background: {
        default: mode === 'dark' ? '#2a2c38' : '#f8f9fa',
        paper: mode === 'dark' ? '#2a2c38' : '#ffffff',
      },
      primary: {
        main: '#008C8C',
      },
    },
  });

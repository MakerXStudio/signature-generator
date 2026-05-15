import { createTheme } from '@mui/material/styles';

export const NAVBAR_BG = '#000c28';
export const MAKERX_BLUE = '#003FB5';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: MAKERX_BLUE },
    background: { default: '#ffffff' },
  },
  typography: {
    fontFamily: [
      '"Inter"',
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
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: NAVBAR_BG,
        },
      },
    },
  },
});

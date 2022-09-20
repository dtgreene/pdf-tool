import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';

import { PDFTool } from '../PDFTool';

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: blue,
    secondary: pink,
  },
  typography: {
    fontFamily: 'Poppins',
  },
  overrides: {
    MuiOutlinedInput: {
      input: {
        padding: '8px'
      }
    }
  }
});

export const App = () => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <PDFTool />
  </ThemeProvider>
);

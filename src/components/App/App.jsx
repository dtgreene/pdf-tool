import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@material-ui/core';
import { indigo, pink } from '@material-ui/core/colors';

import { PDFTool } from '../PDFTool';

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: indigo,
    secondary: pink,
  },
  typography: {
    fontFamily: 'Poppins',
  },
  overrides: {
    MuiOutlinedInput: {
      input: {
        padding: '12px 8px'
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

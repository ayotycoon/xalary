import React, { ReactNode, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base';
import { StylesProvider } from '@mui/styles';
import { isBrowser } from '../misc/Storage';

export const ThemeContext = React.createContext(
  (themeName: string): void => { }
);

const ThemeProviderWrapper: React.FC<any> = (props) => {
  const curThemeName = isBrowser()?  localStorage.getItem('appTheme') || 'PureLightTheme' : 'PureLightTheme';
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };


  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider >
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;

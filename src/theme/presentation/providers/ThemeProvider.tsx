import { FC, PropsWithChildren, useCallback, useState } from 'react';

import { Theme } from '../../domain/types/ITheme';
import { DEFAULT_THEME } from '../constants/theme';
import { useRootThemeVars } from '../hooks/UseRootThemeVars';
import { useSetColorScheme } from '../hooks/UseSetColorScheme';
import { useThemeBroadcast } from '../hooks/UseThemeBroadcast';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  // update color scheme based on company theme
  const setColorScheme = useSetColorScheme(setTheme);
  // restart color scheme to default
  const setDefaultColorScheme = useCallback(() => {
    setColorScheme({
      primary_color: DEFAULT_THEME.primary,
      dark_mode: DEFAULT_THEME.dark,
      secondary_color: DEFAULT_THEME.secondary,
    });
  }, [setColorScheme]);

  // set root theme variables
  useRootThemeVars(theme);
  // broadcast theme to other components
  useThemeBroadcast(setColorScheme);

  return (
    <ThemeContext.Provider
      value={{ setColorScheme, theme, setDefaultColorScheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

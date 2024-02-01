import { FC, PropsWithChildren, useCallback, useMemo, useState } from 'react';

import { useWidgetConfig } from '../../../nebuia/presentation/providers/WidgetConfig/Context';
import { Theme } from '../../domain/types/ITheme';
import { DEFAULT_THEME } from '../constants/theme';
import { useRootThemeVars } from '../hooks/UseRootThemeVars';
import { useSetColorScheme } from '../hooks/UseSetColorScheme';
import { useThemeBroadcast } from '../hooks/UseThemeBroadcast';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { theme: colorScheme } = useWidgetConfig();
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME(colorScheme));
  // update color scheme based on company theme
  const setColorScheme = useSetColorScheme(setTheme, theme);
  // restart color scheme to default
  const setDefaultColorScheme = useCallback(() => {
    setColorScheme({
      primary_color: DEFAULT_THEME(colorScheme).primary,
      secondary_color: DEFAULT_THEME(colorScheme).secondary,
    });
  }, [setColorScheme, colorScheme]);

  // set root theme variables
  useRootThemeVars(theme);
  // broadcast theme to other components
  useThemeBroadcast(setColorScheme);

  const value = useMemo(
    () => ({
      setColorScheme,
      theme,
      setDefaultColorScheme,
    }),
    [setColorScheme, setDefaultColorScheme, theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

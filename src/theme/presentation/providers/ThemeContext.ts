import { createContext } from 'react';

import { Theme } from '../../domain/types/ITheme';
import { NebuiaCompanyWidgetSettings } from '../hooks/UseThemeBroadcast';

export interface ThemeContextValue {
  theme: Theme;
  setColorScheme: (arg0: NebuiaCompanyWidgetSettings) => void;
  setDefaultColorScheme: VoidFunction;
}

export const ThemeContext = createContext<ThemeContextValue>(
  {} as ThemeContextValue,
);

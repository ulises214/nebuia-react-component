import { NebuiaCompanyWidgetSettings } from '@nebuia-ts/models';
import { createContext } from 'react';

import { Theme } from '../../domain/types/ITheme';

export interface ThemeContextValue {
  theme: Theme;
  setColorScheme: (arg0: NebuiaCompanyWidgetSettings) => void;
  setDefaultColorScheme: VoidFunction;
}

export const ThemeContext = createContext<ThemeContextValue>(
  {} as ThemeContextValue,
);

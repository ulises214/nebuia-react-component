import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';

import { Optional } from '../../lib/common/Optional';
import { Theme } from '../models/Theme';

interface ThemeContextValue {
  theme: Theme;
  setColorScheme: (arg0: {
    primary: Theme['primary'];
    secondary: Theme['secondary'];
    darkMode: boolean;
  }) => void;
}

const ThemeContext = createContext<Optional<ThemeContextValue>>(undefined);

export const NebuiaThemeContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [theme, setTheme] = useState(Theme.i);
  const setColorScheme = useCallback<ThemeContextValue['setColorScheme']>(
    ({ primary, secondary, darkMode }) => {
      theme.primary = primary;
      theme.secondary = secondary;
      theme.background = darkMode ? '#212529' : '#fff';
      theme.card = darkMode ? '#191c1f' : '#fff';
      theme.text = darkMode ? '#fff' : '#30384E';
      theme.textSecondary = darkMode
        ? 'rgba(255, 255, 255, 0.8)'
        : 'rgba(90, 88, 100, 0.8)';
      setTheme(theme);
    },
    [theme],
  );

  return (
    <ThemeContext.Provider value={{ setColorScheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useNebuiaThemeContext = (): ThemeContextValue =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useContext(ThemeContext)!;

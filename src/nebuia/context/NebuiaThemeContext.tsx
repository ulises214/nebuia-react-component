import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { hexToRgb, lightenDarkenColor } from '../models/Theme';

type Theme = {
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  background: string;
  secondaryBackground: string;
  dark: boolean;
};
interface ThemeContextValue {
  theme: Theme;
  setColorScheme: (
    arg0: Partial<Pick<Theme, 'dark' | 'primary' | 'secondary'>>,
  ) => void;
  setDefaultColorScheme: VoidFunction;
}
const shadesNumbers = [210, 180, 120, 90, 60, 30, 0, -10, -20, -30];
const getColorShades = (color: string) => {
  return shadesNumbers.map((s) =>
    hexToRgb(lightenDarkenColor(color, s)).join(' '),
  );
};
const twShades = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
];

const setTwShades = (rgbColors: string[], prefix: string) => {
  rgbColors.forEach((s, i) => {
    document.documentElement.style.setProperty(
      `--tw-nebuia-color-${prefix}-${twShades[i]}`,
      s,
    );
  });
};

const ThemeContext = createContext<ThemeContextValue>({} as ThemeContextValue);
const DARK_THEME = {
  bg: '#0B132B',
  text: '#fff',
  textSecondary: 'rgba(255, 255, 255, 0.6)',
  secondaryBackground: '#1C2541',
} as const;
const LIGHT_THEME = {
  bg: '#fff',
  text: '#000',
  textSecondary: 'rgba(0, 0, 0, 0.6)',
  secondaryBackground: '#0B132B',
} as const;

export const DEFAULT_PRIMARY_COLOR = '#050217';
export const DEFAULT_SECONDARY_COLOR = '#6847a2';
export const DEFAULT_DARK_PRIMARY_COLOR = '#d4037d';
export const DEFAULT_DARK_SECONDARY_COLOR = '#864ce9';

const defaultTheme = {
  dark: false,
  primary: DEFAULT_PRIMARY_COLOR,
  secondary: DEFAULT_SECONDARY_COLOR,
  text: LIGHT_THEME.text,
  textSecondary: LIGHT_THEME.textSecondary,
  background: LIGHT_THEME.bg,
  secondaryBackground: LIGHT_THEME.secondaryBackground,
};

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const primaryShades = getColorShades(theme.primary);
    const secondaryShades = getColorShades(theme.secondary);
    setTwShades(primaryShades, 'primary');
    setTwShades(secondaryShades, 'secondary');
    document.documentElement.style.setProperty(
      '--tw-nebuia-color-background',
      theme.background,
    );
  }, [theme]);

  const setColorScheme = useCallback<ThemeContextValue['setColorScheme']>(
    ({ primary, secondary, dark }) => {
      setTheme({
        primary: primary ?? DEFAULT_PRIMARY_COLOR,
        secondary: secondary ?? DEFAULT_SECONDARY_COLOR,
        dark: dark ?? false,
        background: (dark ? DARK_THEME : LIGHT_THEME).bg,
        text: (dark ? DARK_THEME : LIGHT_THEME).text,
        textSecondary: (dark ? DARK_THEME : LIGHT_THEME).textSecondary,
        secondaryBackground: (dark ? DARK_THEME : LIGHT_THEME)
          .secondaryBackground,
      });
    },
    [],
  );

  const setDefaultColorScheme = useCallback(() => {
    setColorScheme(defaultTheme);
  }, [setColorScheme]);

  useEffect(() => {
    const bc = new BroadcastChannel('nebuia');
    bc.onmessage = (e: MessageEvent) => {
      if ((e.data as Record<string, unknown>)['type'] === 'updateTheme') {
        setColorScheme((e.data as { payload: unknown }).payload as Theme);
      }
    };

    return () => {
      bc.onmessage = null;
      bc.close();
    };
  }, [setColorScheme]);

  return (
    <ThemeContext.Provider
      value={{ setColorScheme, theme, setDefaultColorScheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
export const useNebuiaThemeContext = (): ThemeContextValue =>
  useContext(ThemeContext);

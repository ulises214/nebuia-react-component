import { useCallback, useEffect } from 'react';

import { useWidgetConfig } from '../../../nebuia/presentation/providers/WidgetConfig/Context';
import { Theme } from '../../domain/types/ITheme';
import {
  DEFAULT_DARK_PRIMARY_COLOR,
  DEFAULT_DARK_SECONDARY_COLOR,
  DEFAULT_PRIMARY_COLOR,
  DEFAULT_SECONDARY_COLOR,
} from '../constants/colors';
import { DARK_THEME, LIGHT_THEME } from '../constants/theme';
import { ThemeContextValue } from '../providers/ThemeContext';
import { getColorContrast } from '../utils/colors';

type OnSetTheme = React.Dispatch<React.SetStateAction<Theme>>;

const getColorsByBrightness = ({
  isDark,
}: {
  isDark: boolean;
}): [string, string] => {
  const defaultPrimary = isDark
    ? DEFAULT_DARK_PRIMARY_COLOR
    : DEFAULT_PRIMARY_COLOR;
  const defaultSecondary = isDark
    ? DEFAULT_DARK_SECONDARY_COLOR
    : DEFAULT_SECONDARY_COLOR;

  return [defaultPrimary, defaultSecondary];
};
export const useSetColorScheme = (
  setTheme: OnSetTheme,
  currentTheme: Theme,
): ThemeContextValue['setColorScheme'] => {
  const { theme: colorScheme } = useWidgetConfig();
  const setColorScheme = useCallback<ThemeContextValue['setColorScheme']>(
    ({ primary_color: primary, secondary_color: secondary }) => {
      setTheme((prev: Partial<Theme>) => {
        // check browser preference
        const isDark =
          colorScheme === 'system'
            ? window.matchMedia('(prefers-color-scheme: dark)').matches
            : colorScheme === 'dark';
        const [defaultPrimary, defaultSecondary] = getColorsByBrightness({
          isDark,
        });
        let primaryColor = primary;
        if (!primaryColor) {
          primaryColor = prev.primary ?? defaultPrimary;
        }
        let secondaryColor = secondary;
        if (!secondaryColor) {
          secondaryColor = prev.secondary ?? defaultSecondary;
        }

        const theme = isDark ? DARK_THEME : LIGHT_THEME;

        return {
          primary: primaryColor,
          secondary: secondaryColor,
          dark: isDark,
          background: theme.bg,
          text: theme.text,
          textSecondary: theme.textSecondary,
          secondaryBackground: theme.secondaryBackground,
          primaryText: getColorContrast(primaryColor),
          secondaryText: getColorContrast(secondaryColor),
        };
      });
    },
    [setTheme, colorScheme],
  );

  useEffect(() => {
    // Listen for changes in the OS color scheme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      setColorScheme({
        primary_color: currentTheme.primary,
        secondary_color: currentTheme.secondary,
      });
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [currentTheme.primary, currentTheme.secondary, setColorScheme, setTheme]);

  return setColorScheme;
};

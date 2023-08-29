import { useCallback } from 'react';

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
): ThemeContextValue['setColorScheme'] => {
  const setColorScheme = useCallback<ThemeContextValue['setColorScheme']>(
    ({
      primary_color: primary,
      secondary_color: secondary,
      dark_mode: dark,
    }) => {
      setTheme((prev: Partial<Theme>) => {
        const isDark = dark ?? prev.dark ?? false;
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
    [setTheme],
  );

  return setColorScheme;
};

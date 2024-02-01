import { Theme } from '../../domain/types/ITheme';
import { getColorContrast } from '../utils/colors';
import {
  DEFAULT_DARK_PRIMARY_COLOR,
  DEFAULT_DARK_SECONDARY_COLOR,
  DEFAULT_PRIMARY_COLOR,
  DEFAULT_SECONDARY_COLOR,
} from './colors';

export const DARK_THEME = {
  bg: '#050217',
  text: '#fff',
  textSecondary: 'rgba(255, 255, 255, 0.6)',
  secondaryBackground: '#1C2541',
} as const;
export const LIGHT_THEME = {
  bg: '#fDfDfD',
  text: '#000',
  textSecondary: 'rgba(0, 0, 0, 0.6)',
  secondaryBackground: '#0B132B',
} as const;
const getIsDark = (): boolean =>
  window.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultIsDark = getIsDark();
export const DEFAULT_THEME = (
  colorScheme: 'light' | 'dark' | 'system' = 'system',
): Theme => {
  const isDark =
    colorScheme === 'dark' || (colorScheme === 'system' && defaultIsDark);

  const primary = isDark ? DEFAULT_DARK_PRIMARY_COLOR : DEFAULT_PRIMARY_COLOR;
  const secondary = isDark
    ? DEFAULT_DARK_SECONDARY_COLOR
    : DEFAULT_SECONDARY_COLOR;
  const theme = isDark ? DARK_THEME : LIGHT_THEME;

  return {
    dark: isDark,
    primary,
    secondary,
    text: theme.text,
    textSecondary: theme.textSecondary,
    background: theme.bg,
    secondaryBackground: theme.secondaryBackground,
    primaryText: getColorContrast(primary),
    secondaryText: getColorContrast(primary),
  };
};

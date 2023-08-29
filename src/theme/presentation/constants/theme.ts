import { Theme } from '../../domain/types/ITheme';
import { getColorContrast } from '../utils/colors';
import { DEFAULT_PRIMARY_COLOR, DEFAULT_SECONDARY_COLOR } from './colors';

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

export const DEFAULT_THEME: Theme = {
  dark: false,
  primary: DEFAULT_PRIMARY_COLOR,
  secondary: DEFAULT_SECONDARY_COLOR,
  text: LIGHT_THEME.text,
  textSecondary: LIGHT_THEME.textSecondary,
  background: LIGHT_THEME.bg,
  secondaryBackground: LIGHT_THEME.secondaryBackground,
  primaryText: getColorContrast(DEFAULT_PRIMARY_COLOR),
  secondaryText: getColorContrast(DEFAULT_SECONDARY_COLOR),
};

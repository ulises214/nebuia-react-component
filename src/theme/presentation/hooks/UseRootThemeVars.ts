import { useEffect } from 'react';

import { Theme } from '../../domain/types/ITheme';
import { setTwShades } from '../utils/shades';

export const useRootThemeVars = (theme: Theme): void => {
  useEffect(() => {
    setTwShades(theme.primary, 'primary');
    setTwShades(theme.secondary, 'secondary');
    document.documentElement.style.setProperty(
      '--tw-nebuia-color-background',
      theme.background,
    );
    document.documentElement.style.setProperty(
      '--color-on-primary',
      theme.primaryText,
    );
    document.documentElement.style.setProperty(
      '--color-on-secondary',
      theme.secondaryText,
    );
    document.documentElement.style.setProperty(
      '--base-text-color',
      theme.dark ? '#fff' : '#000',
    );
  }, [theme]);
};

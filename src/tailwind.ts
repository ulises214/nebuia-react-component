import type { Config } from 'tailwindcss';

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
export const NEBUIA_TAILWIND_CONFIG: Config['theme'] = {
  extend: {
    screens: {
      xs: '475px',
    },
    colors: {
      'nebuia-main': '#6df8e2',
      'nebuia-main-dark': '#050217',
      'nebuia-background': 'var(--tw-nebuia-color-background)',
      'nebuia-primary': shades.reduce(
        (acc, shade) => ({
          ...acc,
          [shade]: `rgb(var(--tw-nebuia-color-primary-${shade}) / <alpha-value>)`,
        }),
        {},
      ),
      'nebuia-secondary': shades.reduce(
        (acc, shade) => ({
          ...acc,
          [shade]: `rgb(var(--tw-nebuia-color-secondary-${shade}) / <alpha-value>)`,
        }),
        {},
      ),
    },
  },
};

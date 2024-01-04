const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
/**
 * @type {Config['theme']}
 */
export const NEBUIA_TAILWIND_CONFIG = {
  extend: {
    screens: {
      xs: '475px',
    },
    colors: {
      'nebuia-main': '#6df8e2',
      'nebuia-main-dark': '#050217',
      'nebuia-background': 'var(--tw-nebuia-color-background)',
      'nebuia-primary': shades.reduce<{
        [key: string]: string;
      }>(
        (acc, shade) => ({
          ...acc,
          [shade]: `rgb(var(--tw-nebuia-color-primary-${shade}) / <alpha-value>)`,
        }),
        {},
      ),
      'nebuia-secondary': shades.reduce<{
        [key: string]: string;
      }>(
        (acc, shade) => ({
          ...acc,
          [shade]: `rgb(var(--tw-nebuia-color-secondary-${shade}) / <alpha-value>)`,
        }),
        {},
      ),
    },
  },
  animation: {
    'circle-loader':
      'jump 1.5s cubic-bezier(0.5, 1.8, 0.5, 1) infinite, fadeInOut 1.4s ease-in-out infinite',
  },
  keyframes: {
    jump: {
      '0%, 100%': {
        scale: '0.75',
      },
      '50%': {
        scale: '1',
      },
    },
    fadeInOut: {
      '0%, 100%': {
        opacity: '0.3',
      },
      '50%': {
        opacity: '1',
      },
    },
  },
} as const;

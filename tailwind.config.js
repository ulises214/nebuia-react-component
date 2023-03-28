/* eslint-disable no-undef */

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '475px',
      },
      colors: {
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
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

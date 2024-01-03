/* eslint-disable no-undef */

import forms from '@tailwindcss/forms';

import { NEBUIA_TAILWIND_CONFIG } from './src/tailwind';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: NEBUIA_TAILWIND_CONFIG,
  plugins: [forms],
};

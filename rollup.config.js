/* eslint-disable no-undef */
const typescript = require('@rollup/plugin-typescript');
const postcss = require('rollup-plugin-postcss');
/**
 * @type {import('rollup').RollupOptions}
 */
module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/cjs/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/esm/index.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(),
    // tailwindcss
    postcss({
      extract: true,
      minimize: true,
    }),
  ],
  external: [
    '@nebuia-ts/models',
    '@nebuia-ts/sdk',
    'react',
    'react/jsx-runtime',
    'react-i18next',
    'i18next',
    'clsx',
    'tailwind-merge',
    '@heroicons/react/24/outline',
    'react-icons/im',
    'react-icons/ai',
    'email-validator',
    'country-flag-icons/unicode',
    'phone',
    'react-otp-input',
  ],
};

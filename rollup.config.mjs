// @ts-check
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: 'src/index.ts',
  treeshake: true,
  output: [
    {
      format: 'esm',
      sourcemap: true,
      dir: 'dist',
    },
  ],
  plugins: [
    typescript(),
    terser(),
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
    'lean-qr',
    'lean-qr/extras/react',
    'react-device-detect',
    'wasm-feature-detect',
    'libphonenumber-js',
    'react-phone-input-2',
    'react-phone-input-2/lang/es.json',
    'react-phone-input-2/lib/semantic-ui.css',
    'zustand',
  ],
};

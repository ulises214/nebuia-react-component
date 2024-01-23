// @ts-check
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

import { depsList } from './rollup.deps-list.mjs';
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
  external: depsList,
};

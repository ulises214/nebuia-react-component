// @ts-check
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

import { depsList } from './rollup.deps-list.mjs';

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: 'src/lazy.ts',
  treeshake: true,
  output: [
    {
      dir: 'dist',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
      project: './tsconfig.json',
    }),
    terser(),
  ],
  external: depsList,
};

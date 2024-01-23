// @ts-check
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

import { depsList } from './rollup.deps-list.mjs';
/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: 'src/tailwind.ts',
  treeshake: true,
  output: [
    {
      format: 'esm',
      sourcemap: true,
      dir: 'dist',
    },
  ],
  plugins: [typescript(), terser()],
  external: depsList,
};

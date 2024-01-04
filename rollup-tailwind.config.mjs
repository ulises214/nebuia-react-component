// @ts-check
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: 'src/tailwind.ts',
  treeshake: true,
  output: [
    {
      file: 'dist/tailwind.js',
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
};

/* eslint-disable no-undef */
const typescript = require('@rollup/plugin-typescript');
/**
 * @type {import('rollup').RollupOptions}
 */
module.exports = {
  input: 'src/tailwind.ts',
  output: [
    {
      file: 'dist/cjs/tailwind.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/esm/tailwind.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [typescript()],
  external: [],
};

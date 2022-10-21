const typescript = require('@rollup/plugin-typescript');
const postcss = require('rollup-plugin-postcss');

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
};

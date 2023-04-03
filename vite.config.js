/* eslint-disable no-undef */

const react = require('@vitejs/plugin-react');
/** @type {import('vite').UserConfig} */
module.exports = {
  plugins: [react()],
  build: {
    outDir: 'demo',
  },
};

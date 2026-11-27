import { defineConfig, transformWithOxc } from 'vite';

// Temporary config while react-scripts is still the build tool. The source
// keeps JSX in .js files, which Vite's transform does not parse as JSX.
const jsxInJs = {
  name: 'jsx-in-js',
  enforce: 'pre',
  async transform(code, id) {
    if (!/\/src\/.*\.js$/.test(id)) return null;
    return transformWithOxc(code, id, {
      lang: 'jsx',
      jsx: { runtime: 'automatic' },
    });
  },
};

export default defineConfig({
  plugins: [jsxInJs],
  test: {
    include: ['src/clipboard.test.jsx'],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/setupTests.js'],
  },
});

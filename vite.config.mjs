import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // The deploy workflow and gh-pages script publish build/.
    outDir: 'build',
    // Lightning CSS reorders declarations in Bulma's rules, and Chromium copies
    // computed styles in that order, so minifying changes the copied signature HTML.
    cssMinify: false,
  },
});

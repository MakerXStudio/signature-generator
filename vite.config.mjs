import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Keep CRA's output folder so the deploy workflow and gh-pages script still work.
    outDir: 'build',
    // Lightning CSS minification reorders declarations in Bulma's rules (for
    // example `img` and `.content table td`). Chromium copies computed styles
    // in that order, so minifying changes the copied signature HTML. Bulma's
    // prebuilt bulma.min.css keeps the original order, so it is shipped as is.
    cssMinify: false,
  },
});

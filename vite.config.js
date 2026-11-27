import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Keep `PORT=<port> npm start` working as it did with Create React App.
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
  },
  build: {
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/setupTests.js'],
  },
});

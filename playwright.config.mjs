import { defineConfig, devices } from '@playwright/test';

const port = Number(process.env.E2E_PORT ?? 4173);

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec.mjs',
  forbidOnly: !!process.env.CI,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: `http://localhost:${port}` },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `npx vite preview --port ${port} --strictPort`,
    url: `http://localhost:${port}`,
    // Always test the built preview, never a server already on the port.
    reuseExistingServer: false,
  },
});

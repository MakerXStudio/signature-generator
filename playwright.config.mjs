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
    command: `npx serve -s build -l ${port}`,
    url: `http://localhost:${port}`,
    // Never test a dev server that happens to be running on the port.
    reuseExistingServer: false,
  },
});

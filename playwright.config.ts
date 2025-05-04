import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  timeout: 60 * 1000,
  expect: {
    timeout: 10000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : 8,
  reporter: [
    ['html'],
    ['allure-playwright']
  ],
  use: {
    actionTimeout: 10000,
    navigationTimeout: 30000,
    trace: 'on-first-retry',
    baseURL: 'http://localhost:8080',
    viewport: { width: 1280, height: 720 },
    launchOptions: {
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    }
  },
  projects: [
    {
      name: 'default',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'critical',
      testMatch: /.*\.critical\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'regression',
      testMatch: /.*\.regression\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'smoke',
      testMatch: /.*\.smoke\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    }
  ],
  webServer: {
    command: 'npm run dev',
    port: 8080,
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000,
    stdout: 'pipe',
    stderr: 'pipe',
  }
};

export default config; 
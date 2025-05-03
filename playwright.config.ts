import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests/e2e',
  timeout: 15 * 1000,
  expect: {
    timeout: 3000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 8,
  reporter: [
    ['html', { 
      outputFolder: 'playwright-report',
      open: 'never'
    }],
    ['allure-playwright', { 
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: true,
      environmentInfo: {
        CI: process.env.CI,
        NODE_ENV: process.env.NODE_ENV,
        GITHUB_RUN_ID: process.env.GITHUB_RUN_ID
      }
    }]
  ],
  use: {
    actionTimeout: 0,
    trace: 'off',
    screenshot: 'only-on-failure',
    video: 'off',
    baseURL: 'http://localhost:8080',
    viewport: { width: 1280, height: 720 },
    launchOptions: {
      slowMo: 0,
    },
    bypassCSP: true,
    ignoreHTTPSErrors: true,
    javaScriptEnabled: true,
    acceptDownloads: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        headless: true,
        args: [
          '--disable-gpu',
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--disable-setuid-sandbox',
          '--disable-web-security',
          '--disable-features=IsolateOrigins,site-per-process',
          '--disable-site-isolation-trials'
        ]
      },
    },
  ],
};

export default config; 
import { test, expect } from '@playwright/test';

test.describe('Wallet Connection', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
    await page.goto('/', { waitUntil: 'commit' });
    await page.waitForSelector('body');
  });

  test('should connect to wallet', async ({ page }) => {
    const connectButton = page.getByRole('button', { name: 'Connect Wallet' });
    await connectButton.click({ timeout: 3000 });
    await expect(page.getByText('Connected')).toBeVisible({ timeout: 3000 });
  });

  test('should handle wallet disconnection', async ({ page }) => {
    const connectButton = page.getByRole('button', { name: 'Connect Wallet' });
    await connectButton.click({ timeout: 3000 });
    await expect(page.getByText('Connected')).toBeVisible({ timeout: 3000 });
    
    const disconnectButton = page.getByRole('button', { name: 'Disconnect' });
    await disconnectButton.click({ timeout: 3000 });
    await expect(page.getByText('Connect Wallet')).toBeVisible({ timeout: 3000 });
  });
}); 
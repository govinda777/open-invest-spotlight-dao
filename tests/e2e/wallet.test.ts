import { test, expect } from '@playwright/test';

test.describe('Wallet Connection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForSelector('body', { state: 'visible' });
  });

  test('should connect to wallet', async ({ page }) => {
    const connectButton = page.getByRole('button', { name: 'Connect Wallet' });
    await connectButton.click();
    await expect(page.getByText('Connected')).toBeVisible();
  });

  test('should handle wallet disconnection', async ({ page }) => {
    const connectButton = page.getByRole('button', { name: 'Connect Wallet' });
    await connectButton.click();
    await expect(page.getByText('Connected')).toBeVisible();
    
    const disconnectButton = page.getByRole('button', { name: 'Disconnect' });
    await disconnectButton.click();
    await expect(page.getByText('Disconnected')).toBeVisible();
  });
}); 
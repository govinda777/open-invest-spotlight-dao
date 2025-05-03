import { test, expect } from '@playwright/test';

test.describe('Wallet Connection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForSelector('body', { state: 'visible' });
  });

  test('should connect to wallet', async ({ page }) => {
    await page.getByRole('button', { name: 'Connect Wallet' }).click();
    await expect(page.getByText('Connected')).toBeVisible();
  });

  test('should handle wallet disconnection', async ({ page }) => {
    await page.getByRole('button', { name: 'Connect Wallet' }).click();
    await expect(page.getByText('Connected')).toBeVisible();
    
    await page.getByRole('button', { name: 'Disconnect' }).click();
    await expect(page.getByText('Connect Wallet')).toBeVisible();
  });
}); 
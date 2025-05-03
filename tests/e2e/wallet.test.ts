import { test, expect } from '@playwright/test';
import { waitForAppLoad, mockWallet } from './utils';

test.describe('Wallet Connection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForAppLoad(page);
  });

  test('should connect to wallet', async ({ page }) => {
    // Mock the Ethereum provider
    await mockWallet(page);

    // Click connect wallet button
    await page.getByRole('button', { name: 'Connect Wallet' }).click();

    // Verify wallet is connected
    await expect(page.getByText('Connected')).toBeVisible();
    
    // Get wallet address from page
    const address = await page.evaluate(() => window.ethereum.selectedAddress);
    expect(address).toBeTruthy();
  });

  test('should handle wallet disconnection', async ({ page }) => {
    // Mock the Ethereum provider
    await mockWallet(page);

    // Connect wallet
    await page.getByRole('button', { name: 'Connect Wallet' }).click();
    await expect(page.getByText('Connected')).toBeVisible();

    // Disconnect wallet
    await page.getByRole('button', { name: 'Disconnect' }).click();

    // Verify wallet is disconnected
    await expect(page.getByText('Connect Wallet')).toBeVisible();
    await expect(page.getByText('Connected')).not.toBeVisible();
  });
}); 
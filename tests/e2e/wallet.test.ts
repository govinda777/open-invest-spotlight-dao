import { test, expect } from '@playwright/test';

test.describe('Wallet Connection', () => {
  test('should connect to wallet', async ({ page }) => {
    // Navigate to the application
    await page.goto('/');

    // Mock the Ethereum provider
    await page.evaluate(() => {
      const mockAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
      window.ethereum = {
        selectedAddress: null,
        request: async ({ method }) => {
          if (method === 'eth_requestAccounts') {
            window.ethereum.selectedAddress = mockAddress;
            return [mockAddress];
          }
          return null;
        }
      };
    });

    // Click connect wallet button
    await page.click('button:has-text("Connect Wallet")');

    // Verify wallet is connected
    await expect(page.locator('text=Connected')).toBeVisible();
    
    // Get wallet address from page
    const address = await page.evaluate(() => window.ethereum.selectedAddress);
    expect(address).toBeTruthy();
    expect(address).toBe('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
  });

  test('should handle wallet disconnection', async ({ page }) => {
    // Navigate to the application
    await page.goto('/');

    // Mock the Ethereum provider
    await page.evaluate(() => {
      const mockAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
      window.ethereum = {
        selectedAddress: null,
        request: async ({ method }) => {
          if (method === 'eth_requestAccounts') {
            window.ethereum.selectedAddress = mockAddress;
            return [mockAddress];
          }
          return null;
        }
      };
    });

    // Connect wallet
    await page.click('button:has-text("Connect Wallet")');
    await expect(page.locator('text=Connected')).toBeVisible();

    // Disconnect wallet
    await page.click('button:has-text("Disconnect")');

    // Verify wallet is disconnected
    await expect(page.locator('text=Connect Wallet')).toBeVisible();
    await expect(page.locator('text=Connected')).not.toBeVisible();
  });
}); 
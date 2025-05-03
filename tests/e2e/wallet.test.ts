import { test, expect } from '@playwright/test';
import { ethers } from 'ethers';

test.describe('Wallet Connection', () => {
  test('should connect to local blockchain and wallet', async ({ page }) => {
    // Start local blockchain
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
    
    // Verify blockchain is running
    const network = await provider.getNetwork();
    expect(network.chainId).toBe(1337);

    // Navigate to the application
    await page.goto('/');

    // Click connect wallet button
    await page.click('button:has-text("Connect Wallet")');

    // Handle MetaMask popup
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      page.click('button:has-text("MetaMask")'),
    ]);

    // Accept connection in MetaMask
    await popup.click('button:has-text("Next")');
    await popup.click('button:has-text("Connect")');

    // Verify wallet is connected
    await expect(page.locator('text=Connected')).toBeVisible();
    
    // Get wallet address
    const address = await page.evaluate(() => window.ethereum.selectedAddress);
    expect(address).toBeTruthy();
    expect(ethers.utils.isAddress(address)).toBe(true);

    // Verify balance
    const balance = await provider.getBalance(address);
    expect(balance.gt(0)).toBe(true);
  });

  test('should handle wallet disconnection', async ({ page }) => {
    // Navigate to the application
    await page.goto('/');

    // Connect wallet first
    await page.click('button:has-text("Connect Wallet")');
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      page.click('button:has-text("MetaMask")'),
    ]);
    await popup.click('button:has-text("Next")');
    await popup.click('button:has-text("Connect")');

    // Disconnect wallet
    await page.click('button:has-text("Disconnect")');

    // Verify wallet is disconnected
    await expect(page.locator('text=Connect Wallet')).toBeVisible();
    await expect(page.locator('text=Connected')).not.toBeVisible();
  });
}); 
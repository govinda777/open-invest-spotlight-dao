import { test, expect } from '@playwright/test';
import { waitForAppLoad, mockWallet, clearLocalStorage, completeOnboardingSteps } from './utils';

test.describe('Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await clearLocalStorage(page);
    await waitForAppLoad(page);
  });

  test('should complete full investor onboarding journey', async ({ page }) => {
    // Close the onboarding dialog if it appears
    const dialogCloseButton = page.getByRole('button', { name: 'Close' });
    if (await dialogCloseButton.isVisible()) {
      await dialogCloseButton.click();
    }
    
    await page.goto('/onboarding');
    await waitForAppLoad(page);
    
    // Verify initial state
    await expect(page.getByRole('heading', { level: 2, name: /Welcome to Open Invest DAO/i })).toBeVisible();
    await expect(page.getByText(/decentralized platform/i)).toBeVisible();
    
    // Navigate through welcome step
    await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
    
    // Choose journey step
    await expect(page.getByText(/Choose Your Journey/i)).toBeVisible();
    
    // Click the Investor journey button
    const investorCard = page.locator('a', { hasText: 'Begin Investor Journey' });
    await investorCard.click();
    
    // Verify investor journey page
    await expect(page.getByText(/Discover and invest/i)).toBeVisible();
    
    // Connect wallet
    await mockWallet(page);
    await page.getByRole('button', { name: /Connect.*Wallet/i }).click();
    await expect(page.getByText(/Wallet Connected/i)).toBeVisible();
    
    // Complete verification
    await expect(page.getByText(/Complete Verification/i)).toBeVisible();
    await page.getByRole('button', { name: /Next|Continue|Verify/i }).click();
    
    // Make initial contribution
    await expect(page.getByText(/Make Initial Contribution/i)).toBeVisible();
    await page.getByRole('button', { name: /Contribute/i }).click();
    await expect(page.getByText(/Contribution successful/i)).toBeVisible();
  });

  test('should handle wallet connection during onboarding', async ({ page }) => {
    // Close the onboarding dialog if it appears
    const dialogCloseButton = page.getByRole('button', { name: 'Close' });
    if (await dialogCloseButton.isVisible()) {
      await dialogCloseButton.click();
    }
    
    await page.goto('/onboarding');
    await waitForAppLoad(page);
    
    // Navigate to investor journey
    await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
    const investorCard = page.locator('a', { hasText: 'Begin Investor Journey' });
    await investorCard.click();
    
    // Mock wallet and connect
    await mockWallet(page);
    await page.getByRole('button', { name: /Connect.*Wallet/i }).click();
    await expect(page.getByText(/Wallet Connected/i)).toBeVisible();
  });

  test('should handle insufficient funds for contribution', async ({ page }) => {
    // Close the onboarding dialog if it appears
    const dialogCloseButton = page.getByRole('button', { name: 'Close' });
    if (await dialogCloseButton.isVisible()) {
      await dialogCloseButton.click();
    }
    
    await page.goto('/onboarding');
    await waitForAppLoad(page);
    
    // Navigate to investor journey
    await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
    const investorCard = page.locator('a', { hasText: 'Begin Investor Journey' });
    await investorCard.click();
    
    // Mock wallet with no balance and connect
    await mockWallet(page, { hasBalance: false });
    await page.getByRole('button', { name: /Connect.*Wallet/i }).click();
    
    // Attempt contribution
    await page.getByRole('button', { name: /Contribute/i }).click();
    await expect(page.getByText(/Insufficient funds/i)).toBeVisible();
  });

  test('should persist onboarding progress', async ({ page }) => {
    // Close the onboarding dialog if it appears
    const dialogCloseButton = page.getByRole('button', { name: 'Close' });
    if (await dialogCloseButton.isVisible()) {
      await dialogCloseButton.click();
    }
    
    await page.goto('/onboarding');
    await waitForAppLoad(page);
    
    // Start journey and complete first step
    await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
    const investorCard = page.locator('a', { hasText: 'Begin Investor Journey' });
    await investorCard.click();
    
    // Store current URL
    const currentUrl = page.url();
    
    // Refresh page
    await page.reload();
    await waitForAppLoad(page);
    
    // Verify we're still on the same step
    expect(page.url()).toBe(currentUrl);
  });

  test('should allow switching between different user types', async ({ page }) => {
    // Close the onboarding dialog if it appears
    const dialogCloseButton = page.getByRole('button', { name: 'Close' });
    if (await dialogCloseButton.isVisible()) {
      await dialogCloseButton.click();
    }
    
    await page.goto('/onboarding');
    await waitForAppLoad(page);
    
    // Navigate through welcome
    await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
    
    // Try Investor journey
    const investorCard = page.locator('a', { hasText: 'Begin Investor Journey' });
    await investorCard.click();
    await expect(page.getByText(/Discover and invest/i)).toBeVisible();
    
    // Go back to selection
    await page.goto('/onboarding');
    await waitForAppLoad(page);
    await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
    
    // Try Project Owner journey
    const projectOwnerCard = page.locator('a', { hasText: 'Begin Project Owner Journey' });
    await projectOwnerCard.click();
    await expect(page.getByText(/Submit.*blockchain project/i)).toBeVisible();
  });
}); 
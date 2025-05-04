import { test, expect } from '@playwright/test';
import { waitForAppLoad, mockWallet, clearLocalStorage, completeOnboardingSteps, selectUserType } from './utils';

test.describe('Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await clearLocalStorage(page);
    await waitForAppLoad(page);
  });

  test('should complete full investor onboarding journey', async ({ page }) => {
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await waitForAppLoad(page);
    
    // Verify initial state
    await expect(page.getByRole('heading', { level: 2, name: /Welcome to Open Invest DAO/i })).toBeVisible();
    await expect(page.getByText(/decentralized platform/i)).toBeVisible();
    
    // Navigate through welcome step
    await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
    
    // Select investor journey
    await selectUserType(page, 'Investor');
    
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
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await waitForAppLoad(page);
    
    // Navigate through welcome step
    await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
    
    // Select investor journey
    await selectUserType(page, 'Investor');
    
    // Mock wallet and connect
    await mockWallet(page);
    await page.getByRole('button', { name: /Connect.*Wallet/i }).click();
    await expect(page.getByText(/Wallet Connected/i)).toBeVisible();
  });

  test('should handle insufficient funds for contribution', async ({ page }) => {
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await waitForAppLoad(page);
    
    // Navigate through welcome step
    await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
    
    // Select investor journey
    await selectUserType(page, 'Investor');
    
    // Mock wallet with no balance and connect
    await mockWallet(page, { hasBalance: false });
    await page.getByRole('button', { name: /Connect.*Wallet/i }).click();
    
    // Attempt contribution
    await page.getByRole('button', { name: /Contribute/i }).click();
    
    // Wait for error message
    await expect(page.getByText(/Insufficient funds/i)).toBeVisible();
  });

  test('should persist onboarding progress', async ({ page }) => {
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await waitForAppLoad(page);
    
    // Navigate through welcome step
    await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
    
    // Select investor journey
    await selectUserType(page, 'Investor');
    
    // Store current URL
    const currentUrl = page.url();
    
    // Refresh page
    await page.reload({ waitUntil: 'domcontentloaded' });
    await waitForAppLoad(page);
    
    // Verify we're still on the same step
    expect(page.url()).toBe(currentUrl);
  });

  test('should allow switching between different user types', async ({ page }) => {
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await waitForAppLoad(page);
    
    // Navigate through welcome step
    await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
    
    // Try Investor journey
    await selectUserType(page, 'Investor');
    await expect(page.getByText(/Discover and invest/i)).toBeVisible();
    
    // Go back to selection
    await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
    await waitForAppLoad(page);
    await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
    
    // Try Project Owner journey
    await selectUserType(page, 'Project Owner');
    await expect(page.getByText(/Submit.*blockchain project/i)).toBeVisible();
  });
}); 
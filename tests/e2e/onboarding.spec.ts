import { test, expect } from '@playwright/test';
import { waitForAppLoad, mockWallet, clearLocalStorage, completeOnboardingSteps, selectUserType } from './utils';

test.describe('Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await clearLocalStorage(page);
    await waitForAppLoad(page);
  });

  test('should complete full investor onboarding journey', async ({ page }) => {
    await page.goto('/onboarding');
    await waitForAppLoad(page);
    
    // Verify initial state
    await expect(page.getByRole('heading', { level: 2, name: /Welcome to Open Invest DAO/i })).toBeVisible();
    await expect(page.getByText(/decentralized platform/i)).toBeVisible();
    
    // Navigate through welcome step
    await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
    await page.waitForLoadState('networkidle');
    
    // Select investor journey
    await selectUserType(page, 'Investor');
    
    // Verify investor journey page
    await expect(page.getByText(/Discover and invest/i)).toBeVisible();
    
    // Connect wallet
    await mockWallet(page);
    await page.getByRole('button', { name: /Connect.*Wallet/i }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(/Wallet Connected/i)).toBeVisible();
    
    // Complete verification
    await expect(page.getByText(/Complete Verification/i)).toBeVisible();
    await page.getByRole('button', { name: /Next|Continue|Verify/i }).click();
    await page.waitForLoadState('networkidle');
    
    // Make initial contribution
    await expect(page.getByText(/Make Initial Contribution/i)).toBeVisible();
    await page.getByRole('button', { name: /Contribute/i }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(/Contribution successful/i)).toBeVisible();
  });

  test('should handle wallet connection during onboarding', async ({ page }) => {
    await page.goto('/onboarding');
    await waitForAppLoad(page);
    
    // Navigate through welcome step
    await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
    await page.waitForLoadState('networkidle');
    
    // Select investor journey
    await selectUserType(page, 'Investor');
    
    // Mock wallet and connect
    await mockWallet(page);
    await page.getByRole('button', { name: /Connect.*Wallet/i }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(/Wallet Connected/i)).toBeVisible();
  });

  test('should handle insufficient funds for contribution', async ({ page }) => {
    console.log('Starting insufficient funds test...');
    
    await page.goto('/onboarding');
    console.log('Navigated to onboarding page');
    await waitForAppLoad(page);
    
    // Navigate through welcome step
    const nextButton = page.getByRole('button', { name: /Next|Continue|Get Started/i });
    console.log('Looking for next button...');
    await expect(nextButton).toBeVisible();
    await nextButton.click();
    console.log('Clicked next button');
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    
    // Select investor journey
    console.log('Selecting investor journey...');
    await selectUserType(page, 'Investor');
    
    // Mock wallet with no balance and connect
    console.log('Mocking wallet with no balance...');
    await mockWallet(page, { hasBalance: false });
    
    const connectButton = page.getByRole('button', { name: /Connect.*Wallet/i });
    console.log('Looking for connect wallet button...');
    await expect(connectButton).toBeVisible();
    await connectButton.click();
    console.log('Clicked connect wallet button');
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    
    // Attempt contribution
    const contributeButton = page.getByRole('button', { name: /Contribute/i });
    console.log('Looking for contribute button...');
    await expect(contributeButton).toBeVisible();
    await contributeButton.click();
    console.log('Clicked contribute button');
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    
    // Wait for error message
    console.log('Waiting for insufficient funds message...');
    const errorMessage = page.getByText(/Insufficient funds/i);
    await expect(errorMessage).toBeVisible({ timeout: 10000 });
    console.log('Test completed successfully');
  });

  test('should persist onboarding progress', async ({ page }) => {
    await page.goto('/onboarding');
    await waitForAppLoad(page);
    
    // Navigate through welcome step
    await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
    await page.waitForLoadState('networkidle');
    
    // Select investor journey
    await selectUserType(page, 'Investor');
    
    // Store current URL
    const currentUrl = page.url();
    
    // Refresh page
    await page.reload();
    await waitForAppLoad(page);
    
    // Verify we're still on the same step
    expect(page.url()).toBe(currentUrl);
  });

  test('should allow switching between different user types', async ({ page }) => {
    await page.goto('/onboarding');
    await waitForAppLoad(page);
    
    // Navigate through welcome step
    await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
    await page.waitForLoadState('networkidle');
    
    // Try Investor journey
    await selectUserType(page, 'Investor');
    await expect(page.getByText(/Discover and invest/i)).toBeVisible();
    
    // Go back to selection
    await page.goto('/onboarding');
    await waitForAppLoad(page);
    await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
    await page.waitForLoadState('networkidle');
    
    // Try Project Owner journey
    await selectUserType(page, 'Project Owner');
    await expect(page.getByText(/Submit.*blockchain project/i)).toBeVisible();
  });
}); 
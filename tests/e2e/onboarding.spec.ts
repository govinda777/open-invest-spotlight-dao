import { test, expect } from '@playwright/test';

test.describe('Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should complete full investor onboarding journey', async ({ page }) => {
    await page.goto('/onboarding');
    
    // Verify initial state
    await expect(page.getByText('Choose Your Role')).toBeVisible();
    await expect(page.getByText('Investor')).toBeVisible();
    await expect(page.getByText('Project Owner')).toBeVisible();
    await expect(page.getByText('DAO Member')).toBeVisible();
    await expect(page.getByText('Community Member')).toBeVisible();
    
    // Select investor journey
    await page.getByText('Investor').click();
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Welcome step
    await expect(page.getByText('Bem-vindo')).toBeVisible();
    await expect(page.getByText('Welcome to Open Invest')).toBeVisible();
    await page.getByRole('button', { name: 'Complete Step' }).click();
    
    // Choose journey step
    await expect(page.getByText('Escolha sua Jornada')).toBeVisible();
    await expect(page.getByText('Select your investment path')).toBeVisible();
    await page.getByRole('button', { name: 'Complete Step' }).click();
    
    // How it works step
    await expect(page.getByText('Como Funciona')).toBeVisible();
    await expect(page.getByText('Understanding the platform')).toBeVisible();
    await page.getByRole('button', { name: 'Complete Step' }).click();
    
    // Paywall step
    await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
    await expect(page.getByText('Price: 0.05 ETH')).toBeVisible();
    await expect(page.getByText('30 days access')).toBeVisible();
    
    // Purchase NFT
    await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
    await expect(page.getByText('NFT purchased successfully!')).toBeVisible();
    
    // Verify final state
    await expect(page.getByText('Active Subscription')).toBeVisible();
    await expect(page.getByText('30 days remaining')).toBeVisible();
    await expect(page.getByText('Congratulations!')).toBeVisible();
  });

  test('should handle wallet connection during onboarding', async ({ page }) => {
    await page.goto('/onboarding');
    
    // Select investor journey
    await page.getByText('Investor').click();
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Complete initial steps
    await page.getByRole('button', { name: 'Complete Step' }).click();
    await page.getByRole('button', { name: 'Complete Step' }).click();
    await page.getByRole('button', { name: 'Complete Step' }).click();
    
    // Verify wallet connection prompt
    await expect(page.getByText('Connect your wallet')).toBeVisible();
    await page.getByRole('button', { name: 'Connect Wallet' }).click();
    
    // Mock wallet connection
    await page.evaluate(() => {
      window.ethereum = {
        request: async () => ['0x123...abc'],
        isMetaMask: true
      };
    });
    
    // Verify wallet connected
    await expect(page.getByText('Wallet Connected')).toBeVisible();
  });

  test('should handle insufficient funds for NFT purchase', async ({ page }) => {
    await page.goto('/onboarding');
    
    // Select investor journey
    await page.getByText('Investor').click();
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Complete initial steps
    await page.getByRole('button', { name: 'Complete Step' }).click();
    await page.getByRole('button', { name: 'Complete Step' }).click();
    await page.getByRole('button', { name: 'Complete Step' }).click();
    
    // Mock insufficient funds
    await page.evaluate(() => {
      window.ethereum = {
        request: async () => {
          throw new Error('Insufficient funds');
        }
      };
    });
    
    // Attempt purchase
    await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
    
    // Verify error message
    await expect(page.getByText('Insufficient funds')).toBeVisible();
    await expect(page.getByText('Please add more ETH to your wallet')).toBeVisible();
  });

  test('should persist onboarding progress', async ({ page }) => {
    await page.goto('/onboarding');
    
    // Start investor journey
    await page.getByText('Investor').click();
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Complete first step
    await page.getByRole('button', { name: 'Complete Step' }).click();
    
    // Refresh page
    await page.reload();
    
    // Verify progress is maintained
    await expect(page.getByText('Escolha sua Jornada')).toBeVisible();
    await expect(page.getByText('25%')).toBeVisible();
  });

  test('should allow switching between different user types', async ({ page }) => {
    await page.goto('/onboarding');
    
    // Start as Investor
    await page.getByText('Investor').click();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Bem-vindo')).toBeVisible();
    
    // Go back and switch to Project Owner
    await page.getByRole('button', { name: 'Back' }).click();
    await page.getByText('Project Owner').click();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Project Owner Welcome')).toBeVisible();
    
    // Verify different features are shown
    await expect(page.getByText('Project Management Tools')).toBeVisible();
  });
}); 
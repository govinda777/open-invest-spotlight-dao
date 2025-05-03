import { test, expect } from '@playwright/test';

test.describe('Journey System', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should complete onboarding journey as investor', async ({ page }) => {
    await page.goto('/onboarding');
    
    // Select investor journey
    await page.getByText('Investor').click();
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Complete welcome step
    await expect(page.getByText('Bem-vindo')).toBeVisible();
    await page.getByRole('button', { name: 'Complete Step' }).click();
    
    // Complete choose journey step
    await expect(page.getByText('Escolha sua Jornada')).toBeVisible();
    await page.getByRole('button', { name: 'Complete Step' }).click();
    
    // Complete how it works step
    await expect(page.getByText('Como Funciona')).toBeVisible();
    await page.getByRole('button', { name: 'Complete Step' }).click();
    
    // Verify paywall appears
    await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
    await expect(page.getByText('Price: 0.05 ETH')).toBeVisible();
    
    // Purchase NFT
    await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
    await expect(page.getByText('NFT purchased successfully!')).toBeVisible();
    
    // Verify subscription timer appears
    await expect(page.getByText('Active Subscription')).toBeVisible();
    await expect(page.getByText('30 days remaining')).toBeVisible();
  });

  test('should block access to final step without NFT purchase', async ({ page }) => {
    await page.goto('/onboarding');
    
    // Select investor journey
    await page.getByText('Investor').click();
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Complete all steps except paywall
    await page.getByRole('button', { name: 'Complete Step' }).click();
    await page.getByRole('button', { name: 'Complete Step' }).click();
    await page.getByRole('button', { name: 'Complete Step' }).click();
    
    // Verify paywall appears and final step is not visible
    await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
    await expect(page.getByText('Notifications')).not.toBeVisible();
  });

  test('should show correct progress percentage', async ({ page }) => {
    await page.goto('/onboarding');
    
    // Select investor journey
    await page.getByText('Investor').click();
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Verify initial progress
    await expect(page.getByText('0%')).toBeVisible();
    
    // Complete first step
    await page.getByRole('button', { name: 'Complete Step' }).click();
    await expect(page.getByText('25%')).toBeVisible();
    
    // Complete second step
    await page.getByRole('button', { name: 'Complete Step' }).click();
    await expect(page.getByText('50%')).toBeVisible();
  });

  test('should handle subscription expiration', async ({ page }) => {
    await page.goto('/onboarding');
    
    // Select investor journey
    await page.getByText('Investor').click();
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Complete all steps
    await page.getByRole('button', { name: 'Complete Step' }).click();
    await page.getByRole('button', { name: 'Complete Step' }).click();
    await page.getByRole('button', { name: 'Complete Step' }).click();
    
    // Purchase NFT
    await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
    
    // Set purchase date to 31 days ago
    await page.evaluate(() => {
      const purchaseDate = new Date();
      purchaseDate.setDate(purchaseDate.getDate() - 31);
      localStorage.setItem('investorNftPurchaseDate', purchaseDate.toISOString());
    });
    
    // Refresh page
    await page.reload();
    
    // Verify subscription timer is gone and paywall reappears
    await expect(page.getByText('Active Subscription')).not.toBeVisible();
    await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  });

  test('should support different user types', async ({ page }) => {
    await page.goto('/onboarding');
    
    // Test Project Owner journey
    await page.getByText('Project Owner').click();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Unlock Advanced Project Owner Features')).toBeVisible();
    
    // Test DAO Member journey
    await page.goto('/onboarding');
    await page.getByText('DAO Member').click();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Unlock Advanced DAO Member Features')).toBeVisible();
    
    // Test Community Member journey
    await page.goto('/onboarding');
    await page.getByText('Community Member').click();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Unlock Advanced Community Member Features')).toBeVisible();
  });
}); 
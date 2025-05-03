import { test, expect } from '@playwright/test';

test.describe('Journey System', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('should complete onboarding journey as investor', async ({ page }) => {
    await page.goto('/onboarding');
    await page.waitForLoadState('networkidle');
    
    // Select investor journey
    await page.waitForSelector('text=Investor');
    await page.getByText('Investor').click();
    await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
    
    // Complete welcome step
    await page.waitForSelector('text=Welcome to Open Invest DAO');
    await expect(page.getByText('Welcome to Open Invest DAO')).toBeVisible();
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Complete choose journey step
    await page.waitForSelector('text=Choose Your Journey');
    await expect(page.getByText('Choose Your Journey')).toBeVisible();
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Complete how it works step
    await page.waitForSelector('text=How Open Invest DAO Works');
    await expect(page.getByText('How Open Invest DAO Works')).toBeVisible();
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Verify paywall appears
    await page.waitForSelector('text=Unlock Advanced Investor Features');
    await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
    await expect(page.getByText('Price: 0.05 ETH')).toBeVisible();
    
    // Purchase NFT
    await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
    await page.waitForSelector('text=NFT purchased successfully!');
    await expect(page.getByText('NFT purchased successfully!')).toBeVisible();
    
    // Verify subscription timer appears
    await page.waitForSelector('text=Active Subscription');
    await expect(page.getByText('Active Subscription')).toBeVisible();
    await expect(page.getByText('30 days remaining')).toBeVisible();
  });

  test('should block access to final step without NFT purchase', async ({ page }) => {
    await page.goto('/onboarding');
    await page.waitForLoadState('networkidle');
    
    // Select investor journey
    await page.waitForSelector('text=Investor');
    await page.getByText('Investor').click();
    await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
    
    // Complete all steps except paywall
    await page.waitForSelector('button:has-text("Next")');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Verify paywall appears and final step is not visible
    await page.waitForSelector('text=Unlock Advanced Investor Features');
    await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
    await expect(page.getByText('Next Steps')).not.toBeVisible();
  });

  test('should show correct progress percentage', async ({ page }) => {
    await page.goto('/onboarding');
    await page.waitForLoadState('networkidle');
    
    // Select investor journey
    await page.waitForSelector('text=Investor');
    await page.getByText('Investor').click();
    await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
    
    // Verify initial progress
    await page.waitForSelector('text=0%');
    await expect(page.getByText('0%')).toBeVisible();
    
    // Complete first step
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForSelector('text=25%');
    await expect(page.getByText('25%')).toBeVisible();
    
    // Complete second step
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForSelector('text=50%');
    await expect(page.getByText('50%')).toBeVisible();
  });

  test('should handle subscription expiration', async ({ page }) => {
    await page.goto('/onboarding');
    await page.waitForLoadState('networkidle');
    
    // Select investor journey
    await page.waitForSelector('text=Investor');
    await page.getByText('Investor').click();
    await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
    
    // Complete all steps
    await page.waitForSelector('button:has-text("Next")');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Purchase NFT
    await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
    
    // Set purchase date to 31 days ago
    await page.evaluate(() => {
      const purchaseDate = new Date();
      purchaseDate.setDate(purchaseDate.getDate() - 31);
      localStorage.setItem('onboardingNftPurchaseDate', purchaseDate.toISOString());
    });
    
    // Refresh page
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Verify subscription timer is gone and paywall reappears
    await page.waitForSelector('text=Unlock Advanced Investor Features');
    await expect(page.getByText('Active Subscription')).not.toBeVisible();
    await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  });

  test('should support different user types', async ({ page }) => {
    await page.goto('/onboarding');
    await page.waitForLoadState('networkidle');
    
    // Test Project Owner journey
    await page.waitForSelector('text=Project Owner');
    await page.getByText('Project Owner').click();
    await page.getByRole('button', { name: 'Begin Project Owner Journey' }).click();
    await page.waitForSelector('text=Unlock Advanced Project Owner Features');
    await expect(page.getByText('Unlock Advanced Project Owner Features')).toBeVisible();
    
    // Test DAO Member journey
    await page.goto('/onboarding');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('text=DAO Member');
    await page.getByText('DAO Member').click();
    await page.getByRole('button', { name: 'Begin DAO Member Journey' }).click();
    await page.waitForSelector('text=Unlock Advanced DAO Member Features');
    await expect(page.getByText('Unlock Advanced DAO Member Features')).toBeVisible();
    
    // Test Community Member journey
    await page.goto('/onboarding');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('text=Community Member');
    await page.getByText('Community Member').click();
    await page.getByRole('button', { name: 'Begin Community Member Journey' }).click();
    await page.waitForSelector('text=Unlock Advanced Community Member Features');
    await expect(page.getByText('Unlock Advanced Community Member Features')).toBeVisible();
  });
}); 
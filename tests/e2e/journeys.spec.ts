import { test, expect } from '@playwright/test';

test.describe('Journey System', () => {
  test.beforeEach(async ({ page }) => {
    // Configuração mais robusta do localStorage
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.localStorage.setItem('hasVisitedBefore', 'false');
    });
    
    // Go to home page com timeout mínimo e waitUntil otimizado
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Espera pelo body estar presente
    await page.waitForSelector('body', { state: 'visible' });
  });

  test('should navigate through onboarding dialog', async ({ page }) => {
    // Verifica elementos críticos com timeout reduzido
    await expect(page.getByRole('heading', { name: 'Welcome to Open Invest DAO' })).toBeVisible();
    
    // Step 1: Choose Journey
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Step 2: How It Works
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Step 3: Ready to Start
    await expect(page.getByRole('button', { name: 'Get Started' })).toBeVisible();
  });

  test('should show all user types in popover', async ({ page }) => {
    await page.getByRole('button', { name: 'Learn about all user types' }).click();
    await expect(page.getByText('Investor: Invest in projects')).toBeVisible();
  });

  test('should show progress indicators', async ({ page }) => {
    const progressDots = await page.locator('.h-2.w-2.rounded-full').count();
    expect(progressDots).toBe(3);
    await page.getByRole('button', { name: 'Next' }).click();
  });

  test('should allow navigation between steps', async ({ page }) => {
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Previous' }).click();
  });

  test('should show all journey options', async ({ page }) => {
    await page.goto('/onboarding', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: 'Investor' })).toBeVisible();
  });

  test('should show how it works section', async ({ page }) => {
    await page.goto('/onboarding', { waitUntil: 'networkidle' });
    
    // Verify how it works section using more specific selectors
    await expect(page.getByRole('heading', { name: 'How It Works' })).toBeVisible();
    
    // Verify steps using more specific selectors
    const steps = [
      'Connect Your Wallet',
      'Make Initial Contribution',
      'Participate in Governance'
    ];
    
    for (const step of steps) {
      await expect(page.getByText(step)).toBeVisible();
    }
  });

  test('should show FAQ section', async ({ page }) => {
    await page.goto('/onboarding', { waitUntil: 'networkidle' });
    
    // Verify FAQ section using more specific selectors
    await expect(page.getByRole('heading', { name: 'User Types' })).toBeVisible();
    
    // Click and verify FAQ content using more specific selectors
    await expect(page.getByText('Investor: Invest in projects')).toBeVisible();
    await expect(page.getByText('Project Owner: Submit projects')).toBeVisible();
    await expect(page.getByText('DAO Member: Participate in governance')).toBeVisible();
    await expect(page.getByText('Community Member: Engage and learn')).toBeVisible();
  });

  test('should complete onboarding journey as investor', async ({ page }) => {
    await page.goto('/onboarding', { waitUntil: 'networkidle' });
    
    // Select investor journey
    await page.getByRole('heading', { name: 'Investor' }).click();
    await page.getByText('Invest in innovative projects').click();
    
    // Complete welcome step
    await expect(page.getByText('Welcome to Open Invest DAO')).toBeVisible();
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Complete how it works step
    await expect(page.getByText('How It Works')).toBeVisible();
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Complete ready to start step
    await expect(page.getByText('Ready to Start?')).toBeVisible();
    await page.getByRole('button', { name: 'Get Started' }).click();
  });

  test('should block access to final step without NFT purchase', async ({ page }) => {
    await page.goto('/onboarding', { waitUntil: 'networkidle' });
    
    // Select investor journey
    await page.getByRole('heading', { name: 'Investor' }).click();
    await page.getByText('Invest in innovative projects').click();
    
    // Complete welcome step
    await expect(page.getByText('Welcome to Open Invest DAO')).toBeVisible();
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Complete how it works step
    await expect(page.getByText('How It Works')).toBeVisible();
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Verify ready to start step is not accessible
    await expect(page.getByText('Ready to Start?')).not.toBeVisible();
  });

  test('should show correct progress percentage', async ({ page }) => {
    await page.goto('/onboarding', { waitUntil: 'networkidle' });
    
    // Select investor journey
    await page.getByRole('heading', { name: 'Investor' }).click();
    await page.getByText('Invest in innovative projects').click();
    
    // Verify initial progress
    await expect(page.getByText('0%')).toBeVisible();
    
    // Complete first step
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('33%')).toBeVisible();
    
    // Complete second step
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('66%')).toBeVisible();
  });

  test('should support different user types', async ({ page }) => {
    await page.goto('/onboarding', { waitUntil: 'networkidle' });
    
    // Test Project Owner journey
    await page.getByRole('heading', { name: 'Project Owner' }).click();
    await page.getByText('Submit and fund your project').click();
    await expect(page.getByText('Welcome to Project Owner Journey')).toBeVisible();
    
    // Test DAO Member journey
    await page.goto('/onboarding', { waitUntil: 'networkidle' });
    await page.getByRole('heading', { name: 'DAO Member' }).click();
    await page.getByText('Participate in governance').click();
    await expect(page.getByText('Welcome to DAO Member Journey')).toBeVisible();
    
    // Test Community Member journey
    await page.goto('/onboarding', { waitUntil: 'networkidle' });
    await page.getByRole('heading', { name: 'Community Member' }).click();
    await page.getByText('Engage and learn').click();
    await expect(page.getByText('Welcome to Community Member Journey')).toBeVisible();
  });
}); 
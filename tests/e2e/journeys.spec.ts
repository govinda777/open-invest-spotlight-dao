import { test, expect } from '@playwright/test';

test.describe('Journey System', () => {
  test.beforeEach(async ({ page }) => {
    // Configuração mais robusta do localStorage
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.localStorage.setItem('hasVisitedBefore', 'false');
    });
    
    // Go to home page with timeout reduzido
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Espera mais específica para elementos críticos
    await page.waitForSelector('body', { state: 'visible' });
  });

  test('should navigate through onboarding dialog', async ({ page }) => {
    // Verify dialog title and description
    await expect(page.getByRole('heading', { name: /Welcome to Open Invest DAO/ })).toBeVisible();
    await expect(page.getByText("Let's get you started on your investment journey")).toBeVisible();
    
    // Step 1: Choose Journey
    await expect(page.getByRole('heading', { name: 'Choose Your Journey' })).toBeVisible();
    await expect(page.getByText('Investor')).toBeVisible();
    await expect(page.getByText('Project Owner')).toBeVisible();
    
    // Click Next
    await page.getByRole('button', { name: /Next/ }).click();
    
    // Step 2: How It Works
    await expect(page.getByRole('heading', { name: 'How It Works' })).toBeVisible();
    await expect(page.getByText('Connect Your Wallet')).toBeVisible();
    await expect(page.getByText('Make Initial Contribution')).toBeVisible();
    await expect(page.getByText('Participate in Governance')).toBeVisible();
    
    // Click Next
    await page.getByRole('button', { name: /Next/ }).click();
    
    // Step 3: Ready to Start
    await expect(page.getByRole('heading', { name: 'Ready to Start?' })).toBeVisible();
    await expect(page.getByText("You're now ready to begin your journey")).toBeVisible();
    
    // Verify navigation buttons
    await expect(page.getByRole('button', { name: 'Previous' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Get Started' })).toBeVisible();
  });

  test('should show all user types in popover', async ({ page }) => {
    // Click to show user types
    await page.getByRole('button', { name: 'Learn about all user types' }).click();
    
    // Verify user types in popover
    await expect(page.getByText('Investor: Invest in projects')).toBeVisible();
    await expect(page.getByText('Project Owner: Submit projects')).toBeVisible();
    await expect(page.getByText('DAO Member: Participate in governance')).toBeVisible();
    await expect(page.getByText('Community Member: Engage and learn')).toBeVisible();
  });

  test('should show progress indicators', async ({ page }) => {
    // Count initial progress dots
    const progressDots = await page.locator('.h-2.w-2.rounded-full').count();
    expect(progressDots).toBe(3);
    
    // Verify first dot is active
    await expect(page.locator('.h-2.w-2.rounded-full.bg-purple-600')).toBeVisible();
    
    // Click Next and verify second dot becomes active
    await page.getByRole('button', { name: /Next/ }).click();
    await expect(page.locator('.h-2.w-2.rounded-full.bg-purple-600')).toBeVisible();
  });

  test('should allow navigation between steps', async ({ page }) => {
    // Go to second step
    await page.getByRole('button', { name: /Next/ }).click();
    await expect(page.getByRole('heading', { name: 'How It Works' })).toBeVisible();
    
    // Go back to first step
    await page.getByRole('button', { name: 'Previous' }).click();
    await expect(page.getByRole('heading', { name: 'Choose Your Journey' })).toBeVisible();
  });

  test('should show all journey options', async ({ page }) => {
    await page.goto('/onboarding');
    await page.waitForLoadState('networkidle');
    
    // Verify all journey cards are visible
    const journeyTitles = ['Investor', 'Project Owner', 'DAO Member', 'Community Member'];
    for (const title of journeyTitles) {
      await expect(page.getByRole('heading', { name: title })).toBeVisible();
    }
    
    // Verify journey descriptions using more specific selectors
    await expect(page.getByText('Discover and invest in promising blockchain projects', { exact: true })).toBeVisible();
    await expect(page.getByText('Submit your blockchain project', { exact: false })).toBeVisible();
    await expect(page.getByText('Acquire governance tokens', { exact: false })).toBeVisible();
    await expect(page.getByText('Join discussions', { exact: false })).toBeVisible();
  });

  test('should show how it works section', async ({ page }) => {
    await page.goto('/onboarding');
    await page.waitForLoadState('networkidle');
    
    // Verify how it works section using more specific selectors
    await expect(page.getByRole('heading', { name: 'How Open Invest DAO Works' })).toBeVisible();
    
    // Verify steps using more specific selectors
    const steps = [
      'Connect Your Wallet',
      'Complete Verification',
      'Make Initial Contribution',
      'Participate in Governance',
      'Receive Benefits'
    ];
    
    for (const step of steps) {
      await expect(page.getByRole('heading', { name: step, exact: true })).toBeVisible();
    }
  });

  test('should show FAQ section', async ({ page }) => {
    await page.goto('/onboarding');
    await page.waitForLoadState('networkidle');
    
    // Verify FAQ section using more specific selectors
    await expect(page.getByRole('heading', { name: 'Frequently Asked Questions' })).toBeVisible();
    
    // Click and verify FAQ content using more specific selectors
    const whatIsDao = page.getByRole('button', { name: 'What is a DAO?' });
    await whatIsDao.click();
    await expect(page.getByText('A Decentralized Autonomous Organization', { exact: false })).toBeVisible();
    
    const governanceTokens = page.getByRole('button', { name: 'How do governance tokens work?' });
    await governanceTokens.click();
    await expect(page.getByText('Governance tokens represent your stake', { exact: false })).toBeVisible();
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
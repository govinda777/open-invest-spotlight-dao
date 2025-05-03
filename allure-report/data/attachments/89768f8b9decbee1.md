# Test info

- Name: Journey System >> should show FAQ section
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:64:3

# Error details

```
Error: expect(locator).toBeVisible()

Locator: getByText('Frequently Asked Questions')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 20000ms
  - waiting for getByText('Frequently Asked Questions')

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:69:64
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Journey System', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Clear localStorage before each test
   6 |     await page.goto('/');
   7 |     await page.evaluate(() => localStorage.clear());
   8 |     // Wait for page to be fully loaded
   9 |     await page.waitForLoadState('networkidle');
   10 |   });
   11 |
   12 |   test('should navigate through investor journey', async ({ page }) => {
   13 |     await page.goto('/onboarding');
   14 |     await page.waitForLoadState('networkidle');
   15 |     
   16 |     // Verify welcome step using more specific selectors
   17 |     await expect(page.getByRole('heading', { name: 'Welcome to Open Invest DAO', exact: true }).first()).toBeVisible();
   18 |     await expect(page.getByText('This onboarding guide will help you understand', { exact: false })).toBeVisible();
   19 |     
   20 |     // Verify journey selection step
   21 |     await expect(page.getByRole('heading', { name: 'Choose Your Journey', exact: true })).toBeVisible();
   22 |     
   23 |     // Verify journey options
   24 |     const investorCard = page.getByRole('link', { name: /Begin Investor Journey/ });
   25 |     await expect(investorCard).toBeVisible();
   26 |     
   27 |     // Click on investor journey
   28 |     await investorCard.click();
   29 |     
   30 |     // Verify redirect to investor journey page
   31 |     await expect(page.url()).toContain('/journeys/investor');
   32 |   });
   33 |
   34 |   test('should show all journey options', async ({ page }) => {
   35 |     await page.goto('/onboarding');
   36 |     await page.waitForLoadState('networkidle');
   37 |     
   38 |     // Verify all journey cards are visible
   39 |     const journeyTitles = ['Investor', 'Project Owner', 'DAO Member', 'Community Member'];
   40 |     for (const title of journeyTitles) {
   41 |       await expect(page.getByRole('heading', { name: title })).toBeVisible();
   42 |     }
   43 |     
   44 |     // Verify journey descriptions using more specific selectors
   45 |     await expect(page.getByText('Discover and invest in promising blockchain projects', { exact: true })).toBeVisible();
   46 |     await expect(page.getByText('Submit your blockchain project', { exact: false })).toBeVisible();
   47 |     await expect(page.getByText('Acquire governance tokens', { exact: false })).toBeVisible();
   48 |     await expect(page.getByText('Join discussions', { exact: false })).toBeVisible();
   49 |   });
   50 |
   51 |   test('should show how it works section', async ({ page }) => {
   52 |     await page.goto('/onboarding');
   53 |     await page.waitForLoadState('networkidle');
   54 |     
   55 |     // Verify how it works section using more specific selectors
   56 |     await expect(page.getByRole('heading', { name: 'How Open Invest DAO Works' })).toBeVisible();
   57 |     
   58 |     // Verify steps using more specific selectors
   59 |     const steps = [
   60 |       'Connect Your Wallet',
   61 |       'Complete Verification',
   62 |       'Make Initial Contribution',
   63 |       'Participate in Governance',
   64 |       'Receive Benefits'
   65 |     ];
   66 |     
   67 |     for (const step of steps) {
   68 |       await expect(page.getByRole('heading', { name: step, exact: true })).toBeVisible();
>  69 |     }
      |      ^ Error: expect(locator).toBeVisible()
   70 |   });
   71 |
   72 |   test('should show FAQ section', async ({ page }) => {
   73 |     await page.goto('/onboarding');
   74 |     await page.waitForLoadState('networkidle');
   75 |     
   76 |     // Verify FAQ section using more specific selectors
   77 |     await expect(page.getByRole('heading', { name: 'Frequently Asked Questions' })).toBeVisible();
   78 |     
   79 |     // Click and verify FAQ content using more specific selectors
   80 |     const whatIsDao = page.getByRole('button', { name: 'What is a DAO?' });
   81 |     await whatIsDao.click();
   82 |     await expect(page.getByText('A Decentralized Autonomous Organization', { exact: false })).toBeVisible();
   83 |     
   84 |     const governanceTokens = page.getByRole('button', { name: 'How do governance tokens work?' });
   85 |     await governanceTokens.click();
   86 |     await expect(page.getByText('Governance tokens represent your stake', { exact: false })).toBeVisible();
   87 |   });
   88 |
   89 |   test('should complete onboarding journey as investor', async ({ page }) => {
   90 |     await page.goto('/onboarding');
   91 |     await page.waitForLoadState('networkidle');
   92 |     
   93 |     // Select investor journey
   94 |     await page.waitForSelector('text=Investor');
   95 |     await page.getByText('Investor').click();
   96 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
   97 |     
   98 |     // Complete welcome step
   99 |     await page.waitForSelector('text=Welcome to Open Invest DAO');
  100 |     await expect(page.getByText('Welcome to Open Invest DAO')).toBeVisible();
  101 |     await page.getByRole('button', { name: 'Next' }).click();
  102 |     
  103 |     // Complete choose journey step
  104 |     await page.waitForSelector('text=Choose Your Journey');
  105 |     await expect(page.getByText('Choose Your Journey')).toBeVisible();
  106 |     await page.getByRole('button', { name: 'Next' }).click();
  107 |     
  108 |     // Complete how it works step
  109 |     await page.waitForSelector('text=How Open Invest DAO Works');
  110 |     await expect(page.getByText('How Open Invest DAO Works')).toBeVisible();
  111 |     await page.getByRole('button', { name: 'Next' }).click();
  112 |     
  113 |     // Verify paywall appears
  114 |     await page.waitForSelector('text=Unlock Advanced Investor Features');
  115 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  116 |     await expect(page.getByText('Price: 0.05 ETH')).toBeVisible();
  117 |     
  118 |     // Purchase NFT
  119 |     await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
  120 |     await page.waitForSelector('text=NFT purchased successfully!');
  121 |     await expect(page.getByText('NFT purchased successfully!')).toBeVisible();
  122 |     
  123 |     // Verify subscription timer appears
  124 |     await page.waitForSelector('text=Active Subscription');
  125 |     await expect(page.getByText('Active Subscription')).toBeVisible();
  126 |     await expect(page.getByText('30 days remaining')).toBeVisible();
  127 |   });
  128 |
  129 |   test('should block access to final step without NFT purchase', async ({ page }) => {
  130 |     await page.goto('/onboarding');
  131 |     await page.waitForLoadState('networkidle');
  132 |     
  133 |     // Select investor journey
  134 |     await page.waitForSelector('text=Investor');
  135 |     await page.getByText('Investor').click();
  136 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
  137 |     
  138 |     // Complete all steps except paywall
  139 |     await page.waitForSelector('button:has-text("Next")');
  140 |     await page.getByRole('button', { name: 'Next' }).click();
  141 |     await page.getByRole('button', { name: 'Next' }).click();
  142 |     await page.getByRole('button', { name: 'Next' }).click();
  143 |     
  144 |     // Verify paywall appears and final step is not visible
  145 |     await page.waitForSelector('text=Unlock Advanced Investor Features');
  146 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  147 |     await expect(page.getByText('Next Steps')).not.toBeVisible();
  148 |   });
  149 |
  150 |   test('should show correct progress percentage', async ({ page }) => {
  151 |     await page.goto('/onboarding');
  152 |     await page.waitForLoadState('networkidle');
  153 |     
  154 |     // Select investor journey
  155 |     await page.waitForSelector('text=Investor');
  156 |     await page.getByText('Investor').click();
  157 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
  158 |     
  159 |     // Verify initial progress
  160 |     await page.waitForSelector('text=0%');
  161 |     await expect(page.getByText('0%')).toBeVisible();
  162 |     
  163 |     // Complete first step
  164 |     await page.getByRole('button', { name: 'Next' }).click();
  165 |     await page.waitForSelector('text=25%');
  166 |     await expect(page.getByText('25%')).toBeVisible();
  167 |     
  168 |     // Complete second step
  169 |     await page.getByRole('button', { name: 'Next' }).click();
```
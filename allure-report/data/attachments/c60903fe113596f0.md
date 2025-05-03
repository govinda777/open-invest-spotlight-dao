# Test info

- Name: Journey System >> should complete onboarding journey as investor
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:89:3

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByText('Investor')

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:93:38
```

# Page snapshot

```yaml
- region "Notifications (F8)":
  - list
- main:
  - navigation:
    - img "Logo"
    - text: Open Invest DAO
    - link "Back to Home":
      - /url: /
      - button "Back to Home"
  - main:
    - heading "Getting Started" [level=1]
    - paragraph: Follow this guide to start your journey with Open Invest DAO
    - text: "1"
    - heading "Welcome to Open Invest DAO" [level=2]
    - paragraph: Open Invest DAO is a decentralized platform that enables collaborative investment in innovative blockchain projects.
    - img "Open Invest DAO Logo"
    - paragraph: This onboarding guide will help you understand how to get started and make the most of our platform.
    - button "Previous" [disabled]
    - button "Next"
    - button "Go to step 1"
    - button "Go to step 2"
    - button "Go to step 3"
    - button "Go to step 4"
    - button "Go to step 5"
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Journey System', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Configuração mais robusta do localStorage
   6 |     await page.addInitScript(() => {
   7 |       window.localStorage.clear();
   8 |       window.localStorage.setItem('hasVisitedBefore', 'false');
   9 |     });
   10 |     
   11 |     // Go to home page com timeout mínimo e waitUntil otimizado
   12 |     await page.goto('/', { waitUntil: 'networkidle' });
   13 |     
   14 |     // Espera pelo body estar presente
   15 |     await page.waitForSelector('body', { state: 'visible' });
   16 |   });
   17 |
   18 |   test('should navigate through onboarding dialog', async ({ page }) => {
   19 |     // Verifica elementos críticos com timeout reduzido
   20 |     await expect(page.getByRole('heading', { name: /Welcome to Open Invest DAO/ })).toBeVisible();
   21 |     
   22 |     // Step 1: Choose Journey
   23 |     await page.getByRole('button', { name: /Next/ }).click();
   24 |     
   25 |     // Step 2: How It Works
   26 |     await page.getByRole('button', { name: /Next/ }).click();
   27 |     
   28 |     // Step 3: Ready to Start
   29 |     await expect(page.getByRole('button', { name: 'Get Started' })).toBeVisible();
   30 |   });
   31 |
   32 |   test('should show all user types in popover', async ({ page }) => {
   33 |     await page.getByRole('button', { name: 'Learn about all user types' }).click();
   34 |     await expect(page.getByText('Investor: Invest in projects')).toBeVisible();
   35 |   });
   36 |
   37 |   test('should show progress indicators', async ({ page }) => {
   38 |     const progressDots = await page.locator('.h-2.w-2.rounded-full').count();
   39 |     expect(progressDots).toBe(3);
   40 |     await page.getByRole('button', { name: /Next/ }).click();
   41 |   });
   42 |
   43 |   test('should allow navigation between steps', async ({ page }) => {
   44 |     await page.getByRole('button', { name: /Next/ }).click();
   45 |     await page.getByRole('button', { name: 'Previous' }).click();
   46 |   });
   47 |
   48 |   test('should show all journey options', async ({ page }) => {
   49 |     await page.goto('/onboarding', { waitUntil: 'networkidle' });
   50 |     await expect(page.getByRole('heading', { name: 'Investor' })).toBeVisible();
   51 |   });
   52 |
   53 |   test('should show how it works section', async ({ page }) => {
   54 |     await page.goto('/onboarding', { waitUntil: 'networkidle' });
   55 |     
   56 |     // Verify how it works section using more specific selectors
   57 |     await expect(page.getByRole('heading', { name: 'How Open Invest DAO Works' })).toBeVisible();
   58 |     
   59 |     // Verify steps using more specific selectors
   60 |     const steps = [
   61 |       'Connect Your Wallet',
   62 |       'Complete Verification',
   63 |       'Make Initial Contribution',
   64 |       'Participate in Governance',
   65 |       'Receive Benefits'
   66 |     ];
   67 |     
   68 |     for (const step of steps) {
   69 |       await expect(page.getByRole('heading', { name: step, exact: true })).toBeVisible();
   70 |     }
   71 |   });
   72 |
   73 |   test('should show FAQ section', async ({ page }) => {
   74 |     await page.goto('/onboarding', { waitUntil: 'networkidle' });
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
   90 |     await page.goto('/onboarding', { waitUntil: 'networkidle' });
   91 |     
   92 |     // Select investor journey
>  93 |     await page.getByText('Investor').click();
      |                                      ^ Error: locator.click: Test timeout of 30000ms exceeded.
   94 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
   95 |     
   96 |     // Complete welcome step
   97 |     await expect(page.getByText('Welcome to Open Invest DAO')).toBeVisible();
   98 |     await page.getByRole('button', { name: 'Next' }).click();
   99 |     
  100 |     // Complete choose journey step
  101 |     await expect(page.getByText('Choose Your Journey')).toBeVisible();
  102 |     await page.getByRole('button', { name: 'Next' }).click();
  103 |     
  104 |     // Complete how it works step
  105 |     await expect(page.getByText('How Open Invest DAO Works')).toBeVisible();
  106 |     await page.getByRole('button', { name: 'Next' }).click();
  107 |     
  108 |     // Verify paywall appears
  109 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  110 |     await expect(page.getByText('Price: 0.05 ETH')).toBeVisible();
  111 |     
  112 |     // Purchase NFT
  113 |     await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
  114 |     await expect(page.getByText('NFT purchased successfully!')).toBeVisible();
  115 |     
  116 |     // Verify subscription timer appears
  117 |     await expect(page.getByText('Active Subscription')).toBeVisible();
  118 |     await expect(page.getByText('30 days remaining')).toBeVisible();
  119 |   });
  120 |
  121 |   test('should block access to final step without NFT purchase', async ({ page }) => {
  122 |     await page.goto('/onboarding', { waitUntil: 'networkidle' });
  123 |     
  124 |     // Select investor journey
  125 |     await page.getByText('Investor').click();
  126 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
  127 |     
  128 |     // Complete all steps except paywall
  129 |     await page.getByRole('button', { name: 'Next' }).click();
  130 |     await page.getByRole('button', { name: 'Next' }).click();
  131 |     await page.getByRole('button', { name: 'Next' }).click();
  132 |     
  133 |     // Verify paywall appears and final step is not visible
  134 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  135 |     await expect(page.getByText('Next Steps')).not.toBeVisible();
  136 |   });
  137 |
  138 |   test('should show correct progress percentage', async ({ page }) => {
  139 |     await page.goto('/onboarding', { waitUntil: 'networkidle' });
  140 |     
  141 |     // Select investor journey
  142 |     await page.getByText('Investor').click();
  143 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
  144 |     
  145 |     // Verify initial progress
  146 |     await expect(page.getByText('0%')).toBeVisible();
  147 |     
  148 |     // Complete first step
  149 |     await page.getByRole('button', { name: 'Next' }).click();
  150 |     await expect(page.getByText('25%')).toBeVisible();
  151 |     
  152 |     // Complete second step
  153 |     await page.getByRole('button', { name: 'Next' }).click();
  154 |     await expect(page.getByText('50%')).toBeVisible();
  155 |   });
  156 |
  157 |   test('should handle subscription expiration', async ({ page }) => {
  158 |     await page.goto('/onboarding', { waitUntil: 'networkidle' });
  159 |     
  160 |     // Select investor journey
  161 |     await page.getByText('Investor').click();
  162 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
  163 |     
  164 |     // Complete all steps
  165 |     await page.getByRole('button', { name: 'Next' }).click();
  166 |     await page.getByRole('button', { name: 'Next' }).click();
  167 |     await page.getByRole('button', { name: 'Next' }).click();
  168 |     
  169 |     // Purchase NFT
  170 |     await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
  171 |     
  172 |     // Set purchase date to 31 days ago
  173 |     await page.evaluate(() => {
  174 |       const purchaseDate = new Date();
  175 |       purchaseDate.setDate(purchaseDate.getDate() - 31);
  176 |       localStorage.setItem('onboardingNftPurchaseDate', purchaseDate.toISOString());
  177 |     });
  178 |     
  179 |     // Refresh page
  180 |     await page.reload({ waitUntil: 'networkidle' });
  181 |     
  182 |     // Verify subscription timer is gone and paywall reappears
  183 |     await expect(page.getByText('Active Subscription')).not.toBeVisible();
  184 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  185 |   });
  186 |
  187 |   test('should support different user types', async ({ page }) => {
  188 |     await page.goto('/onboarding', { waitUntil: 'networkidle' });
  189 |     
  190 |     // Test Project Owner journey
  191 |     await page.getByText('Project Owner').click();
  192 |     await page.getByRole('button', { name: 'Begin Project Owner Journey' }).click();
  193 |     await expect(page.getByText('Unlock Advanced Project Owner Features')).toBeVisible();
```
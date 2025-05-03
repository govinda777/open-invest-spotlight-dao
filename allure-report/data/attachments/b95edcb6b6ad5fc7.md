# Test info

- Name: Journey System >> should show all journey options
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:45:3

# Error details

```
Error: expect(locator).toBeVisible()

Locator: getByRole('heading', { name: 'Investor' })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 2000ms
  - waiting for getByRole('heading', { name: 'Investor' })

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:47:67
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
   12 |     await page.goto('/', { waitUntil: 'domcontentloaded' });
   13 |   });
   14 |
   15 |   test('should navigate through onboarding dialog', async ({ page }) => {
   16 |     // Verifica elementos críticos com timeout reduzido
   17 |     await expect(page.getByRole('heading', { name: /Welcome to Open Invest DAO/ })).toBeVisible();
   18 |     
   19 |     // Step 1: Choose Journey
   20 |     await page.getByRole('button', { name: /Next/ }).click();
   21 |     
   22 |     // Step 2: How It Works
   23 |     await page.getByRole('button', { name: /Next/ }).click();
   24 |     
   25 |     // Step 3: Ready to Start
   26 |     await expect(page.getByRole('button', { name: 'Get Started' })).toBeVisible();
   27 |   });
   28 |
   29 |   test('should show all user types in popover', async ({ page }) => {
   30 |     await page.getByRole('button', { name: 'Learn about all user types' }).click();
   31 |     await expect(page.getByText('Investor: Invest in projects')).toBeVisible();
   32 |   });
   33 |
   34 |   test('should show progress indicators', async ({ page }) => {
   35 |     const progressDots = await page.locator('.h-2.w-2.rounded-full').count();
   36 |     expect(progressDots).toBe(3);
   37 |     await page.getByRole('button', { name: /Next/ }).click();
   38 |   });
   39 |
   40 |   test('should allow navigation between steps', async ({ page }) => {
   41 |     await page.getByRole('button', { name: /Next/ }).click();
   42 |     await page.getByRole('button', { name: 'Previous' }).click();
   43 |   });
   44 |
   45 |   test('should show all journey options', async ({ page }) => {
   46 |     await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
>  47 |     await expect(page.getByRole('heading', { name: 'Investor' })).toBeVisible();
      |                                                                   ^ Error: expect(locator).toBeVisible()
   48 |   });
   49 |
   50 |   test('should show how it works section', async ({ page }) => {
   51 |     await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
   52 |     
   53 |     // Verify how it works section using more specific selectors
   54 |     await expect(page.getByRole('heading', { name: 'How Open Invest DAO Works' })).toBeVisible();
   55 |     
   56 |     // Verify steps using more specific selectors
   57 |     const steps = [
   58 |       'Connect Your Wallet',
   59 |       'Complete Verification',
   60 |       'Make Initial Contribution',
   61 |       'Participate in Governance',
   62 |       'Receive Benefits'
   63 |     ];
   64 |     
   65 |     for (const step of steps) {
   66 |       await expect(page.getByRole('heading', { name: step, exact: true })).toBeVisible();
   67 |     }
   68 |   });
   69 |
   70 |   test('should show FAQ section', async ({ page }) => {
   71 |     await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
   72 |     
   73 |     // Verify FAQ section using more specific selectors
   74 |     await expect(page.getByRole('heading', { name: 'Frequently Asked Questions' })).toBeVisible();
   75 |     
   76 |     // Click and verify FAQ content using more specific selectors
   77 |     const whatIsDao = page.getByRole('button', { name: 'What is a DAO?' });
   78 |     await whatIsDao.click();
   79 |     await expect(page.getByText('A Decentralized Autonomous Organization', { exact: false })).toBeVisible();
   80 |     
   81 |     const governanceTokens = page.getByRole('button', { name: 'How do governance tokens work?' });
   82 |     await governanceTokens.click();
   83 |     await expect(page.getByText('Governance tokens represent your stake', { exact: false })).toBeVisible();
   84 |   });
   85 |
   86 |   test('should complete onboarding journey as investor', async ({ page }) => {
   87 |     await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
   88 |     
   89 |     // Select investor journey
   90 |     await page.getByText('Investor').click();
   91 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
   92 |     
   93 |     // Complete welcome step
   94 |     await expect(page.getByText('Welcome to Open Invest DAO')).toBeVisible();
   95 |     await page.getByRole('button', { name: 'Next' }).click();
   96 |     
   97 |     // Complete choose journey step
   98 |     await expect(page.getByText('Choose Your Journey')).toBeVisible();
   99 |     await page.getByRole('button', { name: 'Next' }).click();
  100 |     
  101 |     // Complete how it works step
  102 |     await expect(page.getByText('How Open Invest DAO Works')).toBeVisible();
  103 |     await page.getByRole('button', { name: 'Next' }).click();
  104 |     
  105 |     // Verify paywall appears
  106 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  107 |     await expect(page.getByText('Price: 0.05 ETH')).toBeVisible();
  108 |     
  109 |     // Purchase NFT
  110 |     await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
  111 |     await expect(page.getByText('NFT purchased successfully!')).toBeVisible();
  112 |     
  113 |     // Verify subscription timer appears
  114 |     await expect(page.getByText('Active Subscription')).toBeVisible();
  115 |     await expect(page.getByText('30 days remaining')).toBeVisible();
  116 |   });
  117 |
  118 |   test('should block access to final step without NFT purchase', async ({ page }) => {
  119 |     await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
  120 |     
  121 |     // Select investor journey
  122 |     await page.getByText('Investor').click();
  123 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
  124 |     
  125 |     // Complete all steps except paywall
  126 |     await page.getByRole('button', { name: 'Next' }).click();
  127 |     await page.getByRole('button', { name: 'Next' }).click();
  128 |     await page.getByRole('button', { name: 'Next' }).click();
  129 |     
  130 |     // Verify paywall appears and final step is not visible
  131 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  132 |     await expect(page.getByText('Next Steps')).not.toBeVisible();
  133 |   });
  134 |
  135 |   test('should show correct progress percentage', async ({ page }) => {
  136 |     await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
  137 |     
  138 |     // Select investor journey
  139 |     await page.getByText('Investor').click();
  140 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
  141 |     
  142 |     // Verify initial progress
  143 |     await expect(page.getByText('0%')).toBeVisible();
  144 |     
  145 |     // Complete first step
  146 |     await page.getByRole('button', { name: 'Next' }).click();
  147 |     await expect(page.getByText('25%')).toBeVisible();
```
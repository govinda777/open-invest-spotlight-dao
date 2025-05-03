# Test info

- Name: Journey System >> should show how it works section
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:53:3

# Error details

```
Error: Timed out 3000ms waiting for expect(locator).toBeVisible()

Locator: getByRole('heading', { name: 'How It Works' })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 3000ms
  - waiting for getByRole('heading', { name: 'How It Works' })

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:57:71
```

# Page snapshot

```yaml
- region "Notifications (F8)":
  - list
- region "Notifications alt+T"
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
   13 |     
   14 |     // Espera pelo body estar presente
   15 |     await page.waitForSelector('body', { state: 'visible', timeout: 3000 });
   16 |   });
   17 |
   18 |   test('should navigate through onboarding dialog', async ({ page }) => {
   19 |     // Verifica elementos críticos com timeout reduzido
   20 |     await expect(page.getByRole('heading', { name: 'Welcome to Open Invest DAO' })).toBeVisible({ timeout: 3000 });
   21 |     
   22 |     // Step 1: Choose Journey
   23 |     await page.getByRole('button', { name: 'Next' }).click();
   24 |     
   25 |     // Step 2: How It Works
   26 |     await page.getByRole('button', { name: 'Next' }).click();
   27 |     
   28 |     // Step 3: Ready to Start
   29 |     await expect(page.getByRole('button', { name: 'Get Started' })).toBeVisible({ timeout: 3000 });
   30 |   });
   31 |
   32 |   test('should show all user types in popover', async ({ page }) => {
   33 |     await page.getByRole('button', { name: 'Learn about all user types' }).click();
   34 |     await expect(page.getByText('Investor: Invest in projects')).toBeVisible({ timeout: 3000 });
   35 |   });
   36 |
   37 |   test('should show progress indicators', async ({ page }) => {
   38 |     const progressDots = await page.locator('.h-2.w-2.rounded-full').count();
   39 |     expect(progressDots).toBe(3);
   40 |     await page.getByRole('button', { name: 'Next' }).click();
   41 |   });
   42 |
   43 |   test('should allow navigation between steps', async ({ page }) => {
   44 |     await page.getByRole('button', { name: 'Next' }).click();
   45 |     await page.getByRole('button', { name: 'Previous' }).click();
   46 |   });
   47 |
   48 |   test('should show all journey options', async ({ page }) => {
   49 |     await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
   50 |     await expect(page.getByRole('heading', { name: 'Investor' })).toBeVisible({ timeout: 3000 });
   51 |   });
   52 |
   53 |   test('should show how it works section', async ({ page }) => {
   54 |     await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
   55 |     
   56 |     // Verify how it works section using more specific selectors
>  57 |     await expect(page.getByRole('heading', { name: 'How It Works' })).toBeVisible({ timeout: 3000 });
      |                                                                       ^ Error: Timed out 3000ms waiting for expect(locator).toBeVisible()
   58 |     
   59 |     // Verify steps using more specific selectors
   60 |     const steps = [
   61 |       'Connect Your Wallet',
   62 |       'Make Initial Contribution',
   63 |       'Participate in Governance'
   64 |     ];
   65 |     
   66 |     for (const step of steps) {
   67 |       await expect(page.getByText(step)).toBeVisible({ timeout: 3000 });
   68 |     }
   69 |   });
   70 |
   71 |   test('should show FAQ section', async ({ page }) => {
   72 |     await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
   73 |     
   74 |     // Verify FAQ section using more specific selectors
   75 |     await expect(page.getByRole('heading', { name: 'User Types' })).toBeVisible({ timeout: 3000 });
   76 |     
   77 |     // Click and verify FAQ content using more specific selectors
   78 |     await expect(page.getByText('Investor: Invest in projects')).toBeVisible({ timeout: 3000 });
   79 |     await expect(page.getByText('Project Owner: Submit projects')).toBeVisible({ timeout: 3000 });
   80 |     await expect(page.getByText('DAO Member: Participate in governance')).toBeVisible({ timeout: 3000 });
   81 |     await expect(page.getByText('Community Member: Engage and learn')).toBeVisible({ timeout: 3000 });
   82 |   });
   83 |
   84 |   test('should complete onboarding journey as investor', async ({ page }) => {
   85 |     await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
   86 |     
   87 |     // Select investor journey
   88 |     await page.getByRole('heading', { name: 'Investor' }).click();
   89 |     await page.getByText('Invest in innovative projects').click();
   90 |     
   91 |     // Complete welcome step
   92 |     await expect(page.getByText('Welcome to Open Invest DAO')).toBeVisible({ timeout: 3000 });
   93 |     await page.getByRole('button', { name: 'Next' }).click();
   94 |     
   95 |     // Complete how it works step
   96 |     await expect(page.getByText('How It Works')).toBeVisible({ timeout: 3000 });
   97 |     await page.getByRole('button', { name: 'Next' }).click();
   98 |     
   99 |     // Complete ready to start step
  100 |     await expect(page.getByText('Ready to Start?')).toBeVisible({ timeout: 3000 });
  101 |     await page.getByRole('button', { name: 'Get Started' }).click();
  102 |   });
  103 |
  104 |   test('should block access to final step without NFT purchase', async ({ page }) => {
  105 |     await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
  106 |     
  107 |     // Select investor journey
  108 |     await page.getByRole('heading', { name: 'Investor' }).click();
  109 |     await page.getByText('Invest in innovative projects').click();
  110 |     
  111 |     // Complete welcome step
  112 |     await expect(page.getByText('Welcome to Open Invest DAO')).toBeVisible({ timeout: 3000 });
  113 |     await page.getByRole('button', { name: 'Next' }).click();
  114 |     
  115 |     // Complete how it works step
  116 |     await expect(page.getByText('How It Works')).toBeVisible({ timeout: 3000 });
  117 |     await page.getByRole('button', { name: 'Next' }).click();
  118 |     
  119 |     // Verify ready to start step is not accessible
  120 |     await expect(page.getByText('Ready to Start?')).not.toBeVisible({ timeout: 3000 });
  121 |   });
  122 |
  123 |   test('should show correct progress percentage', async ({ page }) => {
  124 |     await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
  125 |     
  126 |     // Select investor journey
  127 |     await page.getByRole('heading', { name: 'Investor' }).click();
  128 |     await page.getByText('Invest in innovative projects').click();
  129 |     
  130 |     // Verify initial progress
  131 |     await expect(page.getByText('0%')).toBeVisible({ timeout: 3000 });
  132 |     
  133 |     // Complete first step
  134 |     await page.getByRole('button', { name: 'Next' }).click();
  135 |     await expect(page.getByText('33%')).toBeVisible({ timeout: 3000 });
  136 |     
  137 |     // Complete second step
  138 |     await page.getByRole('button', { name: 'Next' }).click();
  139 |     await expect(page.getByText('66%')).toBeVisible({ timeout: 3000 });
  140 |   });
  141 |
  142 |   test('should support different user types', async ({ page }) => {
  143 |     await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
  144 |     
  145 |     // Test Project Owner journey
  146 |     await page.getByRole('heading', { name: 'Project Owner' }).click();
  147 |     await page.getByText('Submit and fund your project').click();
  148 |     await expect(page.getByText('Welcome to Project Owner Journey')).toBeVisible({ timeout: 3000 });
  149 |     
  150 |     // Test DAO Member journey
  151 |     await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
  152 |     await page.getByRole('heading', { name: 'DAO Member' }).click();
  153 |     await page.getByText('Participate in governance').click();
  154 |     await expect(page.getByText('Welcome to DAO Member Journey')).toBeVisible({ timeout: 3000 });
  155 |     
  156 |     // Test Community Member journey
  157 |     await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
```
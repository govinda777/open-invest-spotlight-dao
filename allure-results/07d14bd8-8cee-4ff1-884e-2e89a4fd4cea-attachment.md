# Test info

- Name: Journey System >> should allow navigation between steps
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:43:3

# Error details

```
Error: locator.click: Test timeout of 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Next' })

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:44:54
```

# Page snapshot

```yaml
- region "Notifications (F8)":
  - list
- main:
  - navigation:
    - img "Logo"
    - text: Open Invest DAO
    - link "About":
      - /url: "#"
    - link "Projects":
      - /url: "#"
    - button "Get Started"
    - link "User Journeys":
      - /url: /journeys
    - link "Community":
      - /url: "#"
    - button "Connect Wallet"
  - main:
    - heading "Open Invest Spotlight DAO" [level=1]
    - paragraph: A decentralized platform for collaborative investment in innovative blockchain projects
    - button "Explore Projects"
    - button "Get Started"
    - heading "Key Features" [level=2]
    - img
    - heading "Decentralized Funding" [level=3]
    - paragraph: Access capital through community-driven investment without traditional intermediaries.
    - img
    - heading "Community Governance" [level=3]
    - paragraph: Participate in democratic decision-making that shapes the platform's future.
    - img
    - heading "Transparent Investing" [level=3]
    - paragraph: All investments and decisions are recorded on blockchain for complete transparency.
    - img
    - heading "Portfolio Growth" [level=3]
    - paragraph: Diversify your investments across multiple innovative blockchain projects.
    - link "Explore User Journeys":
      - /url: /journeys
      - text: Explore User Journeys
      - img
    - heading "How It Works" [level=2]
    - text: "1"
    - heading "Connect & Discover" [level=3]
    - paragraph: Connect your wallet and explore innovative blockchain projects seeking investment.
    - text: "2"
    - heading "Invest & Vote" [level=3]
    - paragraph: Invest in projects you believe in and participate in governance decisions.
    - text: "3"
    - heading "Earn & Grow" [level=3]
    - paragraph: Receive returns on successful projects and grow your investment portfolio.
    - heading "Ready to start your journey?" [level=2]
    - paragraph: Join our community today and be part of the decentralized investment revolution.
    - link "Start Onboarding":
      - /url: /onboarding
    - link "View User Journeys":
      - /url: /journeys
  - heading "Open Invest DAO" [level=3]
  - paragraph: Decentralized investment platform for innovative blockchain projects.
  - heading "Quick Links" [level=3]
  - list:
    - listitem:
      - link "About":
        - /url: "#"
    - listitem:
      - link "Projects":
        - /url: "#"
    - listitem:
      - link "User Journeys":
        - /url: /journeys
    - listitem:
      - link "Governance":
        - /url: "#"
  - heading "Resources" [level=3]
  - list:
    - listitem:
      - link "Documentation":
        - /url: "#"
    - listitem:
      - link "FAQ":
        - /url: "#"
    - listitem:
      - link "Community":
        - /url: "#"
    - listitem:
      - link "Support":
        - /url: "#"
  - heading "Connect" [level=3]
  - list:
    - listitem:
      - link "Twitter":
        - /url: "#"
    - listitem:
      - link "Discord":
        - /url: "#"
    - listitem:
      - link "Telegram":
        - /url: "#"
    - listitem:
      - link "Medium":
        - /url: "#"
  - paragraph: © 2025 Open Invest DAO. All rights reserved.
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
>  44 |     await page.getByRole('button', { name: 'Next' }).click();
      |                                                      ^ Error: locator.click: Test timeout of 15000ms exceeded.
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
   57 |     await expect(page.getByRole('heading', { name: 'How It Works' })).toBeVisible({ timeout: 3000 });
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
```
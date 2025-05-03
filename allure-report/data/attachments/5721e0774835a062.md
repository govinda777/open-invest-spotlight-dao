# Test info

- Name: Journey System >> should show all user types in popover
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:32:3

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Learn about all user types' })

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:33:76
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
>  33 |     await page.getByRole('button', { name: 'Learn about all user types' }).click();
      |                                                                            ^ Error: locator.click: Test timeout of 30000ms exceeded.
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
   93 |     await page.getByText('Investor').click();
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
```
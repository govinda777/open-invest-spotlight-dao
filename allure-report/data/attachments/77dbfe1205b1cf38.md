# Test info

- Name: Journey System >> should show progress indicators
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:37:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 3
Received: 0
    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:39:26
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
   11 |     // Go to home page com timeout mínimo
   12 |     await page.goto('/', { waitUntil: 'commit' });
   13 |     
   14 |     // Espera apenas pelo body estar presente
   15 |     await page.waitForSelector('body');
   16 |   });
   17 |
   18 |   test('should navigate through onboarding dialog', async ({ page }) => {
   19 |     // Verifica elementos críticos com timeout reduzido
   20 |     await expect(page.getByRole('heading', { name: /Welcome to Open Invest DAO/ })).toBeVisible({ timeout: 3000 });
   21 |     
   22 |     // Step 1: Choose Journey
   23 |     await page.getByRole('button', { name: /Next/ }).click({ timeout: 3000 });
   24 |     
   25 |     // Step 2: How It Works
   26 |     await page.getByRole('button', { name: /Next/ }).click({ timeout: 3000 });
   27 |     
   28 |     // Step 3: Ready to Start
   29 |     await expect(page.getByRole('button', { name: 'Get Started' })).toBeVisible({ timeout: 3000 });
   30 |   });
   31 |
   32 |   test('should show all user types in popover', async ({ page }) => {
   33 |     await page.getByRole('button', { name: 'Learn about all user types' }).click({ timeout: 3000 });
   34 |     await expect(page.getByText('Investor: Invest in projects')).toBeVisible({ timeout: 3000 });
   35 |   });
   36 |
   37 |   test('should show progress indicators', async ({ page }) => {
   38 |     const progressDots = await page.locator('.h-2.w-2.rounded-full').count();
>  39 |     expect(progressDots).toBe(3);
      |                          ^ Error: expect(received).toBe(expected) // Object.is equality
   40 |     await page.getByRole('button', { name: /Next/ }).click({ timeout: 3000 });
   41 |   });
   42 |
   43 |   test('should allow navigation between steps', async ({ page }) => {
   44 |     await page.getByRole('button', { name: /Next/ }).click({ timeout: 3000 });
   45 |     await page.getByRole('button', { name: 'Previous' }).click({ timeout: 3000 });
   46 |   });
   47 |
   48 |   test('should show all journey options', async ({ page }) => {
   49 |     await page.goto('/onboarding', { waitUntil: 'commit' });
   50 |     await expect(page.getByRole('heading', { name: 'Investor' })).toBeVisible({ timeout: 3000 });
   51 |   });
   52 |
   53 |   test('should show how it works section', async ({ page }) => {
   54 |     await page.goto('/onboarding');
   55 |     await page.waitForLoadState('networkidle');
   56 |     
   57 |     // Verify how it works section using more specific selectors
   58 |     await expect(page.getByRole('heading', { name: 'How Open Invest DAO Works' })).toBeVisible();
   59 |     
   60 |     // Verify steps using more specific selectors
   61 |     const steps = [
   62 |       'Connect Your Wallet',
   63 |       'Complete Verification',
   64 |       'Make Initial Contribution',
   65 |       'Participate in Governance',
   66 |       'Receive Benefits'
   67 |     ];
   68 |     
   69 |     for (const step of steps) {
   70 |       await expect(page.getByRole('heading', { name: step, exact: true })).toBeVisible();
   71 |     }
   72 |   });
   73 |
   74 |   test('should show FAQ section', async ({ page }) => {
   75 |     await page.goto('/onboarding');
   76 |     await page.waitForLoadState('networkidle');
   77 |     
   78 |     // Verify FAQ section using more specific selectors
   79 |     await expect(page.getByRole('heading', { name: 'Frequently Asked Questions' })).toBeVisible();
   80 |     
   81 |     // Click and verify FAQ content using more specific selectors
   82 |     const whatIsDao = page.getByRole('button', { name: 'What is a DAO?' });
   83 |     await whatIsDao.click();
   84 |     await expect(page.getByText('A Decentralized Autonomous Organization', { exact: false })).toBeVisible();
   85 |     
   86 |     const governanceTokens = page.getByRole('button', { name: 'How do governance tokens work?' });
   87 |     await governanceTokens.click();
   88 |     await expect(page.getByText('Governance tokens represent your stake', { exact: false })).toBeVisible();
   89 |   });
   90 |
   91 |   test('should complete onboarding journey as investor', async ({ page }) => {
   92 |     await page.goto('/onboarding');
   93 |     await page.waitForLoadState('networkidle');
   94 |     
   95 |     // Select investor journey
   96 |     await page.waitForSelector('text=Investor');
   97 |     await page.getByText('Investor').click();
   98 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
   99 |     
  100 |     // Complete welcome step
  101 |     await page.waitForSelector('text=Welcome to Open Invest DAO');
  102 |     await expect(page.getByText('Welcome to Open Invest DAO')).toBeVisible();
  103 |     await page.getByRole('button', { name: 'Next' }).click();
  104 |     
  105 |     // Complete choose journey step
  106 |     await page.waitForSelector('text=Choose Your Journey');
  107 |     await expect(page.getByText('Choose Your Journey')).toBeVisible();
  108 |     await page.getByRole('button', { name: 'Next' }).click();
  109 |     
  110 |     // Complete how it works step
  111 |     await page.waitForSelector('text=How Open Invest DAO Works');
  112 |     await expect(page.getByText('How Open Invest DAO Works')).toBeVisible();
  113 |     await page.getByRole('button', { name: 'Next' }).click();
  114 |     
  115 |     // Verify paywall appears
  116 |     await page.waitForSelector('text=Unlock Advanced Investor Features');
  117 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  118 |     await expect(page.getByText('Price: 0.05 ETH')).toBeVisible();
  119 |     
  120 |     // Purchase NFT
  121 |     await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
  122 |     await page.waitForSelector('text=NFT purchased successfully!');
  123 |     await expect(page.getByText('NFT purchased successfully!')).toBeVisible();
  124 |     
  125 |     // Verify subscription timer appears
  126 |     await page.waitForSelector('text=Active Subscription');
  127 |     await expect(page.getByText('Active Subscription')).toBeVisible();
  128 |     await expect(page.getByText('30 days remaining')).toBeVisible();
  129 |   });
  130 |
  131 |   test('should block access to final step without NFT purchase', async ({ page }) => {
  132 |     await page.goto('/onboarding');
  133 |     await page.waitForLoadState('networkidle');
  134 |     
  135 |     // Select investor journey
  136 |     await page.waitForSelector('text=Investor');
  137 |     await page.getByText('Investor').click();
  138 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
  139 |     
```
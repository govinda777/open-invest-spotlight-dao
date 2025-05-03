# Test info

- Name: Journey System >> should show progress indicators
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:60:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 3
Received: 0
    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:63:26
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
   11 |     // Go to home page with timeout reduzido
   12 |     await page.goto('/', { waitUntil: 'domcontentloaded' });
   13 |     
   14 |     // Espera mais específica para elementos críticos
   15 |     await page.waitForSelector('body', { state: 'visible' });
   16 |   });
   17 |
   18 |   test('should navigate through onboarding dialog', async ({ page }) => {
   19 |     // Verify dialog title and description
   20 |     await expect(page.getByRole('heading', { name: /Welcome to Open Invest DAO/ })).toBeVisible();
   21 |     await expect(page.getByText("Let's get you started on your investment journey")).toBeVisible();
   22 |     
   23 |     // Step 1: Choose Journey
   24 |     await expect(page.getByRole('heading', { name: 'Choose Your Journey' })).toBeVisible();
   25 |     await expect(page.getByText('Investor')).toBeVisible();
   26 |     await expect(page.getByText('Project Owner')).toBeVisible();
   27 |     
   28 |     // Click Next
   29 |     await page.getByRole('button', { name: /Next/ }).click();
   30 |     
   31 |     // Step 2: How It Works
   32 |     await expect(page.getByRole('heading', { name: 'How It Works' })).toBeVisible();
   33 |     await expect(page.getByText('Connect Your Wallet')).toBeVisible();
   34 |     await expect(page.getByText('Make Initial Contribution')).toBeVisible();
   35 |     await expect(page.getByText('Participate in Governance')).toBeVisible();
   36 |     
   37 |     // Click Next
   38 |     await page.getByRole('button', { name: /Next/ }).click();
   39 |     
   40 |     // Step 3: Ready to Start
   41 |     await expect(page.getByRole('heading', { name: 'Ready to Start?' })).toBeVisible();
   42 |     await expect(page.getByText("You're now ready to begin your journey")).toBeVisible();
   43 |     
   44 |     // Verify navigation buttons
   45 |     await expect(page.getByRole('button', { name: 'Previous' })).toBeVisible();
   46 |     await expect(page.getByRole('button', { name: 'Get Started' })).toBeVisible();
   47 |   });
   48 |
   49 |   test('should show all user types in popover', async ({ page }) => {
   50 |     // Click to show user types
   51 |     await page.getByRole('button', { name: 'Learn about all user types' }).click();
   52 |     
   53 |     // Verify user types in popover
   54 |     await expect(page.getByText('Investor: Invest in projects')).toBeVisible();
   55 |     await expect(page.getByText('Project Owner: Submit projects')).toBeVisible();
   56 |     await expect(page.getByText('DAO Member: Participate in governance')).toBeVisible();
   57 |     await expect(page.getByText('Community Member: Engage and learn')).toBeVisible();
   58 |   });
   59 |
   60 |   test('should show progress indicators', async ({ page }) => {
   61 |     // Count initial progress dots
   62 |     const progressDots = await page.locator('.h-2.w-2.rounded-full').count();
>  63 |     expect(progressDots).toBe(3);
      |                          ^ Error: expect(received).toBe(expected) // Object.is equality
   64 |     
   65 |     // Verify first dot is active
   66 |     await expect(page.locator('.h-2.w-2.rounded-full.bg-purple-600')).toBeVisible();
   67 |     
   68 |     // Click Next and verify second dot becomes active
   69 |     await page.getByRole('button', { name: /Next/ }).click();
   70 |     await expect(page.locator('.h-2.w-2.rounded-full.bg-purple-600')).toBeVisible();
   71 |   });
   72 |
   73 |   test('should allow navigation between steps', async ({ page }) => {
   74 |     // Go to second step
   75 |     await page.getByRole('button', { name: /Next/ }).click();
   76 |     await expect(page.getByRole('heading', { name: 'How It Works' })).toBeVisible();
   77 |     
   78 |     // Go back to first step
   79 |     await page.getByRole('button', { name: 'Previous' }).click();
   80 |     await expect(page.getByRole('heading', { name: 'Choose Your Journey' })).toBeVisible();
   81 |   });
   82 |
   83 |   test('should show all journey options', async ({ page }) => {
   84 |     await page.goto('/onboarding');
   85 |     await page.waitForLoadState('networkidle');
   86 |     
   87 |     // Verify all journey cards are visible
   88 |     const journeyTitles = ['Investor', 'Project Owner', 'DAO Member', 'Community Member'];
   89 |     for (const title of journeyTitles) {
   90 |       await expect(page.getByRole('heading', { name: title })).toBeVisible();
   91 |     }
   92 |     
   93 |     // Verify journey descriptions using more specific selectors
   94 |     await expect(page.getByText('Discover and invest in promising blockchain projects', { exact: true })).toBeVisible();
   95 |     await expect(page.getByText('Submit your blockchain project', { exact: false })).toBeVisible();
   96 |     await expect(page.getByText('Acquire governance tokens', { exact: false })).toBeVisible();
   97 |     await expect(page.getByText('Join discussions', { exact: false })).toBeVisible();
   98 |   });
   99 |
  100 |   test('should show how it works section', async ({ page }) => {
  101 |     await page.goto('/onboarding');
  102 |     await page.waitForLoadState('networkidle');
  103 |     
  104 |     // Verify how it works section using more specific selectors
  105 |     await expect(page.getByRole('heading', { name: 'How Open Invest DAO Works' })).toBeVisible();
  106 |     
  107 |     // Verify steps using more specific selectors
  108 |     const steps = [
  109 |       'Connect Your Wallet',
  110 |       'Complete Verification',
  111 |       'Make Initial Contribution',
  112 |       'Participate in Governance',
  113 |       'Receive Benefits'
  114 |     ];
  115 |     
  116 |     for (const step of steps) {
  117 |       await expect(page.getByRole('heading', { name: step, exact: true })).toBeVisible();
  118 |     }
  119 |   });
  120 |
  121 |   test('should show FAQ section', async ({ page }) => {
  122 |     await page.goto('/onboarding');
  123 |     await page.waitForLoadState('networkidle');
  124 |     
  125 |     // Verify FAQ section using more specific selectors
  126 |     await expect(page.getByRole('heading', { name: 'Frequently Asked Questions' })).toBeVisible();
  127 |     
  128 |     // Click and verify FAQ content using more specific selectors
  129 |     const whatIsDao = page.getByRole('button', { name: 'What is a DAO?' });
  130 |     await whatIsDao.click();
  131 |     await expect(page.getByText('A Decentralized Autonomous Organization', { exact: false })).toBeVisible();
  132 |     
  133 |     const governanceTokens = page.getByRole('button', { name: 'How do governance tokens work?' });
  134 |     await governanceTokens.click();
  135 |     await expect(page.getByText('Governance tokens represent your stake', { exact: false })).toBeVisible();
  136 |   });
  137 |
  138 |   test('should complete onboarding journey as investor', async ({ page }) => {
  139 |     await page.goto('/onboarding');
  140 |     await page.waitForLoadState('networkidle');
  141 |     
  142 |     // Select investor journey
  143 |     await page.waitForSelector('text=Investor');
  144 |     await page.getByText('Investor').click();
  145 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
  146 |     
  147 |     // Complete welcome step
  148 |     await page.waitForSelector('text=Welcome to Open Invest DAO');
  149 |     await expect(page.getByText('Welcome to Open Invest DAO')).toBeVisible();
  150 |     await page.getByRole('button', { name: 'Next' }).click();
  151 |     
  152 |     // Complete choose journey step
  153 |     await page.waitForSelector('text=Choose Your Journey');
  154 |     await expect(page.getByText('Choose Your Journey')).toBeVisible();
  155 |     await page.getByRole('button', { name: 'Next' }).click();
  156 |     
  157 |     // Complete how it works step
  158 |     await page.waitForSelector('text=How Open Invest DAO Works');
  159 |     await expect(page.getByText('How Open Invest DAO Works')).toBeVisible();
  160 |     await page.getByRole('button', { name: 'Next' }).click();
  161 |     
  162 |     // Verify paywall appears
  163 |     await page.waitForSelector('text=Unlock Advanced Investor Features');
```
# Test info

- Name: Onboarding Flow >> should handle insufficient funds for NFT purchase
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/onboarding.spec.ts:82:3

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Complete Step' })

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/onboarding.spec.ts:90:63
```

# Page snapshot

```yaml
- dialog "Logo Welcome to Open Invest DAO":
  - heading "Logo Welcome to Open Invest DAO" [level=2]:
    - img "Logo"
    - text: Welcome to Open Invest DAO
  - paragraph: Let's get you started on your investment journey
  - heading "How It Works" [level=3]
  - list:
    - listitem:
      - text: "1"
      - paragraph: Connect Your Wallet
      - paragraph: Access the full functionality of the platform
    - listitem:
      - text: "2"
      - paragraph: Make Initial Contribution
      - paragraph: Start with an initial contribution to receive tokens
    - listitem:
      - text: "3"
      - paragraph: Participate in Governance
      - paragraph: Vote on proposals and platform decisions
  - button "Previous"
  - link "Full Guide":
    - /url: /onboarding
    - button "Full Guide"
  - button "Next":
    - text: Next
    - img
  - button "Close":
    - img
    - text: Close
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Onboarding Flow', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Clear localStorage before each test
   6 |     await page.goto('/');
   7 |     await page.evaluate(() => localStorage.clear());
   8 |   });
   9 |
   10 |   test('should complete full investor onboarding journey', async ({ page }) => {
   11 |     await page.goto('/onboarding');
   12 |     
   13 |     // Verify initial state
   14 |     await expect(page.getByText('Choose Your Role')).toBeVisible();
   15 |     await expect(page.getByText('Investor')).toBeVisible();
   16 |     await expect(page.getByText('Project Owner')).toBeVisible();
   17 |     await expect(page.getByText('DAO Member')).toBeVisible();
   18 |     await expect(page.getByText('Community Member')).toBeVisible();
   19 |     
   20 |     // Select investor journey
   21 |     await page.getByText('Investor').click();
   22 |     await page.getByRole('button', { name: 'Next' }).click();
   23 |     
   24 |     // Welcome step
   25 |     await expect(page.getByText('Bem-vindo')).toBeVisible();
   26 |     await expect(page.getByText('Welcome to Open Invest')).toBeVisible();
   27 |     await page.getByRole('button', { name: 'Complete Step' }).click();
   28 |     
   29 |     // Choose journey step
   30 |     await expect(page.getByText('Escolha sua Jornada')).toBeVisible();
   31 |     await expect(page.getByText('Select your investment path')).toBeVisible();
   32 |     await page.getByRole('button', { name: 'Complete Step' }).click();
   33 |     
   34 |     // How it works step
   35 |     await expect(page.getByText('Como Funciona')).toBeVisible();
   36 |     await expect(page.getByText('Understanding the platform')).toBeVisible();
   37 |     await page.getByRole('button', { name: 'Complete Step' }).click();
   38 |     
   39 |     // Paywall step
   40 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
   41 |     await expect(page.getByText('Price: 0.05 ETH')).toBeVisible();
   42 |     await expect(page.getByText('30 days access')).toBeVisible();
   43 |     
   44 |     // Purchase NFT
   45 |     await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
   46 |     await expect(page.getByText('NFT purchased successfully!')).toBeVisible();
   47 |     
   48 |     // Verify final state
   49 |     await expect(page.getByText('Active Subscription')).toBeVisible();
   50 |     await expect(page.getByText('30 days remaining')).toBeVisible();
   51 |     await expect(page.getByText('Congratulations!')).toBeVisible();
   52 |   });
   53 |
   54 |   test('should handle wallet connection during onboarding', async ({ page }) => {
   55 |     await page.goto('/onboarding');
   56 |     
   57 |     // Select investor journey
   58 |     await page.getByText('Investor').click();
   59 |     await page.getByRole('button', { name: 'Next' }).click();
   60 |     
   61 |     // Complete initial steps
   62 |     await page.getByRole('button', { name: 'Complete Step' }).click();
   63 |     await page.getByRole('button', { name: 'Complete Step' }).click();
   64 |     await page.getByRole('button', { name: 'Complete Step' }).click();
   65 |     
   66 |     // Verify wallet connection prompt
   67 |     await expect(page.getByText('Connect your wallet')).toBeVisible();
   68 |     await page.getByRole('button', { name: 'Connect Wallet' }).click();
   69 |     
   70 |     // Mock wallet connection
   71 |     await page.evaluate(() => {
   72 |       window.ethereum = {
   73 |         request: async () => ['0x123...abc'],
   74 |         isMetaMask: true
   75 |       };
   76 |     });
   77 |     
   78 |     // Verify wallet connected
   79 |     await expect(page.getByText('Wallet Connected')).toBeVisible();
   80 |   });
   81 |
   82 |   test('should handle insufficient funds for NFT purchase', async ({ page }) => {
   83 |     await page.goto('/onboarding');
   84 |     
   85 |     // Select investor journey
   86 |     await page.getByText('Investor').click();
   87 |     await page.getByRole('button', { name: 'Next' }).click();
   88 |     
   89 |     // Complete initial steps
>  90 |     await page.getByRole('button', { name: 'Complete Step' }).click();
      |                                                               ^ Error: locator.click: Test timeout of 30000ms exceeded.
   91 |     await page.getByRole('button', { name: 'Complete Step' }).click();
   92 |     await page.getByRole('button', { name: 'Complete Step' }).click();
   93 |     
   94 |     // Mock insufficient funds
   95 |     await page.evaluate(() => {
   96 |       window.ethereum = {
   97 |         request: async () => {
   98 |           throw new Error('Insufficient funds');
   99 |         }
  100 |       };
  101 |     });
  102 |     
  103 |     // Attempt purchase
  104 |     await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
  105 |     
  106 |     // Verify error message
  107 |     await expect(page.getByText('Insufficient funds')).toBeVisible();
  108 |     await expect(page.getByText('Please add more ETH to your wallet')).toBeVisible();
  109 |   });
  110 |
  111 |   test('should persist onboarding progress', async ({ page }) => {
  112 |     await page.goto('/onboarding');
  113 |     
  114 |     // Start investor journey
  115 |     await page.getByText('Investor').click();
  116 |     await page.getByRole('button', { name: 'Next' }).click();
  117 |     
  118 |     // Complete first step
  119 |     await page.getByRole('button', { name: 'Complete Step' }).click();
  120 |     
  121 |     // Refresh page
  122 |     await page.reload();
  123 |     
  124 |     // Verify progress is maintained
  125 |     await expect(page.getByText('Escolha sua Jornada')).toBeVisible();
  126 |     await expect(page.getByText('25%')).toBeVisible();
  127 |   });
  128 |
  129 |   test('should allow switching between different user types', async ({ page }) => {
  130 |     await page.goto('/onboarding');
  131 |     
  132 |     // Start as Investor
  133 |     await page.getByText('Investor').click();
  134 |     await page.getByRole('button', { name: 'Next' }).click();
  135 |     await expect(page.getByText('Bem-vindo')).toBeVisible();
  136 |     
  137 |     // Go back and switch to Project Owner
  138 |     await page.getByRole('button', { name: 'Back' }).click();
  139 |     await page.getByText('Project Owner').click();
  140 |     await page.getByRole('button', { name: 'Next' }).click();
  141 |     await expect(page.getByText('Project Owner Welcome')).toBeVisible();
  142 |     
  143 |     // Verify different features are shown
  144 |     await expect(page.getByText('Project Management Tools')).toBeVisible();
  145 |   });
  146 | }); 
```
# Test info

- Name: Onboarding Flow >> should handle insufficient funds for contribution
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/onboarding.spec.ts:74:3

# Error details

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('a').filter({ hasText: 'Begin Investor Journey' })

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/onboarding.spec.ts:87:24
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
   2 | import { waitForAppLoad, mockWallet, clearLocalStorage, completeOnboardingSteps } from './utils';
   3 |
   4 | test.describe('Onboarding Flow', () => {
   5 |   test.beforeEach(async ({ page }) => {
   6 |     await page.goto('/');
   7 |     await clearLocalStorage(page);
   8 |     await waitForAppLoad(page);
   9 |   });
   10 |
   11 |   test('should complete full investor onboarding journey', async ({ page }) => {
   12 |     // Close the onboarding dialog if it appears
   13 |     const dialogCloseButton = page.getByRole('button', { name: 'Close' });
   14 |     if (await dialogCloseButton.isVisible()) {
   15 |       await dialogCloseButton.click();
   16 |     }
   17 |     
   18 |     await page.goto('/onboarding');
   19 |     await waitForAppLoad(page);
   20 |     
   21 |     // Verify initial state
   22 |     await expect(page.getByRole('heading', { level: 2, name: /Welcome to Open Invest DAO/i })).toBeVisible();
   23 |     await expect(page.getByText(/decentralized platform/i)).toBeVisible();
   24 |     
   25 |     // Navigate through welcome step
   26 |     await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
   27 |     
   28 |     // Choose journey step
   29 |     await expect(page.getByText(/Choose Your Journey/i)).toBeVisible();
   30 |     
   31 |     // Click the Investor journey button
   32 |     const investorCard = page.locator('a', { hasText: 'Begin Investor Journey' });
   33 |     await investorCard.click();
   34 |     
   35 |     // Verify investor journey page
   36 |     await expect(page.getByText(/Discover and invest/i)).toBeVisible();
   37 |     
   38 |     // Connect wallet
   39 |     await mockWallet(page);
   40 |     await page.getByRole('button', { name: /Connect.*Wallet/i }).click();
   41 |     await expect(page.getByText(/Wallet Connected/i)).toBeVisible();
   42 |     
   43 |     // Complete verification
   44 |     await expect(page.getByText(/Complete Verification/i)).toBeVisible();
   45 |     await page.getByRole('button', { name: /Next|Continue|Verify/i }).click();
   46 |     
   47 |     // Make initial contribution
   48 |     await expect(page.getByText(/Make Initial Contribution/i)).toBeVisible();
   49 |     await page.getByRole('button', { name: /Contribute/i }).click();
   50 |     await expect(page.getByText(/Contribution successful/i)).toBeVisible();
   51 |   });
   52 |
   53 |   test('should handle wallet connection during onboarding', async ({ page }) => {
   54 |     // Close the onboarding dialog if it appears
   55 |     const dialogCloseButton = page.getByRole('button', { name: 'Close' });
   56 |     if (await dialogCloseButton.isVisible()) {
   57 |       await dialogCloseButton.click();
   58 |     }
   59 |     
   60 |     await page.goto('/onboarding');
   61 |     await waitForAppLoad(page);
   62 |     
   63 |     // Navigate to investor journey
   64 |     await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
   65 |     const investorCard = page.locator('a', { hasText: 'Begin Investor Journey' });
   66 |     await investorCard.click();
   67 |     
   68 |     // Mock wallet and connect
   69 |     await mockWallet(page);
   70 |     await page.getByRole('button', { name: /Connect.*Wallet/i }).click();
   71 |     await expect(page.getByText(/Wallet Connected/i)).toBeVisible();
   72 |   });
   73 |
   74 |   test('should handle insufficient funds for contribution', async ({ page }) => {
   75 |     // Close the onboarding dialog if it appears
   76 |     const dialogCloseButton = page.getByRole('button', { name: 'Close' });
   77 |     if (await dialogCloseButton.isVisible()) {
   78 |       await dialogCloseButton.click();
   79 |     }
   80 |     
   81 |     await page.goto('/onboarding');
   82 |     await waitForAppLoad(page);
   83 |     
   84 |     // Navigate to investor journey
   85 |     await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
   86 |     const investorCard = page.locator('a', { hasText: 'Begin Investor Journey' });
>  87 |     await investorCard.click();
      |                        ^ Error: locator.click: Test timeout of 60000ms exceeded.
   88 |     
   89 |     // Mock wallet with no balance and connect
   90 |     await mockWallet(page, { hasBalance: false });
   91 |     await page.getByRole('button', { name: /Connect.*Wallet/i }).click();
   92 |     
   93 |     // Attempt contribution
   94 |     await page.getByRole('button', { name: /Contribute/i }).click();
   95 |     await expect(page.getByText(/Insufficient funds/i)).toBeVisible();
   96 |   });
   97 |
   98 |   test('should persist onboarding progress', async ({ page }) => {
   99 |     // Close the onboarding dialog if it appears
  100 |     const dialogCloseButton = page.getByRole('button', { name: 'Close' });
  101 |     if (await dialogCloseButton.isVisible()) {
  102 |       await dialogCloseButton.click();
  103 |     }
  104 |     
  105 |     await page.goto('/onboarding');
  106 |     await waitForAppLoad(page);
  107 |     
  108 |     // Start journey and complete first step
  109 |     await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
  110 |     const investorCard = page.locator('a', { hasText: 'Begin Investor Journey' });
  111 |     await investorCard.click();
  112 |     
  113 |     // Store current URL
  114 |     const currentUrl = page.url();
  115 |     
  116 |     // Refresh page
  117 |     await page.reload();
  118 |     await waitForAppLoad(page);
  119 |     
  120 |     // Verify we're still on the same step
  121 |     expect(page.url()).toBe(currentUrl);
  122 |   });
  123 |
  124 |   test('should allow switching between different user types', async ({ page }) => {
  125 |     // Close the onboarding dialog if it appears
  126 |     const dialogCloseButton = page.getByRole('button', { name: 'Close' });
  127 |     if (await dialogCloseButton.isVisible()) {
  128 |       await dialogCloseButton.click();
  129 |     }
  130 |     
  131 |     await page.goto('/onboarding');
  132 |     await waitForAppLoad(page);
  133 |     
  134 |     // Navigate through welcome
  135 |     await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
  136 |     
  137 |     // Try Investor journey
  138 |     const investorCard = page.locator('a', { hasText: 'Begin Investor Journey' });
  139 |     await investorCard.click();
  140 |     await expect(page.getByText(/Discover and invest/i)).toBeVisible();
  141 |     
  142 |     // Go back to selection
  143 |     await page.goto('/onboarding');
  144 |     await waitForAppLoad(page);
  145 |     await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
  146 |     
  147 |     // Try Project Owner journey
  148 |     const projectOwnerCard = page.locator('a', { hasText: 'Begin Project Owner Journey' });
  149 |     await projectOwnerCard.click();
  150 |     await expect(page.getByText(/Submit.*blockchain project/i)).toBeVisible();
  151 |   });
  152 | }); 
```
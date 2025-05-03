# Test info

- Name: Onboarding Flow >> should handle insufficient funds for contribution
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/onboarding.spec.ts:65:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:8080/
Call log:
  - navigating to "http://localhost:8080/", waiting until "load"

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/onboarding.spec.ts:6:16
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import { waitForAppLoad, mockWallet, clearLocalStorage, completeOnboardingSteps, selectUserType } from './utils';
   3 |
   4 | test.describe('Onboarding Flow', () => {
   5 |   test.beforeEach(async ({ page }) => {
>  6 |     await page.goto('/');
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:8080/
   7 |     await clearLocalStorage(page);
   8 |     await waitForAppLoad(page);
   9 |   });
   10 |
   11 |   test('should complete full investor onboarding journey', async ({ page }) => {
   12 |     await page.goto('/onboarding');
   13 |     await waitForAppLoad(page);
   14 |     
   15 |     // Verify initial state
   16 |     await expect(page.getByRole('heading', { level: 2, name: /Welcome to Open Invest DAO/i })).toBeVisible();
   17 |     await expect(page.getByText(/decentralized platform/i)).toBeVisible();
   18 |     
   19 |     // Navigate through welcome step
   20 |     await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
   21 |     await page.waitForLoadState('networkidle');
   22 |     
   23 |     // Select investor journey
   24 |     await selectUserType(page, 'Investor');
   25 |     
   26 |     // Verify investor journey page
   27 |     await expect(page.getByText(/Discover and invest/i)).toBeVisible();
   28 |     
   29 |     // Connect wallet
   30 |     await mockWallet(page);
   31 |     await page.getByRole('button', { name: /Connect.*Wallet/i }).click();
   32 |     await page.waitForLoadState('networkidle');
   33 |     await expect(page.getByText(/Wallet Connected/i)).toBeVisible();
   34 |     
   35 |     // Complete verification
   36 |     await expect(page.getByText(/Complete Verification/i)).toBeVisible();
   37 |     await page.getByRole('button', { name: /Next|Continue|Verify/i }).click();
   38 |     await page.waitForLoadState('networkidle');
   39 |     
   40 |     // Make initial contribution
   41 |     await expect(page.getByText(/Make Initial Contribution/i)).toBeVisible();
   42 |     await page.getByRole('button', { name: /Contribute/i }).click();
   43 |     await page.waitForLoadState('networkidle');
   44 |     await expect(page.getByText(/Contribution successful/i)).toBeVisible();
   45 |   });
   46 |
   47 |   test('should handle wallet connection during onboarding', async ({ page }) => {
   48 |     await page.goto('/onboarding');
   49 |     await waitForAppLoad(page);
   50 |     
   51 |     // Navigate through welcome step
   52 |     await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
   53 |     await page.waitForLoadState('networkidle');
   54 |     
   55 |     // Select investor journey
   56 |     await selectUserType(page, 'Investor');
   57 |     
   58 |     // Mock wallet and connect
   59 |     await mockWallet(page);
   60 |     await page.getByRole('button', { name: /Connect.*Wallet/i }).click();
   61 |     await page.waitForLoadState('networkidle');
   62 |     await expect(page.getByText(/Wallet Connected/i)).toBeVisible();
   63 |   });
   64 |
   65 |   test('should handle insufficient funds for contribution', async ({ page }) => {
   66 |     await page.goto('/onboarding');
   67 |     await waitForAppLoad(page);
   68 |     
   69 |     // Navigate through welcome step
   70 |     await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
   71 |     await page.waitForLoadState('networkidle');
   72 |     
   73 |     // Select investor journey
   74 |     await selectUserType(page, 'Investor');
   75 |     
   76 |     // Mock wallet with no balance and connect
   77 |     await mockWallet(page, { hasBalance: false });
   78 |     await page.getByRole('button', { name: /Connect.*Wallet/i }).click();
   79 |     await page.waitForLoadState('networkidle');
   80 |     
   81 |     // Attempt contribution
   82 |     await page.getByRole('button', { name: /Contribute/i }).click();
   83 |     await page.waitForLoadState('networkidle');
   84 |     await expect(page.getByText(/Insufficient funds/i)).toBeVisible();
   85 |   });
   86 |
   87 |   test('should persist onboarding progress', async ({ page }) => {
   88 |     await page.goto('/onboarding');
   89 |     await waitForAppLoad(page);
   90 |     
   91 |     // Navigate through welcome step
   92 |     await page.getByRole('button', { name: /Next|Continue|Get Started/i }).click();
   93 |     await page.waitForLoadState('networkidle');
   94 |     
   95 |     // Select investor journey
   96 |     await selectUserType(page, 'Investor');
   97 |     
   98 |     // Store current URL
   99 |     const currentUrl = page.url();
  100 |     
  101 |     // Refresh page
  102 |     await page.reload();
  103 |     await waitForAppLoad(page);
  104 |     
  105 |     // Verify we're still on the same step
  106 |     expect(page.url()).toBe(currentUrl);
```
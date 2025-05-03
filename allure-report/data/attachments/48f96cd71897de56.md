# Test info

- Name: Wallet Connection >> should connect to wallet
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/wallet.test.ts:10:3

# Error details

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Connect Wallet' })

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/wallet.test.ts:15:64
```

# Page snapshot

```yaml
- dialog "Logo Welcome to Open Invest DAO":
  - heading "Logo Welcome to Open Invest DAO" [level=2]:
    - img "Logo"
    - text: Welcome to Open Invest DAO
  - paragraph: Let's get you started on your investment journey
  - heading "Choose Your Journey" [level=3]
  - paragraph: "Open Invest DAO serves different users with unique goals:"
  - heading "Investor" [level=4]
  - paragraph: Invest in innovative projects
  - heading "Project Owner" [level=4]
  - paragraph: Submit and fund your project
  - button "Learn about all user types"
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
   2 | import { waitForAppLoad, mockWallet } from './utils';
   3 |
   4 | test.describe('Wallet Connection', () => {
   5 |   test.beforeEach(async ({ page }) => {
   6 |     await page.goto('/');
   7 |     await waitForAppLoad(page);
   8 |   });
   9 |
  10 |   test('should connect to wallet', async ({ page }) => {
  11 |     // Mock the Ethereum provider
  12 |     await mockWallet(page);
  13 |
  14 |     // Click connect wallet button
> 15 |     await page.getByRole('button', { name: 'Connect Wallet' }).click();
     |                                                                ^ Error: locator.click: Test timeout of 60000ms exceeded.
  16 |
  17 |     // Verify wallet is connected
  18 |     await expect(page.getByText('Connected')).toBeVisible();
  19 |     
  20 |     // Get wallet address from page
  21 |     const address = await page.evaluate(() => window.ethereum.selectedAddress);
  22 |     expect(address).toBeTruthy();
  23 |   });
  24 |
  25 |   test('should handle wallet disconnection', async ({ page }) => {
  26 |     // Mock the Ethereum provider
  27 |     await mockWallet(page);
  28 |
  29 |     // Connect wallet
  30 |     await page.getByRole('button', { name: 'Connect Wallet' }).click();
  31 |     await expect(page.getByText('Connected')).toBeVisible();
  32 |
  33 |     // Disconnect wallet
  34 |     await page.getByRole('button', { name: 'Disconnect' }).click();
  35 |
  36 |     // Verify wallet is disconnected
  37 |     await expect(page.getByText('Connect Wallet')).toBeVisible();
  38 |     await expect(page.getByText('Connected')).not.toBeVisible();
  39 |   });
  40 | }); 
```
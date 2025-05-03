# Test info

- Name: Wallet Connection >> should handle wallet disconnection
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/wallet.test.ts:18:3

# Error details

```
TimeoutError: locator.click: Timeout 3000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Connect Wallet' })

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/wallet.test.ts:20:25
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
   2 |
   3 | test.describe('Wallet Connection', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     await page.addInitScript(() => {
   6 |       window.localStorage.clear();
   7 |     });
   8 |     await page.goto('/', { waitUntil: 'commit' });
   9 |     await page.waitForSelector('body');
  10 |   });
  11 |
  12 |   test('should connect to wallet', async ({ page }) => {
  13 |     const connectButton = page.getByRole('button', { name: 'Connect Wallet' });
  14 |     await connectButton.click({ timeout: 3000 });
  15 |     await expect(page.getByText('Connected')).toBeVisible({ timeout: 3000 });
  16 |   });
  17 |
  18 |   test('should handle wallet disconnection', async ({ page }) => {
  19 |     const connectButton = page.getByRole('button', { name: 'Connect Wallet' });
> 20 |     await connectButton.click({ timeout: 3000 });
     |                         ^ TimeoutError: locator.click: Timeout 3000ms exceeded.
  21 |     await expect(page.getByText('Connected')).toBeVisible({ timeout: 3000 });
  22 |     
  23 |     const disconnectButton = page.getByRole('button', { name: 'Disconnect' });
  24 |     await disconnectButton.click({ timeout: 3000 });
  25 |     await expect(page.getByText('Connect Wallet')).toBeVisible({ timeout: 3000 });
  26 |   });
  27 | }); 
```
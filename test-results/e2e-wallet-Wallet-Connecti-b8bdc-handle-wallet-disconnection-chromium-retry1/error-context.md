# Test info

- Name: Wallet Connection >> should handle wallet disconnection
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/wallet.test.ts:14:3

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Connect Wallet' })

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/wallet.test.ts:15:64
```

# Page snapshot

```yaml
- region "Notifications alt+T"
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
   5 |     await page.goto('/', { waitUntil: 'networkidle' });
   6 |     await page.waitForSelector('body', { state: 'visible' });
   7 |   });
   8 |
   9 |   test('should connect to wallet', async ({ page }) => {
  10 |     await page.getByRole('button', { name: 'Connect Wallet' }).click();
  11 |     await expect(page.getByText('Connected')).toBeVisible();
  12 |   });
  13 |
  14 |   test('should handle wallet disconnection', async ({ page }) => {
> 15 |     await page.getByRole('button', { name: 'Connect Wallet' }).click();
     |                                                                ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  16 |     await expect(page.getByText('Connected')).toBeVisible();
  17 |     
  18 |     await page.getByRole('button', { name: 'Disconnect' }).click();
  19 |     await expect(page.getByText('Connect Wallet')).toBeVisible();
  20 |   });
  21 | }); 
```
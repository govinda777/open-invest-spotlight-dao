# Test info

- Name: Wallet Connection >> should connect to wallet
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/wallet.test.ts:9:3

# Error details

```
Error: locator.click: Test ended.
Call log:
  - waiting for getByRole('button', { name: 'Connect Wallet' })

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/wallet.test.ts:10:64
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
> 10 |     await page.getByRole('button', { name: 'Connect Wallet' }).click();
     |                                                                ^ Error: locator.click: Test ended.
  11 |     await expect(page.getByText('Connected')).toBeVisible();
  12 |   });
  13 |
  14 |   test('should handle wallet disconnection', async ({ page }) => {
  15 |     await page.getByRole('button', { name: 'Connect Wallet' }).click();
  16 |     await expect(page.getByText('Connected')).toBeVisible();
  17 |     
  18 |     await page.getByRole('button', { name: 'Disconnect' }).click();
  19 |     await expect(page.getByText('Connect Wallet')).toBeVisible();
  20 |   });
  21 | }); 
```
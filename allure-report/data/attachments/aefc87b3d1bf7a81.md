# Test info

- Name: Wallet Connection >> should handle wallet disconnection
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/wallet.test.ts:24:3

# Error details

```
TimeoutError: locator.waitFor: Timeout 5000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Connect Wallet' }) to be visible

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/wallet.test.ts:27:25
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
   8 |     await page.goto('/', { waitUntil: 'domcontentloaded' });
   9 |     await page.waitForSelector('body', { state: 'visible' });
  10 |   });
  11 |
  12 |   test('should connect to wallet', async ({ page }) => {
  13 |     // Espera mais específica para o botão
  14 |     const connectButton = page.getByRole('button', { name: 'Connect Wallet' });
  15 |     await connectButton.waitFor({ state: 'visible', timeout: 5000 });
  16 |     
  17 |     // Clica no botão
  18 |     await connectButton.click();
  19 |     
  20 |     // Verifica conexão com timeout reduzido
  21 |     await expect(page.getByText('Connected')).toBeVisible({ timeout: 5000 });
  22 |   });
  23 |
  24 |   test('should handle wallet disconnection', async ({ page }) => {
  25 |     // Conecta wallet
  26 |     const connectButton = page.getByRole('button', { name: 'Connect Wallet' });
> 27 |     await connectButton.waitFor({ state: 'visible', timeout: 5000 });
     |                         ^ TimeoutError: locator.waitFor: Timeout 5000ms exceeded.
  28 |     await connectButton.click();
  29 |     await expect(page.getByText('Connected')).toBeVisible({ timeout: 5000 });
  30 |     
  31 |     // Desconecta wallet
  32 |     const disconnectButton = page.getByRole('button', { name: 'Disconnect' });
  33 |     await disconnectButton.waitFor({ state: 'visible', timeout: 5000 });
  34 |     await disconnectButton.click();
  35 |     
  36 |     // Verifica desconexão
  37 |     await expect(page.getByText('Connect Wallet')).toBeVisible({ timeout: 5000 });
  38 |   });
  39 | }); 
```
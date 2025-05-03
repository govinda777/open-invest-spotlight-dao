# Test info

- Name: Wallet Connection >> should connect to wallet
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/wallet.test.ts:4:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:8080/
Call log:
  - navigating to "http://localhost:8080/", waiting until "load"

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/wallet.test.ts:6:16
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Wallet Connection', () => {
   4 |   test('should connect to wallet', async ({ page }) => {
   5 |     // Navigate to the application
>  6 |     await page.goto('/');
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:8080/
   7 |
   8 |     // Mock the Ethereum provider
   9 |     await page.evaluate(() => {
  10 |       const mockAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
  11 |       window.ethereum = {
  12 |         selectedAddress: null,
  13 |         request: async ({ method }) => {
  14 |           if (method === 'eth_requestAccounts') {
  15 |             window.ethereum.selectedAddress = mockAddress;
  16 |             return [mockAddress];
  17 |           }
  18 |           return null;
  19 |         }
  20 |       };
  21 |     });
  22 |
  23 |     // Click connect wallet button
  24 |     await page.click('button:has-text("Connect Wallet")');
  25 |
  26 |     // Verify wallet is connected
  27 |     await expect(page.locator('text=Connected')).toBeVisible();
  28 |     
  29 |     // Get wallet address from page
  30 |     const address = await page.evaluate(() => window.ethereum.selectedAddress);
  31 |     expect(address).toBeTruthy();
  32 |     expect(address).toBe('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
  33 |   });
  34 |
  35 |   test('should handle wallet disconnection', async ({ page }) => {
  36 |     // Navigate to the application
  37 |     await page.goto('/');
  38 |
  39 |     // Mock the Ethereum provider
  40 |     await page.evaluate(() => {
  41 |       const mockAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
  42 |       window.ethereum = {
  43 |         selectedAddress: null,
  44 |         request: async ({ method }) => {
  45 |           if (method === 'eth_requestAccounts') {
  46 |             window.ethereum.selectedAddress = mockAddress;
  47 |             return [mockAddress];
  48 |           }
  49 |           return null;
  50 |         }
  51 |       };
  52 |     });
  53 |
  54 |     // Connect wallet
  55 |     await page.click('button:has-text("Connect Wallet")');
  56 |     await expect(page.locator('text=Connected')).toBeVisible();
  57 |
  58 |     // Disconnect wallet
  59 |     await page.click('button:has-text("Disconnect")');
  60 |
  61 |     // Verify wallet is disconnected
  62 |     await expect(page.locator('text=Connect Wallet')).toBeVisible();
  63 |     await expect(page.locator('text=Connected')).not.toBeVisible();
  64 |   });
  65 | }); 
```
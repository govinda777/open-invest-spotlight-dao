# Test info

- Name: Wallet Connection >> should handle wallet disconnection
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/wallet.test.ts:35:3

# Error details

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button:has-text("Connect Wallet")')
    - locator resolved to <button data-lov-name="button" data-component-line="30" data-component-name="button" data-component-file="Index.tsx" data-lov-id="src/pages/Index.tsx:30:12" data-component-path="src/pages/Index.tsx" class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors" data-component-content="%7B%22text%22%3A%22Connect%20Wallet%22%2C%22className%22%3A%22bg-purple-600%20text-white%20px-4%20py-2%20rounded-md%20hover%3Abg-purple-700%20transition-colors%22%7D">Connect Wallet</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-state="open" aria-hidden="true" data-aria-hidden="true" data-component-line="35" data-lov-name="DialogOverlay" data-component-content="%7B%7D" data-component-file="dialog.tsx" data-component-name="DialogOverlay" data-lov-id="src/components/ui/dialog.tsx:35:4" data-component-path="src/components/ui/dialog.tsx" class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"></div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-state="open" aria-hidden="true" data-aria-hidden="true" data-component-line="35" data-lov-name="DialogOverlay" data-component-content="%7B%7D" data-component-file="dialog.tsx" data-component-name="DialogOverlay" data-lov-id="src/components/ui/dialog.tsx:35:4" data-component-path="src/components/ui/dialog.tsx" class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"></div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    57 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div data-state="open" aria-hidden="true" data-aria-hidden="true" data-component-line="35" data-lov-name="DialogOverlay" data-component-content="%7B%7D" data-component-file="dialog.tsx" data-component-name="DialogOverlay" data-lov-id="src/components/ui/dialog.tsx:35:4" data-component-path="src/components/ui/dialog.tsx" class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"></div> intercepts pointer events
     - retrying click action
       - waiting 500ms

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/wallet.test.ts:55:16
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
   4 |   test('should connect to wallet', async ({ page }) => {
   5 |     // Navigate to the application
   6 |     await page.goto('/');
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
> 55 |     await page.click('button:has-text("Connect Wallet")');
     |                ^ Error: page.click: Test timeout of 30000ms exceeded.
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
# Test info

- Name: Onboarding Flow >> should complete full investor onboarding journey
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/onboarding.spec.ts:11:3

# Error details

```
Error: locator.click: Test timeout of 15000ms exceeded.
Call log:
  - waiting for getByText('Investor')

    at selectUserType (/Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/utils.ts:40:34)
    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/onboarding.spec.ts:24:11
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
   1 | import { Page } from '@playwright/test';
   2 |
   3 | export const waitForAppLoad = async (page: Page) => {
   4 |   // Wait for the main content to be visible with reduced timeout
   5 |   await page.waitForSelector('main', { timeout: 3000 });
   6 | };
   7 |
   8 | export const mockWallet = async (page: Page, options = { hasBalance: true }) => {
   9 |   await page.evaluate(({ hasBalance }) => {
  10 |     window.ethereum = {
  11 |       request: async (params: { method: string }) => {
  12 |         if (params.method === 'eth_requestAccounts') {
  13 |           return ['0x123...abc'];
  14 |         }
  15 |         if (params.method === 'eth_getBalance') {
  16 |           return hasBalance ? '0x1000000000000000000' : '0x0';
  17 |         }
  18 |         return null;
  19 |       },
  20 |       isMetaMask: true,
  21 |       on: () => {},
  22 |       removeListener: () => {},
  23 |     };
  24 |   }, options);
  25 | };
  26 |
  27 | export const clearLocalStorage = async (page: Page) => {
  28 |   await page.evaluate(() => localStorage.clear());
  29 | };
  30 |
  31 | export const completeOnboardingSteps = async (page: Page, steps = 1) => {
  32 |   for (let i = 0; i < steps; i++) {
  33 |     await page.getByRole('button', { name: /Next|Continue|Complete/i }).click();
  34 |     await page.waitForSelector('main', { timeout: 3000 });
  35 |   }
  36 | };
  37 |
  38 | export const selectUserType = async (page: Page, userType: 'Investor' | 'Project Owner' | 'DAO Member' | 'Community Member') => {
  39 |   // Click the user type text first
> 40 |   await page.getByText(userType).click();
     |                                  ^ Error: locator.click: Test timeout of 15000ms exceeded.
  41 |   
  42 |   // Then click the button to begin the journey
  43 |   await page.getByRole('button', { name: `Begin ${userType} Journey` }).click();
  44 |   
  45 |   // Wait for main content to be visible with reduced timeout
  46 |   await page.waitForSelector('main', { timeout: 3000 });
  47 | }; 
```
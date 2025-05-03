# Test info

- Name: Journey System >> should block access to final step without NFT purchase
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:42:3

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Complete Step' })

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:50:63
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
   2 |
   3 | test.describe('Journey System', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Clear localStorage before each test
   6 |     await page.goto('/');
   7 |     await page.evaluate(() => localStorage.clear());
   8 |   });
   9 |
   10 |   test('should complete onboarding journey as investor', async ({ page }) => {
   11 |     await page.goto('/onboarding');
   12 |     
   13 |     // Select investor journey
   14 |     await page.getByText('Investor').click();
   15 |     await page.getByRole('button', { name: 'Next' }).click();
   16 |     
   17 |     // Complete welcome step
   18 |     await expect(page.getByText('Bem-vindo')).toBeVisible();
   19 |     await page.getByRole('button', { name: 'Complete Step' }).click();
   20 |     
   21 |     // Complete choose journey step
   22 |     await expect(page.getByText('Escolha sua Jornada')).toBeVisible();
   23 |     await page.getByRole('button', { name: 'Complete Step' }).click();
   24 |     
   25 |     // Complete how it works step
   26 |     await expect(page.getByText('Como Funciona')).toBeVisible();
   27 |     await page.getByRole('button', { name: 'Complete Step' }).click();
   28 |     
   29 |     // Verify paywall appears
   30 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
   31 |     await expect(page.getByText('Price: 0.05 ETH')).toBeVisible();
   32 |     
   33 |     // Purchase NFT
   34 |     await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
   35 |     await expect(page.getByText('NFT purchased successfully!')).toBeVisible();
   36 |     
   37 |     // Verify subscription timer appears
   38 |     await expect(page.getByText('Active Subscription')).toBeVisible();
   39 |     await expect(page.getByText('30 days remaining')).toBeVisible();
   40 |   });
   41 |
   42 |   test('should block access to final step without NFT purchase', async ({ page }) => {
   43 |     await page.goto('/onboarding');
   44 |     
   45 |     // Select investor journey
   46 |     await page.getByText('Investor').click();
   47 |     await page.getByRole('button', { name: 'Next' }).click();
   48 |     
   49 |     // Complete all steps except paywall
>  50 |     await page.getByRole('button', { name: 'Complete Step' }).click();
      |                                                               ^ Error: locator.click: Test timeout of 30000ms exceeded.
   51 |     await page.getByRole('button', { name: 'Complete Step' }).click();
   52 |     await page.getByRole('button', { name: 'Complete Step' }).click();
   53 |     
   54 |     // Verify paywall appears and final step is not visible
   55 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
   56 |     await expect(page.getByText('Notifications')).not.toBeVisible();
   57 |   });
   58 |
   59 |   test('should show correct progress percentage', async ({ page }) => {
   60 |     await page.goto('/onboarding');
   61 |     
   62 |     // Select investor journey
   63 |     await page.getByText('Investor').click();
   64 |     await page.getByRole('button', { name: 'Next' }).click();
   65 |     
   66 |     // Verify initial progress
   67 |     await expect(page.getByText('0%')).toBeVisible();
   68 |     
   69 |     // Complete first step
   70 |     await page.getByRole('button', { name: 'Complete Step' }).click();
   71 |     await expect(page.getByText('25%')).toBeVisible();
   72 |     
   73 |     // Complete second step
   74 |     await page.getByRole('button', { name: 'Complete Step' }).click();
   75 |     await expect(page.getByText('50%')).toBeVisible();
   76 |   });
   77 |
   78 |   test('should handle subscription expiration', async ({ page }) => {
   79 |     await page.goto('/onboarding');
   80 |     
   81 |     // Select investor journey
   82 |     await page.getByText('Investor').click();
   83 |     await page.getByRole('button', { name: 'Next' }).click();
   84 |     
   85 |     // Complete all steps
   86 |     await page.getByRole('button', { name: 'Complete Step' }).click();
   87 |     await page.getByRole('button', { name: 'Complete Step' }).click();
   88 |     await page.getByRole('button', { name: 'Complete Step' }).click();
   89 |     
   90 |     // Purchase NFT
   91 |     await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
   92 |     
   93 |     // Set purchase date to 31 days ago
   94 |     await page.evaluate(() => {
   95 |       const purchaseDate = new Date();
   96 |       purchaseDate.setDate(purchaseDate.getDate() - 31);
   97 |       localStorage.setItem('investorNftPurchaseDate', purchaseDate.toISOString());
   98 |     });
   99 |     
  100 |     // Refresh page
  101 |     await page.reload();
  102 |     
  103 |     // Verify subscription timer is gone and paywall reappears
  104 |     await expect(page.getByText('Active Subscription')).not.toBeVisible();
  105 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  106 |   });
  107 |
  108 |   test('should support different user types', async ({ page }) => {
  109 |     await page.goto('/onboarding');
  110 |     
  111 |     // Test Project Owner journey
  112 |     await page.getByText('Project Owner').click();
  113 |     await page.getByRole('button', { name: 'Next' }).click();
  114 |     await expect(page.getByText('Unlock Advanced Project Owner Features')).toBeVisible();
  115 |     
  116 |     // Test DAO Member journey
  117 |     await page.goto('/onboarding');
  118 |     await page.getByText('DAO Member').click();
  119 |     await page.getByRole('button', { name: 'Next' }).click();
  120 |     await expect(page.getByText('Unlock Advanced DAO Member Features')).toBeVisible();
  121 |     
  122 |     // Test Community Member journey
  123 |     await page.goto('/onboarding');
  124 |     await page.getByText('Community Member').click();
  125 |     await page.getByRole('button', { name: 'Next' }).click();
  126 |     await expect(page.getByText('Unlock Advanced Community Member Features')).toBeVisible();
  127 |   });
  128 | }); 
```
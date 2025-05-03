# Test info

- Name: Journey System >> should block access to final step without NFT purchase
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:52:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:8083/
Call log:
  - navigating to "http://localhost:8083/", waiting until "load"

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:6:16
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Journey System', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Clear localStorage before each test
>  6 |     await page.goto('/');
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:8083/
   7 |     await page.evaluate(() => localStorage.clear());
   8 |     // Wait for page to be fully loaded
   9 |     await page.waitForLoadState('networkidle');
   10 |   });
   11 |
   12 |   test('should complete onboarding journey as investor', async ({ page }) => {
   13 |     await page.goto('/onboarding');
   14 |     await page.waitForLoadState('networkidle');
   15 |     
   16 |     // Select investor journey
   17 |     await page.waitForSelector('text=Investor');
   18 |     await page.getByText('Investor').click();
   19 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
   20 |     
   21 |     // Complete welcome step
   22 |     await page.waitForSelector('text=Welcome to Open Invest DAO');
   23 |     await expect(page.getByText('Welcome to Open Invest DAO')).toBeVisible();
   24 |     await page.getByRole('button', { name: 'Next' }).click();
   25 |     
   26 |     // Complete choose journey step
   27 |     await page.waitForSelector('text=Choose Your Journey');
   28 |     await expect(page.getByText('Choose Your Journey')).toBeVisible();
   29 |     await page.getByRole('button', { name: 'Next' }).click();
   30 |     
   31 |     // Complete how it works step
   32 |     await page.waitForSelector('text=How Open Invest DAO Works');
   33 |     await expect(page.getByText('How Open Invest DAO Works')).toBeVisible();
   34 |     await page.getByRole('button', { name: 'Next' }).click();
   35 |     
   36 |     // Verify paywall appears
   37 |     await page.waitForSelector('text=Unlock Advanced Investor Features');
   38 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
   39 |     await expect(page.getByText('Price: 0.05 ETH')).toBeVisible();
   40 |     
   41 |     // Purchase NFT
   42 |     await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
   43 |     await page.waitForSelector('text=NFT purchased successfully!');
   44 |     await expect(page.getByText('NFT purchased successfully!')).toBeVisible();
   45 |     
   46 |     // Verify subscription timer appears
   47 |     await page.waitForSelector('text=Active Subscription');
   48 |     await expect(page.getByText('Active Subscription')).toBeVisible();
   49 |     await expect(page.getByText('30 days remaining')).toBeVisible();
   50 |   });
   51 |
   52 |   test('should block access to final step without NFT purchase', async ({ page }) => {
   53 |     await page.goto('/onboarding');
   54 |     await page.waitForLoadState('networkidle');
   55 |     
   56 |     // Select investor journey
   57 |     await page.waitForSelector('text=Investor');
   58 |     await page.getByText('Investor').click();
   59 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
   60 |     
   61 |     // Complete all steps except paywall
   62 |     await page.waitForSelector('button:has-text("Next")');
   63 |     await page.getByRole('button', { name: 'Next' }).click();
   64 |     await page.getByRole('button', { name: 'Next' }).click();
   65 |     await page.getByRole('button', { name: 'Next' }).click();
   66 |     
   67 |     // Verify paywall appears and final step is not visible
   68 |     await page.waitForSelector('text=Unlock Advanced Investor Features');
   69 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
   70 |     await expect(page.getByText('Next Steps')).not.toBeVisible();
   71 |   });
   72 |
   73 |   test('should show correct progress percentage', async ({ page }) => {
   74 |     await page.goto('/onboarding');
   75 |     await page.waitForLoadState('networkidle');
   76 |     
   77 |     // Select investor journey
   78 |     await page.waitForSelector('text=Investor');
   79 |     await page.getByText('Investor').click();
   80 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
   81 |     
   82 |     // Verify initial progress
   83 |     await page.waitForSelector('text=0%');
   84 |     await expect(page.getByText('0%')).toBeVisible();
   85 |     
   86 |     // Complete first step
   87 |     await page.getByRole('button', { name: 'Next' }).click();
   88 |     await page.waitForSelector('text=25%');
   89 |     await expect(page.getByText('25%')).toBeVisible();
   90 |     
   91 |     // Complete second step
   92 |     await page.getByRole('button', { name: 'Next' }).click();
   93 |     await page.waitForSelector('text=50%');
   94 |     await expect(page.getByText('50%')).toBeVisible();
   95 |   });
   96 |
   97 |   test('should handle subscription expiration', async ({ page }) => {
   98 |     await page.goto('/onboarding');
   99 |     await page.waitForLoadState('networkidle');
  100 |     
  101 |     // Select investor journey
  102 |     await page.waitForSelector('text=Investor');
  103 |     await page.getByText('Investor').click();
  104 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
  105 |     
  106 |     // Complete all steps
```
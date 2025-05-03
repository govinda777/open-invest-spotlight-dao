# Test info

- Name: Journey System >> should navigate through investor journey
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:12:3

# Error details

```
Error: expect.toBeVisible: Error: strict mode violation: getByText('Welcome to Open Invest DAO') resolved to 2 elements:
    1) <h2 data-lov-name="h2" data-component-name="h2" data-component-line="339" class="text-xl font-semibold ml-3" data-component-file="Onboarding.tsx" data-lov-id="src/pages/Onboarding.tsx:339:16" data-component-path="src/pages/Onboarding.tsx" data-component-content="%7B%22className%22%3A%22text-xl%20font-semibold%20ml-3%22%7D">Welcome to Open Invest DAO</h2> aka getByTestId('main-content').getByText('Welcome to Open Invest DAO')
    2) <h2 id="radix-:r1:" data-component-line="44" data-lov-name="DialogTitle" data-component-name="DialogTitle" data-component-file="OnboardingDialog.tsx" data-lov-id="src/components/onboarding/OnboardingDialog.tsx:44:10" data-component-path="src/components/onboarding/OnboardingDialog.tsx" class="text-lg font-semibold leading-none tracking-tight flex items-center gap-2" data-component-content="%7B%22text%22%3A%22Welcome%20to%20Open%20Invest%20DAO%22%2C%22className%22%3A%22flex%20items-center%20gap-2%22…>…</h2> aka getByRole('heading', { name: 'Logo Welcome to Open Invest' })

Call log:
  - expect.toBeVisible with timeout 20000ms
  - waiting for getByText('Welcome to Open Invest DAO')

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:17:64
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
   3 | test.describe('Journey System', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Clear localStorage before each test
   6 |     await page.goto('/');
   7 |     await page.evaluate(() => localStorage.clear());
   8 |     // Wait for page to be fully loaded
   9 |     await page.waitForLoadState('networkidle');
   10 |   });
   11 |
   12 |   test('should navigate through investor journey', async ({ page }) => {
   13 |     await page.goto('/onboarding');
   14 |     await page.waitForLoadState('networkidle');
   15 |     
   16 |     // Verify welcome step
>  17 |     await expect(page.getByText('Welcome to Open Invest DAO')).toBeVisible();
      |                                                                ^ Error: expect.toBeVisible: Error: strict mode violation: getByText('Welcome to Open Invest DAO') resolved to 2 elements:
   18 |     await expect(page.getByText('This onboarding guide will help you understand')).toBeVisible();
   19 |     
   20 |     // Verify journey selection step
   21 |     await expect(page.getByText('Choose Your Journey')).toBeVisible();
   22 |     await expect(page.getByText('Investor')).toBeVisible();
   23 |     await expect(page.getByText('Project Owner')).toBeVisible();
   24 |     await expect(page.getByText('DAO Member')).toBeVisible();
   25 |     await expect(page.getByText('Community Member')).toBeVisible();
   26 |     
   27 |     // Select investor journey
   28 |     await page.getByRole('link', { name: 'Begin Investor Journey' }).click();
   29 |     
   30 |     // Verify redirect to investor journey page
   31 |     await expect(page.url()).toContain('/journeys/investor');
   32 |   });
   33 |
   34 |   test('should show all journey options', async ({ page }) => {
   35 |     await page.goto('/onboarding');
   36 |     await page.waitForLoadState('networkidle');
   37 |     
   38 |     // Verify all journey options are visible
   39 |     await expect(page.getByText('Investor')).toBeVisible();
   40 |     await expect(page.getByText('Project Owner')).toBeVisible();
   41 |     await expect(page.getByText('DAO Member')).toBeVisible();
   42 |     await expect(page.getByText('Community Member')).toBeVisible();
   43 |     
   44 |     // Verify journey descriptions
   45 |     await expect(page.getByText('Discover and invest in promising blockchain projects')).toBeVisible();
   46 |     await expect(page.getByText('Submit your blockchain project')).toBeVisible();
   47 |     await expect(page.getByText('Acquire governance tokens')).toBeVisible();
   48 |     await expect(page.getByText('Join discussions')).toBeVisible();
   49 |   });
   50 |
   51 |   test('should show how it works section', async ({ page }) => {
   52 |     await page.goto('/onboarding');
   53 |     await page.waitForLoadState('networkidle');
   54 |     
   55 |     // Verify how it works steps are visible
   56 |     await expect(page.getByText('How Open Invest DAO Works')).toBeVisible();
   57 |     await expect(page.getByText('Connect Your Wallet')).toBeVisible();
   58 |     await expect(page.getByText('Complete Verification')).toBeVisible();
   59 |     await expect(page.getByText('Make Initial Contribution')).toBeVisible();
   60 |     await expect(page.getByText('Participate in Governance')).toBeVisible();
   61 |     await expect(page.getByText('Receive Benefits')).toBeVisible();
   62 |   });
   63 |
   64 |   test('should show FAQ section', async ({ page }) => {
   65 |     await page.goto('/onboarding');
   66 |     await page.waitForLoadState('networkidle');
   67 |     
   68 |     // Verify FAQ section is visible
   69 |     await expect(page.getByText('Frequently Asked Questions')).toBeVisible();
   70 |     
   71 |     // Click and verify FAQ content
   72 |     await page.getByText('What is a DAO?').click();
   73 |     await expect(page.getByText('A Decentralized Autonomous Organization')).toBeVisible();
   74 |     
   75 |     await page.getByText('How do governance tokens work?').click();
   76 |     await expect(page.getByText('Governance tokens represent your stake')).toBeVisible();
   77 |   });
   78 |
   79 |   test('should complete onboarding journey as investor', async ({ page }) => {
   80 |     await page.goto('/onboarding');
   81 |     await page.waitForLoadState('networkidle');
   82 |     
   83 |     // Select investor journey
   84 |     await page.waitForSelector('text=Investor');
   85 |     await page.getByText('Investor').click();
   86 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
   87 |     
   88 |     // Complete welcome step
   89 |     await page.waitForSelector('text=Welcome to Open Invest DAO');
   90 |     await expect(page.getByText('Welcome to Open Invest DAO')).toBeVisible();
   91 |     await page.getByRole('button', { name: 'Next' }).click();
   92 |     
   93 |     // Complete choose journey step
   94 |     await page.waitForSelector('text=Choose Your Journey');
   95 |     await expect(page.getByText('Choose Your Journey')).toBeVisible();
   96 |     await page.getByRole('button', { name: 'Next' }).click();
   97 |     
   98 |     // Complete how it works step
   99 |     await page.waitForSelector('text=How Open Invest DAO Works');
  100 |     await expect(page.getByText('How Open Invest DAO Works')).toBeVisible();
  101 |     await page.getByRole('button', { name: 'Next' }).click();
  102 |     
  103 |     // Verify paywall appears
  104 |     await page.waitForSelector('text=Unlock Advanced Investor Features');
  105 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  106 |     await expect(page.getByText('Price: 0.05 ETH')).toBeVisible();
  107 |     
  108 |     // Purchase NFT
  109 |     await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
  110 |     await page.waitForSelector('text=NFT purchased successfully!');
  111 |     await expect(page.getByText('NFT purchased successfully!')).toBeVisible();
  112 |     
  113 |     // Verify subscription timer appears
  114 |     await page.waitForSelector('text=Active Subscription');
  115 |     await expect(page.getByText('Active Subscription')).toBeVisible();
  116 |     await expect(page.getByText('30 days remaining')).toBeVisible();
  117 |   });
```
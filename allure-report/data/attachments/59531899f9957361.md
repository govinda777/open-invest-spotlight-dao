# Test info

- Name: Journey System >> should allow navigation between steps
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:69:3

# Error details

```
Error: locator.click: Test timeout of 120000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Get Started' }).first()

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:11:69
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
   10 |     // Click the "Get Started" button to open the dialog
>  11 |     await page.getByRole('button', { name: 'Get Started' }).first().click();
      |                                                                     ^ Error: locator.click: Test timeout of 120000ms exceeded.
   12 |   });
   13 |
   14 |   test('should navigate through onboarding dialog', async ({ page }) => {
   15 |     // Verify dialog title and description
   16 |     await expect(page.getByRole('heading', { name: /Welcome to Open Invest DAO/ })).toBeVisible();
   17 |     await expect(page.getByText("Let's get you started on your investment journey")).toBeVisible();
   18 |     
   19 |     // Step 1: Choose Journey
   20 |     await expect(page.getByRole('heading', { name: 'Choose Your Journey' })).toBeVisible();
   21 |     await expect(page.getByText('Investor')).toBeVisible();
   22 |     await expect(page.getByText('Project Owner')).toBeVisible();
   23 |     
   24 |     // Click Next
   25 |     await page.getByRole('button', { name: /Next/ }).click();
   26 |     
   27 |     // Step 2: How It Works
   28 |     await expect(page.getByRole('heading', { name: 'How It Works' })).toBeVisible();
   29 |     await expect(page.getByText('Connect Your Wallet')).toBeVisible();
   30 |     await expect(page.getByText('Make Initial Contribution')).toBeVisible();
   31 |     await expect(page.getByText('Participate in Governance')).toBeVisible();
   32 |     
   33 |     // Click Next
   34 |     await page.getByRole('button', { name: /Next/ }).click();
   35 |     
   36 |     // Step 3: Ready to Start
   37 |     await expect(page.getByRole('heading', { name: 'Ready to Start?' })).toBeVisible();
   38 |     await expect(page.getByText("You're now ready to begin your journey")).toBeVisible();
   39 |     
   40 |     // Verify navigation buttons
   41 |     await expect(page.getByRole('button', { name: 'Previous' })).toBeVisible();
   42 |     await expect(page.getByRole('button', { name: 'Get Started' })).toBeVisible();
   43 |   });
   44 |
   45 |   test('should show all user types in popover', async ({ page }) => {
   46 |     // Click to show user types
   47 |     await page.getByRole('button', { name: 'Learn about all user types' }).click();
   48 |     
   49 |     // Verify user types in popover
   50 |     await expect(page.getByText('Investor: Invest in projects')).toBeVisible();
   51 |     await expect(page.getByText('Project Owner: Submit projects')).toBeVisible();
   52 |     await expect(page.getByText('DAO Member: Participate in governance')).toBeVisible();
   53 |     await expect(page.getByText('Community Member: Engage and learn')).toBeVisible();
   54 |   });
   55 |
   56 |   test('should show progress indicators', async ({ page }) => {
   57 |     // Count initial progress dots
   58 |     const progressDots = await page.locator('.h-2.w-2.rounded-full').count();
   59 |     expect(progressDots).toBe(3);
   60 |     
   61 |     // Verify first dot is active
   62 |     await expect(page.locator('.h-2.w-2.rounded-full.bg-purple-600')).toBeVisible();
   63 |     
   64 |     // Click Next and verify second dot becomes active
   65 |     await page.getByRole('button', { name: /Next/ }).click();
   66 |     await expect(page.locator('.h-2.w-2.rounded-full.bg-purple-600')).toBeVisible();
   67 |   });
   68 |
   69 |   test('should allow navigation between steps', async ({ page }) => {
   70 |     // Go to second step
   71 |     await page.getByRole('button', { name: /Next/ }).click();
   72 |     await expect(page.getByRole('heading', { name: 'How It Works' })).toBeVisible();
   73 |     
   74 |     // Go back to first step
   75 |     await page.getByRole('button', { name: 'Previous' }).click();
   76 |     await expect(page.getByRole('heading', { name: 'Choose Your Journey' })).toBeVisible();
   77 |   });
   78 |
   79 |   test('should show all journey options', async ({ page }) => {
   80 |     await page.goto('/onboarding');
   81 |     await page.waitForLoadState('networkidle');
   82 |     
   83 |     // Verify all journey cards are visible
   84 |     const journeyTitles = ['Investor', 'Project Owner', 'DAO Member', 'Community Member'];
   85 |     for (const title of journeyTitles) {
   86 |       await expect(page.getByRole('heading', { name: title })).toBeVisible();
   87 |     }
   88 |     
   89 |     // Verify journey descriptions using more specific selectors
   90 |     await expect(page.getByText('Discover and invest in promising blockchain projects', { exact: true })).toBeVisible();
   91 |     await expect(page.getByText('Submit your blockchain project', { exact: false })).toBeVisible();
   92 |     await expect(page.getByText('Acquire governance tokens', { exact: false })).toBeVisible();
   93 |     await expect(page.getByText('Join discussions', { exact: false })).toBeVisible();
   94 |   });
   95 |
   96 |   test('should show how it works section', async ({ page }) => {
   97 |     await page.goto('/onboarding');
   98 |     await page.waitForLoadState('networkidle');
   99 |     
  100 |     // Verify how it works section using more specific selectors
  101 |     await expect(page.getByRole('heading', { name: 'How Open Invest DAO Works' })).toBeVisible();
  102 |     
  103 |     // Verify steps using more specific selectors
  104 |     const steps = [
  105 |       'Connect Your Wallet',
  106 |       'Complete Verification',
  107 |       'Make Initial Contribution',
  108 |       'Participate in Governance',
  109 |       'Receive Benefits'
  110 |     ];
  111 |     
```
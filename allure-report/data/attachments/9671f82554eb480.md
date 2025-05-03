# Test info

- Name: Journey System >> should show FAQ section
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:72:3

# Error details

```
Error: Timed out 20000ms waiting for expect(locator).toBeVisible()

Locator: getByRole('heading', { name: 'Frequently Asked Questions' })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 20000ms
  - waiting for getByRole('heading', { name: 'Frequently Asked Questions' })

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:77:85
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
   12 |   test('should navigate through onboarding dialog', async ({ page }) => {
   13 |     await page.goto('/');
   14 |     await page.waitForLoadState('networkidle');
   15 |     
   16 |     // Verify dialog title and description
   17 |     await expect(page.getByRole('heading', { name: /Welcome to Open Invest DAO/ })).toBeVisible();
   18 |     await expect(page.getByText("Let's get you started on your investment journey")).toBeVisible();
   19 |     
   20 |     // Step 1: Choose Journey
   21 |     await expect(page.getByRole('heading', { name: 'Choose Your Journey' })).toBeVisible();
   22 |     await expect(page.getByText('Investor')).toBeVisible();
   23 |     await expect(page.getByText('Project Owner')).toBeVisible();
   24 |     
   25 |     // Click Next
   26 |     await page.getByRole('button', { name: /Next/ }).click();
   27 |     
   28 |     // Step 2: How It Works
   29 |     await expect(page.getByRole('heading', { name: 'How It Works' })).toBeVisible();
   30 |     await expect(page.getByText('Connect Your Wallet')).toBeVisible();
   31 |     await expect(page.getByText('Make Initial Contribution')).toBeVisible();
   32 |     await expect(page.getByText('Participate in Governance')).toBeVisible();
   33 |     
   34 |     // Click Next
   35 |     await page.getByRole('button', { name: /Next/ }).click();
   36 |     
   37 |     // Step 3: Ready to Start
   38 |     await expect(page.getByRole('heading', { name: 'Ready to Start?' })).toBeVisible();
   39 |     await expect(page.getByText("You're now ready to begin your journey")).toBeVisible();
   40 |     
   41 |     // Verify navigation buttons
   42 |     await expect(page.getByRole('button', { name: 'Previous' })).toBeVisible();
   43 |     await expect(page.getByRole('button', { name: 'Get Started' })).toBeVisible();
   44 |   });
   45 |
   46 |   test('should show all user types in popover', async ({ page }) => {
   47 |     await page.goto('/');
   48 |     await page.waitForLoadState('networkidle');
   49 |     
   50 |     // Click to show user types
   51 |     await page.getByRole('button', { name: 'Learn about all user types' }).click();
   52 |     
   53 |     // Verify user types in popover
   54 |     await expect(page.getByText('Investor: Invest in projects')).toBeVisible();
   55 |     await expect(page.getByText('Project Owner: Submit projects')).toBeVisible();
   56 |     await expect(page.getByText('DAO Member: Participate in governance')).toBeVisible();
   57 |     await expect(page.getByText('Community Member: Engage and learn')).toBeVisible();
   58 |   });
   59 |
   60 |   test('should show progress indicators', async ({ page }) => {
   61 |     await page.goto('/');
   62 |     await page.waitForLoadState('networkidle');
   63 |     
   64 |     // Count initial progress dots
   65 |     const progressDots = await page.locator('.h-2.w-2.rounded-full').count();
   66 |     expect(progressDots).toBe(3);
   67 |     
   68 |     // Verify first dot is active
   69 |     await expect(page.locator('.h-2.w-2.rounded-full.bg-purple-600')).toBeVisible();
   70 |     
   71 |     // Click Next and verify second dot becomes active
   72 |     await page.getByRole('button', { name: /Next/ }).click();
   73 |     await expect(page.locator('.h-2.w-2.rounded-full.bg-purple-600')).toBeVisible();
   74 |   });
   75 |
   76 |   test('should allow navigation between steps', async ({ page }) => {
>  77 |     await page.goto('/');
      |                          ^ Error: Timed out 20000ms waiting for expect(locator).toBeVisible()
   78 |     await page.waitForLoadState('networkidle');
   79 |     
   80 |     // Go to second step
   81 |     await page.getByRole('button', { name: /Next/ }).click();
   82 |     await expect(page.getByRole('heading', { name: 'How It Works' })).toBeVisible();
   83 |     
   84 |     // Go back to first step
   85 |     await page.getByRole('button', { name: 'Previous' }).click();
   86 |     await expect(page.getByRole('heading', { name: 'Choose Your Journey' })).toBeVisible();
   87 |   });
   88 |
   89 |   test('should show all journey options', async ({ page }) => {
   90 |     await page.goto('/onboarding');
   91 |     await page.waitForLoadState('networkidle');
   92 |     
   93 |     // Verify all journey cards are visible
   94 |     const journeyTitles = ['Investor', 'Project Owner', 'DAO Member', 'Community Member'];
   95 |     for (const title of journeyTitles) {
   96 |       await expect(page.getByRole('heading', { name: title })).toBeVisible();
   97 |     }
   98 |     
   99 |     // Verify journey descriptions using more specific selectors
  100 |     await expect(page.getByText('Discover and invest in promising blockchain projects', { exact: true })).toBeVisible();
  101 |     await expect(page.getByText('Submit your blockchain project', { exact: false })).toBeVisible();
  102 |     await expect(page.getByText('Acquire governance tokens', { exact: false })).toBeVisible();
  103 |     await expect(page.getByText('Join discussions', { exact: false })).toBeVisible();
  104 |   });
  105 |
  106 |   test('should show how it works section', async ({ page }) => {
  107 |     await page.goto('/onboarding');
  108 |     await page.waitForLoadState('networkidle');
  109 |     
  110 |     // Verify how it works section using more specific selectors
  111 |     await expect(page.getByRole('heading', { name: 'How Open Invest DAO Works' })).toBeVisible();
  112 |     
  113 |     // Verify steps using more specific selectors
  114 |     const steps = [
  115 |       'Connect Your Wallet',
  116 |       'Complete Verification',
  117 |       'Make Initial Contribution',
  118 |       'Participate in Governance',
  119 |       'Receive Benefits'
  120 |     ];
  121 |     
  122 |     for (const step of steps) {
  123 |       await expect(page.getByRole('heading', { name: step, exact: true })).toBeVisible();
  124 |     }
  125 |   });
  126 |
  127 |   test('should show FAQ section', async ({ page }) => {
  128 |     await page.goto('/onboarding');
  129 |     await page.waitForLoadState('networkidle');
  130 |     
  131 |     // Verify FAQ section using more specific selectors
  132 |     await expect(page.getByRole('heading', { name: 'Frequently Asked Questions' })).toBeVisible();
  133 |     
  134 |     // Click and verify FAQ content using more specific selectors
  135 |     const whatIsDao = page.getByRole('button', { name: 'What is a DAO?' });
  136 |     await whatIsDao.click();
  137 |     await expect(page.getByText('A Decentralized Autonomous Organization', { exact: false })).toBeVisible();
  138 |     
  139 |     const governanceTokens = page.getByRole('button', { name: 'How do governance tokens work?' });
  140 |     await governanceTokens.click();
  141 |     await expect(page.getByText('Governance tokens represent your stake', { exact: false })).toBeVisible();
  142 |   });
  143 |
  144 |   test('should complete onboarding journey as investor', async ({ page }) => {
  145 |     await page.goto('/onboarding');
  146 |     await page.waitForLoadState('networkidle');
  147 |     
  148 |     // Select investor journey
  149 |     await page.waitForSelector('text=Investor');
  150 |     await page.getByText('Investor').click();
  151 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
  152 |     
  153 |     // Complete welcome step
  154 |     await page.waitForSelector('text=Welcome to Open Invest DAO');
  155 |     await expect(page.getByText('Welcome to Open Invest DAO')).toBeVisible();
  156 |     await page.getByRole('button', { name: 'Next' }).click();
  157 |     
  158 |     // Complete choose journey step
  159 |     await page.waitForSelector('text=Choose Your Journey');
  160 |     await expect(page.getByText('Choose Your Journey')).toBeVisible();
  161 |     await page.getByRole('button', { name: 'Next' }).click();
  162 |     
  163 |     // Complete how it works step
  164 |     await page.waitForSelector('text=How Open Invest DAO Works');
  165 |     await expect(page.getByText('How Open Invest DAO Works')).toBeVisible();
  166 |     await page.getByRole('button', { name: 'Next' }).click();
  167 |     
  168 |     // Verify paywall appears
  169 |     await page.waitForSelector('text=Unlock Advanced Investor Features');
  170 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  171 |     await expect(page.getByText('Price: 0.05 ETH')).toBeVisible();
  172 |     
  173 |     // Purchase NFT
  174 |     await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
  175 |     await page.waitForSelector('text=NFT purchased successfully!');
  176 |     await expect(page.getByText('NFT purchased successfully!')).toBeVisible();
  177 |     
```
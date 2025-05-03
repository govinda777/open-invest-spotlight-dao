# Test info

- Name: Journey System >> should show FAQ section
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:121:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByRole('heading', { name: 'Frequently Asked Questions' })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Frequently Asked Questions' })

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:126:85
```

# Page snapshot

```yaml
- region "Notifications (F8)":
  - list
- main:
  - navigation:
    - img "Logo"
    - text: Open Invest DAO
    - link "Back to Home":
      - /url: /
      - button "Back to Home"
  - main:
    - heading "Getting Started" [level=1]
    - paragraph: Follow this guide to start your journey with Open Invest DAO
    - text: "1"
    - heading "Welcome to Open Invest DAO" [level=2]
    - paragraph: Open Invest DAO is a decentralized platform that enables collaborative investment in innovative blockchain projects.
    - img "Open Invest DAO Logo"
    - paragraph: This onboarding guide will help you understand how to get started and make the most of our platform.
    - button "Previous" [disabled]
    - button "Next"
    - button "Go to step 1"
    - button "Go to step 2"
    - button "Go to step 3"
    - button "Go to step 4"
    - button "Go to step 5"
```

# Test source

```ts
   26 |     await expect(page.getByText('Project Owner')).toBeVisible();
   27 |     
   28 |     // Click Next
   29 |     await page.getByRole('button', { name: /Next/ }).click();
   30 |     
   31 |     // Step 2: How It Works
   32 |     await expect(page.getByRole('heading', { name: 'How It Works' })).toBeVisible();
   33 |     await expect(page.getByText('Connect Your Wallet')).toBeVisible();
   34 |     await expect(page.getByText('Make Initial Contribution')).toBeVisible();
   35 |     await expect(page.getByText('Participate in Governance')).toBeVisible();
   36 |     
   37 |     // Click Next
   38 |     await page.getByRole('button', { name: /Next/ }).click();
   39 |     
   40 |     // Step 3: Ready to Start
   41 |     await expect(page.getByRole('heading', { name: 'Ready to Start?' })).toBeVisible();
   42 |     await expect(page.getByText("You're now ready to begin your journey")).toBeVisible();
   43 |     
   44 |     // Verify navigation buttons
   45 |     await expect(page.getByRole('button', { name: 'Previous' })).toBeVisible();
   46 |     await expect(page.getByRole('button', { name: 'Get Started' })).toBeVisible();
   47 |   });
   48 |
   49 |   test('should show all user types in popover', async ({ page }) => {
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
   61 |     // Count initial progress dots
   62 |     const progressDots = await page.locator('.h-2.w-2.rounded-full').count();
   63 |     expect(progressDots).toBe(3);
   64 |     
   65 |     // Verify first dot is active
   66 |     await expect(page.locator('.h-2.w-2.rounded-full.bg-purple-600')).toBeVisible();
   67 |     
   68 |     // Click Next and verify second dot becomes active
   69 |     await page.getByRole('button', { name: /Next/ }).click();
   70 |     await expect(page.locator('.h-2.w-2.rounded-full.bg-purple-600')).toBeVisible();
   71 |   });
   72 |
   73 |   test('should allow navigation between steps', async ({ page }) => {
   74 |     // Go to second step
   75 |     await page.getByRole('button', { name: /Next/ }).click();
   76 |     await expect(page.getByRole('heading', { name: 'How It Works' })).toBeVisible();
   77 |     
   78 |     // Go back to first step
   79 |     await page.getByRole('button', { name: 'Previous' }).click();
   80 |     await expect(page.getByRole('heading', { name: 'Choose Your Journey' })).toBeVisible();
   81 |   });
   82 |
   83 |   test('should show all journey options', async ({ page }) => {
   84 |     await page.goto('/onboarding');
   85 |     await page.waitForLoadState('networkidle');
   86 |     
   87 |     // Verify all journey cards are visible
   88 |     const journeyTitles = ['Investor', 'Project Owner', 'DAO Member', 'Community Member'];
   89 |     for (const title of journeyTitles) {
   90 |       await expect(page.getByRole('heading', { name: title })).toBeVisible();
   91 |     }
   92 |     
   93 |     // Verify journey descriptions using more specific selectors
   94 |     await expect(page.getByText('Discover and invest in promising blockchain projects', { exact: true })).toBeVisible();
   95 |     await expect(page.getByText('Submit your blockchain project', { exact: false })).toBeVisible();
   96 |     await expect(page.getByText('Acquire governance tokens', { exact: false })).toBeVisible();
   97 |     await expect(page.getByText('Join discussions', { exact: false })).toBeVisible();
   98 |   });
   99 |
  100 |   test('should show how it works section', async ({ page }) => {
  101 |     await page.goto('/onboarding');
  102 |     await page.waitForLoadState('networkidle');
  103 |     
  104 |     // Verify how it works section using more specific selectors
  105 |     await expect(page.getByRole('heading', { name: 'How Open Invest DAO Works' })).toBeVisible();
  106 |     
  107 |     // Verify steps using more specific selectors
  108 |     const steps = [
  109 |       'Connect Your Wallet',
  110 |       'Complete Verification',
  111 |       'Make Initial Contribution',
  112 |       'Participate in Governance',
  113 |       'Receive Benefits'
  114 |     ];
  115 |     
  116 |     for (const step of steps) {
  117 |       await expect(page.getByRole('heading', { name: step, exact: true })).toBeVisible();
  118 |     }
  119 |   });
  120 |
  121 |   test('should show FAQ section', async ({ page }) => {
  122 |     await page.goto('/onboarding');
  123 |     await page.waitForLoadState('networkidle');
  124 |     
  125 |     // Verify FAQ section using more specific selectors
> 126 |     await expect(page.getByRole('heading', { name: 'Frequently Asked Questions' })).toBeVisible();
      |                                                                                     ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  127 |     
  128 |     // Click and verify FAQ content using more specific selectors
  129 |     const whatIsDao = page.getByRole('button', { name: 'What is a DAO?' });
  130 |     await whatIsDao.click();
  131 |     await expect(page.getByText('A Decentralized Autonomous Organization', { exact: false })).toBeVisible();
  132 |     
  133 |     const governanceTokens = page.getByRole('button', { name: 'How do governance tokens work?' });
  134 |     await governanceTokens.click();
  135 |     await expect(page.getByText('Governance tokens represent your stake', { exact: false })).toBeVisible();
  136 |   });
  137 |
  138 |   test('should complete onboarding journey as investor', async ({ page }) => {
  139 |     await page.goto('/onboarding');
  140 |     await page.waitForLoadState('networkidle');
  141 |     
  142 |     // Select investor journey
  143 |     await page.waitForSelector('text=Investor');
  144 |     await page.getByText('Investor').click();
  145 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
  146 |     
  147 |     // Complete welcome step
  148 |     await page.waitForSelector('text=Welcome to Open Invest DAO');
  149 |     await expect(page.getByText('Welcome to Open Invest DAO')).toBeVisible();
  150 |     await page.getByRole('button', { name: 'Next' }).click();
  151 |     
  152 |     // Complete choose journey step
  153 |     await page.waitForSelector('text=Choose Your Journey');
  154 |     await expect(page.getByText('Choose Your Journey')).toBeVisible();
  155 |     await page.getByRole('button', { name: 'Next' }).click();
  156 |     
  157 |     // Complete how it works step
  158 |     await page.waitForSelector('text=How Open Invest DAO Works');
  159 |     await expect(page.getByText('How Open Invest DAO Works')).toBeVisible();
  160 |     await page.getByRole('button', { name: 'Next' }).click();
  161 |     
  162 |     // Verify paywall appears
  163 |     await page.waitForSelector('text=Unlock Advanced Investor Features');
  164 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  165 |     await expect(page.getByText('Price: 0.05 ETH')).toBeVisible();
  166 |     
  167 |     // Purchase NFT
  168 |     await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
  169 |     await page.waitForSelector('text=NFT purchased successfully!');
  170 |     await expect(page.getByText('NFT purchased successfully!')).toBeVisible();
  171 |     
  172 |     // Verify subscription timer appears
  173 |     await page.waitForSelector('text=Active Subscription');
  174 |     await expect(page.getByText('Active Subscription')).toBeVisible();
  175 |     await expect(page.getByText('30 days remaining')).toBeVisible();
  176 |   });
  177 |
  178 |   test('should block access to final step without NFT purchase', async ({ page }) => {
  179 |     await page.goto('/onboarding');
  180 |     await page.waitForLoadState('networkidle');
  181 |     
  182 |     // Select investor journey
  183 |     await page.waitForSelector('text=Investor');
  184 |     await page.getByText('Investor').click();
  185 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
  186 |     
  187 |     // Complete all steps except paywall
  188 |     await page.waitForSelector('button:has-text("Next")');
  189 |     await page.getByRole('button', { name: 'Next' }).click();
  190 |     await page.getByRole('button', { name: 'Next' }).click();
  191 |     await page.getByRole('button', { name: 'Next' }).click();
  192 |     
  193 |     // Verify paywall appears and final step is not visible
  194 |     await page.waitForSelector('text=Unlock Advanced Investor Features');
  195 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  196 |     await expect(page.getByText('Next Steps')).not.toBeVisible();
  197 |   });
  198 |
  199 |   test('should show correct progress percentage', async ({ page }) => {
  200 |     await page.goto('/onboarding');
  201 |     await page.waitForLoadState('networkidle');
  202 |     
  203 |     // Select investor journey
  204 |     await page.waitForSelector('text=Investor');
  205 |     await page.getByText('Investor').click();
  206 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
  207 |     
  208 |     // Verify initial progress
  209 |     await page.waitForSelector('text=0%');
  210 |     await expect(page.getByText('0%')).toBeVisible();
  211 |     
  212 |     // Complete first step
  213 |     await page.getByRole('button', { name: 'Next' }).click();
  214 |     await page.waitForSelector('text=25%');
  215 |     await expect(page.getByText('25%')).toBeVisible();
  216 |     
  217 |     // Complete second step
  218 |     await page.getByRole('button', { name: 'Next' }).click();
  219 |     await page.waitForSelector('text=50%');
  220 |     await expect(page.getByText('50%')).toBeVisible();
  221 |   });
  222 |
  223 |   test('should handle subscription expiration', async ({ page }) => {
  224 |     await page.goto('/onboarding');
  225 |     await page.waitForLoadState('networkidle');
  226 |     
```
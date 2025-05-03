# Test info

- Name: Journey System >> should block access to final step without NFT purchase
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:129:3

# Error details

```
Error: locator.click: Test timeout of 120000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Begin Investor Journey' })

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:136:72
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
   77 |     await page.goto('/');
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
> 136 |     await whatIsDao.click();
      |                             ^ Error: locator.click: Test timeout of 120000ms exceeded.
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
  178 |     // Verify subscription timer appears
  179 |     await page.waitForSelector('text=Active Subscription');
  180 |     await expect(page.getByText('Active Subscription')).toBeVisible();
  181 |     await expect(page.getByText('30 days remaining')).toBeVisible();
  182 |   });
  183 |
  184 |   test('should block access to final step without NFT purchase', async ({ page }) => {
  185 |     await page.goto('/onboarding');
  186 |     await page.waitForLoadState('networkidle');
  187 |     
  188 |     // Select investor journey
  189 |     await page.waitForSelector('text=Investor');
  190 |     await page.getByText('Investor').click();
  191 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
  192 |     
  193 |     // Complete all steps except paywall
  194 |     await page.waitForSelector('button:has-text("Next")');
  195 |     await page.getByRole('button', { name: 'Next' }).click();
  196 |     await page.getByRole('button', { name: 'Next' }).click();
  197 |     await page.getByRole('button', { name: 'Next' }).click();
  198 |     
  199 |     // Verify paywall appears and final step is not visible
  200 |     await page.waitForSelector('text=Unlock Advanced Investor Features');
  201 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  202 |     await expect(page.getByText('Next Steps')).not.toBeVisible();
  203 |   });
  204 |
  205 |   test('should show correct progress percentage', async ({ page }) => {
  206 |     await page.goto('/onboarding');
  207 |     await page.waitForLoadState('networkidle');
  208 |     
  209 |     // Select investor journey
  210 |     await page.waitForSelector('text=Investor');
  211 |     await page.getByText('Investor').click();
  212 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
  213 |     
  214 |     // Verify initial progress
  215 |     await page.waitForSelector('text=0%');
  216 |     await expect(page.getByText('0%')).toBeVisible();
  217 |     
  218 |     // Complete first step
  219 |     await page.getByRole('button', { name: 'Next' }).click();
  220 |     await page.waitForSelector('text=25%');
  221 |     await expect(page.getByText('25%')).toBeVisible();
  222 |     
  223 |     // Complete second step
  224 |     await page.getByRole('button', { name: 'Next' }).click();
  225 |     await page.waitForSelector('text=50%');
  226 |     await expect(page.getByText('50%')).toBeVisible();
  227 |   });
  228 |
  229 |   test('should handle subscription expiration', async ({ page }) => {
  230 |     await page.goto('/onboarding');
  231 |     await page.waitForLoadState('networkidle');
  232 |     
  233 |     // Select investor journey
  234 |     await page.waitForSelector('text=Investor');
  235 |     await page.getByText('Investor').click();
  236 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
```
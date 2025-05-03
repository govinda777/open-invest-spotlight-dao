# Test info

- Name: Journey System >> should block access to final step without NFT purchase
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:131:3

# Error details

```
Error: page.waitForSelector: Test timeout of 15000ms exceeded.
Call log:
  - waiting for locator('text=Investor') to be visible

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:136:16
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
   36 |
   37 |   test('should show progress indicators', async ({ page }) => {
   38 |     const progressDots = await page.locator('.h-2.w-2.rounded-full').count();
   39 |     expect(progressDots).toBe(3);
   40 |     await page.getByRole('button', { name: /Next/ }).click({ timeout: 3000 });
   41 |   });
   42 |
   43 |   test('should allow navigation between steps', async ({ page }) => {
   44 |     await page.getByRole('button', { name: /Next/ }).click({ timeout: 3000 });
   45 |     await page.getByRole('button', { name: 'Previous' }).click({ timeout: 3000 });
   46 |   });
   47 |
   48 |   test('should show all journey options', async ({ page }) => {
   49 |     await page.goto('/onboarding', { waitUntil: 'commit' });
   50 |     await expect(page.getByRole('heading', { name: 'Investor' })).toBeVisible({ timeout: 3000 });
   51 |   });
   52 |
   53 |   test('should show how it works section', async ({ page }) => {
   54 |     await page.goto('/onboarding');
   55 |     await page.waitForLoadState('networkidle');
   56 |     
   57 |     // Verify how it works section using more specific selectors
   58 |     await expect(page.getByRole('heading', { name: 'How Open Invest DAO Works' })).toBeVisible();
   59 |     
   60 |     // Verify steps using more specific selectors
   61 |     const steps = [
   62 |       'Connect Your Wallet',
   63 |       'Complete Verification',
   64 |       'Make Initial Contribution',
   65 |       'Participate in Governance',
   66 |       'Receive Benefits'
   67 |     ];
   68 |     
   69 |     for (const step of steps) {
   70 |       await expect(page.getByRole('heading', { name: step, exact: true })).toBeVisible();
   71 |     }
   72 |   });
   73 |
   74 |   test('should show FAQ section', async ({ page }) => {
   75 |     await page.goto('/onboarding');
   76 |     await page.waitForLoadState('networkidle');
   77 |     
   78 |     // Verify FAQ section using more specific selectors
   79 |     await expect(page.getByRole('heading', { name: 'Frequently Asked Questions' })).toBeVisible();
   80 |     
   81 |     // Click and verify FAQ content using more specific selectors
   82 |     const whatIsDao = page.getByRole('button', { name: 'What is a DAO?' });
   83 |     await whatIsDao.click();
   84 |     await expect(page.getByText('A Decentralized Autonomous Organization', { exact: false })).toBeVisible();
   85 |     
   86 |     const governanceTokens = page.getByRole('button', { name: 'How do governance tokens work?' });
   87 |     await governanceTokens.click();
   88 |     await expect(page.getByText('Governance tokens represent your stake', { exact: false })).toBeVisible();
   89 |   });
   90 |
   91 |   test('should complete onboarding journey as investor', async ({ page }) => {
   92 |     await page.goto('/onboarding');
   93 |     await page.waitForLoadState('networkidle');
   94 |     
   95 |     // Select investor journey
   96 |     await page.waitForSelector('text=Investor');
   97 |     await page.getByText('Investor').click();
   98 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
   99 |     
  100 |     // Complete welcome step
  101 |     await page.waitForSelector('text=Welcome to Open Invest DAO');
  102 |     await expect(page.getByText('Welcome to Open Invest DAO')).toBeVisible();
  103 |     await page.getByRole('button', { name: 'Next' }).click();
  104 |     
  105 |     // Complete choose journey step
  106 |     await page.waitForSelector('text=Choose Your Journey');
  107 |     await expect(page.getByText('Choose Your Journey')).toBeVisible();
  108 |     await page.getByRole('button', { name: 'Next' }).click();
  109 |     
  110 |     // Complete how it works step
  111 |     await page.waitForSelector('text=How Open Invest DAO Works');
  112 |     await expect(page.getByText('How Open Invest DAO Works')).toBeVisible();
  113 |     await page.getByRole('button', { name: 'Next' }).click();
  114 |     
  115 |     // Verify paywall appears
  116 |     await page.waitForSelector('text=Unlock Advanced Investor Features');
  117 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  118 |     await expect(page.getByText('Price: 0.05 ETH')).toBeVisible();
  119 |     
  120 |     // Purchase NFT
  121 |     await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
  122 |     await page.waitForSelector('text=NFT purchased successfully!');
  123 |     await expect(page.getByText('NFT purchased successfully!')).toBeVisible();
  124 |     
  125 |     // Verify subscription timer appears
  126 |     await page.waitForSelector('text=Active Subscription');
  127 |     await expect(page.getByText('Active Subscription')).toBeVisible();
  128 |     await expect(page.getByText('30 days remaining')).toBeVisible();
  129 |   });
  130 |
  131 |   test('should block access to final step without NFT purchase', async ({ page }) => {
  132 |     await page.goto('/onboarding');
  133 |     await page.waitForLoadState('networkidle');
  134 |     
  135 |     // Select investor journey
> 136 |     await page.waitForSelector('text=Investor');
      |                ^ Error: page.waitForSelector: Test timeout of 15000ms exceeded.
  137 |     await page.getByText('Investor').click();
  138 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
  139 |     
  140 |     // Complete all steps except paywall
  141 |     await page.waitForSelector('button:has-text("Next")');
  142 |     await page.getByRole('button', { name: 'Next' }).click();
  143 |     await page.getByRole('button', { name: 'Next' }).click();
  144 |     await page.getByRole('button', { name: 'Next' }).click();
  145 |     
  146 |     // Verify paywall appears and final step is not visible
  147 |     await page.waitForSelector('text=Unlock Advanced Investor Features');
  148 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  149 |     await expect(page.getByText('Next Steps')).not.toBeVisible();
  150 |   });
  151 |
  152 |   test('should show correct progress percentage', async ({ page }) => {
  153 |     await page.goto('/onboarding');
  154 |     await page.waitForLoadState('networkidle');
  155 |     
  156 |     // Select investor journey
  157 |     await page.waitForSelector('text=Investor');
  158 |     await page.getByText('Investor').click();
  159 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
  160 |     
  161 |     // Verify initial progress
  162 |     await page.waitForSelector('text=0%');
  163 |     await expect(page.getByText('0%')).toBeVisible();
  164 |     
  165 |     // Complete first step
  166 |     await page.getByRole('button', { name: 'Next' }).click();
  167 |     await page.waitForSelector('text=25%');
  168 |     await expect(page.getByText('25%')).toBeVisible();
  169 |     
  170 |     // Complete second step
  171 |     await page.getByRole('button', { name: 'Next' }).click();
  172 |     await page.waitForSelector('text=50%');
  173 |     await expect(page.getByText('50%')).toBeVisible();
  174 |   });
  175 |
  176 |   test('should handle subscription expiration', async ({ page }) => {
  177 |     await page.goto('/onboarding');
  178 |     await page.waitForLoadState('networkidle');
  179 |     
  180 |     // Select investor journey
  181 |     await page.waitForSelector('text=Investor');
  182 |     await page.getByText('Investor').click();
  183 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
  184 |     
  185 |     // Complete all steps
  186 |     await page.waitForSelector('button:has-text("Next")');
  187 |     await page.getByRole('button', { name: 'Next' }).click();
  188 |     await page.getByRole('button', { name: 'Next' }).click();
  189 |     await page.getByRole('button', { name: 'Next' }).click();
  190 |     
  191 |     // Purchase NFT
  192 |     await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
  193 |     
  194 |     // Set purchase date to 31 days ago
  195 |     await page.evaluate(() => {
  196 |       const purchaseDate = new Date();
  197 |       purchaseDate.setDate(purchaseDate.getDate() - 31);
  198 |       localStorage.setItem('onboardingNftPurchaseDate', purchaseDate.toISOString());
  199 |     });
  200 |     
  201 |     // Refresh page
  202 |     await page.reload();
  203 |     await page.waitForLoadState('networkidle');
  204 |     
  205 |     // Verify subscription timer is gone and paywall reappears
  206 |     await page.waitForSelector('text=Unlock Advanced Investor Features');
  207 |     await expect(page.getByText('Active Subscription')).not.toBeVisible();
  208 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  209 |   });
  210 |
  211 |   test('should support different user types', async ({ page }) => {
  212 |     await page.goto('/onboarding');
  213 |     await page.waitForLoadState('networkidle');
  214 |     
  215 |     // Test Project Owner journey
  216 |     await page.waitForSelector('text=Project Owner');
  217 |     await page.getByText('Project Owner').click();
  218 |     await page.getByRole('button', { name: 'Begin Project Owner Journey' }).click();
  219 |     await page.waitForSelector('text=Unlock Advanced Project Owner Features');
  220 |     await expect(page.getByText('Unlock Advanced Project Owner Features')).toBeVisible();
  221 |     
  222 |     // Test DAO Member journey
  223 |     await page.goto('/onboarding');
  224 |     await page.waitForLoadState('networkidle');
  225 |     await page.waitForSelector('text=DAO Member');
  226 |     await page.getByText('DAO Member').click();
  227 |     await page.getByRole('button', { name: 'Begin DAO Member Journey' }).click();
  228 |     await page.waitForSelector('text=Unlock Advanced DAO Member Features');
  229 |     await expect(page.getByText('Unlock Advanced DAO Member Features')).toBeVisible();
  230 |     
  231 |     // Test Community Member journey
  232 |     await page.goto('/onboarding');
  233 |     await page.waitForLoadState('networkidle');
  234 |     await page.waitForSelector('text=Community Member');
  235 |     await page.getByText('Community Member').click();
  236 |     await page.getByRole('button', { name: 'Begin Community Member Journey' }).click();
```
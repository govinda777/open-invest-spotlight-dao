# Test info

- Name: Journey System >> should show correct progress percentage
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:199:3

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('text=Investor') to be visible

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:204:16
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
  126 |     await expect(page.getByRole('heading', { name: 'Frequently Asked Questions' })).toBeVisible();
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
> 204 |     await page.waitForSelector('text=Investor');
      |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
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
  227 |     // Select investor journey
  228 |     await page.waitForSelector('text=Investor');
  229 |     await page.getByText('Investor').click();
  230 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
  231 |     
  232 |     // Complete all steps
  233 |     await page.waitForSelector('button:has-text("Next")');
  234 |     await page.getByRole('button', { name: 'Next' }).click();
  235 |     await page.getByRole('button', { name: 'Next' }).click();
  236 |     await page.getByRole('button', { name: 'Next' }).click();
  237 |     
  238 |     // Purchase NFT
  239 |     await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
  240 |     
  241 |     // Set purchase date to 31 days ago
  242 |     await page.evaluate(() => {
  243 |       const purchaseDate = new Date();
  244 |       purchaseDate.setDate(purchaseDate.getDate() - 31);
  245 |       localStorage.setItem('onboardingNftPurchaseDate', purchaseDate.toISOString());
  246 |     });
  247 |     
  248 |     // Refresh page
  249 |     await page.reload();
  250 |     await page.waitForLoadState('networkidle');
  251 |     
  252 |     // Verify subscription timer is gone and paywall reappears
  253 |     await page.waitForSelector('text=Unlock Advanced Investor Features');
  254 |     await expect(page.getByText('Active Subscription')).not.toBeVisible();
  255 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  256 |   });
  257 |
  258 |   test('should support different user types', async ({ page }) => {
  259 |     await page.goto('/onboarding');
  260 |     await page.waitForLoadState('networkidle');
  261 |     
  262 |     // Test Project Owner journey
  263 |     await page.waitForSelector('text=Project Owner');
  264 |     await page.getByText('Project Owner').click();
  265 |     await page.getByRole('button', { name: 'Begin Project Owner Journey' }).click();
  266 |     await page.waitForSelector('text=Unlock Advanced Project Owner Features');
  267 |     await expect(page.getByText('Unlock Advanced Project Owner Features')).toBeVisible();
  268 |     
  269 |     // Test DAO Member journey
  270 |     await page.goto('/onboarding');
  271 |     await page.waitForLoadState('networkidle');
  272 |     await page.waitForSelector('text=DAO Member');
  273 |     await page.getByText('DAO Member').click();
  274 |     await page.getByRole('button', { name: 'Begin DAO Member Journey' }).click();
  275 |     await page.waitForSelector('text=Unlock Advanced DAO Member Features');
  276 |     await expect(page.getByText('Unlock Advanced DAO Member Features')).toBeVisible();
  277 |     
  278 |     // Test Community Member journey
  279 |     await page.goto('/onboarding');
  280 |     await page.waitForLoadState('networkidle');
  281 |     await page.waitForSelector('text=Community Member');
  282 |     await page.getByText('Community Member').click();
  283 |     await page.getByRole('button', { name: 'Begin Community Member Journey' }).click();
  284 |     await page.waitForSelector('text=Unlock Advanced Community Member Features');
  285 |     await expect(page.getByText('Unlock Advanced Community Member Features')).toBeVisible();
  286 |   });
  287 | }); 
```
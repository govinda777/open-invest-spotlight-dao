# Test info

- Name: Journey System >> should handle subscription expiration
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:154:3

# Error details

```
Error: locator.click: Test timeout of 10000ms exceeded.
Call log:
  - waiting for getByText('Investor')

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:158:38
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
   58 |       'Connect Your Wallet',
   59 |       'Complete Verification',
   60 |       'Make Initial Contribution',
   61 |       'Participate in Governance',
   62 |       'Receive Benefits'
   63 |     ];
   64 |     
   65 |     for (const step of steps) {
   66 |       await expect(page.getByRole('heading', { name: step, exact: true })).toBeVisible();
   67 |     }
   68 |   });
   69 |
   70 |   test('should show FAQ section', async ({ page }) => {
   71 |     await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
   72 |     
   73 |     // Verify FAQ section using more specific selectors
   74 |     await expect(page.getByRole('heading', { name: 'Frequently Asked Questions' })).toBeVisible();
   75 |     
   76 |     // Click and verify FAQ content using more specific selectors
   77 |     const whatIsDao = page.getByRole('button', { name: 'What is a DAO?' });
   78 |     await whatIsDao.click();
   79 |     await expect(page.getByText('A Decentralized Autonomous Organization', { exact: false })).toBeVisible();
   80 |     
   81 |     const governanceTokens = page.getByRole('button', { name: 'How do governance tokens work?' });
   82 |     await governanceTokens.click();
   83 |     await expect(page.getByText('Governance tokens represent your stake', { exact: false })).toBeVisible();
   84 |   });
   85 |
   86 |   test('should complete onboarding journey as investor', async ({ page }) => {
   87 |     await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
   88 |     
   89 |     // Select investor journey
   90 |     await page.getByText('Investor').click();
   91 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
   92 |     
   93 |     // Complete welcome step
   94 |     await expect(page.getByText('Welcome to Open Invest DAO')).toBeVisible();
   95 |     await page.getByRole('button', { name: 'Next' }).click();
   96 |     
   97 |     // Complete choose journey step
   98 |     await expect(page.getByText('Choose Your Journey')).toBeVisible();
   99 |     await page.getByRole('button', { name: 'Next' }).click();
  100 |     
  101 |     // Complete how it works step
  102 |     await expect(page.getByText('How Open Invest DAO Works')).toBeVisible();
  103 |     await page.getByRole('button', { name: 'Next' }).click();
  104 |     
  105 |     // Verify paywall appears
  106 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  107 |     await expect(page.getByText('Price: 0.05 ETH')).toBeVisible();
  108 |     
  109 |     // Purchase NFT
  110 |     await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
  111 |     await expect(page.getByText('NFT purchased successfully!')).toBeVisible();
  112 |     
  113 |     // Verify subscription timer appears
  114 |     await expect(page.getByText('Active Subscription')).toBeVisible();
  115 |     await expect(page.getByText('30 days remaining')).toBeVisible();
  116 |   });
  117 |
  118 |   test('should block access to final step without NFT purchase', async ({ page }) => {
  119 |     await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
  120 |     
  121 |     // Select investor journey
  122 |     await page.getByText('Investor').click();
  123 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
  124 |     
  125 |     // Complete all steps except paywall
  126 |     await page.getByRole('button', { name: 'Next' }).click();
  127 |     await page.getByRole('button', { name: 'Next' }).click();
  128 |     await page.getByRole('button', { name: 'Next' }).click();
  129 |     
  130 |     // Verify paywall appears and final step is not visible
  131 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  132 |     await expect(page.getByText('Next Steps')).not.toBeVisible();
  133 |   });
  134 |
  135 |   test('should show correct progress percentage', async ({ page }) => {
  136 |     await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
  137 |     
  138 |     // Select investor journey
  139 |     await page.getByText('Investor').click();
  140 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
  141 |     
  142 |     // Verify initial progress
  143 |     await expect(page.getByText('0%')).toBeVisible();
  144 |     
  145 |     // Complete first step
  146 |     await page.getByRole('button', { name: 'Next' }).click();
  147 |     await expect(page.getByText('25%')).toBeVisible();
  148 |     
  149 |     // Complete second step
  150 |     await page.getByRole('button', { name: 'Next' }).click();
  151 |     await expect(page.getByText('50%')).toBeVisible();
  152 |   });
  153 |
  154 |   test('should handle subscription expiration', async ({ page }) => {
  155 |     await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
  156 |     
  157 |     // Select investor journey
> 158 |     await page.getByText('Investor').click();
      |                                      ^ Error: locator.click: Test timeout of 10000ms exceeded.
  159 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
  160 |     
  161 |     // Complete all steps
  162 |     await page.getByRole('button', { name: 'Next' }).click();
  163 |     await page.getByRole('button', { name: 'Next' }).click();
  164 |     await page.getByRole('button', { name: 'Next' }).click();
  165 |     
  166 |     // Purchase NFT
  167 |     await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
  168 |     
  169 |     // Set purchase date to 31 days ago
  170 |     await page.evaluate(() => {
  171 |       const purchaseDate = new Date();
  172 |       purchaseDate.setDate(purchaseDate.getDate() - 31);
  173 |       localStorage.setItem('onboardingNftPurchaseDate', purchaseDate.toISOString());
  174 |     });
  175 |     
  176 |     // Refresh page
  177 |     await page.reload({ waitUntil: 'domcontentloaded' });
  178 |     
  179 |     // Verify subscription timer is gone and paywall reappears
  180 |     await expect(page.getByText('Active Subscription')).not.toBeVisible();
  181 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  182 |   });
  183 |
  184 |   test('should support different user types', async ({ page }) => {
  185 |     await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
  186 |     
  187 |     // Test Project Owner journey
  188 |     await page.getByText('Project Owner').click();
  189 |     await page.getByRole('button', { name: 'Begin Project Owner Journey' }).click();
  190 |     await expect(page.getByText('Unlock Advanced Project Owner Features')).toBeVisible();
  191 |     
  192 |     // Test DAO Member journey
  193 |     await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
  194 |     await page.getByText('DAO Member').click();
  195 |     await page.getByRole('button', { name: 'Begin DAO Member Journey' }).click();
  196 |     await expect(page.getByText('Unlock Advanced DAO Member Features')).toBeVisible();
  197 |     
  198 |     // Test Community Member journey
  199 |     await page.goto('/onboarding', { waitUntil: 'domcontentloaded' });
  200 |     await page.getByText('Community Member').click();
  201 |     await page.getByRole('button', { name: 'Begin Community Member Journey' }).click();
  202 |     await expect(page.getByText('Unlock Advanced Community Member Features')).toBeVisible();
  203 |   });
  204 | }); 
```
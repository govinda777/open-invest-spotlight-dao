# Test info

- Name: Journey System >> should show correct progress percentage
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:123:3

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('heading', { name: 'Investor' })

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:127:59
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
   27 |     
   28 |     // Step 3: Ready to Start
   29 |     await expect(page.getByRole('button', { name: 'Get Started' })).toBeVisible();
   30 |   });
   31 |
   32 |   test('should show all user types in popover', async ({ page }) => {
   33 |     await page.getByRole('button', { name: 'Learn about all user types' }).click();
   34 |     await expect(page.getByText('Investor: Invest in projects')).toBeVisible();
   35 |   });
   36 |
   37 |   test('should show progress indicators', async ({ page }) => {
   38 |     const progressDots = await page.locator('.h-2.w-2.rounded-full').count();
   39 |     expect(progressDots).toBe(3);
   40 |     await page.getByRole('button', { name: 'Next' }).click();
   41 |   });
   42 |
   43 |   test('should allow navigation between steps', async ({ page }) => {
   44 |     await page.getByRole('button', { name: 'Next' }).click();
   45 |     await page.getByRole('button', { name: 'Previous' }).click();
   46 |   });
   47 |
   48 |   test('should show all journey options', async ({ page }) => {
   49 |     await page.goto('/onboarding', { waitUntil: 'networkidle' });
   50 |     await expect(page.getByRole('heading', { name: 'Investor' })).toBeVisible();
   51 |   });
   52 |
   53 |   test('should show how it works section', async ({ page }) => {
   54 |     await page.goto('/onboarding', { waitUntil: 'networkidle' });
   55 |     
   56 |     // Verify how it works section using more specific selectors
   57 |     await expect(page.getByRole('heading', { name: 'How It Works' })).toBeVisible();
   58 |     
   59 |     // Verify steps using more specific selectors
   60 |     const steps = [
   61 |       'Connect Your Wallet',
   62 |       'Make Initial Contribution',
   63 |       'Participate in Governance'
   64 |     ];
   65 |     
   66 |     for (const step of steps) {
   67 |       await expect(page.getByText(step)).toBeVisible();
   68 |     }
   69 |   });
   70 |
   71 |   test('should show FAQ section', async ({ page }) => {
   72 |     await page.goto('/onboarding', { waitUntil: 'networkidle' });
   73 |     
   74 |     // Verify FAQ section using more specific selectors
   75 |     await expect(page.getByRole('heading', { name: 'User Types' })).toBeVisible();
   76 |     
   77 |     // Click and verify FAQ content using more specific selectors
   78 |     await expect(page.getByText('Investor: Invest in projects')).toBeVisible();
   79 |     await expect(page.getByText('Project Owner: Submit projects')).toBeVisible();
   80 |     await expect(page.getByText('DAO Member: Participate in governance')).toBeVisible();
   81 |     await expect(page.getByText('Community Member: Engage and learn')).toBeVisible();
   82 |   });
   83 |
   84 |   test('should complete onboarding journey as investor', async ({ page }) => {
   85 |     await page.goto('/onboarding', { waitUntil: 'networkidle' });
   86 |     
   87 |     // Select investor journey
   88 |     await page.getByRole('heading', { name: 'Investor' }).click();
   89 |     await page.getByText('Invest in innovative projects').click();
   90 |     
   91 |     // Complete welcome step
   92 |     await expect(page.getByText('Welcome to Open Invest DAO')).toBeVisible();
   93 |     await page.getByRole('button', { name: 'Next' }).click();
   94 |     
   95 |     // Complete how it works step
   96 |     await expect(page.getByText('How It Works')).toBeVisible();
   97 |     await page.getByRole('button', { name: 'Next' }).click();
   98 |     
   99 |     // Complete ready to start step
  100 |     await expect(page.getByText('Ready to Start?')).toBeVisible();
  101 |     await page.getByRole('button', { name: 'Get Started' }).click();
  102 |   });
  103 |
  104 |   test('should block access to final step without NFT purchase', async ({ page }) => {
  105 |     await page.goto('/onboarding', { waitUntil: 'networkidle' });
  106 |     
  107 |     // Select investor journey
  108 |     await page.getByRole('heading', { name: 'Investor' }).click();
  109 |     await page.getByText('Invest in innovative projects').click();
  110 |     
  111 |     // Complete welcome step
  112 |     await expect(page.getByText('Welcome to Open Invest DAO')).toBeVisible();
  113 |     await page.getByRole('button', { name: 'Next' }).click();
  114 |     
  115 |     // Complete how it works step
  116 |     await expect(page.getByText('How It Works')).toBeVisible();
  117 |     await page.getByRole('button', { name: 'Next' }).click();
  118 |     
  119 |     // Verify ready to start step is not accessible
  120 |     await expect(page.getByText('Ready to Start?')).not.toBeVisible();
  121 |   });
  122 |
  123 |   test('should show correct progress percentage', async ({ page }) => {
  124 |     await page.goto('/onboarding', { waitUntil: 'networkidle' });
  125 |     
  126 |     // Select investor journey
> 127 |     await page.getByRole('heading', { name: 'Investor' }).click();
      |                                                           ^ Error: locator.click: Test timeout of 30000ms exceeded.
  128 |     await page.getByText('Invest in innovative projects').click();
  129 |     
  130 |     // Verify initial progress
  131 |     await expect(page.getByText('0%')).toBeVisible();
  132 |     
  133 |     // Complete first step
  134 |     await page.getByRole('button', { name: 'Next' }).click();
  135 |     await expect(page.getByText('33%')).toBeVisible();
  136 |     
  137 |     // Complete second step
  138 |     await page.getByRole('button', { name: 'Next' }).click();
  139 |     await expect(page.getByText('66%')).toBeVisible();
  140 |   });
  141 |
  142 |   test('should support different user types', async ({ page }) => {
  143 |     await page.goto('/onboarding', { waitUntil: 'networkidle' });
  144 |     
  145 |     // Test Project Owner journey
  146 |     await page.getByRole('heading', { name: 'Project Owner' }).click();
  147 |     await page.getByText('Submit and fund your project').click();
  148 |     await expect(page.getByText('Welcome to Project Owner Journey')).toBeVisible();
  149 |     
  150 |     // Test DAO Member journey
  151 |     await page.goto('/onboarding', { waitUntil: 'networkidle' });
  152 |     await page.getByRole('heading', { name: 'DAO Member' }).click();
  153 |     await page.getByText('Participate in governance').click();
  154 |     await expect(page.getByText('Welcome to DAO Member Journey')).toBeVisible();
  155 |     
  156 |     // Test Community Member journey
  157 |     await page.goto('/onboarding', { waitUntil: 'networkidle' });
  158 |     await page.getByRole('heading', { name: 'Community Member' }).click();
  159 |     await page.getByText('Engage and learn').click();
  160 |     await expect(page.getByText('Welcome to Community Member Journey')).toBeVisible();
  161 |   });
  162 | }); 
```
# Test info

- Name: Journey System >> should handle subscription expiration
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:97:3

# Error details

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Begin Investor Journey' })

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:104:72
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
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Clear localStorage before each test
   6 |     await page.goto('/');
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
> 104 |     await page.getByRole('button', { name: 'Begin Investor Journey' }).click();
      |                                                                        ^ Error: locator.click: Test timeout of 60000ms exceeded.
  105 |     
  106 |     // Complete all steps
  107 |     await page.waitForSelector('button:has-text("Next")');
  108 |     await page.getByRole('button', { name: 'Next' }).click();
  109 |     await page.getByRole('button', { name: 'Next' }).click();
  110 |     await page.getByRole('button', { name: 'Next' }).click();
  111 |     
  112 |     // Purchase NFT
  113 |     await page.getByRole('button', { name: 'Purchase Investor NFT' }).click();
  114 |     
  115 |     // Set purchase date to 31 days ago
  116 |     await page.evaluate(() => {
  117 |       const purchaseDate = new Date();
  118 |       purchaseDate.setDate(purchaseDate.getDate() - 31);
  119 |       localStorage.setItem('onboardingNftPurchaseDate', purchaseDate.toISOString());
  120 |     });
  121 |     
  122 |     // Refresh page
  123 |     await page.reload();
  124 |     await page.waitForLoadState('networkidle');
  125 |     
  126 |     // Verify subscription timer is gone and paywall reappears
  127 |     await page.waitForSelector('text=Unlock Advanced Investor Features');
  128 |     await expect(page.getByText('Active Subscription')).not.toBeVisible();
  129 |     await expect(page.getByText('Unlock Advanced Investor Features')).toBeVisible();
  130 |   });
  131 |
  132 |   test('should support different user types', async ({ page }) => {
  133 |     await page.goto('/onboarding');
  134 |     await page.waitForLoadState('networkidle');
  135 |     
  136 |     // Test Project Owner journey
  137 |     await page.waitForSelector('text=Project Owner');
  138 |     await page.getByText('Project Owner').click();
  139 |     await page.getByRole('button', { name: 'Begin Project Owner Journey' }).click();
  140 |     await page.waitForSelector('text=Unlock Advanced Project Owner Features');
  141 |     await expect(page.getByText('Unlock Advanced Project Owner Features')).toBeVisible();
  142 |     
  143 |     // Test DAO Member journey
  144 |     await page.goto('/onboarding');
  145 |     await page.waitForLoadState('networkidle');
  146 |     await page.waitForSelector('text=DAO Member');
  147 |     await page.getByText('DAO Member').click();
  148 |     await page.getByRole('button', { name: 'Begin DAO Member Journey' }).click();
  149 |     await page.waitForSelector('text=Unlock Advanced DAO Member Features');
  150 |     await expect(page.getByText('Unlock Advanced DAO Member Features')).toBeVisible();
  151 |     
  152 |     // Test Community Member journey
  153 |     await page.goto('/onboarding');
  154 |     await page.waitForLoadState('networkidle');
  155 |     await page.waitForSelector('text=Community Member');
  156 |     await page.getByText('Community Member').click();
  157 |     await page.getByRole('button', { name: 'Begin Community Member Journey' }).click();
  158 |     await page.waitForSelector('text=Unlock Advanced Community Member Features');
  159 |     await expect(page.getByText('Unlock Advanced Community Member Features')).toBeVisible();
  160 |   });
  161 | }); 
```
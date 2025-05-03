# Test info

- Name: Journey System >> should navigate through investor journey
- Location: /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:14:3

# Error details

```
Error: Timed out 10000ms waiting for expect(locator).toBeVisible()

Locator: getByRole('tab', { name: 'Journey Map' })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 10000ms
  - waiting for getByRole('tab', { name: 'Journey Map' })

    at /Users/gosouza/projetos-p/open-invest-spotlight-dao/tests/e2e/journeys.spec.ts:21:66
```

# Page snapshot

```yaml
- region "Notifications (F8)":
  - list
- region "Notifications alt+T"
- main:
  - heading "User Journeys" [level=1]
  - paragraph: Explore different paths and experiences within the Open Invest Spotlight DAO platform.
  - img
  - heading "Investor Journey" [level=3]
  - paragraph: Discover, research, invest, and track your investments
  - text: Progress 0%
  - link "View Journey":
    - /url: /journeys/investor
    - text: View Journey
    - img
  - img
  - heading "Project Owner Journey" [level=3]
  - paragraph: Submit projects, secure funding, and build with community support
  - text: Progress 0%
  - link "View Journey":
    - /url: /journeys/project-owner
    - text: View Journey
    - img
  - img
  - heading "DAO Member Journey" [level=3]
  - paragraph: Participate in governance and shape the platform's future
  - text: Progress 0%
  - link "View Journey":
    - /url: /journeys/dao-member
    - text: View Journey
    - img
  - img
  - heading "Community Member Journey" [level=3]
  - paragraph: Engage, learn, and build your reputation in the community
  - text: Progress 0%
  - link "View Journey":
    - /url: /journeys/community-member
    - text: View Journey
    - img
  - heading "Cross-User Interactions" [level=3]
  - paragraph: Understanding how different user types interact within the platform ecosystem.
  - paragraph: Our platform creates a collaborative ecosystem where all user types interact with each other. Project Owners submit their projects, which are reviewed by DAO Members. Approved projects become available to Investors, while Community Members engage with these projects through discussion and feedback.
  - paragraph: This interconnected ecosystem ensures that all participants benefit from shared knowledge, transparent decision-making, and collective value creation.
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Journey System', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Configuração do localStorage
   6 |     await page.addInitScript(() => {
   7 |       window.localStorage.clear();
   8 |       window.localStorage.setItem('hasVisitedBefore', 'false');
   9 |     });
  10 |     
  11 |     await page.goto('/', { waitUntil: 'networkidle' });
  12 |   });
  13 |
  14 |   test('should navigate through investor journey', async ({ page }) => {
  15 |     await page.goto('/journeys', { waitUntil: 'networkidle' });
  16 |     
  17 |     // Verifica título da página
  18 |     await expect(page.getByRole('heading', { name: 'Investor Journey' })).toBeVisible();
  19 |     
  20 |     // Verifica as tabs
> 21 |     await expect(page.getByRole('tab', { name: 'Journey Map' })).toBeVisible();
     |                                                                  ^ Error: Timed out 10000ms waiting for expect(locator).toBeVisible()
  22 |     await expect(page.getByRole('tab', { name: 'Resources' })).toBeVisible();
  23 |     await expect(page.getByRole('tab', { name: 'Journey Details' })).toBeVisible();
  24 |   });
  25 |
  26 |   test('should show journey resources', async ({ page }) => {
  27 |     await page.goto('/journeys', { waitUntil: 'networkidle' });
  28 |     
  29 |     // Clica na tab de recursos
  30 |     await page.getByRole('tab', { name: 'Resources' }).click();
  31 |     
  32 |     // Verifica os cards de recursos
  33 |     await expect(page.getByRole('heading', { name: 'Investment Guides' })).toBeVisible();
  34 |     await expect(page.getByRole('heading', { name: 'Risk Assessment Tools' })).toBeVisible();
  35 |     await expect(page.getByRole('heading', { name: 'Project Evaluation Framework' })).toBeVisible();
  36 |     await expect(page.getByRole('heading', { name: 'Governance Participation Guide' })).toBeVisible();
  37 |   });
  38 |
  39 |   test('should show journey details', async ({ page }) => {
  40 |     await page.goto('/journeys', { waitUntil: 'networkidle' });
  41 |     
  42 |     // Clica na tab de detalhes
  43 |     await page.getByRole('tab', { name: 'Journey Details' }).click();
  44 |     
  45 |     // Verifica as seções de detalhes
  46 |     await expect(page.getByRole('heading', { name: '1. Discovery' })).toBeVisible();
  47 |     await expect(page.getByRole('heading', { name: '2. Research' })).toBeVisible();
  48 |     await expect(page.getByRole('heading', { name: '3. Investment' })).toBeVisible();
  49 |     await expect(page.getByRole('heading', { name: '4. Post-Investment' })).toBeVisible();
  50 |   });
  51 |
  52 |   test('should allow navigation between tabs', async ({ page }) => {
  53 |     await page.goto('/journeys', { waitUntil: 'networkidle' });
  54 |     
  55 |     // Navega entre as tabs
  56 |     await page.getByRole('tab', { name: 'Resources' }).click();
  57 |     await expect(page.getByRole('heading', { name: 'Investment Guides' })).toBeVisible();
  58 |     
  59 |     await page.getByRole('tab', { name: 'Journey Details' }).click();
  60 |     await expect(page.getByRole('heading', { name: '1. Discovery' })).toBeVisible();
  61 |     
  62 |     await page.getByRole('tab', { name: 'Journey Map' }).click();
  63 |     await expect(page.getByRole('heading', { name: 'Investor Journey' })).toBeVisible();
  64 |   });
  65 |
  66 |   test('should show back navigation', async ({ page }) => {
  67 |     await page.goto('/journeys', { waitUntil: 'networkidle' });
  68 |     
  69 |     // Verifica botão de voltar
  70 |     await expect(page.getByRole('link', { name: 'Back to Journeys' })).toBeVisible();
  71 |     
  72 |     // Clica no botão e verifica navegação
  73 |     await page.getByRole('link', { name: 'Back to Journeys' }).click();
  74 |     await expect(page.url()).toContain('/journeys');
  75 |   });
  76 | }); 
```
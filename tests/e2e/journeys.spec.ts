import { test, expect } from '@playwright/test';

test.describe('Journey System', () => {
  test.beforeEach(async ({ page }) => {
    // Configuração do localStorage
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.localStorage.setItem('hasVisitedBefore', 'false');
    });
    
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('should navigate through investor journey', async ({ page }) => {
    await page.goto('/journeys', { waitUntil: 'domcontentloaded' });
    
    // Verifica título da página
    await expect(page.getByRole('heading', { name: 'Investor Journey' })).toBeVisible();
    
    // Verifica as tabs
    await expect(page.getByRole('tab', { name: 'Journey Map' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Resources' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Journey Details' })).toBeVisible();
  });

  test('should show journey resources', async ({ page }) => {
    await page.goto('/journeys', { waitUntil: 'domcontentloaded' });
    
    // Clica na tab de recursos
    await page.getByRole('tab', { name: 'Resources' }).click();
    
    // Verifica os cards de recursos
    await expect(page.getByRole('heading', { name: 'Investment Guides' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Risk Assessment Tools' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Project Evaluation Framework' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Governance Participation Guide' })).toBeVisible();
  });

  test('should show journey details', async ({ page }) => {
    await page.goto('/journeys', { waitUntil: 'domcontentloaded' });
    
    // Clica na tab de detalhes
    await page.getByRole('tab', { name: 'Journey Details' }).click();
    
    // Verifica as seções de detalhes
    await expect(page.getByRole('heading', { name: '1. Discovery' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '2. Research' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '3. Investment' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '4. Post-Investment' })).toBeVisible();
  });

  test('should allow navigation between tabs', async ({ page }) => {
    await page.goto('/journeys', { waitUntil: 'domcontentloaded' });
    
    // Navega entre as tabs
    await page.getByRole('tab', { name: 'Resources' }).click();
    await expect(page.getByRole('heading', { name: 'Investment Guides' })).toBeVisible();
    
    await page.getByRole('tab', { name: 'Journey Details' }).click();
    await expect(page.getByRole('heading', { name: '1. Discovery' })).toBeVisible();
    
    await page.getByRole('tab', { name: 'Journey Map' }).click();
    await expect(page.getByRole('heading', { name: 'Investor Journey' })).toBeVisible();
  });

  test('should show back navigation', async ({ page }) => {
    await page.goto('/journeys', { waitUntil: 'domcontentloaded' });
    
    // Verifica botão de voltar
    await expect(page.getByRole('link', { name: 'Back to Journeys' })).toBeVisible();
    
    // Clica no botão e verifica navegação
    await page.getByRole('link', { name: 'Back to Journeys' }).click();
    await expect(page.url()).toContain('/journeys');
  });
}); 
import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('should load all main pages', async ({ page }) => {
    const pages = ['/', '/investments', '/proposals', '/dashboard', '/settings'];
    
    for (const path of pages) {
      await page.goto(path);
      await expect(page).toHaveTitle(/Open Invest Spotlight DAO/);
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('should check API endpoints', async ({ page }) => {
    const endpoints = [
      '/api/investments',
      '/api/proposals',
      '/api/users',
      '/api/settings'
    ];
    
    for (const endpoint of endpoints) {
      const response = await page.request.get(endpoint);
      expect(response.status()).toBe(200);
    }
  });
}); 
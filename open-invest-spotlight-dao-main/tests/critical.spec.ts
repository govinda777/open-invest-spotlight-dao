import { test, expect } from '@playwright/test';

test.describe('Critical Path Tests', () => {
  test('should load the main page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Open Invest Spotlight DAO/);
  });

  test('should display main navigation', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should allow user authentication', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/dashboard/);
  });
}); 
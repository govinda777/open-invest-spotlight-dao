import { test, expect } from '@playwright/test';

test.describe('Regression Tests', () => {
  test('should handle investment creation flow', async ({ page }) => {
    await page.goto('/investments/new');
    await page.fill('input[name="name"]', 'Test Investment');
    await page.fill('input[name="amount"]', '1000');
    await page.fill('input[name="description"]', 'Test investment description');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/investments/);
    await expect(page.locator('text=Test Investment')).toBeVisible();
  });

  test('should display investment details correctly', async ({ page }) => {
    await page.goto('/investments/1');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.investment-details')).toBeVisible();
    await expect(page.locator('.investment-metrics')).toBeVisible();
  });

  test('should handle voting on proposals', async ({ page }) => {
    await page.goto('/proposals/1');
    await page.click('button:has-text("Vote Yes")');
    await expect(page.locator('.voting-status')).toContainText('Voted');
  });
}); 
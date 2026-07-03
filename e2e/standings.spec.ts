import { test, expect } from '@playwright/test';

test.describe('Group Standings Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/standings');
  });

  test('should display page title', async ({ page }) => {
    await expect(page.locator('.page-title')).toHaveText('Group Standings');
  });

  test('should show loading spinner initially', async ({ page }) => {
    await expect(page.locator('.loading-spinner')).toBeVisible();
  });

  test('should display standings tables with correct columns', async ({ page }) => {
    await page.waitForTimeout(3000);
    const headers = page.locator('.standings-table th');
    await expect(headers.nth(0)).toHaveText('#');
    await expect(headers.nth(1)).toHaveText('Team');
    await expect(headers.nth(9)).toHaveText('Pts');
  });
});
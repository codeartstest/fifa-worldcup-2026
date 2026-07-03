import { test, expect } from '@playwright/test';

test.describe('Player Statistics Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/players');
  });

  test('should display page title and sort filter', async ({ page }) => {
    await expect(page.locator('.page-title')).toHaveText('Player Statistics');
    await expect(page.locator('select')).toBeVisible();
  });

  test('should show loading spinner initially', async ({ page }) => {
    await expect(page.locator('.loading-spinner')).toBeVisible();
  });

  test('should display players table with correct headers', async ({ page }) => {
    await page.waitForTimeout(3000);
    const headers = page.locator('.players-table th');
    await expect(headers.nth(0)).toHaveText('#');
    await expect(headers.nth(1)).toHaveText('Player');
    await expect(headers.nth(5)).toHaveText('Goals');
  });

  test('should sort players when changing sort filter', async ({ page }) => {
    await page.waitForTimeout(3000);
    const select = page.locator('select');
    await select.selectOption('assists');
    await page.waitForTimeout(500);
  });
});
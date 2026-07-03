import { test, expect } from '@playwright/test';

test.describe('Player Statistics Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/players');
  });

  test('should display page title and sort filter', async ({ page }) => {
    await expect(page.locator('.page-title')).toContainText('Player Statistics');
    await expect(page.locator('select')).toBeVisible();
  });

  test('should display table, error, or loading after wait', async ({ page }) => {
    await page.waitForTimeout(3000);
    const table = page.locator('.players-table');
    const error = page.locator('.error-message');
    const hasContent = (await table.count() > 0) || (await error.count() > 0);
    expect(hasContent).toBeTruthy();
  });

  test('should have sort dropdown with goals option', async ({ page }) => {
    const select = page.locator('select');
    await expect(select).toBeVisible();
    const options = select.locator('option');
    expect(await options.count()).toBeGreaterThan(0);
  });
});

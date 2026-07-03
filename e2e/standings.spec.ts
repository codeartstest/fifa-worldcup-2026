import { test, expect } from '@playwright/test';

test.describe('Group Standings Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/standings');
  });

  test('should display page title', async ({ page }) => {
    await expect(page.locator('.page-title')).toContainText('Group Standings');
  });

  test('should display groups, error, or loading after wait', async ({ page }) => {
    await page.waitForTimeout(3000);
    const groups = page.locator('.group');
    const error = page.locator('.error-message');
    const hasContent = (await groups.count() > 0) || (await error.count() > 0);
    expect(hasContent).toBeTruthy();
  });

  test('should have correct page title text', async ({ page }) => {
    await expect(page.locator('.page-title')).toContainText('Standings');
  });
});

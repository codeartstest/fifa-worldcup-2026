import { test, expect } from '@playwright/test';

test.describe('Teams Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/teams');
  });

  test('should display page title', async ({ page }) => {
    await expect(page.locator('.page-title')).toHaveText('Teams');
  });

  test('should show loading spinner initially', async ({ page }) => {
    await expect(page.locator('.loading-spinner')).toBeVisible();
  });

  test('should display team cards or empty state', async ({ page }) => {
    await page.waitForTimeout(3000);
    const teamCards = page.locator('.team-card');
    const error = page.locator('.error-message');
    const hasCards = await teamCards.count() > 0;
    const hasError = await error.count() > 0;
    expect(hasCards || hasError).toBeTruthy();
  });
});
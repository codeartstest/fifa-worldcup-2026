import { test, expect } from '@playwright/test';

test.describe('Match Fixtures Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/fixtures');
  });

  test('should display page title and filters', async ({ page }) => {
    await expect(page.locator('.page-title')).toHaveText('Match Fixtures');
    await expect(page.locator('input[type="date"]')).toBeVisible();
    await expect(page.locator('select')).toBeVisible();
  });

  test('should show loading spinner initially', async ({ page }) => {
    await expect(page.locator('.loading-spinner')).toBeVisible();
  });

  test('should display fixture cards or no-results message', async ({ page }) => {
    await page.waitForTimeout(3000);
    const fixtureCards = page.locator('.fixture-card');
    const noResults = page.locator('.no-results');
    const hasCards = await fixtureCards.count() > 0;
    const hasNoResults = await noResults.count() > 0;
    expect(hasCards || hasNoResults).toBeTruthy();
  });
});
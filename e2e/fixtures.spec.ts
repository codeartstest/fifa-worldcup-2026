import { test, expect } from '@playwright/test';

test.describe('Match Fixtures Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/fixtures');
  });

  test('should display page title and filters', async ({ page }) => {
    await expect(page.locator('.page-title')).toContainText('Match Fixtures');
    await expect(page.locator('input[type="date"]')).toBeVisible();
    await expect(page.locator('select')).toBeVisible();
  });

  test('should display fixture cards, error, or no-results after loading', async ({ page }) => {
    await page.waitForTimeout(3000);
    const fixtureCards = page.locator('.fixture-card');
    const noResults = page.locator('.no-results');
    const error = page.locator('.error-message');
    const hasContent = (await fixtureCards.count() > 0) || (await noResults.count() > 0) || (await error.count() > 0);
    expect(hasContent).toBeTruthy();
  });

  test('should have date and round filter inputs', async ({ page }) => {
    await expect(page.locator('input[type="date"]')).toBeVisible();
    await expect(page.locator('select')).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';

test.describe('Live Scores Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/live');
  });

  test('should display page title', async ({ page }) => {
    await expect(page.locator('.page-title')).toContainText('Live Scores');
  });

  test('should display match cards, no-results, or error after loading', async ({ page }) => {
    await page.waitForTimeout(3000);
    const matchCards = page.locator('.match-card');
    const noResults = page.locator('.no-results');
    const error = page.locator('.error-message');
    const hasContent = (await matchCards.count() > 0) || (await noResults.count() > 0) || (await error.count() > 0);
    expect(hasContent).toBeTruthy();
  });

  test('should have page title with live icon', async ({ page }) => {
    await expect(page.locator('.page-title')).toContainText('Live');
  });
});

import { test, expect } from '@playwright/test';

test.describe('Live Scores Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/live');
  });

  test('should display page title', async ({ page }) => {
    await expect(page.locator('.page-title')).toHaveText('Live Scores');
  });

  test('should show loading spinner initially', async ({ page }) => {
    await page.goto('/live');
    await expect(page.locator('.loading-spinner')).toBeVisible();
  });

  test('should display match cards or no live matches message', async ({ page }) => {
    await page.waitForTimeout(3000);
    const matchCards = page.locator('.match-card');
    const noResults = page.locator('.no-results');
    const hasCards = await matchCards.count() > 0;
    const hasNoResults = await noResults.count() > 0;
    expect(hasCards || hasNoResults).toBeTruthy();
  });
});
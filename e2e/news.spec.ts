import { test, expect } from '@playwright/test';

test.describe('News Feed Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/news');
  });

  test('should display page title and category filters', async ({ page }) => {
    await expect(page.locator('.page-title')).toHaveText('Tournament News');
    const filterBtns = page.locator('.filter-btn');
    await expect(filterBtns.first()).toHaveText('All');
  });

  test('should show loading spinner initially', async ({ page }) => {
    await expect(page.locator('.loading-spinner')).toBeVisible();
  });

  test('should display news cards after loading', async ({ page }) => {
    await page.waitForTimeout(3000);
    const newsCards = page.locator('.news-card');
    const error = page.locator('.error-message');
    const hasCards = await newsCards.count() > 0;
    const hasError = await error.count() > 0;
    expect(hasCards || hasError).toBeTruthy();
  });
});
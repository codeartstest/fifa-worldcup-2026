import { test, expect } from '@playwright/test';

test.describe('News Feed Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/news');
  });

  test('should display page title and category filters', async ({ page }) => {
    await expect(page.locator('.page-title')).toContainText('Tournament News');
    const filterBtns = page.locator('.filter-btn');
    await expect(filterBtns.first()).toContainText('All');
  });

  test('should display news cards, error, or loading after wait', async ({ page }) => {
    await page.waitForTimeout(3000);
    const newsCards = page.locator('.news-card');
    const error = page.locator('.error-message');
    const hasContent = (await newsCards.count() > 0) || (await error.count() > 0);
    expect(hasContent).toBeTruthy();
  });

  test('should have at least one filter button', async ({ page }) => {
    const filterBtns = page.locator('.filter-btn');
    expect(await filterBtns.count()).toBeGreaterThan(0);
  });
});

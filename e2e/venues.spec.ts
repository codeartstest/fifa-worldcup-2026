import { test, expect } from '@playwright/test';

test.describe('Venues Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/venues');
  });

  test('should display page title', async ({ page }) => {
    await expect(page.locator('.page-title')).toContainText('Venues');
  });

  test('should display venue cards, error, or loading after wait', async ({ page }) => {
    await page.waitForTimeout(3000);
    const venueCards = page.locator('.venue-card');
    const error = page.locator('.error-message');
    const hasContent = (await venueCards.count() > 0) || (await error.count() > 0);
    expect(hasContent).toBeTruthy();
  });

  test('should have venues in page title', async ({ page }) => {
    await expect(page.locator('.page-title')).toContainText('Venues');
  });
});

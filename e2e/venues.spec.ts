import { test, expect } from '@playwright/test';

test.describe('Venues Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/venues');
  });

  test('should display page title', async ({ page }) => {
    await expect(page.locator('.page-title')).toHaveText('Venues');
  });

  test('should show loading spinner initially', async ({ page }) => {
    await expect(page.locator('.loading-spinner')).toBeVisible();
  });

  test('should display venue cards or error message', async ({ page }) => {
    await page.waitForTimeout(3000);
    const venueCards = page.locator('.venue-card');
    const error = page.locator('.error-message');
    const hasCards = await venueCards.count() > 0;
    const hasError = await error.count() > 0;
    expect(hasCards || hasError).toBeTruthy();
  });
});
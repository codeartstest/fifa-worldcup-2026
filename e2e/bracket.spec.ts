import { test, expect } from '@playwright/test';

test.describe('Knockout Bracket Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/bracket');
  });

  test('should display page title', async ({ page }) => {
    await expect(page.locator('.page-title')).toHaveText('Knockout Bracket');
  });

  test('should show loading spinner initially', async ({ page }) => {
    await expect(page.locator('.loading-spinner')).toBeVisible();
  });

  test('should display bracket rounds or no-results message', async ({ page }) => {
    await page.waitForTimeout(3000);
    const rounds = page.locator('.bracket-round');
    const noResults = page.locator('.no-results');
    const hasRounds = await rounds.count() > 0;
    const hasNoResults = await noResults.count() > 0;
    expect(hasRounds || hasNoResults).toBeTruthy();
  });
});
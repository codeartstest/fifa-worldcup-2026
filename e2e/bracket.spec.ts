import { test, expect } from '@playwright/test';

test.describe('Knockout Bracket Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/bracket');
  });

  test('should display page title', async ({ page }) => {
    await expect(page.locator('.page-title')).toContainText('Knockout Bracket');
  });

  test('should display bracket rounds, no-results, or error after loading', async ({ page }) => {
    await page.waitForTimeout(3000);
    const rounds = page.locator('.bracket-round');
    const noResults = page.locator('.no-results');
    const error = page.locator('.error-message');
    const hasContent = (await rounds.count() > 0) || (await noResults.count() > 0) || (await error.count() > 0);
    expect(hasContent).toBeTruthy();
  });

  test('should have bracket in page title', async ({ page }) => {
    await expect(page.locator('.page-title')).toContainText('Bracket');
  });
});

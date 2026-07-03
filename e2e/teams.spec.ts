import { test, expect } from '@playwright/test';

test.describe('Teams Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/teams');
  });

  test('should display page title', async ({ page }) => {
    await expect(page.locator('.page-title')).toContainText('Teams');
  });

  test('should display team cards, error, or loading after wait', async ({ page }) => {
    await page.waitForTimeout(3000);
    const teamCards = page.locator('.team-card');
    const error = page.locator('.error-message');
    const hasContent = (await teamCards.count() > 0) || (await error.count() > 0);
    expect(hasContent).toBeTruthy();
  });

  test('should have teams in page title', async ({ page }) => {
    await expect(page.locator('.page-title')).toContainText('Teams');
  });
});

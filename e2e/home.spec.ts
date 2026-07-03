import { test, expect } from '@playwright/test';

test.describe('Homepage Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display hero section with tournament title', async ({ page }) => {
    await expect(page.locator('.hero__title')).toHaveText('FIFA World Cup 2026');
    await expect(page.locator('.hero__subtitle')).toContainText('United States');
  });

  test('should display quick access links for all features', async ({ page }) => {
    const links = page.locator('.link-card');
    await expect(links).toHaveCount(8);
    await expect(page.locator('a[routerLink="/fixtures"]')).toBeVisible();
    await expect(page.locator('a[routerLink="/standings"]')).toBeVisible();
    await expect(page.locator('a[routerLink="/bracket"]')).toBeVisible();
    await expect(page.locator('a[routerLink="/players"]')).toBeVisible();
  });

  test('should navigate to fixtures page when clicking link', async ({ page }) => {
    await page.click('a[routerLink="/fixtures"]');
    await expect(page).toHaveURL('/fixtures');
    await expect(page.locator('.page-title')).toContainText('Match Fixtures');
  });
});

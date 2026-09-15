import { test, expect } from '@playwright/test';

test.describe('CampusConnect', () => {
  test('loads the public event dashboard', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('CampusConnect')).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText('Every Event. Every Student. One Platform.')).toBeVisible({ timeout: 10_000 });
  });

  test('opens the login prompt from the public dashboard', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2_500);
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 5_000 });
  });
});

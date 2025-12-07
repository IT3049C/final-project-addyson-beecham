import { test, expect } from '@playwright/test';

test.describe('Rock Paper Scissors', () => {
  test('loads initial state', async ({ page }) => {
    await page.goto('/rps');
    await expect(page.getByText(/choose your move/i)).toBeVisible();
  });

  test('plays a round', async ({ page }) => {
    await page.goto('/rps');
    await page.getByRole('button', { name: /rock/i }).click();
    await expect(page.getByText(/result/i)).toBeVisible();
  });

  test('resets the game', async ({ page }) => {
    await page.goto('/rps');
    await page.getByRole('button', { name: /rock/i }).click();
    await page.getByRole('button', { name: /reset/i }).click();
    await expect(page.getByText(/choose your move/i)).toBeVisible();
  });
});
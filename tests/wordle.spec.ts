import { test, expect } from '@playwright/test';

test.describe('Wordle', () => {
  test('loads initial state', async ({ page }) => {
    await page.goto('/wordle');
    await expect(page.getByText(/enter a guess/i)).toBeVisible();
  });

  test('submits a guess', async ({ page }) => {
    await page.goto('/wordle');
    await page.getByRole('textbox').fill('react');
    await page.getByRole('button', { name: /submit/i }).click();
    await expect(page.getByText(/react/i)).toBeVisible();
  });

  test('resets the game', async ({ page }) => {
    await page.goto('/wordle');
    await page.getByRole('textbox').fill('react');
    await page.getByRole('button', { name: /submit/i }).click();
    await page.getByRole('button', { name: /reset/i }).click();
    await expect(page.getByText(/enter a guess/i)).toBeVisible();
  });
});
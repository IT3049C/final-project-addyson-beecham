import { test, expect } from '@playwright/test';

test.describe('Hangman', () => {
  test('loads initial state', async ({ page }) => {
    await page.goto('/hangman');
    await expect(page.getByText(/guess a letter/i)).toBeVisible();
  });

  test('makes a guess', async ({ page }) => {
    await page.goto('/hangman');
    await page.getByTestId('hangman-letter-a').click();
    await expect(page.getByTestId('hangman-display')).toContainText('a');
  });

  test('resets the game', async ({ page }) => {
    await page.goto('/hangman');
    await page.getByTestId('hangman-letter-a').click();
    await page.getByTestId('hangman-reset').click();
    await expect(page.getByText(/guess a letter/i)).toBeVisible();
  });
});
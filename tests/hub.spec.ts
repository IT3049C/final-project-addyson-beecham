import { test, expect } from '@playwright/test';

test.describe('Game Hub', () => {
  test('loads the landing page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /game hub/i })).toBeVisible();
  });

  test('lists available games', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /rock paper scissors/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /tic tac toe/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /wordle/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /hangman/i })).toBeVisible();
  });

  test('captures a player name and shows it on game pages', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel(/player name/i).fill('Addyson');
    await page.getByRole('button', { name: /start/i }).click();
    await page.getByRole('link', { name: /rock paper scissors/i }).click();
    await expect(page.getByText(/addyson/i)).toBeVisible();
  });
});
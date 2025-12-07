import { test, expect } from '@playwright/test';

test.describe('Tic Tac Toe', () => {
  test('loads initial board', async ({ page }) => {
    await page.goto('/tictactoe');
    await page.getByRole('button', { name: /local multiplayer/i }).click();
    const cells = page.locator('[data-testid^="cell-"]');
    await expect(cells).toHaveCount(9);
  });

  test('makes a move', async ({ page }) => {
    await page.goto('/tictactoe');
    await page.getByRole('button', { name: /local multiplayer/i }).click();
    const cells = page.locator('[data-testid^="cell-"]');
    await cells.nth(0).click();
    await expect(cells.nth(0)).not.toHaveText('');
  });

  test('resets the board', async ({ page }) => {
    await page.goto('/tictactoe');
    await page.getByRole('button', { name: /local multiplayer/i }).click();
    const cells = page.locator('[data-testid^="cell-"]');
    await cells.nth(0).click();
    await page.getByTestId('tictactoe-reset').click();
    await expect(cells).toHaveCount(9);
  });
});
import { test, expect } from '@playwright/test';

test('online room: create, join, and sync moves', async ({ browser }) => {
  const ctxA = await browser.newContext();
  const pageA = await ctxA.newPage();
  await pageA.goto('/tictactoe/create');
  await Promise.all([
    pageA.waitForURL('**/tictactoe/room/**'),
    pageA.getByRole('button', { name: /create room/i }).click(),
  ]);
  const urlA = pageA.url();
  const roomId = urlA.split('/').pop();
  expect(roomId).toBeTruthy();

  const ctxB = await browser.newContext();
  const pageB = await ctxB.newPage();
  await pageB.goto('/tictactoe/join');
  await pageB.getByLabel(/room code/i).fill(roomId || '');
  await Promise.all([
    pageB.waitForURL(`**/tictactoe/room/${roomId}`),
    pageB.getByRole('button', { name: /join room/i }).click(),
  ]);

  await pageA.getByTestId('cell-0').click();
  await expect(pageB.getByTestId('cell-0')).toContainText('X', { timeout: 5000 });

  await pageB.getByTestId('cell-1').click();
  await expect(pageA.getByTestId('cell-1')).toContainText('O', { timeout: 5000 });

  await ctxA.close();
  await ctxB.close();
});

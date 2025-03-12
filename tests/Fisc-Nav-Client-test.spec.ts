import { test, expect } from '@playwright/test';

test.use({
  storageState: 'client-auth.json'
});

test('CLient test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'DASHBOARD' }).click();
  await page.getByRole('heading', { name: 'Welcome client@gmail.com' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome client@gmail.com' })).toBeVisible();
});
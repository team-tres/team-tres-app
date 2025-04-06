import { test, expect } from '@playwright/test';

test.use({
  storageState: 'admin-auth.json'
});

test('Admin tests', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(1500);
  await page.getByRole('link', { name: 'ADMIN' }).click();
  await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();
});

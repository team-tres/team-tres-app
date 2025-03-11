import { test, expect } from '@playwright/test';

test.use({
  storageState: 'analyst-auth.json'
});

test('Analyst test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'ANALYST' }).click();
  await expect(page.getByRole('heading', { name: 'Analyst Dashboard' })).toBeVisible();
  await page.getByRole('button', { name: 'Create Forecast' }).click();
  await expect(page.getByRole('heading', { name: 'Financial Forecast Table' })).toBeVisible();
});

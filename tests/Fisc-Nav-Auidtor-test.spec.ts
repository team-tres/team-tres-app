import { test, expect } from '@playwright/test';

test.use({
  storageState: 'auditor-auth.json'
});

test('Auditor test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'INPUT FINANCIALS' }).click();
  await expect(page.getByRole('heading', { name: 'Input Financials' })).toBeVisible();
});

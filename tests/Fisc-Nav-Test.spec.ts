import { test, expect } from '@playwright/test';

test.use({
  storageState: 'ses-auth.json',
});

test.only('Change Password', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'john@foo.com' }).click();
  await page.waitForTimeout(2500);
  await page.getByRole('link', { name: 'Change Password' }).click();
  await expect(page.getByRole('heading', { name: 'Change Password' })).toBeVisible();
  await page.getByRole('button', { name: 'john@foo.com' }).click();
  await page.waitForTimeout(2500);
  await page.getByRole('link', { name: 'Sign Out' }).click();
  await expect(page.getByRole('heading', { name: 'Do you want to sign out?' })).toBeVisible();
  await page.waitForTimeout(2500);
  await page.getByRole('button', { name: 'Sign Out' }).click();
});

test('analyst dashboard and input financial information page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(2000);
  await page.getByRole('link', { name: 'Input Financials' }).click();
  await expect(page.getByRole('heading', { name: 'Input Financials' })).toBeVisible();
  await page.waitForTimeout(2000);
  await page.getByRole('link', { name: 'Analyst' }).click();
  await expect(page.getByRole('heading', { name: 'Analyst Dashboard' })).toBeVisible();
});

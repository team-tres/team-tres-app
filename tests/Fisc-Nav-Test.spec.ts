import { test, expect } from '@playwright/test';

// test.use({
//  storageState: 'ses-auth.json',
// });

test('Change Password', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/signin');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('john@foo.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('changeme');
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'john@foo.com' }).click();
  await page.getByRole('link', { name: 'Change Password' }).click();
  await expect(page.getByRole('heading', { name: 'Change Password' })).toBeVisible();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'john@foo.com' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Sign Out' }).click();
  await expect(page.getByRole('heading', { name: 'Do you want to sign out?' })).toBeVisible();
  await page.getByRole('button', { name: 'Sign Out' }).click();
});

test('analyst dashboard and input financial information page', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/signin');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('john@foo.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('changeme');
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('link', { name: 'ANALYST' }).click();
  await expect(page.getByRole('heading', { name: 'Analyst Dashboard' })).toBeVisible();
  await page.waitForTimeout(1500);
  await page.getByRole('link', { name: 'INPUT FINANCIALS' }).click();
  await expect(page.getByRole('heading', { name: 'Input Financials' })).toBeVisible();
});

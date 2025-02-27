import { test, expect } from '@playwright/test';

test('Setup session', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('john@foo.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('changeme');
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome john@foo.com' })).toBeVisible();
  // await page.context().clearPermissions();
  // await page.context().clearLocalStorage();
  await page.context().storageState({ path: 'ses-auth.json' });
});

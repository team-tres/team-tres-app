import { test, expect } from '@playwright/test';

test.beforeAll(async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(2500);
});

test('Setup session', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(2500);
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.locator('input[name="email"]').focus();
  await page.locator('input[name="email"]').fill('john@foo.com');
  await page.locator('input[name="password"]').fill('changeme');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('heading', { name: 'Stuff' })).toBeVisible();
  await page.context().storageState({ path: 'ses-auth.json' });
});

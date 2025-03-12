import { test, expect } from '@playwright/test';

test('Admin test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('admin@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('password');
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('link', { name: 'ADMIN' }).click();
  await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();
});
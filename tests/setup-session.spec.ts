import { test, expect } from '@playwright/test';

test('Setup client session', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('client@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('password');
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('link', { name: 'DASHBOARD' })).toBeVisible();
  await page.context().storageState({ path: 'client-auth.json' });
});

test('Setup admin session', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('admin@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('password');
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('link', { name: 'ADMIN' })).toBeVisible();
  await page.context().storageState({ path: 'admin-auth.json' });
});

test('Setup analyst session', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('analyst@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('password');
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('link', { name: 'ANALYST' })).toBeVisible();
  await page.context().storageState({ path: 'analyst-auth.json' });
});

test('Setup auditor session', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('auditor@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('password');
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('link', { name: 'INPUT FINANCIALS' })).toBeVisible();
  await page.context().storageState({ path: 'auditor-auth.json' });
});

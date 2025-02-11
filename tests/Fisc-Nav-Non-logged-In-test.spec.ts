import { test, expect } from '@playwright/test';

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(2500);
});

test('Home and About Pages', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.locator('h1')).toContainText('I ka wā ma mua, ka wā ma hope. The future is found in the past.');
  await page.waitForTimeout(1500);
  await page.getByRole('link', { name: 'About us' }).click();
  await expect(page.getByRole('heading', { name: 'Aloha kākou!' })).toBeVisible();
  await page.getByRole('link', { name: 'Logo' }).click();
});

test('Sign in and Sign Up', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('link', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
  await page.waitForTimeout(1500);
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page.getByRole('heading', { name: 'Sign Up' })).toBeVisible();
  await page.waitForTimeout(1500);
  await page.getByRole('link', { name: 'Logo' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page.getByRole('heading', { name: 'Sign Up' })).toBeVisible();
});

import { test, expect } from '@playwright/test';

test('Home and About Pages', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('heading', { name: 'E komo mai! Welcome to' })).toBeVisible();
  await page.goto('http://localhost:3000/about');
  await expect(page.getByRole('heading', { name: 'Aloha kākou!' })).toBeVisible();
});

test('Sign in and Sign Up', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.goto('http://localhost:3000/auth/signup');
  await expect(page.getByRole('heading', { name: 'Sign Up' })).toBeVisible();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByLabel('Login').getByRole('link', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
});

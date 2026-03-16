import { test, expect } from '@playwright/test';

const URL = 'https://urcard-portal-web.urbox.dev/login';
const VALID_EMAIL = 'khoa.nd1@urbox.vn';
const VALID_PASSWORD = 'wvGQjqRUxyfPCRm3';

test.describe('URCard Portal Login Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('Login success with valid email and password', async ({ page }) => {

    await page.fill('#login_email', VALID_EMAIL);
    await page.fill('#login_password', VALID_PASSWORD);

    await page.click('button[type="submit"]');

    await page.waitForURL('**/publisher');

    await expect(page).toHaveURL(
      'https://urcard-portal-web.urbox.dev/publisher'
    );

  });

  test('Login fail with wrong password', async ({ page }) => {

    await page.fill('#login_email', VALID_EMAIL);
    await page.fill('#login_password', 'wrongpassword');

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/login/);

  });

  test('Login fail with wrong email', async ({ page }) => {

    await page.fill('#login_email', 'fake@urbox.vn');
    await page.fill('#login_password', VALID_PASSWORD);

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/login/);

  });

  test('Login fail when email is empty', async ({ page }) => {

    await page.fill('#login_password', VALID_PASSWORD);

    await page.click('button[type="submit"]');

    await expect(page.locator('#login_email')).toBeVisible();

  });

  test('Login fail when password is empty', async ({ page }) => {

    await page.fill('#login_email', VALID_EMAIL);

    await page.click('button[type="submit"]');

    await expect(page.locator('#login_password')).toBeVisible();

  });

  test('Login fail with invalid email format', async ({ page }) => {

    await page.fill('#login_email', 'abc123');
    await page.fill('#login_password', VALID_PASSWORD);

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/login/);

  });

  test('Login fail with short password', async ({ page }) => {

    await page.fill('#login_email', VALID_EMAIL);
    await page.fill('#login_password', '123');

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/login/);

  });

  test('User double-clicks login button', async ({ page }) => {

    await page.fill('#login_email', VALID_EMAIL);
    await page.fill('#login_password', VALID_PASSWORD);

    await page.dblclick('button[type="submit"]');

    await page.waitForURL('**/publisher');

    await expect(page).toHaveURL(/publisher/);

  });

  test('Login using Enter key', async ({ page }) => {

    await page.fill('#login_email', VALID_EMAIL);
    await page.fill('#login_password', VALID_PASSWORD);

    await page.keyboard.press('Enter');

    await page.waitForURL('**/publisher');

    await expect(page).toHaveURL(/publisher/);

  });

});
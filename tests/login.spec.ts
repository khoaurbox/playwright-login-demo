import { test, expect } from '@playwright/test';

test('Login URCard portal success', async ({ page }) => {

  // 1. Mở trang login
  await page.goto('https://urcard-portal-web.urbox.dev/login');

  // 2. Nhập email
  await page.fill('#login_email', 'khoa.nd1@urbox.vn');

  // 3. Nhập password
  await page.fill('#login_password', 'wvGQjqRUxyfPCRm3');

  // 4. Click nút đăng nhập
  await page.click('button[type="submit"]');

  // 5. Verify redirect thành công
  await page.waitForURL('**/publisher');

  await expect(page).toHaveURL(
    'https://urcard-portal-web.urbox.dev/publisher'
  );

});
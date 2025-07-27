import { test, expect } from '@playwright/test';

const users = [
  { role: 'standard_user', username: 'standard_user', password: 'secret_sauce' },
  { role: 'locked_out_user', username: 'locked_out_user', password: 'secret_sauce' },
  { role: 'problem_user', username: 'problem_user', password: 'secret_sauce' },
  { role: 'performance_glitch_user', username: 'performance_glitch_user', password: 'secret_sauce' },
  { role: 'error_user', username: 'error_user', password: 'secret_sauce' },
  { role: 'visual_user', username: 'visual_user', password: 'secret_sauce' },
];

async function login(page, username, password) {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', username); 
  await page.fill('#password', password);  
  await page.click('#login-button');
}

test.describe('Multiple User logins test', () => {
  for (const user of users) {
    test(`Login test for ${user.role}`, async ({ page }) => {
      await login(page, user.username, user.password);

      switch (user.role) {
        case 'standard_user':
          await expect(page.locator('.app_logo')).toBeVisible();
          break;

        case 'locked_out_user':
          await expect(page.locator("h3[data-test='error']"))
            .toHaveText('Epic sadface: Sorry, this user has been locked out.');
          break;

        case 'problem_user':
            await expect(page.locator("//div[normalize-space()='Test.allTheThings() T-Shirt (Red)']")).toBeVisible();
            break;
        case 'error_user':
          await expect(page.locator("//div[normalize-space()='Test.allTheThings() T-Shirt (Red)']")).toBeVisible();
          break;

        case 'performance_glitch_user':
          await expect(page.locator("img[alt='Sauce Labs Bike Light']")).toBeVisible();
          break;

        case 'visual_user':{
            await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();
            const CartBadge=page.locator('.shopping_cart_badge');
            await expect(CartBadge).toBeVisible({timeout:5000});
            await expect(CartBadge).toHaveScreenshot('Shopping1.png');
          break;
    }
      }

      await page.close();
    });
  }
});




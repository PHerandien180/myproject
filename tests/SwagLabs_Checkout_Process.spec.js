const{test,expect} =require ('@playwright/test');

test('checkout process',async({page})=>{

await page.goto("https://www.saucedemo.com/");

await page.locator('#user-name').fill('standard_user')
await page.locator('#password').fill('secret_sauce')

await page.click("(//input[@id='login-button'])[1]")
await page.click("//button[@id='add-to-cart-sauce-labs-bike-light']")
await page.click("//div[@id='shopping_cart_container']")
await page.click("//button[@id='checkout']")

const firstnameinput= page.getByPlaceholder('First Name')
await expect (firstnameinput).toBeVisible();
await firstnameinput.fill("Peter-Lee")

const LastNameInput=page.getByPlaceholder('Last Name')
await expect(LastNameInput).toBeVisible();
await LastNameInput.fill("Herandien");

const zipInput=page.getByPlaceholder('Zip/Postal Code')
await expect(zipInput).toBeVisible();
await zipInput.fill("7600");

await page.click("//input[@id='continue']")
await page.click("//button[@id='finish']")

await page.close()
})

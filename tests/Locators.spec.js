//const{test,expect}=require('@playwright/test');
import{test,expect}from '@playwright/test';

test('Locators',async({page})=>{

    await page.goto("https://demoblaze.com/")

//click on login button
await page.locator('id=login2').click()

//provide login details in css
await page.locator('#loginusername').fill('pavanol')
//provide password in css
await page.fill("input[id$='loginpassword']" ,'test@123')

//Click on the Login button in xpath
await page.click("//button[normalize-space()='Log in']")

//verify logout presence in CSS
const logoutlink= await page.locator('#logout2')

await expect (logoutlink).toBeVisible({ timeout: 5000 });

await page.close()

})
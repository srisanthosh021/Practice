const { test, expect } = require('@playwright/test');

test("@API Security testing by changing orderid", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill(process.env.USER1_EMAIL);
    await page.locator("#userPassword").fill(process.env.USER1_PASS);
    await page.locator("#login").click();
    await page.locator(".card-body b").first().waitFor();
    await page.locator("[routerlink*='myorders']").first().click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a68e3a985b8849b4916ffxy" })
    )
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order");
})
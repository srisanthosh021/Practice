const { APiUtils } = require("../utils/APiUtils")
const { test, expect, request } = require('@playwright/test');
const loginPayload = { userEmail: process.env.USER1_EMAIL, userPassword: process.env.USER1_PASS };
const orderPayLoad = { orders: [{ country: "United States", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const orderPayLoad2 = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };

// in this test, we're going to empty the cart with api by using fakecredentials
let response1;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayload);
    response1 = await apiUtils.createOrder(orderPayLoad2);
})

test("@API Practice Assignment 1st", async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response1.token);
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", //use * because incase if you're using this script for different acc
        async route => {
            const response = await page.request.fetch(route.request()); // fetching the route request and merging the fakeresponse
            let body = JSON.stringify(fakePayLoadOrders); // has to send this Javascript object in JSON format intercept API fake response
            route.fulfill({
                response,
                body,
            })

        })
    await page.locator("[routerlink*='myorders']").first().click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"); // because sometym api call might get delay so it'll wait for response
    console.log(await page.locator(".mt-4").textContent());
})
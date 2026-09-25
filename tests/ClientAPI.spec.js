const {APiUtils} = require("../utils/APiUtils")
const {test, expect, request} = require('@playwright/test');
const loginPayload = {userEmail: process.env.USER1_EMAIL, userPassword: process.env.USER1_PASS};
const orderPayLoad = {orders: [{country: "United States", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
const orderPayLoad2 = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};


let response1;
test.beforeAll( async()=> {
    const apiContext = await request.newContext();  
    const apiUtils = new APiUtils(apiContext,loginPayload);
    response1 = await apiUtils.createOrder(orderPayLoad2);
})

test("@ API Practice Assignment 1st", async({page})=> {

    await page.addInitScript(value => {
        window.localStorage.setItem('token',value)
    }, response1.token); // injecting token in cookies before navigating to url
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator("h1:has-text('Your Orders')").waitFor();
    const orderIdList = await page.locator(".table .ng-star-inserted");
    const orderIdCount = await orderIdList.count();
    for(let i=0; i<orderIdCount; ++i) {
        const id = await orderIdList.nth(i).locator("th").textContent();
        if(response1.order.includes(id)){
            await orderIdList.nth(i).locator("td button:has-text('View')").click();
            break;
        }
    }
    await page.locator(".email-title").waitFor();
    await page.pause();
    const finaliD = await page.locator(".col-text").textContent();
    expect(response1.order.includes(finaliD)).toBeTruthy();

   // await page.pause();

})
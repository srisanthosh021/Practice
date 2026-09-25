const {test, expect} = require('@playwright/test');

test("@WEB Using getby", async({page})=> {

    const products = page.locator(".card-body");
    const productName = "iphone 13 pro";
    const email = process.env.USER1_EMAIL;
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill(process.env.USER1_EMAIL);
    await page.getByPlaceholder("enter your passsword").fill(process.env.USER1_PASS);
    await page.getByRole("button", {name: "Login"}).click();
    //console.log(await page.locator(".card-body b").first().textContent());

    // when you need to get all text contents it'll throw error
    // await page.locator(".card-body b").allTextContents():  - it doeesn't have wait to get all texts (Texts will display after api calls are done)
    // .waitForLoadState("networkidle") - this will do wait until api calls are done but recently this method is flaky too
    await page.locator(".card-body").first().waitFor(); // waitFor is used only for a single element to wait 
    await expect(page.locator(".card-body").first()).toBeVisible(); // so by using this you'll get alltext contents when before line waits for that 1st so that api calls would have done 
    // when you use only allTextContents you'll get [] empty array
    await page.locator(".card-body").filter({hasText: 'IPHONE 13 PRO'}).getByRole("button", {name: "Add to Cart"}).click();
    await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible(); //getting elements from text with tagname
    expect(bool).toBeTruthy(); // make sure that product added to cart
    await page.getByRole("button", {name: "Checkout"}).click();
    await page.locator("[type='text']").nth(1).fill("123");
    await page.locator("[type='text']").nth(2).fill("Srisanthosh");
    await page.locator("[type='text']").nth(3).fill("Rahulshetty");
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("button", {name: "India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.getByRole("listitem").getByRole("button", {name: "ORDERS"}).click();
    await page.getByText('Your Orders').waitFor();
    const orderIdList = await page.locator(".table .ng-star-inserted");
    const orderIdCount = await orderIdList.count();
    for(let i=0; i<orderIdCount; ++i) {
        const id = await orderIdList.nth(i).locator("th").textContent();
        if(orderId.includes(id)){
            await orderIdList.nth(i).locator("td button:has-text('View')").click();
            break;
        }
    }
    await page.locator(".email-title").waitFor();
    const finaliD = await page.locator(".col-text").textContent();
    expect(orderId.includes(finaliD)).toBeTruthy();
    
   // await page.pause();

})
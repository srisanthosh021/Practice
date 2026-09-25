const {test, expect} = require('@playwright/test');
let WebContext;
test.beforeAll(async({browser})=>{
    const Context = await browser.newContext();
    const page = await Context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(process.env.USER1_EMAIL);
    await page.locator("#userPassword").fill(process.env.USER1_PASS);
    await page.locator("#login").click();
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await Context.storageState({path: 'state.json'}) // it'll saves the cookies after logging with that credentials
    WebContext = await browser.newContext({storageState: 'state.json'});
})
test("@API Practice Assignment 1st", async()=> {

    const page = await WebContext.newPage()
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    const productName = "iphone 13 pro";
    const email = "srisanthosh021@gmail.com";
    await page.locator(".card-body b").first().waitFor();  
    console.log(await page.locator(".card-body b").allTextContents());  

    const count = await products.count();
    for(let i=0; i<count; ++i){  // using for loop to iterate every products
        if(await products.nth(i).locator("b").textContent() == productName){ // filtering one product which is matching the value we gave before
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible(); //getting elements from text with tagname
    expect(bool).toBeTruthy(); // make sure that product added to cart
    await page.locator("[type='button']").last().click();
    await page.locator("[type='text']").nth(1).fill("123");
    await page.locator("[type='text']").nth(2).fill("Srisanthosh");
    await page.locator("[type='text']").nth(3).fill("Rahulshetty");
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = await page.locator(".ta-results"); // it's not normal static dropdown so filtering options first by tying 'ind'
    await dropdown.waitFor(); // waiting for the options to opwn
    const optionsCount = await dropdown.locator("button").count(); // Want to know how many options displaying to iterate each of them 
    
    for(let i = 0; i<optionsCount; ++i){
        const text = await dropdown.locator("button").nth(i).textContent(); // using textcontent() to check 'india' option
        if(text === " India"){  
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    expect(await page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".btnn").click();
    expect(await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator("h1:has-text('Your Orders')").waitFor();
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
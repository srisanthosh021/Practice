const {test, expect} = require('@playwright/test');

test('@WEB First Playwright test', async ({browser,page}) =>{

    // POM
    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const signin = page.locator("#signInBtn");

    //fresh instance - openning a page
    //we should inject browser module in function - {browser}
    // const context = await browser.newContext();
    // const page = await context.newPage();
    // when you don't want any inbuilt cookies/proxy you can simply avoid these two lines and inject 'page' instead of browser in function

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    // await expect(page).toHaveTitle("Google"); - assertion
    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signin.click();
    // Negative 
    // console.log(await page.locator("[style*='block']").textContent());
    // await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    console.log(await page.locator(".card-title a").first().textContent()); // 1st device name or you can use nth for all
    console.log(await page.locator(".card-title a").nth(1).textContent()); // 2nd device name
    console.log(await page.locator(".card-title a").last().textContent()); // last device name


});

test("UI Dropdown, Radio button", async({page}) => {
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".checkmark").last().click();
    await expect(page.locator(".checkmark").last()).toBeChecked(); // assertions for checkbox
    await page.locator("#okayBtn").click();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked(); // here await comes first because action method 'toBeChecked()' comes last
    await page.locator("#terms").uncheck(); // uncheck checkbox
    expect(await page.locator("#terms").isChecked()).toBeFalsy; // here expect comes first because action method presents in the middle
    

    //await page.pause();
})

test("ChildParent Handling", async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator("#username");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const documentLink = page.locator("[href*='documents-request']");
    await expect(documentLink).toHaveAttribute('class','blinkingText');

    const [newpage] = await Promise.all([                   // Using Promise.all for the testcases you want to execute parallely
    context.waitForEvent('page'),   // In this case, you can't put await.. waitForEvent will wait for a page that opens in background
    documentLink.click(),            // Performing a new page is going to open
    ]);

    const childText = await newpage.locator(".red").textContent();
    console.log(childText);
    const arrayText =  childText.split("@");
    const name =  arrayText[1].split(" ")[0];
    //console.log(name);
    await username.fill(name);
    console.log(await username.inputValue());
    await page.pause();
    


})


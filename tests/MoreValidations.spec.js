const {test,expect} = require("@playwright/test");

test("@WEB MoreValidations&Frames", async({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    page.on("dialog", dialog => dialog.accept());
    await page.locator("#alertbtn").click();

    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();
    const subs = await framePage.locator(".text h2").textContent();
    console.log(await subs.split(" ")[1]);

})
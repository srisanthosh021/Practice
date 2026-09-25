const {test, expect} = require("@playwright/test");

test("@WEB GetBy", async({page})=>{
    // const slowExpect = expect.configure({ timeout:12000});  - Test Level Assertion it waits for whole test only when you use 'slowExpect' variable
    // await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByLabel("Employed").check(); // for checkbox & radiobutton we can use click() or check()
    // await page.getByLabel("Password").fill("Sandy"); - getbyLabel which is better only it's use for selection.. not like typing in textbox or other validations
    await page.getByPlaceholder("Password").fill("Sandy0202");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    // Step level assertion waits 10 seconds only for this step
    // await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({ timeout:10000});
    await page.getByRole("link", {name: "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'iphone X'}).getByRole("button").click(); // app-card locator has 4 mobile cards.. from there we're filtering to select one
})
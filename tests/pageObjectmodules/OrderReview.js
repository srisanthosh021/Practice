const { expect } = require("@playwright/test");
class OrderReview {

    constructor(page) {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']")
        this.dropdown = page.locator(".ta-results");
        this.email = page.locator(".user__name [type='text']").first();
        this.submit = page.locator(".btnn");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async searchCountry(countrycode, countryName) {
        await this.country.pressSequentially(countrycode);
        await this.dropdown.waitFor(); // waiting for the options to opwn
        const optionsCount = await this.dropdown.locator("button").count(); // Want to know how many options displaying to iterate each of them 

        for (let i = 0; i < optionsCount; ++i) {
            const text = await this.dropdown.locator("button").nth(i).textContent(); // using textcontent() to check 'india' option
            if (text.trim() === countryName) {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

    async VerifyEmail(username) {
        await expect(this.email).toHaveText(username);
    }

    async submitOrder() {
        await this.submit.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        return await this.orderId.textContent();
    }


}
module.exports = { OrderReview };
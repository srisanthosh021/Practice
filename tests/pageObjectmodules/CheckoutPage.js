const { expect } = require("@playwright/test");
class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.checkout = page.locator("text=Checkout");
    }
    async VerifyCheckoutProduct(productName) {
        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(productName).isVisible(); //getting elements from text with tagname
        expect(bool).toBeTruthy();
    }

    async Checkout(){
        await this.checkout.click()
    }

    getProductLocator(productName) {
        return this.page.locator("h3:has-text('"+productName+"')");
    }

}
module.exports = { CheckoutPage };
const { expect } = require("@playwright/test");
class DashboardPage {

    constructor(page) {
        this.products = page.locator(".card-body");
        this.productText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("[routerlink*='myorders']").first();
    }

    async SearchProductAddCart(productName) {
        await this.products.first().waitFor();
        const titles = await this.productText.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        for (let i = 0; i < count; ++i) { 
            const product = this.products.nth(i);
            const productTitle = await product.locator("b").textContent();
            console.log(productTitle); // using for loop to iterate every products
            if (await productTitle.trim() == productName) { // filtering one product which is matching the value we gave before
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }
    async navigationCart() {
        await this.cart.click()
    }

    async navigationToOrders(){
        await this.orders.click();
    }

}

module.exports = { DashboardPage };
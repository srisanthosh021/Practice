const { expect } = require("@playwright/test");
class OrderHistory {

    constructor(page) {
        this.page = page;
        this.orders = page.locator("h1:has-text('Your Orders')");
        this.orderidlist = page.locator(".table .ng-star-inserted");
        this.orderIdDetails = page.locator(".col-text");
    }
    
    async searchOrderAndSelect(orderId){
        await this.orders.waitFor();
        const orderIdCount = await this.orderidlist.count();
        for(let i=0; i<orderIdCount; ++i) {
            const id = await this.orderidlist.nth(i).locator("th").textContent();
            if(orderId.includes(id)){
                await this.orderidlist.nth(i).locator("td button:has-text('View')").click();
                break;
            }
        }
    }

    async getOrderId(){
        await this.page.locator(".email-title").waitFor();
        return await this.orderIdDetails.textContent();
    }
    
}
module.exports = {OrderHistory};
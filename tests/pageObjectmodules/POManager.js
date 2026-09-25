const { DashboardPage } = require("./DashboardPage");
const { LoginClient } = require("./LoginClient");
const { CheckoutPage } = require("./CheckoutPage");
const { OrderReview } = require("./OrderReview");
const { OrderHistory } = require("./OrderHistory");

class POManager {

    constructor(page) {
        this.page = page;
        this.loginpage = new LoginClient(this.page);
        this.dashboardpage = new DashboardPage(this.page);
        this.checkoutpage = new CheckoutPage(this.page);
        this.orderReview = new OrderReview(this.page);
        this.orderHistory = new OrderHistory(this.page);
    }

    getLoginPage(){
        return this.loginpage;
    }

    getDashboard() {
        return this.dashboardpage;
    }

    getCheckout() {
        return this.checkoutpage;
    }

    getOrderReview(){
        return this.orderReview;
    }

    getOrderHistory() {
        return this.orderHistory;
    }

}
module.exports = { POManager };
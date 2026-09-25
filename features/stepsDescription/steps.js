const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect, chromium } = require('@playwright/test');
const { POManager } = require('../../tests/pageObjectmodules/POManager');
setDefaultTimeout(60 * 1000);

Given('a user credentials {string} and {string} for login', async function (username, password) {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    this.pomanager = new POManager(page);
    this.username = username;

    const loginpage = this.pomanager.getLoginPage();

    await loginpage.goto();
    await loginpage.validLogin(username, password);
});

When('Add {string} added to cart', async function (productName) {

    this.dashboardPage = this.pomanager.getDashboard();

    await this.dashboardPage.SearchProductAddCart(productName);
    await this.dashboardPage.navigationCart();
});

Then('verify added {string} to cart', async function (productName) {

    const checkoutpage = this.pomanager.getCheckout();

    await checkoutpage.VerifyCheckoutProduct(productName);
    await checkoutpage.Checkout();
});

When('Enter the details and placing the order', async function () {

    const orderreview = this.pomanager.getOrderReview();

    await orderreview.searchCountry("ind", "India");
    await orderreview.VerifyEmail(this.username);

    this.orderId = await orderreview.submitOrder();

    console.log(this.orderId);
});

Then('verify the order id present in order history', async function () {

    await this.dashboardPage.navigationToOrders();

    const orderhistory = this.pomanager.getOrderHistory();

    await orderhistory.searchOrderAndSelect(this.orderId);

    expect(
        this.orderId.includes(await orderhistory.getOrderId())
    ).toBeTruthy();
});
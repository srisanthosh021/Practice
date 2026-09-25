const {test, expect} = require('@playwright/test');
const {POManager} = require('./pageObjectmodules/POManager');
const dataset = JSON.parse(JSON.stringify(require('../utils/placeOrderData.json')));

for(const data of dataset){  // using for loop to test with multiple profiles
test(`@WEB Client Login ${data.productName}`, async({page})=> {

    const pomanager = new POManager(page);
    const loginpage = pomanager.getLoginPage();
    await loginpage.goto();
    const email = process.env[`${data.user}_EMAIL`];
    const password = process.env[`${data.user}_PASSWORD`];
    await loginpage.validLogin(email,password);
    const dashboardPage = pomanager.getDashboard();
    await dashboardPage.SearchProductAddCart(data.productName);
    await dashboardPage.navigationCart();
    const checkoutpage = pomanager.getCheckout();
    await checkoutpage.VerifyCheckoutProduct(data.productName);
    await checkoutpage.Checkout();
    const orderreview = pomanager.getOrderReview();
    await orderreview.searchCountry("ind","India");
    await orderreview.VerifyEmail(email);
    const orderId = await orderreview.submitOrder();
    console.log(orderId)
    await dashboardPage.navigationToOrders();
    const orderhistory = pomanager.getOrderHistory();
    await orderhistory.searchOrderAndSelect(orderId);
    expect(orderId.includes(await orderhistory.getOrderId())).toBeTruthy();
});
};
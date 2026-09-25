const { expect } = require("@playwright/test");
class LoginClient {

    constructor (page) {
        this.page = page;
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signin = page.locator("#login");
    }

    async goto(){
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    }

    async validLogin(username, password){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.signin.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {LoginClient};
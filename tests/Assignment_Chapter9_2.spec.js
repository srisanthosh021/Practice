const {test, expect} = require("@playwright/test");
// Setup
const BASEURL = "https://eventhub.rahulshettyacademy.com";
const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASS = process.env.USER_PASS;

async function login(page) {
    await page.goto(`${BASEURL}/login`);
    await page.getByPlaceholder("you@email.com").fill(USER_EMAIL);
    await page.getByLabel("Password").fill(USER_PASS);
    await page.locator("#login-btn").click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}
//Step 1
test("Single ticket booking is eligible for refund", async ({page}) => {
    await login(page);

//Step 2
    await page.goto(`${BASEURL}/events`);
    await page.getByTestId("event-card").last().getByTestId("book-now-btn").click();
    await page.getByLabel("Full Name").fill("Santhosh");
    await page.locator("#customer-email").fill("srisanthosh021@gmail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("9876543210");
    await page.locator(".confirm-booking-btn").click();

//Step 3
    await page.getByRole("link", {name: "View My Bookings"}).click();
    await expect(page).toHaveURL(`${BASEURL}/bookings`);
    await page.getByRole("button", {name: "View Details"}).first().click();
    await expect(page.getByText("Booking Information")).toBeVisible();

//Step 4
    const bookingRef = await page.locator("span.font-mono.font-bold").innerText();
    const eventTitle = await page.locator("h1.font-bold").innerText();
    await expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

// Step 5
    await page.locator("#check-refund-btn").click();
    await expect(page.locator('#refund-spinner')).toBeVisible();
    await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });

// Step 6
    const eligibleRef = await page.locator("#refund-result");
    await expect(eligibleRef).toBeVisible();
    await expect(eligibleRef).toContainText("Eligible for refund");
    await expect(eligibleRef).toContainText("Single-ticket bookings qualify for a full refund");

})

//TEST 2 - Step 1
test("Group ticket booking is NOT eligible for refund",async({page}) => {
    await login(page);

//Step 2
    await page.goto(`${BASEURL}/events`);
    await page.getByTestId("event-card").last().getByTestId("book-now-btn").click();
    await page.locator("button").filter({hasText: "+"}).click();
    await page.locator("button").filter({hasText: "+"}).click();
    await page.getByLabel("Full Name").fill("Santhosh");
    await page.locator("#customer-email").fill("srisanthosh021@gmail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("9876543210");
    await page.locator(".confirm-booking-btn").click();

//Step 3
    await page.getByRole("link", {name: "View My Bookings"}).click();
    await expect(page).toHaveURL(`${BASEURL}/bookings`);
    await page.getByRole("button", {name: "View Details"}).first().click();
    await expect(page.getByText("Booking Information")).toBeVisible();

//Step 4
    const bookingRef = await page.locator("span.font-mono.font-bold").innerText();
    const eventTitle = await page.locator("h1.font-bold").innerText();
    await expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

// Step 5
    await page.locator("#check-refund-btn").click();
    await expect(page.locator('#refund-spinner')).toBeVisible();
    await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });

//Step 6
    const notEligibleRef = await page.locator("#refund-result");
    await expect(notEligibleRef).toBeVisible();
    await expect(notEligibleRef).toContainText("Not eligible for refund");
    await expect(notEligibleRef).toContainText("Group bookings (3 tickets) are non-refundable");

})

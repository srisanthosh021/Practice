const {test, expect} = require("@playwright/test");
// Step 1
const BASEURL = "https://eventhub.rahulshettyacademy.com";
const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASS = process.env.USER_PASS;

async function login (page) {
    await page.goto(`${BASEURL}/login`);
    await page.getByPlaceholder("you@email.com").fill(USER_EMAIL);
    await page.getByLabel("Password").fill(USER_PASS);
    await page.locator("#login-btn").click();
    await expect(page.getByText("Browse Events →")).toBeVisible();
}
//Step 2
test("Create a new event", async({page}) => {
    await login(page);
    await page.goto(`${BASEURL}/admin/events`);
    const uniqueName = `Test Event ${Date.now()}`;
    await page.locator("#event-title-input").fill(uniqueName);
    await page.locator("#admin-event-form textarea").fill("I want three tickets for the Weekend concert");
    await page.getByLabel("City").fill("Chennai");
    await page.getByLabel("Venue").fill("301 W 2nd St, Austin TX 78701");
    await page.getByLabel("Event Date & Time").fill("2027-12-31T10:00")
    await page.getByLabel("Price ($)").fill("100");
    await page.getByLabel("Total Seats").fill("50");
    await page.locator("#add-event-btn").click();
    await expect(page.getByText("Event created!")).toBeVisible();
    console.log(await uniqueName)

    //Step 3
    await page.goto(`${BASEURL}/events`);
    const eventCards = await page.locator("[data-testid='event-card']");
    await expect(eventCards.first()).toBeVisible();
    const targetCard = await eventCards.filter({hasText: uniqueName});
    await expect(targetCard).toBeVisible({ timeout:5000 });
    const seatsBeforeBooking = parseInt(await targetCard.getByText('seat').first().innerText());
    console.log(`Seats before booking: ${seatsBeforeBooking}`);

    //Step 4
    await targetCard.getByTestId("book-now-btn").click();

    //Step 5
    await expect(page.locator("#ticket-count")).toHaveText("1");
    await page.getByLabel("Full Name").fill("Santhosh");
    await page.locator("#customer-email").fill("srisanthosh021@gmail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("+91 9587639480");
    await page.locator(".confirm-booking-btn").click();

    //Step 6
    const bookingRefEl = await page.locator(".booking-ref").first();
    await expect(bookingRefEl).toBeVisible();
    const bookingRef = (await bookingRefEl.innerText()).trim();
    console.log(`Booking confirmed. Ref: ${bookingRef}`);

    //Step 7
    await page.getByRole("button", {name: "View My Bookings"}).click();
    await expect(page).toHaveURL(`${BASEURL}/bookings`);
    const bookingCard = await page.locator("#booking-card");
    await expect(bookingCard.first()).toBeVisible();
    
    const matchingCard = await bookingCard.filter({has: page.locator(".booking-ref", {hasText: bookingRef})});
    await expect(matchingCard).toBeVisible();
    await expect(matchingCard).toContainText(uniqueName);

    //Step 8
    await page.goto(`${BASEURL}/events`);
    await expect(page.locator("#event-card").first()).toBeVisible();
    const ourEvent = await page.locator("#event-card").filter({hasText:uniqueName});
    await expect(ourEvent).toBeVisible();
    const seatsAfterBooking = parseInt(await ourEvent.getByText('seat').first().innerText());
    console.log(`${uniqueName} Event seats available after booking: ${seatsAfterBooking}`);
    await expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1); 














})
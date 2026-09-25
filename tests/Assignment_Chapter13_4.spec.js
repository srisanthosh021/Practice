const { test, expect } = require('@playwright/test');
const BASEURL = "https://eventhub.rahulshettyacademy.com";
const APIURL = `${BASEURL}/api`

const YAHOO_USER = { email: process.env.YAHOO_EMAIL, password: process.env.YAHOO_PASS };
const GMAIL_USER = { email: process.env.YAHOO0_EMAIL, password: process.env.YAHOO0_PASS };

async function login(page, user) {
    await page.goto(`${BASEURL}/login`);
    await page.getByPlaceholder("you@email.com").fill(user.email);
    await page.getByLabel("Password").fill(user.password);
    await page.locator("#login-btn").click();
    await expect(page.getByText("Browse Events →")).toBeVisible();
    await page.goto(`${BASEURL}/events`);
}

test("gmail user sees Access Denied when viewing yahoo user booking", async ({ page, request }) => {
    const loginRes = await request.post(`${APIURL}/auth/login`, {
        data: {
            email: YAHOO_USER.email,
            password: YAHOO_USER.password
        },
    })
    expect(loginRes.ok()).toBeTruthy();
    const { token } = await loginRes.json();

    //Step 2
    const eventsapi = await request.get(`${APIURL}/events`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    expect(eventsapi.ok()).toBeTruthy();
    const eventData = await eventsapi.json();
    const eventId = eventData.data[0].id;

    console.log(`Fetch events via API to get a valid event ID: ${eventId}`);

    //Step 3
    const bookingsApi = await request.post(`${APIURL}/bookings`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            eventId: eventId,

            customerName: 'Yahoo user',

            customerEmail: YAHOO_USER.email,

            customerPhone: '9876543210',

            quantity: 1,
        }
    });
    expect(bookingsApi.ok()).toBeTruthy();
    const bookingsData = await bookingsApi.json();
    const bookingsId = bookingsApi.data.id;

    console.log(`Create a booking via API as Yahoo user : ${bookingsId}`);

    //Step 4
    await login(page, GMAIL_USER);

    //Step 5
    await page.goto(`${BASEURL}/bookings/${bookingsId}`, { waitUntil: 'networkidle' });

    //Step 6
    await expect(page.getByText("Access Denied")).toBeVisible();
    await expect(page.getByText("You are not authorized to view this booking")).toBeVisible();


})
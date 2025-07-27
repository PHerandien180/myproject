const { test, expect, request } = require('@playwright/test');

let authToken;
let bookingid;

test.beforeAll(async () => {
  const context = await request.newContext();

  // Authenticate and get token
  const authResponse = await context.post('https://restful-booker.herokuapp.com/auth', {
    data: {
      username: 'admin',
      password: 'password123',
    },
  });

  expect(authResponse.status()).toBe(200);
  const authBody = await authResponse.json();
  authToken = authBody.token;
  console.log('Token generated:', authToken);

  
  const bookingResponse = await context.post('https://restful-booker.herokuapp.com/booking', {
    data: {
      firstname: 'Jim',
      lastname: 'Brown',
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-01-01',
        checkout: '2019-01-01',
      },
      additionalneeds: 'Breakfast',
    },
  });

  expect(bookingResponse.status()).toBe(200);
  const bookingBody = await bookingResponse.json();
  bookingid = bookingBody.bookingid;
  console.log('Booking ID created:', bookingid);
});

test('Update booking via PUT API call', async () => {
  expect(bookingid).toBeDefined();
  expect(authToken).toBeDefined();

  const context = await request.newContext();
  const response = await context.put(`https://restful-booker.herokuapp.com/booking/${bookingid}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cookie': `token=${authToken}`,
    },
    data: {
      firstname: 'James',
      lastname: 'Brown',
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-01-01',
        checkout: '2019-01-01',
      },
      additionalneeds: 'Lunch',
    },
  });

  expect(response.status()).toBe(200);
  const updatedBody = await response.json();
  console.log('Updated Booking:', updatedBody);
});

test('Delete booking via DELETE API call', async () => {
  expect(bookingid).toBeDefined();
  expect(authToken).toBeDefined();

  const context = await request.newContext();
  const response = await context.delete(`https://restful-booker.herokuapp.com/booking/${bookingid}`, {
    headers: {
      'Cookie': `token=${authToken}`,
    },
  });

  expect(response.status()).toBe(201);
  console.log('Booking deleted successfully');
});

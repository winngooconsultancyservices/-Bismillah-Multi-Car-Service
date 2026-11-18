import assert from 'assert';

const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('--- STARTING WINNGOO CAR SERVICE AUTOMATED TEST SUITE ---\n');

  // Test 1: Health Check
  console.log('Test 1: Health Check Endpoint');
  const healthRes = await fetch(`${BASE_URL}/health`);
  const health = await healthRes.json();
  assert.strictEqual(health.status, 'OK');
  assert.strictEqual(health.businessModel, '100% Doorstep / At-Home Car Service');
  console.log('✓ Health check passed:', health.status, '| Business Model:', health.businessModel);

  // Test 2: Public Config Endpoint
  console.log('\nTest 2: Config Endpoint');
  const configRes = await fetch(`${BASE_URL}/config`);
  const configData = await configRes.json();
  assert.strictEqual(configData.success, true);
  assert(configData.config.service_areas.length > 0, 'Service areas should not be empty');
  assert(configData.config.business_whatsapp, 'Business WhatsApp must exist');
  console.log('✓ Config passed: Areas count =', configData.config.service_areas.length, '| WhatsApp =', configData.config.business_whatsapp);

  // Test 3: Form Validation Error Check
  console.log('\nTest 3: Booking Form Validation Check');
  const invalidRes = await fetch(`${BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: '', // empty
      mobileNumber: '',
      customerLocation: '',
      carBrand: '',
      carModel: '',
      requiredService: '',
      preferredDate: '',
      preferredTime: '',
    }),
  });
  const invalidData = await invalidRes.json();
  assert.strictEqual(invalidRes.status, 400);
  assert.strictEqual(invalidData.success, false);
  assert(invalidData.errors.length > 0, 'Should return validation errors');
  console.log('✓ Validation rejected empty form as expected with', invalidData.errors.length, 'errors');

  // Test 4: Successful Doorstep Booking Creation
  console.log('\nTest 4: Doorstep Booking Creation & WhatsApp Formatting');
  const newBookingPayload = {
    customerName: 'Siddharth Roy',
    mobileNumber: '9876543210',
    customerLocation: 'Tower 4, Apt 802, Prestige Highline, Central Zone',
    carBrand: 'Honda',
    carModel: 'City ZX 2022',
    requiredService: 'General Car Service',
    preferredDate: '2026-11-25',
    preferredTime: '10:00 AM - 12:00 PM',
    additionalDetails: 'Full 40-point doorstep periodic inspection and synthetic oil',
  };

  const createRes = await fetch(`${BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBookingPayload),
  });
  const createData = await createRes.json();
  assert.strictEqual(createRes.status, 201);
  assert.strictEqual(createData.success, true);
  assert(createData.bookingId.startsWith('WNG-'), 'Booking ID must start with WNG-');
  assert.strictEqual(createData.booking.status, 'Pending');
  assert(createData.whatsappUrl.includes('https://wa.me/'), 'Must generate valid wa.me URL');
  assert(createData.messageText.includes(createData.bookingId), 'WhatsApp message must include Booking ID');
  assert(createData.messageText.includes('Doorstep Address'), 'WhatsApp message must include Doorstep Address');
  console.log('✓ Booking created successfully in MongoDB:');
  console.log('   - ID:', createData.bookingId);
  console.log('   - WhatsApp URL:', createData.whatsappUrl.slice(0, 60) + '...');

  const createdId = createData.booking._id;

  // Test 5: Admin Login & JWT
  console.log('\nTest 5: Admin Authentication');
  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'admin123' }),
  });
  const loginData = await loginRes.json();
  assert.strictEqual(loginRes.status, 200);
  assert.strictEqual(loginData.success, true);
  assert(loginData.token, 'Must return JWT token');
  console.log('✓ Admin authenticated successfully. JWT token issued.');

  const adminToken = loginData.token;

  // Test 6: Protected Bookings Retrieval with Search & Filter
  console.log('\nTest 6: Protected Bookings API with Search');
  const bookingsRes = await fetch(`${BASE_URL}/bookings?search=Siddharth`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const bookingsData = await bookingsRes.json();
  assert.strictEqual(bookingsData.success, true);
  assert(bookingsData.bookings.some(b => b.customerName === 'Siddharth Roy'), 'Search should return the newly created booking');
  console.log('✓ Protected bookings query returned matching records:', bookingsData.bookings.length);

  // Test 7: Update Booking Status
  console.log('\nTest 7: Update Status to Confirmed');
  const updateRes = await fetch(`${BASE_URL}/bookings/${createdId}/status`, {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`
    },
    body: JSON.stringify({ status: 'Confirmed' }),
  });
  const updateData = await updateRes.json();
  assert.strictEqual(updateData.success, true);
  assert.strictEqual(updateData.booking.status, 'Confirmed');
  console.log('✓ Booking status successfully updated to Confirmed');

  // Test 8: Booking Metrics & Stats
  console.log('\nTest 8: Booking Stats');
  const statsRes = await fetch(`${BASE_URL}/bookings/stats`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const statsData = await statsRes.json();
  assert.strictEqual(statsData.success, true);
  assert(statsData.stats.total >= 1, 'Stats total should reflect created bookings');
  console.log('✓ Metrics verified:', statsData.stats);

  console.log('\n🎉 ALL 8 AUTOMATED TESTS PASSED SUCCESSFULLY!');
}

runTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});

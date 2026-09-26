import { submitBooking } from './app/booking/actions'

async function test() {
  const result = await submitBooking({
    name: 'Test',
    email: 'test@example.com',
    phone: '123',
    service: 'Test',
    preferred_date: 'Test',
    location: 'Test',
    message: 'This is a test message with more than 25 characters to pass validation.'
  })
  console.log('Result:', result)
}

test().catch(console.error)

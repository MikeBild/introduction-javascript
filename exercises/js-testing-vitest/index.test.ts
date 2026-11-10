// Lesson js-testing-vitest: Test behavior with Vitest, not details
// Duration: about 25 minutes
//
// Exercise: Write the tests for index.ts. Replace every it.todo with a real test.
// - Test behavior (result, errors), not how the function works internally.
// - Async: await expect(…).resolves / .rejects.toThrow('…') instead of done callbacks.
// - waitForPayment waits a real 3 seconds. Use fake timers:
//   vi.useFakeTimers() and await vi.advanceTimersByTimeAsync(3000).
// A solution is in solution/index.test.ts.
//
// Check: npm test -- js-testing-vitest

import { describe, expect, it } from 'vitest'
import { orders } from '#shop'
import { orderTotal } from './index.ts'

describe('orderTotal', () => {
  it('sums quantity × priceCents', () => {
    const [first] = orders()
    expect(orderTotal(first!)).toBe(3397)
  })
  it.todo('returns 0 for an order without line items')
})

describe('placeOrder', () => {
  it.todo('sets a draft order to placed')
  it.todo('rejects an order without line items')
  it.todo('rejects an order when the stock is not sufficient')
  it.todo('rejects an order that is not in status draft')
})

describe('waitForPayment', () => {
  it.todo('returns paid as soon as the payment arrives – without real waiting')
  it.todo('gives up after three attempts')
})

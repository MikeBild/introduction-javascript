// Code under test for the lesson js-testing-vitest.
// You do not need to change anything here – your exercise is in index.test.ts.

import type { Order, Product } from '#shop'

export const orderTotal = (order: Order): number =>
  order.items.reduce((sum, item) => sum + item.quantity * item.priceCents, 0)

export const placeOrder = async (order: Order, products: readonly Product[]): Promise<Order> => {
  if (order.status !== 'draft') throw new Error(`Bestellung ${order.id} ist nicht im Status draft`)
  if (order.items.length === 0) throw new Error(`Bestellung ${order.id} hat keine Positionen`)
  for (const item of order.items) {
    const product = products.find((candidate) => candidate.id === item.productId)
    if (!product || product.stock < item.quantity) throw new Error(`Nicht genug Bestand: ${item.productId}`)
  }
  return { ...order, status: 'placed' }
}

// Asks every 3 seconds whether the payment has arrived – at most maxAttempts times.
export const waitForPayment = async (
  isPaid: () => Promise<boolean>,
  { intervalMs = 3000, maxAttempts = 3 } = {},
): Promise<'paid'> => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, intervalMs))
    if (await isPaid()) return 'paid'
  }
  throw new Error('Zahlung nicht eingegangen')
}

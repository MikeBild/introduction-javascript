// Code unter Test für die Lektion js-testing-vitest.
// Hier musst du nichts ändern – deine Aufgabe steht in index.test.ts.

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

// Fragt alle 3 Sekunden nach, ob die Zahlung da ist – höchstens maxAttempts Mal.
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

// Lesson js-array-methods: map, filter, reduce instead of loops
// Duration: about 20 minutes
//
// Exercise: Evaluate the orders without for, forEach and without mutation.
// 1. orderTotalCents: Σ quantity × priceCents of an order (reduce).
// 2. openOrdersTotal: sum of all open orders (status draft or placed).
// 3. topSellers: quantity per product across all orders except those with status cancelled,
//    sorted descending, ties broken by productId; the first n entries.
//    Hint: flatMap, reduce into an object or a Map, toSorted, slice.
//
// Check: npm test -- js-array-methods

import type { Order, ProductId } from '#shop'

export type Seller = { productId: ProductId; quantity: number }

export const orderTotalCents = (order: Order): number => {
  let total = 0
  for (let index = 0; index < order.items.length; index++) {
    total += order.items[index]!.quantity * order.items[index]!.priceCents
  }
  return total // TODO: write it as reduce
}

export const openOrdersTotal = (orders: readonly Order[]): number => {
  throw new Error('TODO: filter und reduce')
}

export const topSellers = (orders: readonly Order[], n: number): Seller[] => {
  throw new Error('TODO: flatMap, reduce, toSorted, slice')
}

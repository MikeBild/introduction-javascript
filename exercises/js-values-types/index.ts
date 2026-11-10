// Lesson js-values-types: When are two values equal in JavaScript?
// Duration: about 15 minutes
//
// Exercise
// 1. readRetries reads the number of retries for a payment. The test shows:
//    { retries: 0 } becomes 3 because || discards the 0 as “falsy”. Fix it with ??.
// 2. Write toCents: "12.99" → 1299. Careful, 12.99 * 100 is not exactly 1299.
// 3. Write isShallowEqual for two products: same keys, values equal per Object.is.
//
// Check: npm test -- js-values-types

import type { Product } from '#shop'

export const readRetries = (options: { retries?: number | null }): number => options.retries || 3

export const toCents = (euro: string): number => {
  throw new Error('TODO: Euro-String in ganze Cent umrechnen')
}

export const isShallowEqual = (a: Product, b: Product): boolean => {
  throw new Error('TODO: Keys und Werte mit Object.is vergleichen')
}

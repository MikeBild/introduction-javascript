// Lesson js-iterators-generators: Generators produce values only on demand
// Duration: about 20 minutes
//
// Exercise
// 1. naturals(): infinite generator 1, 2, 3, … (function* with while (true)).
// 2. firstEvenSquares(n): filter (even) and map (square) lazily via iterator helpers,
//    then take(n) and toArray(). Without take this would never end.
// 3. allOrders(fetchPage): async generator that queries a paginated API page by page
//    (cursor → next) and yields every order one at a time. It stops when next is missing.
//    Callers read it with for await … of.
//
// Check: npm test -- js-iterators-generators

import type { Order } from '#shop'

export type Page = { items: Order[]; next?: string }

export function* naturals(): Generator<number, never> {
  throw new Error('TODO: while (true) yield')
}

export const firstEvenSquares = (n: number): number[] => {
  throw new Error('TODO: naturals().filter(…).map(…).take(n).toArray()')
}

export async function* allOrders(fetchPage: (cursor?: string) => Promise<Page>): AsyncGenerator<Order> {
  throw new Error('TODO: Seiten laden, bis next fehlt')
}

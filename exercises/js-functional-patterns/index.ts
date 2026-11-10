// Lesson js-functional-patterns: Pure Functions in the core, side effects at the edge
// Duration: about 20 minutes
//
// Exercise
// 1. memoize: typed function with a Map as cache. A second call with
//    the same argument does not call fn again.
// 2. pipe: composes functions from left to right (reduce).
// 3. checkoutTotal: subtotal → 10 % discount → 19 % VAT, composed only from pipe and the
//    small Pure Functions.
// 4. stampOrder reads the clock directly (new Date()) – a side effect right in the core.
//    Pass the clock in as a parameter so the function becomes pure and testable.
//    Think about it: why must you never memoize stampOrder?
//
// Check: npm test -- js-functional-patterns

import type { Order, OrderItem } from '#shop'

export const memoize = <Arg, Value>(fn: (arg: Arg) => Value): ((arg: Arg) => Value) => {
  throw new Error('TODO: Map als Cache')
}

export const pipe =
  <Value>(...fns: Array<(value: Value) => Value>) =>
  (value: Value): Value => {
    throw new Error('TODO: fns.reduce')
  }

export const subtotal = (items: readonly OrderItem[]): number =>
  items.reduce((sum, item) => sum + item.quantity * item.priceCents, 0)

export const applyDiscount =
  (percent: number) =>
  (cents: number): number =>
    Math.round(cents * (1 - percent / 100))

export const addVat =
  (rate: number) =>
  (cents: number): number =>
    Math.round(cents * (1 + rate))

export const checkoutTotal = (items: readonly OrderItem[]): number => {
  throw new Error('TODO: pipe(applyDiscount(10), addVat(0.19)) auf subtotal anwenden')
}

// TODO: now as a parameter, e.g. (order, now: () => Date)
export const stampOrder = (order: Order): Order => ({ ...order, createdAt: new Date().toISOString() })

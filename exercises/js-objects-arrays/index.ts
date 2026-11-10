// Lesson js-objects-arrays: Create new values instead of changing old ones
// Duration: about 20 minutes
//
// Exercise: Write immutable updates for the cart. Use destructuring and spread,
// no push, no splice, no assignment to existing objects. The tests freeze
// the cart with Object.freeze – every mutation then throws a TypeError.
// 1. addItem: add a line item; if the product is already there, the quantity goes up.
// 2. setQuantity: set the quantity of a line item; 0 removes the line item.
// 3. applyCoupon: set meta.coupon (nested object, copy it level by level).
// Unchanged line items should stay the same objects (structural sharing).
//
// Check: npm test -- js-objects-arrays

import type { CustomerId, OrderItem, ProductId } from '#shop'

export type Cart = {
  customerId: CustomerId
  items: readonly OrderItem[]
  meta: { coupon?: string; currency: 'EUR' }
}

export const addItem = (cart: Cart, item: OrderItem): Cart => {
  throw new Error('TODO: neue Position oder höhere quantity, ohne Mutation')
}

export const setQuantity = (cart: Cart, productId: ProductId, quantity: number): Cart => {
  throw new Error('TODO: quantity setzen, 0 entfernt die Position')
}

export const applyCoupon = (cart: Cart, coupon: string): Cart => {
  throw new Error('TODO: meta kopieren und coupon setzen')
}

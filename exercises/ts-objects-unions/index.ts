// Lesson ts-objects-unions: Types describe exactly the allowed values
// Duration: about 20 minutes
//
// Exercise
// 1. Add the status 'cancelled' to the as-const list. OrderStatus follows automatically.
// 2. Write the type guard isStatus(value: unknown): value is OrderStatus.
// 3. Make tags in TaggedProduct readonly (readonly property and readonly string[]).
//    addTag returns a new product; duplicate tags are not added.
//
// Check: npm test -- ts-objects-unions and npm run typecheck:start

import type { Product } from '#shop'

export const ORDER_STATUSES = ['draft', 'placed', 'paid', 'shipped'] as const
export type OrderStatus = (typeof ORDER_STATUSES)[number]

export const isStatus = (value: unknown): boolean => {
  throw new Error('TODO: Type Guard über ORDER_STATUSES')
}

export type TaggedProduct = Product & { tags: string[] }

export const addTag = (product: TaggedProduct, tag: string): TaggedProduct => {
  product.tags.push(tag) // TODO: without mutation, without duplicates
  return product
}

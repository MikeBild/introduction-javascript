// Lesson ts-basics: Annotate boundaries, infer the rest
// Duration: about 15 minutes
//
// Exercise
// 1. formatPrice takes any and returns any. Annotate the parameter and the return type.
// 2. lineTotal has no return type. Leave it that way – TypeScript infers it.
//    Hover over lineTotal in your IDE and check what comes out.
// 3. parseQuantity receives data from outside (form, JSON). Replace any with unknown
//    and check the value: numbers and numeric strings, integer, at least 1.
//    Everything else throws a TypeError.
//
// Check: npm test -- ts-basics and npm run typecheck:start

import type { OrderItem } from '#shop'

export const formatPrice = (cents: any): any => `${(cents / 100).toFixed(2).replace('.', ',')} €`

export const lineTotal = (item: OrderItem) => item.quantity * item.priceCents

export const parseQuantity = (input: any): number => {
  return input // TODO: unknown instead of any, check the value
}

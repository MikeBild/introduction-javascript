// Lesson ts-branded-types: Branded types prevent swapped IDs
// Duration: about 20 minutes
//
// Exercise: OrderId and CustomerId are already brands – cancelOrder(orderId, customerId)
// no longer compiles. Do the same for money and email:
// 1. Cents, Euro and Email as brands (Brand<number, 'Cents'> etc.).
// 2. Smart constructors that check first and only then cast:
//    toCents (integer ≥ 0), toEuro (finite number ≥ 0), toEmail (contains exactly one @).
//    Invalid values throw a RangeError.
// 3. euroToCents converts euros to cents. addVat accepts only Cents – the tests prove
//    with @ts-expect-error that Euro and bare numbers do not get through.
// 4. OrderIdSchema: the same check as toOrderId, but with zod and .brand<'OrderId'>().
//
// Check: npm test -- ts-branded-types and npm run typecheck:start

import { z } from 'zod'

declare const brand: unique symbol
export type Brand<Base, Name extends string> = Base & { readonly [brand]: Name }

export type OrderId = Brand<string, 'OrderId'>
export type CustomerId = Brand<string, 'CustomerId'>

export const toOrderId = (raw: string): OrderId => {
  if (!/^o-\d+$/.test(raw)) throw new RangeError(`Ungültige OrderId: ${raw}`)
  return raw as OrderId
}

export const toCustomerId = (raw: string): CustomerId => {
  if (!/^c-\d+$/.test(raw)) throw new RangeError(`Ungültige CustomerId: ${raw}`)
  return raw as CustomerId
}

export const cancelOrder = (customerId: CustomerId, orderId: OrderId): string => `${customerId} storniert ${orderId}`

// TODO: as brands
export type Cents = number
export type Euro = number
export type Email = string

export const toCents = (value: number): Cents => {
  throw new Error('TODO: ganze Zahl ≥ 0 prüfen')
}

export const toEuro = (value: number): Euro => {
  throw new Error('TODO: endliche Zahl ≥ 0 prüfen')
}

export const toEmail = (raw: string): Email => {
  throw new Error('TODO: genau ein @ prüfen')
}

export const euroToCents = (euro: Euro): Cents => {
  throw new Error('TODO: runden und als Cents liefern')
}

export const addVat = (net: Cents, rate: number): Cents => Math.round(net * (1 + rate))

export const OrderIdSchema = z.string() // TODO: regex and brand

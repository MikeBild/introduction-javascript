// Lektion ts-branded-types: Branded Types verhindern vertauschte IDs
// Dauer: etwa 20 Minuten
//
// Aufgabe: OrderId und CustomerId sind schon Brands – cancelOrder(orderId, customerId)
// kompiliert nicht mehr. Mach dasselbe für Geld und E-Mail:
// 1. Cents, Euro und Email als Brands (Brand<number, 'Cents'> usw.).
// 2. Smart Constructors, die prüfen und erst dann casten:
//    toCents (ganze Zahl ≥ 0), toEuro (endliche Zahl ≥ 0), toEmail (enthält genau ein @).
//    Ungültige Werte werfen einen RangeError.
// 3. euroToCents rechnet Euro in Cents um. addVat nimmt nur Cents – die Tests beweisen
//    mit @ts-expect-error, dass Euro und nackte Zahlen nicht durchgehen.
// 4. OrderIdSchema: dieselbe Prüfung wie toOrderId, aber mit zod und .brand<'OrderId'>().
//
// Prüfen: npm test -- ts-branded-types und npm run typecheck:start

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

// TODO: als Brands
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

export const OrderIdSchema = z.string() // TODO: regex und brand

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

export type Cents = Brand<number, 'Cents'>
export type Euro = Brand<number, 'Euro'>
export type Email = Brand<string, 'Email'>

// Der Cast steht nur in den Smart Constructors – nach der Prüfung.
export const toCents = (value: number): Cents => {
  if (!Number.isInteger(value) || value < 0) throw new RangeError(`Ungültige Cents: ${value}`)
  return value as Cents
}

export const toEuro = (value: number): Euro => {
  if (!Number.isFinite(value) || value < 0) throw new RangeError(`Ungültiger Euro-Betrag: ${value}`)
  return value as Euro
}

export const toEmail = (raw: string): Email => {
  const [local, domain, ...rest] = raw.split('@')
  if (!local || !domain || rest.length > 0) throw new RangeError(`Ungültige E-Mail: ${raw}`)
  return raw as Email
}

export const euroToCents = (euro: Euro): Cents => toCents(Math.round(euro * 100))

export const addVat = (net: Cents, rate: number): Cents => Math.round(net * (1 + rate)) as Cents

export const OrderIdSchema = z.string().regex(/^o-\d+$/).brand<'OrderId'>()

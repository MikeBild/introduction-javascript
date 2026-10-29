import { describe, expect, expectTypeOf, it } from 'vitest'
import {
  addVat,
  cancelOrder,
  euroToCents,
  OrderIdSchema,
  toCents,
  toCustomerId,
  toEmail,
  toEuro,
  toOrderId,
  type Cents,
} from '#ex/ts-branded-types'

describe('IDs', () => {
  it('vertauschte IDs kompilieren nicht', () => {
    const orderId = toOrderId('o-7')
    const customerId = toCustomerId('c-42')
    expect(cancelOrder(customerId, orderId)).toBe('c-42 storniert o-7')
    // @ts-expect-error OrderId ist keine CustomerId
    cancelOrder(orderId, customerId)
  })
})

describe('Smart Constructors', () => {
  it('prüfen ihre Eingabe', () => {
    expect(toCents(1299)).toBe(1299)
    expect(() => toCents(12.99)).toThrow(RangeError)
    expect(() => toCents(-1)).toThrow(RangeError)
    expect(toEuro(12.99)).toBe(12.99)
    expect(() => toEuro(Number.NaN)).toThrow(RangeError)
    expect(toEmail('ada@example.org')).toBe('ada@example.org')
    expect(() => toEmail('ada.example.org')).toThrow(RangeError)
    expect(() => toEmail('a@b@c')).toThrow(RangeError)
  })
  it('rechnen Euro in Cents um', () => {
    expect(euroToCents(toEuro(19.99))).toBe(1999)
    expectTypeOf(euroToCents(toEuro(1))).toEqualTypeOf<Cents>()
  })
})

describe('addVat', () => {
  it('rechnet mit Cents', () => {
    expect(addVat(toCents(1000), 0.19)).toBe(1190)
  })
  it('nimmt keine Euro und keine nackten Zahlen', () => {
    // @ts-expect-error Euro ist nicht Cents
    addVat(toEuro(19.99), 0.19)
    // @ts-expect-error eine nackte number ist nicht Cents
    addVat(1999, 0.19)
  })
})

describe('OrderIdSchema', () => {
  it('prüft und brandet mit zod', () => {
    expect(OrderIdSchema.parse('o-7')).toBe('o-7')
    expect(OrderIdSchema.safeParse('x-7').success).toBe(false)
  })
  it('liefert einen gebrandeten Type', () => {
    const parsed = OrderIdSchema.parse('o-7')
    // @ts-expect-error ein nackter String ist keine geprüfte OrderId
    const unchecked: typeof parsed = 'o-8'
    expect(unchecked).toBe('o-8')
  })
})

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
  it('swapped IDs do not compile', () => {
    const orderId = toOrderId('o-7')
    const customerId = toCustomerId('c-42')
    expect(cancelOrder(customerId, orderId)).toBe('c-42 storniert o-7')
    // @ts-expect-error OrderId is not a CustomerId
    cancelOrder(orderId, customerId)
  })
})

describe('Smart Constructors', () => {
  it('check their input', () => {
    expect(toCents(1299)).toBe(1299)
    expect(() => toCents(12.99)).toThrow(RangeError)
    expect(() => toCents(-1)).toThrow(RangeError)
    expect(toEuro(12.99)).toBe(12.99)
    expect(() => toEuro(Number.NaN)).toThrow(RangeError)
    expect(toEmail('ada@example.org')).toBe('ada@example.org')
    expect(() => toEmail('ada.example.org')).toThrow(RangeError)
    expect(() => toEmail('a@b@c')).toThrow(RangeError)
  })
  it('convert euros to cents', () => {
    expect(euroToCents(toEuro(19.99))).toBe(1999)
    expectTypeOf(euroToCents(toEuro(1))).toEqualTypeOf<Cents>()
  })
})

describe('addVat', () => {
  it('calculates with Cents', () => {
    expect(addVat(toCents(1000), 0.19)).toBe(1190)
  })
  it('accepts neither Euro nor bare numbers', () => {
    // @ts-expect-error Euro is not Cents
    addVat(toEuro(19.99), 0.19)
    // @ts-expect-error a bare number is not Cents
    addVat(1999, 0.19)
  })
})

describe('OrderIdSchema', () => {
  it('checks and brands with zod', () => {
    expect(OrderIdSchema.parse('o-7')).toBe('o-7')
    expect(OrderIdSchema.safeParse('x-7').success).toBe(false)
  })
  it('returns a branded type', () => {
    const parsed = OrderIdSchema.parse('o-7')
    // @ts-expect-error a bare string is not a checked OrderId
    const unchecked: typeof parsed = 'o-8'
    expect(unchecked).toBe('o-8')
  })
})

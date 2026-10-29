import { describe, expect, it } from 'vitest'
import { addItem, applyCoupon, setQuantity, type Cart } from '#ex/js-objects-arrays'

const deepFreeze = <T>(value: T): T => {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(deepFreeze)
    Object.freeze(value)
  }
  return value
}

const createCart = (): Cart =>
  deepFreeze({
    customerId: 'c-1',
    items: [
      { productId: 'p-1', quantity: 1, priceCents: 1299 },
      { productId: 'p-2', quantity: 2, priceCents: 2450 },
    ],
    meta: { currency: 'EUR' },
  })

describe('addItem', () => {
  it('hängt eine neue Position an', () => {
    const cart = createCart()
    const next = addItem(cart, { productId: 'p-4', quantity: 1, priceCents: 8999 })
    expect(next.items.map((item) => item.productId)).toEqual(['p-1', 'p-2', 'p-4'])
    expect(cart.items).toHaveLength(2)
  })
  it('erhöht die quantity einer vorhandenen Position', () => {
    const cart = createCart()
    const next = addItem(cart, { productId: 'p-1', quantity: 2, priceCents: 1299 })
    expect(next.items[0]?.quantity).toBe(3)
    expect(next.items).toHaveLength(2)
    expect(next.items[1]).toBe(cart.items[1]) // unverändert, also dasselbe Objekt
  })
})

describe('setQuantity', () => {
  it('setzt die Menge', () => {
    const cart = createCart()
    const next = setQuantity(cart, 'p-2', 5)
    expect(next.items[1]?.quantity).toBe(5)
    expect(cart.items[1]?.quantity).toBe(2)
    expect(next.items[0]).toBe(cart.items[0])
  })
  it('entfernt die Position bei 0', () => {
    const next = setQuantity(createCart(), 'p-1', 0)
    expect(next.items.map((item) => item.productId)).toEqual(['p-2'])
  })
})

describe('applyCoupon', () => {
  it('setzt den Coupon und lässt das Original unverändert', () => {
    const cart = createCart()
    const next = applyCoupon(cart, 'WERKSTATT10')
    expect(next.meta).toEqual({ currency: 'EUR', coupon: 'WERKSTATT10' })
    expect(cart.meta.coupon).toBeUndefined()
    expect(next.items).toBe(cart.items)
  })
})

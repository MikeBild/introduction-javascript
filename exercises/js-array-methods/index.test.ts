import { describe, expect, it } from 'vitest'
import { orders, type Order } from '#shop'
import { openOrdersTotal, orderTotalCents, topSellers } from '#ex/js-array-methods'

const frozenOrders = (): readonly Order[] =>
  Object.freeze(orders().map((order) => Object.freeze({ ...order, items: Object.freeze([...order.items]) }) as Order))

describe('orderTotalCents', () => {
  it('summiert quantity × priceCents', () => {
    const [first] = orders()
    expect(orderTotalCents(first!)).toBe(2 * 1299 + 799)
  })
  it('liefert 0 für eine leere Bestellung', () => {
    const [first] = orders()
    expect(orderTotalCents({ ...first!, items: [] })).toBe(0)
  })
})

describe('openOrdersTotal', () => {
  it('summiert nur draft und placed', () => {
    expect(openOrdersTotal(frozenOrders())).toBe(8999 + 2450 + 1299)
  })
})

describe('topSellers', () => {
  it('liefert die meistverkauften Produkte ohne Stornos', () => {
    expect(topSellers(frozenOrders(), 2)).toEqual([
      { productId: 'p-1', quantity: 3 },
      { productId: 'p-2', quantity: 1 },
    ])
  })
  it('liefert alle, wenn n größer ist', () => {
    expect(topSellers(frozenOrders(), 10)).toHaveLength(4)
  })
})

describe('Stil', () => {
  it('verwendet keine for-Schleife und kein forEach', async () => {
    const { readFile } = await import('node:fs/promises')
    const dir = process.env.TARGET === 'solution' ? 'solution/' : ''
    const source = await readFile(new URL(`./${dir}index.ts`, import.meta.url), 'utf8')
    expect(source).not.toMatch(/\bfor\s*\(|\.forEach\(/)
  })
})

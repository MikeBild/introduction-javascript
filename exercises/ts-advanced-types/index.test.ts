import { describe, expect, expectTypeOf, it } from 'vitest'
import type { Product } from '#shop'
import { buildPath, type IsString, type IsStringStrict, type RouteParams, type Setters } from '#ex/ts-advanced-types'

describe('Setters', () => {
  it('erzeugt einen Setter pro Key', () => {
    expectTypeOf<Setters<Product>>().toEqualTypeOf<{
      setId: (value: string) => void
      setName: (value: string) => void
      setPriceCents: (value: number) => void
      setStock: (value: number) => void
    }>()
  })
})

describe('IsStringStrict', () => {
  it('verteilt sich nicht über Unions', () => {
    expectTypeOf<IsString<string | number>>().toEqualTypeOf<boolean>()
    expectTypeOf<IsStringStrict<string | number>>().toEqualTypeOf<false>()
    expectTypeOf<IsStringStrict<'paid'>>().toEqualTypeOf<true>()
  })
})

describe('RouteParams und buildPath', () => {
  it('liest die Parameter aus der Route', () => {
    expectTypeOf<RouteParams<'/orders/:orderId/items/:productId'>>().toEqualTypeOf<{
      orderId: string
      productId: string
    }>()
    expectTypeOf<RouteParams<'/products'>>().toEqualTypeOf<{}>()
  })
  it('setzt die Parameter ein', () => {
    expect(buildPath('/orders/:orderId/items/:productId', { orderId: 'o-1', productId: 'p-2' })).toBe(
      '/orders/o-1/items/p-2',
    )
    expect(buildPath('/products/:productId', { productId: 'p 1' })).toBe('/products/p%201')
  })
  it('meldet fehlende Parameter', () => {
    // @ts-expect-error productId fehlt
    expect(() => buildPath('/orders/:orderId/items/:productId', { orderId: 'o-1' })).not.toThrow()
  })
})

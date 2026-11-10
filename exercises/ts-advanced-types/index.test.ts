import { describe, expect, expectTypeOf, it } from 'vitest'
import type { Product } from '#shop'
import { buildPath, type IsString, type IsStringStrict, type RouteParams, type Setters } from '#ex/ts-advanced-types'

describe('Setters', () => {
  it('creates one setter per key', () => {
    expectTypeOf<Setters<Product>>().toEqualTypeOf<{
      setId: (value: string) => void
      setName: (value: string) => void
      setPriceCents: (value: number) => void
      setStock: (value: number) => void
    }>()
  })
})

describe('IsStringStrict', () => {
  it('does not distribute over unions', () => {
    expectTypeOf<IsString<string | number>>().toEqualTypeOf<boolean>()
    expectTypeOf<IsStringStrict<string | number>>().toEqualTypeOf<false>()
    expectTypeOf<IsStringStrict<'paid'>>().toEqualTypeOf<true>()
  })
})

describe('RouteParams and buildPath', () => {
  it('reads the parameters from the route', () => {
    expectTypeOf<RouteParams<'/orders/:orderId/items/:productId'>>().toEqualTypeOf<{
      orderId: string
      productId: string
    }>()
    expectTypeOf<RouteParams<'/products'>>().toEqualTypeOf<{}>()
  })
  it('fills in the parameters', () => {
    expect(buildPath('/orders/:orderId/items/:productId', { orderId: 'o-1', productId: 'p-2' })).toBe(
      '/orders/o-1/items/p-2',
    )
    expect(buildPath('/products/:productId', { productId: 'p 1' })).toBe('/products/p%201')
  })
  it('reports missing parameters', () => {
    // @ts-expect-error productId is missing
    expect(() => buildPath('/orders/:orderId/items/:productId', { orderId: 'o-1' })).not.toThrow()
  })
})

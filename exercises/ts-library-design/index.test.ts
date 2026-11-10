import { describe, expect, expectTypeOf, it } from 'vitest'
import { createClient, defineRoutes, retryDelays, type ClientOptions } from '#ex/ts-library-design'

describe('retryDelays', () => {
  it('knows none, fixed and exponential', () => {
    expect(retryDelays({ strategy: 'none' })).toEqual([])
    expect(retryDelays({ strategy: 'fixed', delayMs: 200, attempts: 3 })).toEqual([200, 200, 200])
    expect(retryDelays({ strategy: 'exponential', baseDelayMs: 100, maxAttempts: 4 })).toEqual([100, 200, 400, 800])
  })
})

describe('createClient', () => {
  it('sets defaults', () => {
    expect(createClient({ baseUrl: 'https://shop.example.org' })).toEqual({
      baseUrl: 'https://shop.example.org',
      timeoutMs: 5000,
      retryDelays: [],
    })
  })
  it('accepts exponential', () => {
    const client = createClient({
      baseUrl: 'https://shop.example.org',
      retry: { strategy: 'exponential', baseDelayMs: 50, maxAttempts: 3 },
    })
    expect(client.retryDelays).toEqual([50, 100, 200])
  })
  it('makes misuse impossible', () => {
    // @ts-expect-error baseUrl is missing
    createClient({})
    // @ts-expect-error exponential needs baseDelayMs
    createClient({ baseUrl: 'x', retry: { strategy: 'exponential', maxAttempts: 3 } })
    // @ts-expect-error baseDelayMs does not belong to fixed
    createClient({ baseUrl: 'x', retry: { strategy: 'fixed', delayMs: 1, attempts: 1, baseDelayMs: 1 } })
  })
  it('satisfies checks a config without widening the type', () => {
    const config = {
      baseUrl: 'https://shop.example.org',
      retry: { strategy: 'exponential', baseDelayMs: 100, maxAttempts: 2 },
    } satisfies ClientOptions
    expectTypeOf(config.retry.strategy).toEqualTypeOf<'exponential'>()
  })
})

describe('defineRoutes', () => {
  it('keeps the literal types', () => {
    const routes = defineRoutes({ products: '/products', order: '/orders/:orderId' })
    expect(routes.order).toBe('/orders/:orderId')
    expectTypeOf(routes.order).toEqualTypeOf<'/orders/:orderId'>()
  })
})

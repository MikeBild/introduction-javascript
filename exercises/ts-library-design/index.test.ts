import { describe, expect, expectTypeOf, it } from 'vitest'
import { createClient, defineRoutes, retryDelays, type ClientOptions } from '#ex/ts-library-design'

describe('retryDelays', () => {
  it('kennt none, fixed und exponential', () => {
    expect(retryDelays({ strategy: 'none' })).toEqual([])
    expect(retryDelays({ strategy: 'fixed', delayMs: 200, attempts: 3 })).toEqual([200, 200, 200])
    expect(retryDelays({ strategy: 'exponential', baseDelayMs: 100, maxAttempts: 4 })).toEqual([100, 200, 400, 800])
  })
})

describe('createClient', () => {
  it('setzt Defaults', () => {
    expect(createClient({ baseUrl: 'https://shop.example.org' })).toEqual({
      baseUrl: 'https://shop.example.org',
      timeoutMs: 5000,
      retryDelays: [],
    })
  })
  it('nimmt exponential an', () => {
    const client = createClient({
      baseUrl: 'https://shop.example.org',
      retry: { strategy: 'exponential', baseDelayMs: 50, maxAttempts: 3 },
    })
    expect(client.retryDelays).toEqual([50, 100, 200])
  })
  it('macht Fehlbedienung unmöglich', () => {
    // @ts-expect-error baseUrl fehlt
    createClient({})
    // @ts-expect-error exponential braucht baseDelayMs
    createClient({ baseUrl: 'x', retry: { strategy: 'exponential', maxAttempts: 3 } })
    // @ts-expect-error baseDelayMs gehört nicht zu fixed
    createClient({ baseUrl: 'x', retry: { strategy: 'fixed', delayMs: 1, attempts: 1, baseDelayMs: 1 } })
  })
  it('satisfies prüft eine Config, ohne den Type zu verbreitern', () => {
    const config = {
      baseUrl: 'https://shop.example.org',
      retry: { strategy: 'exponential', baseDelayMs: 100, maxAttempts: 2 },
    } satisfies ClientOptions
    expectTypeOf(config.retry.strategy).toEqualTypeOf<'exponential'>()
  })
})

describe('defineRoutes', () => {
  it('behält die Literal Types', () => {
    const routes = defineRoutes({ products: '/products', order: '/orders/:orderId' })
    expect(routes.order).toBe('/orders/:orderId')
    expectTypeOf(routes.order).toEqualTypeOf<'/orders/:orderId'>()
  })
})

import { describe, expect, it } from 'vitest'
import { fetchJson, handle } from '#ex/js-runtimes'

const get = (path: string) => handle(new Request(`http://shop.test${path}`))

describe('handle', () => {
  it('liefert die Produkte', async () => {
    const response = await get('/products')
    expect(response.status).toBe(200)
    expect(await response.json()).toHaveLength(4)
  })
  it('liefert ein einzelnes Produkt oder 404', async () => {
    expect(await (await get('/products/p-2')).json()).toMatchObject({ name: 'Schraubendreher-Set' })
    expect((await get('/products/p-99')).status).toBe(404)
  })
  it('hat eine /health-Route', async () => {
    const response = await get('/health')
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ status: 'ok' })
  })
})

describe('fetchJson', () => {
  // Ein fetch, das nie antwortet – außer das Signal bricht ab
  const hangingFetch = ((_url: string | URL | Request, init?: RequestInit) =>
    new Promise((_, reject) => {
      if (!init?.signal) return setTimeout(() => reject(new Error('fetchJson gibt kein signal mit')), 200)
      init.signal.addEventListener('abort', () => reject(init.signal?.reason), { once: true })
    })) as typeof fetch

  it('liest JSON über den Core – ganz ohne Server', async () => {
    const viaCore = ((input: string | URL | Request) => handle(new Request(input))) as typeof fetch
    await expect(fetchJson('http://shop.test/health', { fetchFn: viaCore })).resolves.toEqual({ status: 'ok' })
  })
  it('bricht nach timeoutMs mit einem TimeoutError ab', async () => {
    await expect(fetchJson('http://shop.test/slow', { timeoutMs: 20, fetchFn: hangingFetch })).rejects.toMatchObject({
      name: 'TimeoutError',
    })
  })
})

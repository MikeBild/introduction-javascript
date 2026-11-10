import { describe, expect, it } from 'vitest'
import { fetchJson, handle } from '#ex/js-runtimes'

const get = (path: string) => handle(new Request(`http://shop.test${path}`))

describe('handle', () => {
  it('returns the products', async () => {
    const response = await get('/products')
    expect(response.status).toBe(200)
    expect(await response.json()).toHaveLength(4)
  })
  it('returns a single product or 404', async () => {
    expect(await (await get('/products/p-2')).json()).toMatchObject({ name: 'Schraubendreher-Set' })
    expect((await get('/products/p-99')).status).toBe(404)
  })
  it('has a /health route', async () => {
    const response = await get('/health')
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ status: 'ok' })
  })
})

describe('fetchJson', () => {
  // A fetch that never answers – unless the signal aborts
  const hangingFetch = ((_url: string | URL | Request, init?: RequestInit) =>
    new Promise((_, reject) => {
      if (!init?.signal) return setTimeout(() => reject(new Error('fetchJson gibt kein signal mit')), 200)
      init.signal.addEventListener('abort', () => reject(init.signal?.reason), { once: true })
    })) as typeof fetch

  it('reads JSON through the core – without any server', async () => {
    const viaCore = ((input: string | URL | Request) => handle(new Request(input))) as typeof fetch
    await expect(fetchJson('http://shop.test/health', { fetchFn: viaCore })).resolves.toEqual({ status: 'ok' })
  })
  it('aborts after timeoutMs with a TimeoutError', async () => {
    await expect(fetchJson('http://shop.test/slow', { timeoutMs: 20, fetchFn: hangingFetch })).rejects.toMatchObject({
      name: 'TimeoutError',
    })
  })
})

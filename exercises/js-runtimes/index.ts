// Lesson js-runtimes: What runs in browsers, Node, Deno, and Bun?
// Duration: about 20 minutes
//
// Exercise: handle is a core built only from web standards (Request, Response, URL).
// It runs unchanged in Node, Deno, Bun and as a service worker in the browser.
// 1. Add the route GET /health → 200 with { status: 'ok' }.
// 2. fetchJson should abort after timeoutMs: pass fetch an AbortSignal.timeout(timeoutMs)
//    as signal. The error is then named 'TimeoutError'.
// 3. Start the core in different runtimes – only the adapter changes:
//    Node:  node exercises/js-runtimes/serve-node.ts   (then http://localhost:3000/products)
//    Deno:  Deno.serve(handle)
//    Bun:   Bun.serve({ fetch: handle })
//
// Check: npm test -- js-runtimes

import { products } from '#shop'

export const handle = async (request: Request): Promise<Response> => {
  const { pathname } = new URL(request.url)
  if (request.method !== 'GET') return Response.json({ error: 'METHOD_NOT_ALLOWED' }, { status: 405 })

  if (pathname === '/products') return Response.json(products())

  const match = /^\/products\/([^/]+)$/.exec(pathname)
  if (match) {
    const product = products().find((candidate) => candidate.id === match[1])
    return product ? Response.json(product) : Response.json({ error: 'NOT_FOUND' }, { status: 404 })
  }

  // TODO: /health
  return Response.json({ error: 'NOT_FOUND' }, { status: 404 })
}

export const fetchJson = async (
  url: string | URL,
  { timeoutMs = 5000, fetchFn = fetch }: { timeoutMs?: number; fetchFn?: typeof fetch } = {},
): Promise<unknown> => {
  const response = await fetchFn(url) // TODO: signal: AbortSignal.timeout(timeoutMs)
  if (!response.ok) throw new Error(`HTTP ${response.status} für ${url}`)
  return response.json()
}

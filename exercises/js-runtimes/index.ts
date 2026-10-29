// Lektion js-runtimes: Was läuft in Browser, Node, Deno und Bun?
// Dauer: etwa 20 Minuten
//
// Aufgabe: handle ist ein Core nur aus Web Standards (Request, Response, URL).
// Er läuft unverändert in Node, Deno, Bun und als Service Worker im Browser.
// 1. Ergänze die Route GET /health → 200 mit { status: 'ok' }.
// 2. fetchJson soll nach timeoutMs abbrechen: Gib fetch ein AbortSignal.timeout(timeoutMs)
//    als signal mit. Der Fehler heißt dann 'TimeoutError'.
// 3. Starte den Core in verschiedenen Runtimes – nur der Adapter ändert sich:
//    Node:  node exercises/js-runtimes/serve-node.ts   (dann http://localhost:3000/products)
//    Deno:  Deno.serve(handle)
//    Bun:   Bun.serve({ fetch: handle })
//
// Prüfen: npm test -- js-runtimes

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

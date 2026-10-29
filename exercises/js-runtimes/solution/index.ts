import { products } from '#shop'

export const handle = async (request: Request): Promise<Response> => {
  const { pathname } = new URL(request.url)
  if (request.method !== 'GET') return Response.json({ error: 'METHOD_NOT_ALLOWED' }, { status: 405 })

  if (pathname === '/health') return Response.json({ status: 'ok' })
  if (pathname === '/products') return Response.json(products())

  const match = /^\/products\/([^/]+)$/.exec(pathname)
  if (match) {
    const product = products().find((candidate) => candidate.id === match[1])
    return product ? Response.json(product) : Response.json({ error: 'NOT_FOUND' }, { status: 404 })
  }

  return Response.json({ error: 'NOT_FOUND' }, { status: 404 })
}

export const fetchJson = async (
  url: string | URL,
  { timeoutMs = 5000, fetchFn = fetch }: { timeoutMs?: number; fetchFn?: typeof fetch } = {},
): Promise<unknown> => {
  const response = await fetchFn(url, { signal: AbortSignal.timeout(timeoutMs) })
  if (!response.ok) throw new Error(`HTTP ${response.status} für ${url}`)
  return response.json()
}

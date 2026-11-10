// Lesson ts-library-design: APIs that make wrong calls impossible
// Duration: about 25 minutes
//
// Exercise: createClient is the public API of a small shop API client.
// 1. Add the variant
//    { strategy: 'exponential'; baseDelayMs: number; maxAttempts: number } to RetryOptions.
//    retryDelays returns baseDelayMs × 2^i for it, e.g. [100, 200, 400].
// 2. Misuse should not compile – the tests pin that down with @ts-expect-error:
//    createClient without baseUrl, exponential without baseDelayMs, fixed with baseDelayMs.
// 3. defineRoutes should keep the literal types of the paths (const type parameter)
//    so that routes.order has the type '/orders/:orderId' instead of string.
// 4. Bonus: generate the type declarations and look at them:
//    npx tsc exercises/ts-library-design/solution/index.ts --declaration --emitDeclarationOnly
//      --allowImportingTsExtensions --outDir dist
//    Read dist/index.d.ts: that is all the users of your library see.
//
// Check: npm test -- ts-library-design and npm run typecheck:start

export type RetryOptions = { strategy: 'none' } | { strategy: 'fixed'; delayMs: number; attempts: number }
// TODO: exponential

export type ClientOptions = {
  baseUrl: string
  timeoutMs?: number
  retry?: RetryOptions
}

export type Client = {
  baseUrl: string
  timeoutMs: number
  retryDelays: number[]
}

export const retryDelays = (retry: RetryOptions): number[] => {
  switch (retry.strategy) {
    case 'none':
      return []
    case 'fixed':
      return Array.from({ length: retry.attempts }, () => retry.delayMs)
  }
}

export const createClient = (options: ClientOptions): Client => ({
  baseUrl: options.baseUrl,
  timeoutMs: options.timeoutMs ?? 5000,
  retryDelays: retryDelays(options.retry ?? { strategy: 'none' }),
})

export const defineRoutes = (routes: Record<string, string>) => routes // TODO: const type parameter

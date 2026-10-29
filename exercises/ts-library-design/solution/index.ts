export type RetryOptions =
  | { strategy: 'none' }
  | { strategy: 'fixed'; delayMs: number; attempts: number }
  | { strategy: 'exponential'; baseDelayMs: number; maxAttempts: number }

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
    case 'exponential':
      return Array.from({ length: retry.maxAttempts }, (_, attempt) => retry.baseDelayMs * 2 ** attempt)
  }
}

export const createClient = (options: ClientOptions): Client => ({
  baseUrl: options.baseUrl,
  timeoutMs: options.timeoutMs ?? 5000,
  retryDelays: retryDelays(options.retry ?? { strategy: 'none' }),
})

export const defineRoutes = <const Routes extends Record<string, string>>(routes: Routes): Routes => routes

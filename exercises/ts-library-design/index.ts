// Lektion ts-library-design: APIs, die falsche Aufrufe unmöglich machen
// Dauer: etwa 25 Minuten
//
// Aufgabe: createClient ist die Public API eines kleinen Shop-API-Clients.
// 1. Ergänze in RetryOptions die Variante
//    { strategy: 'exponential'; baseDelayMs: number; maxAttempts: number }.
//    retryDelays liefert dafür baseDelayMs × 2^i, z. B. [100, 200, 400].
// 2. Fehlbedienung soll nicht kompilieren – die Tests sichern das mit @ts-expect-error ab:
//    createClient ohne baseUrl, exponential ohne baseDelayMs, fixed mit baseDelayMs.
// 3. defineRoutes soll die Literal Types der Pfade behalten (const Type Parameter),
//    damit routes.order den Type '/orders/:orderId' hat statt string.
// 4. Bonus: Erzeuge die Type Declarations und schau sie dir an:
//    npx tsc exercises/ts-library-design/solution/index.ts --declaration --emitDeclarationOnly
//      --allowImportingTsExtensions --outDir dist
//    Lies dist/index.d.ts: Das ist alles, was Nutzende deiner Library sehen.
//
// Prüfen: npm test -- ts-library-design und npm run typecheck:start

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

export const defineRoutes = (routes: Record<string, string>) => routes // TODO: const Type Parameter

import type { Product } from '#shop'

// ?? ersetzt nur null und undefined – die 0 bleibt erhalten.
export const readRetries = (options: { retries?: number | null }): number => options.retries ?? 3

// Erst multiplizieren, dann runden: 12.99 * 100 === 1298.9999999999998
export const toCents = (euro: string): number => Math.round(Number(euro) * 100)

export const isShallowEqual = (a: Product, b: Product): boolean => {
  const keysA = Object.keys(a) as (keyof Product)[]
  const keysB = Object.keys(b)
  return keysA.length === keysB.length && keysA.every((key) => Object.hasOwn(b, key) && Object.is(a[key], b[key]))
}

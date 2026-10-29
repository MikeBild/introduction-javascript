import { setInterval } from 'node:timers/promises'

export async function* tick<Item>(items: readonly Item[], intervalMs: number, signal?: AbortSignal): AsyncGenerator<Item> {
  if (items.length === 0) return
  const done = new AbortController()
  const stop = signal ? AbortSignal.any([signal, done.signal]) : done.signal
  let index = 0
  try {
    for await (const _ of setInterval(intervalMs, undefined, { signal: stop })) {
      yield items[index++] as Item
      if (index >= items.length) done.abort()
    }
  } catch (error) {
    if (!stop.aborted) throw error // Abbruch ist ein reguläres Ende, kein Fehler
  }
}

export const mapWithLimit = async <Item, Value>(
  items: readonly Item[],
  limit: number,
  fn: (item: Item) => Promise<Value>,
): Promise<Value[]> => {
  const results = new Array<Value>(items.length)
  let next = 0
  const worker = async () => {
    while (next < items.length) {
      const index = next++
      results[index] = await fn(items[index] as Item)
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
  return results
}

export const withTimeout = async <Value>(fn: (signal: AbortSignal) => Promise<Value>, ms: number): Promise<Value> => {
  const signal = AbortSignal.timeout(ms)
  return new Promise<Value>((resolve, reject) => {
    signal.addEventListener('abort', () => reject(signal.reason), { once: true })
    fn(signal).then(resolve, reject)
  })
}

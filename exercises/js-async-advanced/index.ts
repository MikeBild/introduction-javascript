// Lesson js-async-advanced: Cancel, limit, and stream async work
// Duration: about 25 minutes
//
// Exercise
// 1. tick(items, intervalMs, signal?): async generator that yields one order per tick.
//    Use setInterval from node:timers/promises with for await and your own
//    AbortController, which you abort after the last element. An outer signal
//    ends the generator early (AbortSignal.any).
// 2. mapWithLimit(items, limit, fn): processes all items, but never more than limit
//    at the same time. The order of the result matches the input.
// 3. withTimeout(fn, ms): passes an AbortSignal.timeout(ms) to fn. When the time runs out,
//    the Promise rejects with an error named 'TimeoutError'.
//
// Check: npm test -- js-async-advanced

export async function* tick<Item>(items: readonly Item[], intervalMs: number, signal?: AbortSignal): AsyncGenerator<Item> {
  throw new Error('TODO: setInterval aus node:timers/promises mit for await')
}

export const mapWithLimit = async <Item, Value>(
  items: readonly Item[],
  limit: number,
  fn: (item: Item) => Promise<Value>,
): Promise<Value[]> => {
  return Promise.all(items.map(fn)) // TODO: starts all at once – limit it
}

export const withTimeout = async <Value>(fn: (signal: AbortSignal) => Promise<Value>, ms: number): Promise<Value> => {
  throw new Error('TODO: AbortSignal.timeout')
}

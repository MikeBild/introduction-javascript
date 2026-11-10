// Lesson js-performance-memory: Measure first, then optimize
// Duration: about 20 minutes
//
// Exercise: memoize caches every argument forever. With many different inputs
// (e.g. price calculation per cart) the heap grows without limit.
// 1. Measure it: node --expose-gc exercises/js-performance-memory/measure.ts
// 2. Limit the cache to maxEntries (LRU): a Map keeps its insertion order.
//    On a hit, delete the entry and set it again (it becomes “fresh”); when the cache
//    is full, remove the oldest entry (map.keys().next().value).
// 3. Measure again and compare.
//
// Check: npm test -- js-performance-memory

export type Memoized<Arg, Value> = ((arg: Arg) => Value) & { readonly cache: Map<Arg, Value> }

export const memoize = <Arg, Value>(fn: (arg: Arg) => Value, maxEntries: number): Memoized<Arg, Value> => {
  const cache = new Map<Arg, Value>()
  const memoized = (arg: Arg): Value => {
    if (cache.has(arg)) return cache.get(arg) as Value
    const value = fn(arg)
    cache.set(arg, value) // TODO: respect maxEntries, refresh hits
    return value
  }
  return Object.assign(memoized, { cache })
}

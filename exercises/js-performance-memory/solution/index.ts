export type Memoized<Arg, Value> = ((arg: Arg) => Value) & { readonly cache: Map<Arg, Value> }

export const memoize = <Arg, Value>(fn: (arg: Arg) => Value, maxEntries: number): Memoized<Arg, Value> => {
  const cache = new Map<Arg, Value>()
  const memoized = (arg: Arg): Value => {
    if (cache.has(arg)) {
      const value = cache.get(arg) as Value
      cache.delete(arg) // ans Ende verschieben: zuletzt benutzt
      cache.set(arg, value)
      return value
    }
    const value = fn(arg)
    cache.set(arg, value)
    if (cache.size > maxEntries) cache.delete(cache.keys().next().value as Arg) // ältester Eintrag
    return value
  }
  return Object.assign(memoized, { cache })
}

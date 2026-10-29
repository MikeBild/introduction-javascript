// Lektion js-performance-memory: Erst messen, dann optimieren
// Dauer: etwa 20 Minuten
//
// Aufgabe: memoize cacht jedes Argument für immer. Bei vielen verschiedenen Eingaben
// (z. B. Preisberechnung pro Warenkorb) wächst der Heap ohne Grenze.
// 1. Miss es: node --expose-gc exercises/js-performance-memory/measure.ts
// 2. Begrenze den Cache auf maxEntries (LRU): Eine Map behält die Einfügereihenfolge.
//    Bei einem Treffer den Eintrag löschen und neu setzen (wird "frisch"), bei vollem
//    Cache den ältesten Eintrag (map.keys().next().value) entfernen.
// 3. Miss noch einmal und vergleiche.
//
// Prüfen: npm test -- js-performance-memory

export type Memoized<Arg, Value> = ((arg: Arg) => Value) & { readonly cache: Map<Arg, Value> }

export const memoize = <Arg, Value>(fn: (arg: Arg) => Value, maxEntries: number): Memoized<Arg, Value> => {
  const cache = new Map<Arg, Value>()
  const memoized = (arg: Arg): Value => {
    if (cache.has(arg)) return cache.get(arg) as Value
    const value = fn(arg)
    cache.set(arg, value) // TODO: maxEntries beachten, Treffer auffrischen
    return value
  }
  return Object.assign(memoized, { cache })
}

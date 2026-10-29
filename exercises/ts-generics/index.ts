// Lektion ts-generics: Generics erhalten, was any wegwirft
// Dauer: etwa 20 Minuten
//
// Aufgabe: Die Funktionen laufen, aber any wirft jede Type-Information weg.
// Schreib sie als Generic Functions ohne any:
// 1. last<Item>(items): letztes Element oder undefined.
// 2. groupBy<Item, Key extends PropertyKey>(items, keyOf): Partial<Record<Key, Item[]>>,
//    z. B. Bestellungen nach Status gruppieren.
// 3. mapResult: wendet fn nur auf ein erfolgreiches Result an, Fehler bleiben unverändert.
// Die Tests sichern jede Signatur mit expectTypeOf ab.
//
// Prüfen: npm test -- ts-generics und npm run typecheck:start

export type Result<Value, Failure> = { ok: true; value: Value } | { ok: false; error: Failure }

export const last = (items: readonly any[]): any => items.at(-1)

export const groupBy = (items: readonly any[], keyOf: (item: any) => PropertyKey): any =>
  items.reduce((groups, item) => {
    const key = keyOf(item)
    return { ...groups, [key]: [...(groups[key] ?? []), item] }
  }, {})

export const mapResult = (result: Result<any, any>, fn: (value: any) => any): Result<any, any> =>
  result.ok ? { ok: true, value: fn(result.value) } : result

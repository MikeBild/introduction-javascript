// Lektion js-async-advanced: Async-Arbeit abbrechen, begrenzen und streamen
// Dauer: etwa 25 Minuten
//
// Aufgabe
// 1. tick(items, intervalMs, signal?): async Generator, der pro Tick eine Bestellung liefert.
//    Nutze setInterval aus node:timers/promises mit for await und einen eigenen
//    AbortController, den du nach dem letzten Element abbrichst. Ein äußeres signal
//    beendet den Generator vorzeitig (AbortSignal.any).
// 2. mapWithLimit(items, limit, fn): verarbeitet alle items, aber nie mehr als limit
//    gleichzeitig. Die Reihenfolge des Ergebnisses entspricht der Eingabe.
// 3. withTimeout(fn, ms): gibt fn ein AbortSignal.timeout(ms) mit. Läuft die Zeit ab,
//    rejected das Promise mit einem Fehler namens 'TimeoutError'.
//
// Prüfen: npm test -- js-async-advanced

export async function* tick<Item>(items: readonly Item[], intervalMs: number, signal?: AbortSignal): AsyncGenerator<Item> {
  throw new Error('TODO: setInterval aus node:timers/promises mit for await')
}

export const mapWithLimit = async <Item, Value>(
  items: readonly Item[],
  limit: number,
  fn: (item: Item) => Promise<Value>,
): Promise<Value[]> => {
  return Promise.all(items.map(fn)) // TODO: startet alle auf einmal – begrenzen
}

export const withTimeout = async <Value>(fn: (signal: AbortSignal) => Promise<Value>, ms: number): Promise<Value> => {
  throw new Error('TODO: AbortSignal.timeout')
}

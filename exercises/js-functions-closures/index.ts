// Lektion js-functions-closures: Was merkt sich eine Closure?
// Dauer: etwa 15 Minuten
//
// Aufgabe: Schreib die Funktionen als Closures mit const und Arrow Functions.
// 1. createIdGenerator('o') liefert eine Funktion, die 'o-1', 'o-2', … erzeugt.
//    Jeder Generator zählt für sich.
// 2. withVat(0.19) liefert eine Funktion netCents → Bruttopreis in ganzen Cent (Curry).
// 3. partial(fn, a) fixiert das erste Argument einer zweistelligen Funktion
//    (Partial Application), z. B. partial(lineTotal, 3) → priceCents => 3 * priceCents.
//
// Prüfen: npm test -- js-functions-closures

export const createIdGenerator = (prefix: string): (() => string) => {
  throw new Error('TODO: Zähler in der Closure merken')
}

export const withVat = (rate: number): ((netCents: number) => number) => {
  throw new Error('TODO: rate merken, Funktion für netCents zurückgeben')
}

export const partial = <A, B, R>(fn: (a: A, b: B) => R, a: A): ((b: B) => R) => {
  throw new Error('TODO: a merken')
}

export const lineTotal = (quantity: number, priceCents: number): number => quantity * priceCents

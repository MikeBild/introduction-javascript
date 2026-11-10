// Lesson js-functions-closures: What does a closure remember?
// Duration: about 15 minutes
//
// Exercise: Write the functions as closures with const and arrow functions.
// 1. createIdGenerator('o') returns a function that produces 'o-1', 'o-2', …
//    Each generator counts on its own.
// 2. withVat(0.19) returns a function netCents → gross price in whole cents (currying).
// 3. partial(fn, a) fixes the first argument of a two-argument function
//    (partial application), e.g. partial(lineTotal, 3) → priceCents => 3 * priceCents.
//
// Check: npm test -- js-functions-closures

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

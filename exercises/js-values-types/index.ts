// Lektion js-values-types: Wann sind zwei Werte in JavaScript gleich?
// Dauer: etwa 15 Minuten
//
// Aufgabe
// 1. readRetries liest die Zahl der Wiederholungen beim Bezahlen. Der Test zeigt:
//    { retries: 0 } wird zu 3, weil || die 0 als "falsy" verwirft. Repariere es mit ??.
// 2. Schreib toCents: "12.99" → 1299. Achtung, 12.99 * 100 ist nicht genau 1299.
// 3. Schreib isShallowEqual für zwei Produkte: gleiche Keys, Werte per Object.is gleich.
//
// Prüfen: npm test -- js-values-types

import type { Product } from '#shop'

export const readRetries = (options: { retries?: number | null }): number => options.retries || 3

export const toCents = (euro: string): number => {
  throw new Error('TODO: Euro-String in ganze Cent umrechnen')
}

export const isShallowEqual = (a: Product, b: Product): boolean => {
  throw new Error('TODO: Keys und Werte mit Object.is vergleichen')
}

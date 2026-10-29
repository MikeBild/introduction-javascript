// Lektion js-iterators-generators: Generators liefern Werte erst auf Nachfrage
// Dauer: etwa 20 Minuten
//
// Aufgabe
// 1. naturals(): unendlicher Generator 1, 2, 3, … (function* mit while (true)).
// 2. firstEvenSquares(n): filter (gerade) und map (Quadrat) lazy per Iterator Helpers,
//    dann take(n) und toArray(). Ohne take würde das nie enden.
// 3. allOrders(fetchPage): Async-Generator, der eine paginierte API Seite für Seite
//    abfragt (cursor → next) und jede Bestellung einzeln liefert. Er stoppt, wenn next fehlt.
//    Aufrufer lesen ihn mit for await … of.
//
// Prüfen: npm test -- js-iterators-generators

import type { Order } from '#shop'

export type Page = { items: Order[]; next?: string }

export function* naturals(): Generator<number, never> {
  throw new Error('TODO: while (true) yield')
}

export const firstEvenSquares = (n: number): number[] => {
  throw new Error('TODO: naturals().filter(…).map(…).take(n).toArray()')
}

export async function* allOrders(fetchPage: (cursor?: string) => Promise<Page>): AsyncGenerator<Order> {
  throw new Error('TODO: Seiten laden, bis next fehlt')
}

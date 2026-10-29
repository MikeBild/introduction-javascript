// Lektion js-array-methods: map, filter, reduce statt Loops
// Dauer: etwa 20 Minuten
//
// Aufgabe: Werte die Bestellungen ohne for, forEach und ohne Mutation aus.
// 1. orderTotalCents: Σ quantity × priceCents einer Bestellung (reduce).
// 2. openOrdersTotal: Summe aller offenen Bestellungen (Status draft oder placed).
// 3. topSellers: Menge je Produkt über alle nicht stornierten Bestellungen,
//    absteigend sortiert, bei Gleichstand nach productId; die ersten n Einträge.
//    Tipp: flatMap, reduce in ein Objekt oder eine Map, toSorted, slice.
//
// Prüfen: npm test -- js-array-methods

import type { Order, ProductId } from '#shop'

export type Seller = { productId: ProductId; quantity: number }

export const orderTotalCents = (order: Order): number => {
  let total = 0
  for (let index = 0; index < order.items.length; index++) {
    total += order.items[index]!.quantity * order.items[index]!.priceCents
  }
  return total // TODO: als reduce schreiben
}

export const openOrdersTotal = (orders: readonly Order[]): number => {
  throw new Error('TODO: filter und reduce')
}

export const topSellers = (orders: readonly Order[], n: number): Seller[] => {
  throw new Error('TODO: flatMap, reduce, toSorted, slice')
}

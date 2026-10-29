// Lektion ts-objects-unions: Types beschreiben genau die erlaubten Werte
// Dauer: etwa 20 Minuten
//
// Aufgabe
// 1. Ergänze den Status 'cancelled' in der as-const-Liste. OrderStatus folgt automatisch.
// 2. Schreib den Type Guard isStatus(value: unknown): value is OrderStatus.
// 3. Mach tags in TaggedProduct readonly (readonly Property und readonly string[]).
//    addTag liefert ein neues Produkt; doppelte Tags kommen nicht hinzu.
//
// Prüfen: npm test -- ts-objects-unions und npm run typecheck:start

import type { Product } from '#shop'

export const ORDER_STATUSES = ['draft', 'placed', 'paid', 'shipped'] as const
export type OrderStatus = (typeof ORDER_STATUSES)[number]

export const isStatus = (value: unknown): boolean => {
  throw new Error('TODO: Type Guard über ORDER_STATUSES')
}

export type TaggedProduct = Product & { tags: string[] }

export const addTag = (product: TaggedProduct, tag: string): TaggedProduct => {
  product.tags.push(tag) // TODO: ohne Mutation, ohne Duplikate
  return product
}

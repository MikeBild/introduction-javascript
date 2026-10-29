// Lektion js-error-handling: Wann wirfst du, wann lieferst du ein Result?
// Dauer: etwa 20 Minuten
//
// Aufgabe
// 1. parseQuantity rejected heute mit einem nackten String. Liefere stattdessen ein Result
//    mit sprechendem Error Code: 'NOT_A_NUMBER', 'NOT_AN_INTEGER' oder 'TOO_SMALL'.
//    Erwartbare Fehler gehören in die Signatur, nicht in throw.
// 2. reserve zieht Bestand ab und liefert ein Result mit 'OUT_OF_STOCK', wenn er fehlt.
// 3. findProductOrThrow: Ein fehlendes Produkt ist hier ein Programmierfehler.
//    Wirf einen ProductNotFoundError (extends Error) mit productId als Property.
//
// Prüfen: npm test -- js-error-handling und npm run typecheck:start

import type { Product, ProductId } from '#shop'

export type Result<Value, Code extends string> = { ok: true; value: Value } | { ok: false; error: Code }

export type QuantityError = 'NOT_A_NUMBER' | 'NOT_AN_INTEGER' | 'TOO_SMALL'

export const parseQuantity = (raw: string): Promise<number> =>
  new Promise((resolve, reject) => {
    const value = Number(raw)
    if (value > 0) resolve(value)
    else reject('kaputt') // TODO: kein Promise, kein String – ein Result
  })

export const reserve = (product: Product, quantity: number): Result<Product, 'OUT_OF_STOCK'> => {
  throw new Error('TODO: Result statt throw')
}

export class ProductNotFoundError extends Error {
  // TODO: name und productId setzen
}

export const findProductOrThrow = (products: readonly Product[], productId: ProductId): Product => {
  throw new Error('TODO: Produkt suchen, sonst ProductNotFoundError werfen')
}

// Lektion js-error-handling: Wann wirfst du, wann lieferst du ein Result?
// Dauer: etwa 20 Minuten
//
// Reines JavaScript, ohne Typen. Ein Result ist per Konvention ein Objekt:
//   { ok: true, value }   bei Erfolg
//   { ok: false, error }  bei einem erwartbaren Fehler, error ist ein sprechender Code
//
// Aufgabe
// 1. parseQuantity rejected heute mit einem nackten String. Liefere stattdessen ein Result
//    mit sprechendem Fehlercode: 'NOT_A_NUMBER', 'NOT_AN_INTEGER' oder 'TOO_SMALL'.
//    Erwartbare Fehler gehören in den Rückgabewert, nicht in throw.
// 2. reserve zieht Bestand ab und liefert ein Result mit 'OUT_OF_STOCK', wenn er fehlt.
//    Das übergebene Produkt bleibt unverändert.
// 3. findProductOrThrow: Ein fehlendes Produkt ist hier ein Programmierfehler.
//    Wirf einen ProductNotFoundError (extends Error) mit name und productId als Property.
//
// Prüfen: npm test -- js-error-handling

export const parseQuantity = (raw) =>
  new Promise((resolve, reject) => {
    const value = Number(raw)
    if (value > 0) resolve(value)
    else reject('kaputt') // TODO: kein Promise, kein String – ein Result
  })

export const reserve = (product, quantity) => {
  throw new Error('TODO: Result statt throw')
}

export class ProductNotFoundError extends Error {
  // TODO: name und productId setzen
}

export const findProductOrThrow = (products, productId) => {
  throw new Error('TODO: Produkt suchen, sonst ProductNotFoundError werfen')
}

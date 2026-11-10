// Lesson js-error-handling: When do you throw, and when return a result?
// Duration: about 20 minutes
//
// Plain JavaScript, no types. A Result is an object by convention:
//   { ok: true, value }   on success
//   { ok: false, error }  on an expected failure, error is a descriptive code
//
// Exercise
// 1. parseQuantity currently rejects with a bare string. Return a Result instead,
//    with a descriptive error code: 'NOT_A_NUMBER', 'NOT_AN_INTEGER' or 'TOO_SMALL'.
//    Expected failures belong in the return value, not in throw.
// 2. reserve deducts stock and returns a Result with 'OUT_OF_STOCK' when stock is missing.
//    The product passed in stays unchanged.
// 3. findProductOrThrow: a missing product is a programming error here.
//    Throw a ProductNotFoundError (extends Error) with name and productId as a property.
//
// Check: npm test -- js-error-handling

export const parseQuantity = (raw) =>
  new Promise((resolve, reject) => {
    const value = Number(raw)
    if (value > 0) resolve(value)
    else reject('kaputt') // TODO: no Promise, no string – a Result
  })

export const reserve = (product, quantity) => {
  throw new Error('TODO: Result statt throw')
}

export class ProductNotFoundError extends Error {
  // TODO: set name and productId
}

export const findProductOrThrow = (products, productId) => {
  throw new Error('TODO: Produkt suchen, sonst ProductNotFoundError werfen')
}

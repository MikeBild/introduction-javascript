// Lösung js-error-handling – reines JavaScript, Result per Konvention

const ok = (value) => ({ ok: true, value })
const fail = (error) => ({ ok: false, error })

export const parseQuantity = (raw) => {
  const value = Number(raw)
  if (raw.trim() === '' || Number.isNaN(value)) return fail('NOT_A_NUMBER')
  if (!Number.isInteger(value)) return fail('NOT_AN_INTEGER')
  if (value < 1) return fail('TOO_SMALL')
  return ok(value)
}

export const reserve = (product, quantity) =>
  product.stock < quantity ? fail('OUT_OF_STOCK') : ok({ ...product, stock: product.stock - quantity })

export class ProductNotFoundError extends Error {
  name = 'ProductNotFoundError'

  constructor(productId) {
    super(`Produkt ${productId} gibt es nicht`)
    this.productId = productId
  }
}

export const findProductOrThrow = (products, productId) => {
  const product = products.find((candidate) => candidate.id === productId)
  if (!product) throw new ProductNotFoundError(productId)
  return product
}

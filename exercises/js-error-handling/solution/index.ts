import type { Product, ProductId } from '#shop'

export type Result<Value, Code extends string> = { ok: true; value: Value } | { ok: false; error: Code }

export type QuantityError = 'NOT_A_NUMBER' | 'NOT_AN_INTEGER' | 'TOO_SMALL'

const ok = <Value>(value: Value) => ({ ok: true, value }) as const
const fail = <Code extends string>(error: Code) => ({ ok: false, error }) as const

export const parseQuantity = (raw: string): Result<number, QuantityError> => {
  const value = Number(raw)
  if (raw.trim() === '' || Number.isNaN(value)) return fail('NOT_A_NUMBER')
  if (!Number.isInteger(value)) return fail('NOT_AN_INTEGER')
  if (value < 1) return fail('TOO_SMALL')
  return ok(value)
}

export const reserve = (product: Product, quantity: number): Result<Product, 'OUT_OF_STOCK'> =>
  product.stock < quantity ? fail('OUT_OF_STOCK') : ok({ ...product, stock: product.stock - quantity })

export class ProductNotFoundError extends Error {
  override name = 'ProductNotFoundError'
  readonly productId: ProductId

  constructor(productId: ProductId) {
    super(`Produkt ${productId} gibt es nicht`)
    this.productId = productId
  }
}

export const findProductOrThrow = (products: readonly Product[], productId: ProductId): Product => {
  const product = products.find((candidate) => candidate.id === productId)
  if (!product) throw new ProductNotFoundError(productId)
  return product
}

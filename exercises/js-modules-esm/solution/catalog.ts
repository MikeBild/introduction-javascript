import type { Product, ProductId } from '#shop'
import { formatCents } from './money.ts'

export const findProduct = (products: readonly Product[], id: ProductId): Product | undefined =>
  products.find((product) => product.id === id)

export const listAvailable = (products: readonly Product[]): string[] =>
  products.filter((product) => product.stock > 0).map((product) => `${product.name} (${formatCents(product.priceCents)})`)

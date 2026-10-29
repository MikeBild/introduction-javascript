import type { Product, ProductId } from '#shop'

export type ProductPreview = Pick<Product, 'id' | 'name' | 'priceCents'>
export type ProductPatch = Partial<Omit<Product, 'id'>>
export type StockIndex = Record<ProductId, number>

export type StrictOmit<Shape, Key extends keyof Shape> = Omit<Shape, Key>

export const toPreview = ({ id, name, priceCents }: Product): ProductPreview => ({ id, name, priceCents })

export const applyPatch = (product: Product, patch: ProductPatch): Product => ({ ...product, ...patch })

export const stockIndex = (products: readonly Product[]): StockIndex =>
  Object.fromEntries(products.map((product) => [product.id, product.stock]))

export type ProductDraft = StrictOmit<Product, 'id'>

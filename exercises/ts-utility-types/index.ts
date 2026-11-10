// Lesson ts-utility-types: Derive types instead of copying
// Duration: about 20 minutes
//
// Exercise: Derive the variants of Product instead of copying fields.
// 1. ProductPreview = only id, name, priceCents (Pick). toPreview returns exactly these three
//    fields – at runtime too, without stock.
// 2. ProductPatch = all fields except id, all optional (Partial + Omit). applyPatch
//    returns a new product.
// 3. StockIndex = Record<ProductId, number>, built by stockIndex.
// 4. StrictOmit<Shape, Key extends keyof Shape>: Omit accepts any string, even the
//    typo 'nmae'. StrictOmit should report it as an error.
//
// Check: npm test -- ts-utility-types and npm run typecheck:start

import type { Product, ProductId } from '#shop'

// TODO: derive from Product
export type ProductPreview = { id: string; name: string; priceCents: number; stock?: number }
export type ProductPatch = { name?: string; priceCents?: number; stock?: number; id?: string }
export type StockIndex = { [id: string]: number }

// TODO: restrict Key to keyof Shape
export type StrictOmit<Shape, Key extends PropertyKey> = Omit<Shape, Key>

export const toPreview = (product: Product): ProductPreview => product

export const applyPatch = (product: Product, patch: ProductPatch): Product => {
  throw new Error('TODO: neues Produkt aus product und patch')
}

export const stockIndex = (products: readonly Product[]): StockIndex => {
  throw new Error('TODO: Object.fromEntries')
}

export type ProductDraft = StrictOmit<Product, 'id'>

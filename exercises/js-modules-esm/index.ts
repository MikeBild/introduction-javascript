// Lesson js-modules-esm: ES modules instead of require and global scope
// Duration: about 15 minutes
//
// Exercise: Everything sits in one file and is exported as one default object.
// Split the code into ES modules with named exports:
// 1. money.ts exports formatCents.
// 2. catalog.ts exports findProduct and listAvailable and imports
//    formatCents from './money.ts' (with file extension, as Node requires for ESM).
// 3. index.ts contains only re-exports (export { … } from './money.ts' etc.)
//    and no default export anymore.
// The project is already ESM: look at "type": "module" in package.json.
//
// Check: npm test -- js-modules-esm

import type { Product, ProductId } from '#shop'

const formatCents = (cents: number): string => `${(cents / 100).toFixed(2).replace('.', ',')} €`

const findProduct = (products: readonly Product[], id: ProductId): Product | undefined =>
  products.find((product) => product.id === id)

const listAvailable = (products: readonly Product[]): string[] =>
  products.filter((product) => product.stock > 0).map((product) => `${product.name} (${formatCents(product.priceCents)})`)

export default { formatCents, findProduct, listAvailable }

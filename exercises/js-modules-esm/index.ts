// Lektion js-modules-esm: ES Modules statt require und Global Scope
// Dauer: etwa 15 Minuten
//
// Aufgabe: Alles steckt in einer Datei und wird als ein Default-Objekt exportiert.
// Teile den Code in ES Modules mit Named Exports auf:
// 1. money.ts exportiert formatCents.
// 2. catalog.ts exportiert findProduct und listAvailable und importiert
//    formatCents aus './money.ts' (mit Dateiendung, wie Node es bei ESM verlangt).
// 3. index.ts enthält nur noch Re-Exports (export { … } from './money.ts' usw.)
//    und keinen Default Export mehr.
// Das Projekt ist schon ESM: Schau dir "type": "module" in der package.json an.
//
// Prüfen: npm test -- js-modules-esm

import type { Product, ProductId } from '#shop'

const formatCents = (cents: number): string => `${(cents / 100).toFixed(2).replace('.', ',')} €`

const findProduct = (products: readonly Product[], id: ProductId): Product | undefined =>
  products.find((product) => product.id === id)

const listAvailable = (products: readonly Product[]): string[] =>
  products.filter((product) => product.stock > 0).map((product) => `${product.name} (${formatCents(product.priceCents)})`)

export default { formatCents, findProduct, listAvailable }

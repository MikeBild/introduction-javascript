// Lektion ts-utility-types: Types ableiten statt kopieren
// Dauer: etwa 20 Minuten
//
// Aufgabe: Leite die Varianten von Product ab, statt Felder zu kopieren.
// 1. ProductPreview = nur id, name, priceCents (Pick). toPreview liefert genau diese drei
//    Felder – auch zur Laufzeit, ohne stock.
// 2. ProductPatch = alle Felder außer id, alle optional (Partial + Omit). applyPatch
//    liefert ein neues Produkt.
// 3. StockIndex = Record<ProductId, number>, gebaut von stockIndex.
// 4. StrictOmit<Shape, Key extends keyof Shape>: Omit nimmt jeden String, auch den
//    Tippfehler 'nmae'. StrictOmit soll ihn als Fehler melden.
//
// Prüfen: npm test -- ts-utility-types und npm run typecheck:start

import type { Product, ProductId } from '#shop'

// TODO: aus Product ableiten
export type ProductPreview = { id: string; name: string; priceCents: number; stock?: number }
export type ProductPatch = { name?: string; priceCents?: number; stock?: number; id?: string }
export type StockIndex = { [id: string]: number }

// TODO: Key auf keyof Shape einschränken
export type StrictOmit<Shape, Key extends PropertyKey> = Omit<Shape, Key>

export const toPreview = (product: Product): ProductPreview => product

export const applyPatch = (product: Product, patch: ProductPatch): Product => {
  throw new Error('TODO: neues Produkt aus product und patch')
}

export const stockIndex = (products: readonly Product[]): StockIndex => {
  throw new Error('TODO: Object.fromEntries')
}

export type ProductDraft = StrictOmit<Product, 'id'>

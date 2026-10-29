// Lektion js-objects-arrays: Neue Werte erzeugen statt alte ändern
// Dauer: etwa 20 Minuten
//
// Aufgabe: Schreib immutable Updates für den Warenkorb. Nutze Destructuring und Spread,
// kein push, kein splice, keine Zuweisung an bestehende Objekte. Die Tests frieren
// den Warenkorb mit Object.freeze ein – jede Mutation wirft dann einen TypeError.
// 1. addItem: Position hinzufügen; gibt es das Produkt schon, steigt die quantity.
// 2. setQuantity: Menge einer Position setzen; 0 entfernt die Position.
// 3. applyCoupon: meta.coupon setzen (verschachteltes Objekt, Ebene für Ebene kopieren).
// Unveränderte Positionen sollen dieselben Objekte bleiben (Structural Sharing).
//
// Prüfen: npm test -- js-objects-arrays

import type { CustomerId, OrderItem, ProductId } from '#shop'

export type Cart = {
  customerId: CustomerId
  items: readonly OrderItem[]
  meta: { coupon?: string; currency: 'EUR' }
}

export const addItem = (cart: Cart, item: OrderItem): Cart => {
  throw new Error('TODO: neue Position oder höhere quantity, ohne Mutation')
}

export const setQuantity = (cart: Cart, productId: ProductId, quantity: number): Cart => {
  throw new Error('TODO: quantity setzen, 0 entfernt die Position')
}

export const applyCoupon = (cart: Cart, coupon: string): Cart => {
  throw new Error('TODO: meta kopieren und coupon setzen')
}

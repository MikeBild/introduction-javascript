// Lektion ts-basics: Grenzen annotieren, den Rest inferieren
// Dauer: etwa 15 Minuten
//
// Aufgabe
// 1. formatPrice nimmt any und liefert any. Annotiere Parameter und Return Type.
// 2. lineTotal hat keinen Return Type. Lass ihn so – TypeScript inferiert ihn.
//    Fahr in der IDE mit der Maus über lineTotal und prüf, was herauskommt.
// 3. parseQuantity bekommt Daten von außen (Formular, JSON). Ersetze any durch unknown
//    und prüfe den Wert: Zahlen und Zahl-Strings, ganzzahlig, mindestens 1.
//    Alles andere wirft einen TypeError.
//
// Prüfen: npm test -- ts-basics und npm run typecheck:start

import type { OrderItem } from '#shop'

export const formatPrice = (cents: any): any => `${(cents / 100).toFixed(2).replace('.', ',')} €`

export const lineTotal = (item: OrderItem) => item.quantity * item.priceCents

export const parseQuantity = (input: any): number => {
  return input // TODO: unknown statt any, Wert prüfen
}

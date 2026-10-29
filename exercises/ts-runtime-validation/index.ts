// Lektion ts-runtime-validation: zod prüft, was Types nicht sehen
// Dauer: etwa 20 Minuten
//
// Aufgabe: Ein Request Body kommt als String von außen. TypeScript sieht ihn nicht –
// zod prüft ihn zur Laufzeit. Das Schema ist dasselbe, das später Frontend und Backend teilen.
// 1. Erweitere PlaceOrderInput um items: mindestens eine Position (OrderItemInput).
// 2. Unbekannte Keys sollen abgelehnt werden: z.strictObject statt z.object.
// 3. handlePlaceOrder antwortet bei kaputtem JSON mit 400 und error 'INVALID_JSON',
//    bei ungültigen Daten mit 400, error 'VALIDATION_FAILED' und den Pfaden der
//    fehlerhaften Felder (z. B. 'items.0.quantity'). Gültige Daten → 201 mit dem Input.
//    Nutze safeParse statt parse, damit nichts wirft.
//
// Prüfen: npm test -- ts-runtime-validation und npm run typecheck:start

import { z } from 'zod'

export const OrderItemInput = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1),
})

export const PlaceOrderInput = z.object({
  customerId: z.string().min(1),
  // TODO: items
})
export type PlaceOrderInput = z.infer<typeof PlaceOrderInput>

export type HttpResult =
  | { status: 201; body: PlaceOrderInput }
  | { status: 400; body: { error: 'INVALID_JSON' | 'VALIDATION_FAILED'; issues?: string[] } }

export const handlePlaceOrder = (rawBody: string): HttpResult => {
  const input = PlaceOrderInput.parse(JSON.parse(rawBody)) // TODO: wirft bei jedem Fehler
  return { status: 201, body: input }
}

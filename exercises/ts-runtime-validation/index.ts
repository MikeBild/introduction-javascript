// Lesson ts-runtime-validation: zod checks what types cannot see
// Duration: about 20 minutes
//
// Exercise: A request body arrives as a string from outside. TypeScript does not see it –
// zod checks it at runtime. The schema is the same one that frontend and backend share later.
// 1. Extend PlaceOrderInput with items: at least one line item (OrderItemInput).
// 2. Unknown keys should be rejected: z.strictObject instead of z.object.
// 3. handlePlaceOrder answers broken JSON with 400 and error 'INVALID_JSON',
//    invalid data with 400, error 'VALIDATION_FAILED' and the paths of the
//    invalid fields (e.g. 'items.0.quantity'). Valid data → 201 with the input.
//    Use safeParse instead of parse so that nothing throws.
//
// Check: npm test -- ts-runtime-validation and npm run typecheck:start

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
  const input = PlaceOrderInput.parse(JSON.parse(rawBody)) // TODO: throws on every error
  return { status: 201, body: input }
}

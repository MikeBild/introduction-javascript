import { z } from 'zod'

export const OrderItemInput = z.strictObject({
  productId: z.string().min(1),
  quantity: z.number().int().min(1),
})

export const PlaceOrderInput = z.strictObject({
  customerId: z.string().min(1),
  items: z.array(OrderItemInput).min(1),
})
export type PlaceOrderInput = z.infer<typeof PlaceOrderInput>

export type HttpResult =
  | { status: 201; body: PlaceOrderInput }
  | { status: 400; body: { error: 'INVALID_JSON' | 'VALIDATION_FAILED'; issues?: string[] } }

const parseJson = (raw: string): { ok: true; value: unknown } | { ok: false } => {
  try {
    return { ok: true, value: JSON.parse(raw) }
  } catch {
    return { ok: false }
  }
}

export const handlePlaceOrder = (rawBody: string): HttpResult => {
  const json = parseJson(rawBody)
  if (!json.ok) return { status: 400, body: { error: 'INVALID_JSON' } }

  const result = PlaceOrderInput.safeParse(json.value)
  if (!result.success) {
    const issues = result.error.issues.map((issue) => issue.path.join('.') || '(root)')
    return { status: 400, body: { error: 'VALIDATION_FAILED', issues } }
  }
  return { status: 201, body: result.data }
}

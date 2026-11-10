import { describe, expect, expectTypeOf, it } from 'vitest'
import { handlePlaceOrder, type PlaceOrderInput } from '#ex/ts-runtime-validation'

const valid = { customerId: 'c-1', items: [{ productId: 'p-1', quantity: 2 }] }

describe('PlaceOrderInput', () => {
  it('derives the type from the schema', () => {
    expectTypeOf<PlaceOrderInput>().toEqualTypeOf<{
      customerId: string
      items: { productId: string; quantity: number }[]
    }>()
  })
})

describe('handlePlaceOrder', () => {
  it('accepts valid orders', () => {
    expect(handlePlaceOrder(JSON.stringify(valid))).toEqual({ status: 201, body: valid })
  })
  it('answers broken JSON with 400', () => {
    expect(handlePlaceOrder('{"customerId": ')).toEqual({ status: 400, body: { error: 'INVALID_JSON' } })
  })
  it('requires at least one line item', () => {
    const result = handlePlaceOrder(JSON.stringify({ customerId: 'c-1', items: [] }))
    expect(result).toEqual({ status: 400, body: { error: 'VALIDATION_FAILED', issues: ['items'] } })
  })
  it('reports the path of invalid fields', () => {
    const body = { customerId: 'c-1', items: [{ productId: 'p-1', quantity: 0 }] }
    expect(handlePlaceOrder(JSON.stringify(body))).toEqual({
      status: 400,
      body: { error: 'VALIDATION_FAILED', issues: ['items.0.quantity'] },
    })
  })
  it('rejects unknown keys', () => {
    const result = handlePlaceOrder(JSON.stringify({ ...valid, discountPercent: 100 }))
    expect(result.status).toBe(400)
  })
  it('rejects unknown keys in line items too', () => {
    const body = { customerId: 'c-1', items: [{ productId: 'p-1', quantity: 1, priceCents: 1 }] }
    expect(handlePlaceOrder(JSON.stringify(body)).status).toBe(400)
  })
})

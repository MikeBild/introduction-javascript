import { describe, expect, expectTypeOf, it } from 'vitest'
import { handlePlaceOrder, type PlaceOrderInput } from '#ex/ts-runtime-validation'

const valid = { customerId: 'c-1', items: [{ productId: 'p-1', quantity: 2 }] }

describe('PlaceOrderInput', () => {
  it('leitet den Type aus dem Schema ab', () => {
    expectTypeOf<PlaceOrderInput>().toEqualTypeOf<{
      customerId: string
      items: { productId: string; quantity: number }[]
    }>()
  })
})

describe('handlePlaceOrder', () => {
  it('nimmt gültige Bestellungen an', () => {
    expect(handlePlaceOrder(JSON.stringify(valid))).toEqual({ status: 201, body: valid })
  })
  it('antwortet bei kaputtem JSON mit 400', () => {
    expect(handlePlaceOrder('{"customerId": ')).toEqual({ status: 400, body: { error: 'INVALID_JSON' } })
  })
  it('verlangt mindestens eine Position', () => {
    const result = handlePlaceOrder(JSON.stringify({ customerId: 'c-1', items: [] }))
    expect(result).toEqual({ status: 400, body: { error: 'VALIDATION_FAILED', issues: ['items'] } })
  })
  it('meldet den Pfad fehlerhafter Felder', () => {
    const body = { customerId: 'c-1', items: [{ productId: 'p-1', quantity: 0 }] }
    expect(handlePlaceOrder(JSON.stringify(body))).toEqual({
      status: 400,
      body: { error: 'VALIDATION_FAILED', issues: ['items.0.quantity'] },
    })
  })
  it('lehnt unbekannte Keys ab', () => {
    const result = handlePlaceOrder(JSON.stringify({ ...valid, discountPercent: 100 }))
    expect(result.status).toBe(400)
  })
  it('lehnt unbekannte Keys auch in Positionen ab', () => {
    const body = { customerId: 'c-1', items: [{ productId: 'p-1', quantity: 1, priceCents: 1 }] }
    expect(handlePlaceOrder(JSON.stringify(body)).status).toBe(400)
  })
})

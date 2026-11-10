import { describe, expect, expectTypeOf, it } from 'vitest'
import { orders, type Order, type OrderStatus } from '#shop'
import { groupBy, last, mapResult, type Result } from '#ex/ts-generics'

describe('last', () => {
  it('returns the last element', () => {
    expect(last([1, 2, 3])).toBe(3)
    expect(last([])).toBeUndefined()
  })
  it('keeps the element type', () => {
    expectTypeOf(last(orders())).toEqualTypeOf<Order | undefined>()
    expectTypeOf(last(['a', 'b'])).toEqualTypeOf<string | undefined>()
  })
})

describe('groupBy', () => {
  it('groups orders by status', () => {
    const byStatus = groupBy(orders(), (order) => order.status)
    expect(byStatus.paid?.map((order) => order.id)).toEqual(['o-1'])
    expect(byStatus.shipped).toBeUndefined()
  })
  it('knows keys and values', () => {
    const byStatus = groupBy(orders(), (order) => order.status)
    expectTypeOf(byStatus).toEqualTypeOf<Partial<Record<OrderStatus, Order[]>>>()
  })
})

describe('mapResult', () => {
  // as instead of an annotation: otherwise TypeScript narrows the variables to their respective case
  const ok = { ok: true, value: 1299 } as Result<number, 'NOT_FOUND'>
  const failed = { ok: false, error: 'NOT_FOUND' } as Result<number, 'NOT_FOUND'>
  const format = (cents: number) => `${cents / 100} €`

  it('maps only the success', () => {
    expect(mapResult(ok, format)).toEqual({ ok: true, value: '12.99 €' })
    expect(mapResult(failed, format)).toEqual({ ok: false, error: 'NOT_FOUND' })
  })
  it('changes the value type and keeps the error type', () => {
    expectTypeOf(mapResult(ok, format)).toEqualTypeOf<Result<string, 'NOT_FOUND'>>()
  })
})

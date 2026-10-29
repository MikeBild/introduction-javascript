import { describe, expect, expectTypeOf, it } from 'vitest'
import { orders, type Order, type OrderStatus } from '#shop'
import { groupBy, last, mapResult, type Result } from '#ex/ts-generics'

describe('last', () => {
  it('liefert das letzte Element', () => {
    expect(last([1, 2, 3])).toBe(3)
    expect(last([])).toBeUndefined()
  })
  it('behält den Element-Type', () => {
    expectTypeOf(last(orders())).toEqualTypeOf<Order | undefined>()
    expectTypeOf(last(['a', 'b'])).toEqualTypeOf<string | undefined>()
  })
})

describe('groupBy', () => {
  it('gruppiert Bestellungen nach Status', () => {
    const byStatus = groupBy(orders(), (order) => order.status)
    expect(byStatus.paid?.map((order) => order.id)).toEqual(['o-1'])
    expect(byStatus.shipped).toBeUndefined()
  })
  it('kennt Keys und Werte', () => {
    const byStatus = groupBy(orders(), (order) => order.status)
    expectTypeOf(byStatus).toEqualTypeOf<Partial<Record<OrderStatus, Order[]>>>()
  })
})

describe('mapResult', () => {
  // as statt Annotation: sonst verengt TypeScript die Variablen auf den jeweiligen Fall
  const ok = { ok: true, value: 1299 } as Result<number, 'NOT_FOUND'>
  const failed = { ok: false, error: 'NOT_FOUND' } as Result<number, 'NOT_FOUND'>
  const format = (cents: number) => `${cents / 100} €`

  it('mappt nur den Erfolg', () => {
    expect(mapResult(ok, format)).toEqual({ ok: true, value: '12.99 €' })
    expect(mapResult(failed, format)).toEqual({ ok: false, error: 'NOT_FOUND' })
  })
  it('ändert den Value-Type und behält den Error-Type', () => {
    expectTypeOf(mapResult(ok, format)).toEqualTypeOf<Result<string, 'NOT_FOUND'>>()
  })
})

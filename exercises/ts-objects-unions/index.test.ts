import { describe, expect, expectTypeOf, it } from 'vitest'
import { addTag, isStatus, ORDER_STATUSES, type OrderStatus, type TaggedProduct } from '#ex/ts-objects-unions'

describe('OrderStatus', () => {
  it('kennt alle fünf Status', () => {
    expect(ORDER_STATUSES).toEqual(['draft', 'placed', 'paid', 'shipped', 'cancelled'])
    expectTypeOf<OrderStatus>().toEqualTypeOf<'draft' | 'placed' | 'paid' | 'shipped' | 'cancelled'>()
  })
})

describe('isStatus', () => {
  it('erkennt gültige Status', () => {
    expect(isStatus('paid')).toBe(true)
    expect(isStatus('cancelled')).toBe(true)
  })
  it.each(['review', 'PAID', 42, null])('lehnt %o ab', (value) => {
    expect(isStatus(value)).toBe(false)
  })
  it('ist ein Type Guard', () => {
    const value: unknown = 'placed'
    if (isStatus(value)) expectTypeOf(value).toEqualTypeOf<OrderStatus>()
  })
})

describe('addTag', () => {
  const hammer: TaggedProduct = { id: 'p-1', name: 'Hammer', priceCents: 1299, stock: 12, tags: ['werkzeug'] }

  it('liefert ein neues Produkt mit dem Tag', () => {
    const next = addTag(hammer, 'angebot')
    expect(next.tags).toEqual(['werkzeug', 'angebot'])
    expect(hammer.tags).toEqual(['werkzeug'])
  })
  it('fügt keine Duplikate hinzu', () => {
    expect(addTag(hammer, 'werkzeug').tags).toEqual(['werkzeug'])
  })
  it('tags ist readonly', () => {
    const copy: TaggedProduct = { ...hammer, tags: [...hammer.tags] }
    // @ts-expect-error tags darf man nicht neu zuweisen
    copy.tags = []
    // @ts-expect-error readonly string[] hat kein push
    copy.tags.push('kaputt')
    expect(hammer.tags).toEqual(['werkzeug'])
  })
})

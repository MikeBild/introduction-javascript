import { describe, expect, expectTypeOf, it } from 'vitest'
import { addTag, isStatus, ORDER_STATUSES, type OrderStatus, type TaggedProduct } from '#ex/ts-objects-unions'

describe('OrderStatus', () => {
  it('knows all five statuses', () => {
    expect(ORDER_STATUSES).toEqual(['draft', 'placed', 'paid', 'shipped', 'cancelled'])
    expectTypeOf<OrderStatus>().toEqualTypeOf<'draft' | 'placed' | 'paid' | 'shipped' | 'cancelled'>()
  })
})

describe('isStatus', () => {
  it('recognizes valid statuses', () => {
    expect(isStatus('paid')).toBe(true)
    expect(isStatus('cancelled')).toBe(true)
  })
  it.each(['review', 'PAID', 42, null])('rejects %o', (value) => {
    expect(isStatus(value)).toBe(false)
  })
  it('is a type guard', () => {
    const value: unknown = 'placed'
    if (isStatus(value)) expectTypeOf(value).toEqualTypeOf<OrderStatus>()
  })
})

describe('addTag', () => {
  const hammer: TaggedProduct = { id: 'p-1', name: 'Hammer', priceCents: 1299, stock: 12, tags: ['werkzeug'] }

  it('returns a new product with the tag', () => {
    const next = addTag(hammer, 'angebot')
    expect(next.tags).toEqual(['werkzeug', 'angebot'])
    expect(hammer.tags).toEqual(['werkzeug'])
  })
  it('adds no duplicates', () => {
    expect(addTag(hammer, 'werkzeug').tags).toEqual(['werkzeug'])
  })
  it('tags is readonly', () => {
    const copy: TaggedProduct = { ...hammer, tags: [...hammer.tags] }
    // @ts-expect-error tags must not be reassigned
    copy.tags = []
    // @ts-expect-error readonly string[] has no push
    copy.tags.push('kaputt')
    expect(hammer.tags).toEqual(['werkzeug'])
  })
})

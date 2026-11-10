import { describe, expect, it, vi } from 'vitest'
import { orders } from '#shop'
import { addVat, applyDiscount, checkoutTotal, memoize, pipe, stampOrder } from '#ex/js-functional-patterns'

describe('memoize', () => {
  it('calls fn only once per argument', () => {
    const slowPrice = vi.fn((id: string) => id.length * 100)
    const price = memoize(slowPrice)
    expect(price('p-1')).toBe(300)
    expect(price('p-1')).toBe(300)
    expect(price('p-22')).toBe(400)
    expect(slowPrice).toHaveBeenCalledTimes(2)
  })
  it('caches falsy results too', () => {
    const zero = vi.fn((_: number) => 0)
    const memoized = memoize(zero)
    memoized(1)
    memoized(1)
    expect(zero).toHaveBeenCalledTimes(1)
  })
})

describe('pipe', () => {
  it('applies the functions from left to right', () => {
    expect(pipe((n: number) => n + 1, (n) => n * 10)(1)).toBe(20)
    expect(pipe<number>()(5)).toBe(5)
  })
  it('combines discount and VAT', () => {
    expect(pipe(applyDiscount(10), addVat(0.19))(10000)).toBe(10710)
  })
})

describe('checkoutTotal', () => {
  it('calculates subtotal, 10 % discount and 19 % VAT', () => {
    const [first] = orders()
    // (2 × 1299 + 799) = 3397 → 3057 → 3638
    expect(checkoutTotal(first!.items)).toBe(3638)
  })
})

describe('stampOrder', () => {
  it('takes the clock as a parameter', () => {
    const [first] = orders()
    const fixed = () => new Date('2026-11-02T10:00:00.000Z')
    const stamp = stampOrder as (order: typeof first, now: () => Date) => NonNullable<typeof first>
    expect(stamp(first, fixed).createdAt).toBe('2026-11-02T10:00:00.000Z')
    expect(first!.createdAt).toBe('2026-10-01T09:15:00.000Z')
  })
})

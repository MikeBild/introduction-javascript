import { describe, expect, it, vi } from 'vitest'
import { orders } from '#shop'
import { addVat, applyDiscount, checkoutTotal, memoize, pipe, stampOrder } from '#ex/js-functional-patterns'

describe('memoize', () => {
  it('ruft fn pro Argument nur einmal auf', () => {
    const slowPrice = vi.fn((id: string) => id.length * 100)
    const price = memoize(slowPrice)
    expect(price('p-1')).toBe(300)
    expect(price('p-1')).toBe(300)
    expect(price('p-22')).toBe(400)
    expect(slowPrice).toHaveBeenCalledTimes(2)
  })
  it('cacht auch falsy Ergebnisse', () => {
    const zero = vi.fn((_: number) => 0)
    const memoized = memoize(zero)
    memoized(1)
    memoized(1)
    expect(zero).toHaveBeenCalledTimes(1)
  })
})

describe('pipe', () => {
  it('wendet die Funktionen von links nach rechts an', () => {
    expect(pipe((n: number) => n + 1, (n) => n * 10)(1)).toBe(20)
    expect(pipe<number>()(5)).toBe(5)
  })
  it('kombiniert Rabatt und MwSt', () => {
    expect(pipe(applyDiscount(10), addVat(0.19))(10000)).toBe(10710)
  })
})

describe('checkoutTotal', () => {
  it('rechnet subtotal, 10 % Rabatt und 19 % MwSt', () => {
    const [first] = orders()
    // (2 × 1299 + 799) = 3397 → 3057 → 3638
    expect(checkoutTotal(first!.items)).toBe(3638)
  })
})

describe('stampOrder', () => {
  it('nimmt die Uhr als Parameter', () => {
    const [first] = orders()
    const fixed = () => new Date('2026-11-02T10:00:00.000Z')
    const stamp = stampOrder as (order: typeof first, now: () => Date) => NonNullable<typeof first>
    expect(stamp(first, fixed).createdAt).toBe('2026-11-02T10:00:00.000Z')
    expect(first!.createdAt).toBe('2026-10-01T09:15:00.000Z')
  })
})

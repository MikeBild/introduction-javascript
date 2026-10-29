import { describe, expect, expectTypeOf, it } from 'vitest'
import { formatPrice, lineTotal, parseQuantity } from '#ex/ts-basics'

describe('formatPrice', () => {
  it('formatiert Cent als Euro', () => {
    expect(formatPrice(1299)).toBe('12,99 €')
  })
  it('hat number → string als Signatur (npm run typecheck:start)', () => {
    expectTypeOf(formatPrice).parameter(0).toEqualTypeOf<number>()
    expectTypeOf(formatPrice).returns.toEqualTypeOf<string>()
  })
})

describe('lineTotal', () => {
  it('inferiert number', () => {
    expect(lineTotal({ productId: 'p-1', quantity: 3, priceCents: 1299 })).toBe(3897)
    expectTypeOf(lineTotal).returns.toEqualTypeOf<number>()
  })
})

describe('parseQuantity', () => {
  it('akzeptiert Zahlen und Zahl-Strings', () => {
    expect(parseQuantity(3)).toBe(3)
    expect(parseQuantity('2')).toBe(2)
  })
  it.each([0, -1, 1.5, 'drei', '', null, undefined, {}])('lehnt %o ab', (input) => {
    expect(() => parseQuantity(input)).toThrow(TypeError)
  })
  it('nimmt unknown statt any', () => {
    expectTypeOf(parseQuantity).parameter(0).toEqualTypeOf<unknown>()
  })
})

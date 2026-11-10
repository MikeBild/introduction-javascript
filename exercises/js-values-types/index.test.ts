import { describe, expect, it } from 'vitest'
import { products } from '#shop'
import { isShallowEqual, readRetries, toCents } from '#ex/js-values-types'

describe('readRetries', () => {
  it('takes 3 when nothing is given', () => {
    expect(readRetries({})).toBe(3)
    expect(readRetries({ retries: null })).toBe(3)
  })
  it('keeps the 0', () => {
    expect(readRetries({ retries: 0 })).toBe(0)
  })
})

describe('toCents', () => {
  it('converts euros to whole cents', () => {
    expect(toCents('12.99')).toBe(1299)
    expect(toCents('0.1')).toBe(10)
    expect(toCents('19.99')).toBe(1999)
  })
  it('always returns an integer', () => {
    expect(Number.isInteger(toCents('1.005'))).toBe(true)
  })
})

describe('isShallowEqual', () => {
  const [hammer] = products()
  it('recognizes equal products even when they are different objects', () => {
    expect(isShallowEqual(hammer!, { ...hammer! })).toBe(true)
  })
  it('detects a changed price', () => {
    expect(isShallowEqual(hammer!, { ...hammer!, priceCents: 1399 })).toBe(false)
  })
  it('compares NaN like Object.is', () => {
    expect(isShallowEqual({ ...hammer!, stock: Number.NaN }, { ...hammer!, stock: Number.NaN })).toBe(true)
  })
})

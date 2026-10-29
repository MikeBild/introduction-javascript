import { describe, expect, it } from 'vitest'
import { products } from '#shop'
import { isShallowEqual, readRetries, toCents } from '#ex/js-values-types'

describe('readRetries', () => {
  it('nimmt 3, wenn nichts angegeben ist', () => {
    expect(readRetries({})).toBe(3)
    expect(readRetries({ retries: null })).toBe(3)
  })
  it('behält die 0', () => {
    expect(readRetries({ retries: 0 })).toBe(0)
  })
})

describe('toCents', () => {
  it('rechnet Euro in ganze Cent um', () => {
    expect(toCents('12.99')).toBe(1299)
    expect(toCents('0.1')).toBe(10)
    expect(toCents('19.99')).toBe(1999)
  })
  it('liefert immer eine ganze Zahl', () => {
    expect(Number.isInteger(toCents('1.005'))).toBe(true)
  })
})

describe('isShallowEqual', () => {
  const [hammer] = products()
  it('erkennt gleiche Produkte, auch wenn es verschiedene Objekte sind', () => {
    expect(isShallowEqual(hammer!, { ...hammer! })).toBe(true)
  })
  it('erkennt einen geänderten Preis', () => {
    expect(isShallowEqual(hammer!, { ...hammer!, priceCents: 1399 })).toBe(false)
  })
  it('vergleicht NaN wie Object.is', () => {
    expect(isShallowEqual({ ...hammer!, stock: Number.NaN }, { ...hammer!, stock: Number.NaN })).toBe(true)
  })
})

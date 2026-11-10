import { describe, expect, it } from 'vitest'
import { products } from '#shop'
import { findProductOrThrow, parseQuantity, ProductNotFoundError, reserve } from '#ex/js-error-handling'

describe('parseQuantity', () => {
  it('returns a Result instead of a Promise', () => {
    expect(parseQuantity('3')).toEqual({ ok: true, value: 3 })
  })
  it.each([
    ['abc', 'NOT_A_NUMBER'],
    ['', 'NOT_A_NUMBER'],
    ['1.5', 'NOT_AN_INTEGER'],
    ['0', 'TOO_SMALL'],
    ['-2', 'TOO_SMALL'],
  ])('%o → %s', (raw, error) => {
    expect(parseQuantity(raw)).toEqual({ ok: false, error })
  })
})

describe('reserve', () => {
  const [hammer, , zollstock] = products()
  it('deducts stock', () => {
    expect(reserve(hammer!, 2)).toEqual({ ok: true, value: { ...hammer, stock: 10 } })
    expect(hammer!.stock).toBe(12)
  })
  it('reports missing stock', () => {
    expect(reserve(zollstock!, 1)).toEqual({ ok: false, error: 'OUT_OF_STOCK' })
  })
})

describe('findProductOrThrow', () => {
  it('finds existing products', () => {
    expect(findProductOrThrow(products(), 'p-2')).toMatchObject({ name: 'Schraubendreher-Set' })
  })
  it('throws a ProductNotFoundError with productId', () => {
    try {
      findProductOrThrow(products(), 'p-99')
      expect.unreachable()
    } catch (error) {
      expect(error).toBeInstanceOf(ProductNotFoundError)
      expect(error).toBeInstanceOf(Error)
      expect((error as Error).name).toBe('ProductNotFoundError')
      expect((error as { productId?: string }).productId).toBe('p-99')
    }
  })
})

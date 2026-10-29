import { describe, expect, it } from 'vitest'
import { products } from '#shop'
import { findProductOrThrow, parseQuantity, ProductNotFoundError, reserve } from '#ex/js-error-handling'

describe('parseQuantity', () => {
  it('liefert ein Result statt eines Promise', () => {
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
  it('zieht Bestand ab', () => {
    expect(reserve(hammer!, 2)).toEqual({ ok: true, value: { ...hammer, stock: 10 } })
    expect(hammer!.stock).toBe(12)
  })
  it('meldet fehlenden Bestand', () => {
    expect(reserve(zollstock!, 1)).toEqual({ ok: false, error: 'OUT_OF_STOCK' })
  })
})

describe('findProductOrThrow', () => {
  it('findet vorhandene Produkte', () => {
    expect(findProductOrThrow(products(), 'p-2')).toMatchObject({ name: 'Schraubendreher-Set' })
  })
  it('wirft einen ProductNotFoundError mit productId', () => {
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

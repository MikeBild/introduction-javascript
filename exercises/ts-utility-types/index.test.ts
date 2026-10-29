import { describe, expect, expectTypeOf, it } from 'vitest'
import { products, type Product, type ProductId } from '#shop'
import {
  applyPatch,
  stockIndex,
  toPreview,
  type ProductDraft,
  type ProductPatch,
  type ProductPreview,
  type StockIndex,
  type StrictOmit,
} from '#ex/ts-utility-types'

const [hammer] = products()

describe('ProductPreview', () => {
  it('enthält nur id, name und priceCents', () => {
    expect(toPreview(hammer!)).toEqual({ id: 'p-1', name: 'Hammer', priceCents: 1299 })
    expectTypeOf<ProductPreview>().toEqualTypeOf<Pick<Product, 'id' | 'name' | 'priceCents'>>()
  })
})

describe('ProductPatch', () => {
  it('ändert einzelne Felder, ohne das Original zu verändern', () => {
    const next = applyPatch(hammer!, { priceCents: 1199 })
    expect(next.priceCents).toBe(1199)
    expect(hammer!.priceCents).toBe(1299)
  })
  it('erlaubt keine id', () => {
    expectTypeOf<ProductPatch>().toEqualTypeOf<{ name?: string; priceCents?: number; stock?: number }>()
    // @ts-expect-error id gehört nicht in den Patch
    applyPatch(hammer!, { id: 'p-99' })
  })
})

describe('StockIndex', () => {
  it('bildet ProductId auf Bestand ab', () => {
    expect(stockIndex(products())).toEqual({ 'p-1': 12, 'p-2': 5, 'p-3': 0, 'p-4': 3 })
    expectTypeOf<StockIndex>().toEqualTypeOf<Record<ProductId, number>>()
  })
})

describe('StrictOmit', () => {
  it('funktioniert wie Omit', () => {
    expectTypeOf<ProductDraft>().toEqualTypeOf<{ name: string; priceCents: number; stock: number }>()
  })
  it('meldet Tippfehler', () => {
    // @ts-expect-error 'nmae' ist kein Key von Product
    type Broken = StrictOmit<Product, 'nmae'>
    expectTypeOf<Broken>().not.toBeAny()
  })
})

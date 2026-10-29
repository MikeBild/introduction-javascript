import { describe, expect, it } from 'vitest'
import { products } from '#shop'
import { createProduct, entityProto, mergeSafe, productProto, prototypeChain } from '#ex/js-prototypes'

const [hammerData] = products()

describe('Prototype Chain', () => {
  it('productProto erbt von entityProto', () => {
    expect(Object.getPrototypeOf(productProto)).toBe(entityProto)
  })
  it('createProduct hängt das Produkt an productProto', () => {
    const hammer = createProduct(hammerData!)
    expect(Object.getPrototypeOf(hammer)).toBe(productProto)
    expect(Object.hasOwn(hammer, 'name')).toBe(true)
    expect(Object.hasOwn(hammer, 'describe')).toBe(false) // kommt aus der Kette
    expect(hammer.describe()).toBe('Produkt p-1')
    expect(hammer.formatPrice()).toBe('12,99 €')
  })
  it('prototypeChain listet alle Prototypen', () => {
    const hammer = createProduct(hammerData!)
    expect(prototypeChain(hammer)).toEqual([productProto, entityProto, Object.prototype])
  })
})

describe('mergeSafe', () => {
  it('übernimmt normale Keys', () => {
    expect(mergeSafe({ name: 'Hammer' }, { stock: 3 })).toEqual({ name: 'Hammer', stock: 3 })
  })
  it('blockt Prototype Pollution aus JSON', () => {
    const input = JSON.parse('{"__proto__": {"isAdmin": true}, "name": "Zange"}') as Record<string, unknown>
    const merged = mergeSafe({ name: 'Hammer' }, input)
    expect(merged).toEqual({ name: 'Zange' })
    expect(Object.getPrototypeOf(merged)).toBe(Object.prototype)
    expect(({} as Record<string, unknown>).isAdmin).toBeUndefined()
  })
})

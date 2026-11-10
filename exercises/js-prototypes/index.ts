// Lesson js-prototypes: Behind every class is a prototype
// Duration: about 20 minutes
//
// Exercise: Build a small inheritance without class, only with Object.create.
// 1. productProto inherits from entityProto (Object.create) and adds kind = 'Produkt'
//    and formatPrice(), e.g. '12,99 €'.
// 2. createProduct(data) creates an object with productProto as its prototype and
//    copies the data into it as own properties.
// 3. prototypeChain(value) returns all prototypes up to, but not including, null
//    (Object.getPrototypeOf in a loop).
// 4. mergeSafe(target, input) copies only own keys and skips
//    '__proto__', 'constructor' and 'prototype' (prototype pollution).
//
// Check: npm test -- js-prototypes

import type { Product } from '#shop'

export type Entity = { id: string; kind: string; describe(this: Entity): string }
export type ProductEntity = Entity & Product & { formatPrice(this: ProductEntity): string }

export const entityProto = {
  kind: 'Entity',
  describe(this: Entity): string {
    return `${this.kind} ${this.id}`
  },
}

// TODO: the prototype of productProto should be entityProto (Object.create instead of an object literal)
export const productProto = {
  kind: 'Produkt',
  formatPrice(this: ProductEntity): string {
    throw new Error('TODO: priceCents als "12,99 €" formatieren')
  },
}

export const createProduct = (data: Product): ProductEntity => {
  throw new Error('TODO: Object.create(productProto) und Daten kopieren')
}

export const prototypeChain = (value: object): object[] => {
  throw new Error('TODO: Object.getPrototypeOf bis null')
}

export const mergeSafe = <T extends object>(target: T, input: Record<string, unknown>): T => {
  throw new Error('TODO: eigene Keys kopieren, gefährliche Keys überspringen')
}

import type { Product } from '#shop'

export type Entity = { id: string; kind: string; describe(this: Entity): string }
export type ProductEntity = Entity & Product & { formatPrice(this: ProductEntity): string }

export const entityProto = {
  kind: 'Entity',
  describe(this: Entity): string {
    return `${this.kind} ${this.id}`
  },
}

export const productProto = Object.assign(Object.create(entityProto) as typeof entityProto, {
  kind: 'Produkt',
  formatPrice(this: ProductEntity): string {
    return `${(this.priceCents / 100).toFixed(2).replace('.', ',')} €`
  },
})

export const createProduct = (data: Product): ProductEntity =>
  Object.assign(Object.create(productProto) as ProductEntity, data)

export const prototypeChain = (value: object): object[] => {
  const chain: object[] = []
  let current = Object.getPrototypeOf(value) as object | null
  while (current !== null) {
    chain.push(current)
    current = Object.getPrototypeOf(current) as object | null
  }
  return chain
}

const forbiddenKeys = new Set(['__proto__', 'constructor', 'prototype'])

export const mergeSafe = <T extends object>(target: T, input: Record<string, unknown>): T => {
  const result = { ...target } as Record<string, unknown>
  for (const key of Object.keys(input)) {
    if (forbiddenKeys.has(key)) continue
    result[key] = input[key]
  }
  return result as T
}

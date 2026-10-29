// Lektion js-prototypes: Hinter jeder class steht ein Prototyp
// Dauer: etwa 20 Minuten
//
// Aufgabe: Bau eine kleine Vererbung ohne class, nur mit Object.create.
// 1. productProto erbt von entityProto (Object.create) und ergänzt kind = 'Produkt'
//    und formatPrice(), z. B. '12,99 €'.
// 2. createProduct(data) erzeugt ein Objekt mit productProto als Prototyp und
//    kopiert die Daten als eigene Properties hinein.
// 3. prototypeChain(value) liefert alle Prototypen bis vor null
//    (Object.getPrototypeOf in einer Schleife).
// 4. mergeSafe(target, input) kopiert nur eigene Keys und überspringt
//    '__proto__', 'constructor' und 'prototype' (Prototype Pollution).
//
// Prüfen: npm test -- js-prototypes

import type { Product } from '#shop'

export type Entity = { id: string; kind: string; describe(this: Entity): string }
export type ProductEntity = Entity & Product & { formatPrice(this: ProductEntity): string }

export const entityProto = {
  kind: 'Entity',
  describe(this: Entity): string {
    return `${this.kind} ${this.id}`
  },
}

// TODO: Prototyp von productProto soll entityProto sein (Object.create statt Objekt-Literal)
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

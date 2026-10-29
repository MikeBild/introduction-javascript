// Lektion js-functional-patterns: Pure Functions im Core, Side Effects am Rand
// Dauer: etwa 20 Minuten
//
// Aufgabe
// 1. memoize: typisierte Funktion mit Map als Cache. Ein zweiter Aufruf mit
//    demselben Argument ruft fn nicht noch einmal auf.
// 2. pipe: setzt Funktionen von links nach rechts zusammen (reduce).
// 3. checkoutTotal: subtotal → 10 % Rabatt → 19 % MwSt, nur aus pipe und den
//    kleinen reinen Funktionen zusammengesetzt.
// 4. stampOrder liest die Uhr direkt (new Date()) – ein Side Effect mitten im Core.
//    Gib die Uhr als Parameter hinein, damit die Funktion pur und testbar wird.
//    Überleg dir: Warum darfst du stampOrder nie memoizen?
//
// Prüfen: npm test -- js-functional-patterns

import type { Order, OrderItem } from '#shop'

export const memoize = <Arg, Value>(fn: (arg: Arg) => Value): ((arg: Arg) => Value) => {
  throw new Error('TODO: Map als Cache')
}

export const pipe =
  <Value>(...fns: Array<(value: Value) => Value>) =>
  (value: Value): Value => {
    throw new Error('TODO: fns.reduce')
  }

export const subtotal = (items: readonly OrderItem[]): number =>
  items.reduce((sum, item) => sum + item.quantity * item.priceCents, 0)

export const applyDiscount =
  (percent: number) =>
  (cents: number): number =>
    Math.round(cents * (1 - percent / 100))

export const addVat =
  (rate: number) =>
  (cents: number): number =>
    Math.round(cents * (1 + rate))

export const checkoutTotal = (items: readonly OrderItem[]): number => {
  throw new Error('TODO: pipe(applyDiscount(10), addVat(0.19)) auf subtotal anwenden')
}

// TODO: now als Parameter, z. B. (order, now: () => Date)
export const stampOrder = (order: Order): Order => ({ ...order, createdAt: new Date().toISOString() })

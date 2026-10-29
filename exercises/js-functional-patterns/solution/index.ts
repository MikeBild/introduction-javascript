import type { Order, OrderItem } from '#shop'

export const memoize = <Arg, Value>(fn: (arg: Arg) => Value): ((arg: Arg) => Value) => {
  const cache = new Map<Arg, Value>()
  return (arg) => {
    if (cache.has(arg)) return cache.get(arg) as Value
    const value = fn(arg)
    cache.set(arg, value)
    return value
  }
}

export const pipe =
  <Value>(...fns: Array<(value: Value) => Value>) =>
  (value: Value): Value =>
    fns.reduce((current, fn) => fn(current), value)

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

const discountThenVat = pipe(applyDiscount(10), addVat(0.19))

export const checkoutTotal = (items: readonly OrderItem[]): number => discountThenVat(subtotal(items))

// Die Uhr kommt von außen: Der Core bleibt pur, der Side Effect sitzt beim Aufrufer.
// Memoization wäre hier falsch: Gleiche Eingabe, aber jede Uhrzeit ergibt ein anderes Ergebnis.
export const stampOrder = (order: Order, now: () => Date = () => new Date()): Order => ({
  ...order,
  createdAt: now().toISOString(),
})

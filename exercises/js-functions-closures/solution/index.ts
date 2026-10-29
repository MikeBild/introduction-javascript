export const createIdGenerator = (prefix: string): (() => string) => {
  let counter = 0 // lebt in der Closure, von außen nicht erreichbar
  return () => `${prefix}-${++counter}`
}

export const withVat =
  (rate: number) =>
  (netCents: number): number =>
    Math.round(netCents * (1 + rate))

export const partial =
  <A, B, R>(fn: (a: A, b: B) => R, a: A) =>
  (b: B): R =>
    fn(a, b)

export const lineTotal = (quantity: number, priceCents: number): number => quantity * priceCents

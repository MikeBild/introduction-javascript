// Lesson ts-generics: Generics preserve what any throws away
// Duration: about 20 minutes
//
// Exercise: The functions work, but any throws away all type information.
// Write them as generic functions without any:
// 1. last<Item>(items): last element or undefined.
// 2. groupBy<Item, Key extends PropertyKey>(items, keyOf): Partial<Record<Key, Item[]>>,
//    e.g. group orders by status.
// 3. mapResult: applies fn only to a successful Result, failures stay unchanged.
// The tests pin down every signature with expectTypeOf.
//
// Check: npm test -- ts-generics and npm run typecheck:start

export type Result<Value, Failure> = { ok: true; value: Value } | { ok: false; error: Failure }

export const last = (items: readonly any[]): any => items.at(-1)

export const groupBy = (items: readonly any[], keyOf: (item: any) => PropertyKey): any =>
  items.reduce((groups, item) => {
    const key = keyOf(item)
    return { ...groups, [key]: [...(groups[key] ?? []), item] }
  }, {})

export const mapResult = (result: Result<any, any>, fn: (value: any) => any): Result<any, any> =>
  result.ok ? { ok: true, value: fn(result.value) } : result

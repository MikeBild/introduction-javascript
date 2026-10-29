export type Result<Value, Failure> = { ok: true; value: Value } | { ok: false; error: Failure }

export const last = <Item>(items: readonly Item[]): Item | undefined => items.at(-1)

export const groupBy = <Item, Key extends PropertyKey>(
  items: readonly Item[],
  keyOf: (item: Item) => Key,
): Partial<Record<Key, Item[]>> =>
  items.reduce<Partial<Record<Key, Item[]>>>((groups, item) => {
    const key = keyOf(item)
    return { ...groups, [key]: [...(groups[key] ?? []), item] }
  }, {})

export const mapResult = <Value, Next, Failure>(
  result: Result<Value, Failure>,
  fn: (value: Value) => Next,
): Result<Next, Failure> => (result.ok ? { ok: true, value: fn(result.value) } : result)

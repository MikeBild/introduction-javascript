import type { Order } from '#shop'

export type Page = { items: Order[]; next?: string }

export function* naturals(): Generator<number, never> {
  let n = 1
  while (true) yield n++
}

export const firstEvenSquares = (n: number): number[] =>
  naturals()
    .filter((value) => value % 2 === 0)
    .map((value) => value * value)
    .take(n)
    .toArray()

export async function* allOrders(fetchPage: (cursor?: string) => Promise<Page>): AsyncGenerator<Order> {
  let cursor: string | undefined
  do {
    const page = await fetchPage(cursor)
    yield* page.items
    cursor = page.next
  } while (cursor)
}

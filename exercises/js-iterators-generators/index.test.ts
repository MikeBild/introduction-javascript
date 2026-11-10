import { describe, expect, it, vi } from 'vitest'
import { orders, type Order } from '#shop'
import { allOrders, firstEvenSquares, naturals, type Page } from '#ex/js-iterators-generators'

describe('naturals', () => {
  it('produces 1, 2, 3, … on demand', () => {
    const numbers = naturals()
    expect([numbers.next().value, numbers.next().value, numbers.next().value]).toEqual([1, 2, 3])
  })
})

describe('firstEvenSquares', () => {
  it('returns the squares of the first even numbers', () => {
    expect(firstEvenSquares(4)).toEqual([4, 16, 36, 64])
  })
  it('works lazily – finishes instantly even for large amounts', () => {
    expect(firstEvenSquares(10_000).at(-1)).toBe(20_000 ** 2)
  })
})

describe('allOrders', () => {
  const all = orders()
  const pages: Record<string, Page> = {
    start: { items: all.slice(0, 2), next: 'c-2' },
    'c-2': { items: all.slice(2, 3), next: 'c-3' },
    'c-3': { items: all.slice(3) },
  }

  it('reads all pages with for await', async () => {
    const fetchPage = vi.fn(async (cursor?: string) => pages[cursor ?? 'start']!)
    const ids: string[] = []
    for await (const order of allOrders(fetchPage)) ids.push(order.id)
    expect(ids).toEqual(['o-1', 'o-2', 'o-3', 'o-4'])
    expect(fetchPage.mock.calls.map(([cursor]) => cursor)).toEqual([undefined, 'c-2', 'c-3'])
  })
  it('loads only as many pages as needed', async () => {
    const fetchPage = vi.fn(async (cursor?: string) => pages[cursor ?? 'start']!)
    let first: Order | undefined
    for await (const order of allOrders(fetchPage)) {
      first = order
      break
    }
    expect(first?.id).toBe('o-1')
    expect(fetchPage).toHaveBeenCalledTimes(1)
  })
})

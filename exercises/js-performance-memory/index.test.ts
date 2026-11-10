import { describe, expect, it, vi } from 'vitest'
import { memoize } from '#ex/js-performance-memory'

describe('memoize with a limit', () => {
  it('caches results', () => {
    const price = vi.fn((id: string) => id.length)
    const cached = memoize(price, 10)
    cached('p-1')
    cached('p-1')
    expect(price).toHaveBeenCalledTimes(1)
  })
  it('never grows beyond maxEntries', () => {
    const cached = memoize((n: number) => n * 2, 100)
    for (let n = 0; n < 10_000; n++) cached(n)
    expect(cached.cache.size).toBe(100)
  })
  it('evicts the least recently used entry (LRU)', () => {
    const fn = vi.fn((key: string) => key.toUpperCase())
    const cached = memoize(fn, 2)
    cached('a')
    cached('b')
    cached('a') // a is now fresher than b
    cached('c') // b is evicted
    expect([...cached.cache.keys()]).toEqual(['a', 'c'])
    cached('a')
    expect(fn).toHaveBeenCalledTimes(3)
  })
})

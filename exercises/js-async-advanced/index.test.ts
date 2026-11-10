import { describe, expect, it } from 'vitest'
import { orders } from '#shop'
import { mapWithLimit, tick, withTimeout } from '#ex/js-async-advanced'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe('tick', () => {
  it('yields one order per tick and ends after the last one', async () => {
    const ids: string[] = []
    for await (const order of tick(orders(), 5)) ids.push(order.id)
    expect(ids).toEqual(['o-1', 'o-2', 'o-3', 'o-4'])
  })
  it('waits between ticks', async () => {
    const started = performance.now()
    for await (const _ of tick([1, 2, 3], 20)) {
      // just count
    }
    expect(performance.now() - started).toBeGreaterThanOrEqual(50)
  })
  it('can be aborted from outside', async () => {
    const controller = new AbortController()
    const ids: string[] = []
    for await (const order of tick(orders(), 5, controller.signal)) {
      ids.push(order.id)
      if (ids.length === 2) controller.abort()
    }
    expect(ids).toEqual(['o-1', 'o-2'])
  })
})

describe('mapWithLimit', () => {
  it('respects the limit and keeps the order', async () => {
    let running = 0
    let maxRunning = 0
    const loadStock = async (id: number) => {
      running++
      maxRunning = Math.max(maxRunning, running)
      await sleep(10 - id) // later ones finish faster
      running--
      return id * 10
    }
    const result = await mapWithLimit([1, 2, 3, 4, 5, 6, 7], 3, loadStock)
    expect(result).toEqual([10, 20, 30, 40, 50, 60, 70])
    expect(maxRunning).toBe(3)
  })
})

describe('withTimeout', () => {
  it('returns the result when it is fast enough', async () => {
    await expect(withTimeout(async () => 'paid', 50)).resolves.toBe('paid')
  })
  it('aborts after the time and passes the signal on', async () => {
    let receivedSignal: AbortSignal | undefined
    const slow = (signal: AbortSignal) => {
      receivedSignal = signal
      return sleep(1000).then(() => 'zu spät')
    }
    await expect(withTimeout(slow, 20)).rejects.toMatchObject({ name: 'TimeoutError' })
    expect(receivedSignal?.aborted).toBe(true)
  })
})

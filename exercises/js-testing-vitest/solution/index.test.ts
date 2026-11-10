import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { orders, products, type Order } from '#shop'
import { orderTotal, placeOrder, waitForPayment } from '../index.ts'

const draft = (): Order => orders().find((order) => order.status === 'draft')!

describe('orderTotal', () => {
  it('sums quantity × priceCents', () => {
    const [first] = orders()
    expect(orderTotal(first!)).toBe(3397)
  })
  it('returns 0 for an order without line items', () => {
    expect(orderTotal({ ...draft(), items: [] })).toBe(0)
  })
})

describe('placeOrder', () => {
  it('sets a draft order to placed', async () => {
    await expect(placeOrder(draft(), products())).resolves.toMatchObject({ id: 'o-3', status: 'placed' })
  })
  it('rejects an order without line items', async () => {
    await expect(placeOrder({ ...draft(), items: [] }, products())).rejects.toThrow('keine Positionen')
  })
  it('rejects an order when the stock is not sufficient', async () => {
    const order = { ...draft(), items: [{ productId: 'p-3', quantity: 1, priceCents: 799 }] }
    await expect(placeOrder(order, products())).rejects.toThrow('Nicht genug Bestand: p-3')
  })
  it('rejects an order that is not in status draft', async () => {
    await expect(placeOrder({ ...draft(), status: 'paid' }, products())).rejects.toThrow('nicht im Status draft')
  })
})

describe('waitForPayment', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns paid as soon as the payment arrives – without real waiting', async () => {
    const isPaid = vi.fn<() => Promise<boolean>>().mockResolvedValueOnce(false).mockResolvedValueOnce(true)
    const result = waitForPayment(isPaid)
    await vi.advanceTimersByTimeAsync(6000)
    await expect(result).resolves.toBe('paid')
    expect(isPaid).toHaveBeenCalledTimes(2)
  })
  it('gives up after three attempts', async () => {
    const isPaid = vi.fn(async () => false)
    const result = waitForPayment(isPaid)
    const assertion = expect(result).rejects.toThrow('Zahlung nicht eingegangen') // attach before fast-forwarding
    await vi.advanceTimersByTimeAsync(9000)
    await assertion
    expect(isPaid).toHaveBeenCalledTimes(3)
  })
})

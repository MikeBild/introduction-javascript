import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { orders, products, type Order } from '#shop'
import { orderTotal, placeOrder, waitForPayment } from '../index.ts'

const draft = (): Order => orders().find((order) => order.status === 'draft')!

describe('orderTotal', () => {
  it('summiert quantity × priceCents', () => {
    const [first] = orders()
    expect(orderTotal(first!)).toBe(3397)
  })
  it('liefert 0 für eine Bestellung ohne Positionen', () => {
    expect(orderTotal({ ...draft(), items: [] })).toBe(0)
  })
})

describe('placeOrder', () => {
  it('setzt eine draft-Bestellung auf placed', async () => {
    await expect(placeOrder(draft(), products())).resolves.toMatchObject({ id: 'o-3', status: 'placed' })
  })
  it('lehnt eine Bestellung ohne Positionen ab', async () => {
    await expect(placeOrder({ ...draft(), items: [] }, products())).rejects.toThrow('keine Positionen')
  })
  it('lehnt eine Bestellung ab, wenn der Bestand nicht reicht', async () => {
    const order = { ...draft(), items: [{ productId: 'p-3', quantity: 1, priceCents: 799 }] }
    await expect(placeOrder(order, products())).rejects.toThrow('Nicht genug Bestand: p-3')
  })
  it('lehnt eine Bestellung ab, die nicht im Status draft ist', async () => {
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

  it('liefert paid, sobald die Zahlung da ist – ohne echte Wartezeit', async () => {
    const isPaid = vi.fn<() => Promise<boolean>>().mockResolvedValueOnce(false).mockResolvedValueOnce(true)
    const result = waitForPayment(isPaid)
    await vi.advanceTimersByTimeAsync(6000)
    await expect(result).resolves.toBe('paid')
    expect(isPaid).toHaveBeenCalledTimes(2)
  })
  it('gibt nach drei Versuchen auf', async () => {
    const isPaid = vi.fn(async () => false)
    const result = waitForPayment(isPaid)
    const assertion = expect(result).rejects.toThrow('Zahlung nicht eingegangen') // vor dem Vorspulen anhängen
    await vi.advanceTimersByTimeAsync(9000)
    await assertion
    expect(isPaid).toHaveBeenCalledTimes(3)
  })
})

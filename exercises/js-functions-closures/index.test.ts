import { describe, expect, it } from 'vitest'
import { createIdGenerator, lineTotal, partial, withVat } from '#ex/js-functions-closures'

describe('createIdGenerator', () => {
  it('zählt pro Aufruf hoch', () => {
    const nextOrderId = createIdGenerator('o')
    expect([nextOrderId(), nextOrderId(), nextOrderId()]).toEqual(['o-1', 'o-2', 'o-3'])
  })
  it('jeder Generator hat seinen eigenen Zähler', () => {
    const nextOrderId = createIdGenerator('o')
    const nextProductId = createIdGenerator('p')
    nextOrderId()
    expect(nextProductId()).toBe('p-1')
    expect(nextOrderId()).toBe('o-2')
  })
})

describe('withVat', () => {
  it('rechnet brutto in ganzen Cent', () => {
    const germanVat = withVat(0.19)
    expect(germanVat(1000)).toBe(1190)
    expect(germanVat(1299)).toBe(1546)
    expect(withVat(0.07)(1000)).toBe(1070)
  })
})

describe('partial', () => {
  it('fixiert das erste Argument', () => {
    const threeTimes = partial(lineTotal, 3)
    expect(threeTimes(1299)).toBe(3897)
    expect(threeTimes(100)).toBe(300)
  })
})

import { describe, expect, expectTypeOf, it } from 'vitest'
import { orders } from '#shop'
import { icon, isSuccess, render, type OrdersState, type SuccessState } from '#ex/ts-narrowing'

const states: OrdersState[] = [
  { status: 'idle' },
  { status: 'loading' },
  { status: 'success', orders: orders() },
  { status: 'error', message: 'Timeout' },
]

describe('render und icon', () => {
  it('kennen alle States', () => {
    expect(states.map(render)).toEqual(['Noch nicht geladen', 'Lädt …', '4 Bestellungen', 'Fehler: Timeout'])
    expect(states.map(icon)).toEqual(['clock', 'spinner', 'check', 'alert'])
  })
})

describe('isSuccess', () => {
  it('filtert die erfolgreichen States', () => {
    const successes = states.filter(isSuccess)
    expect(successes).toHaveLength(1)
    expectTypeOf(successes).toEqualTypeOf<SuccessState[]>()
    expect(successes[0]?.orders).toHaveLength(4)
  })
})

// Lesson ts-narrowing: Make invalid states impossible
// Duration: about 20 minutes
//
// Exercise: OrdersState describes loading the order list as a discriminated union.
// 1. Add the state { status: 'idle' } (not loaded yet).
// 2. Run npm run typecheck: assertNever flags every switch that does not know idle.
//    render returns 'Noch nicht geladen' for idle, icon returns 'clock'.
// 3. Write the type guard isSuccess so that filter(isSuccess) returns SuccessState[].
//
// Check: npm test -- ts-narrowing and npm run typecheck:start

import type { Order } from '#shop'

export type OrdersState =
  | { status: 'loading' }
  | { status: 'success'; orders: Order[] }
  | { status: 'error'; message: string }

export type SuccessState = Extract<OrdersState, { status: 'success' }>

export const assertNever = (value: never): never => {
  throw new Error(`Unerwarteter Fall: ${JSON.stringify(value)}`)
}

export const render = (state: OrdersState): string => {
  switch (state.status) {
    case 'loading':
      return 'Lädt …'
    case 'success':
      return `${state.orders.length} Bestellungen`
    case 'error':
      return `Fehler: ${state.message}`
    default:
      return assertNever(state)
  }
}

export const icon = (state: OrdersState): string => {
  switch (state.status) {
    case 'loading':
      return 'spinner'
    case 'success':
      return 'check'
    case 'error':
      return 'alert'
    default:
      return assertNever(state)
  }
}

export const isSuccess = (state: OrdersState): boolean => {
  throw new Error('TODO: Type Guard mit state is SuccessState')
}

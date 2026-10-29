// Lektion ts-narrowing: Ungültige States unmöglich machen
// Dauer: etwa 20 Minuten
//
// Aufgabe: OrdersState beschreibt das Laden der Bestellliste als Discriminated Union.
// 1. Ergänze den State { status: 'idle' } (noch nicht geladen).
// 2. Führ npm run typecheck aus: assertNever meldet jeden switch, der idle nicht kennt.
//    render liefert für idle 'Noch nicht geladen', icon liefert 'clock'.
// 3. Schreib den Type Guard isSuccess, damit filter(isSuccess) SuccessState[] liefert.
//
// Prüfen: npm test -- ts-narrowing und npm run typecheck:start

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

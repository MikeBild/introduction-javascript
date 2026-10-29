import type { Order } from '#shop'

export type OrdersState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; orders: Order[] }
  | { status: 'error'; message: string }

export type SuccessState = Extract<OrdersState, { status: 'success' }>

export const assertNever = (value: never): never => {
  throw new Error(`Unerwarteter Fall: ${JSON.stringify(value)}`)
}

export const render = (state: OrdersState): string => {
  switch (state.status) {
    case 'idle':
      return 'Noch nicht geladen'
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
    case 'idle':
      return 'clock'
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

export const isSuccess = (state: OrdersState): state is SuccessState => state.status === 'success'

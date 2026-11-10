import type { OrderItem } from '#shop'

// Annotated at the boundary: parameter and return type
export const formatPrice = (cents: number): string => `${(cents / 100).toFixed(2).replace('.', ',')} €`

// Return type inferred: number
export const lineTotal = (item: OrderItem) => item.quantity * item.priceCents

export const parseQuantity = (input: unknown): number => {
  const value = typeof input === 'string' && input.trim() !== '' ? Number(input) : input
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 1) {
    throw new TypeError(`Ungültige Menge: ${String(input)}`)
  }
  return value
}

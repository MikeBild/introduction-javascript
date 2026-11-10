// Workshop shop: the running example of all workshops.
// Money is always whole cents (priceCents), never a decimal.
// The IDs are still plain strings here – in the lesson ts-branded-types
// you turn them into Branded Types so nobody mixes up OrderId and CustomerId.

export type ProductId = string
export type OrderId = string
export type CustomerId = string

export type Product = {
  id: ProductId
  name: string
  priceCents: number
  stock: number
}

export type OrderItem = {
  productId: ProductId
  quantity: number // ≥ 1
  priceCents: number // unit price at the time of the order
}

export const ORDER_STATUSES = ['draft', 'placed', 'paid', 'shipped', 'cancelled'] as const
export type OrderStatus = (typeof ORDER_STATUSES)[number]

export type Order = {
  id: OrderId
  customerId: CustomerId
  items: OrderItem[]
  status: OrderStatus
  createdAt: string // ISO 8601
}

export type Customer = {
  id: CustomerId
  name: string
  email: string
}

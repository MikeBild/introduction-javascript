// Werkstatt-Shop: das durchgehende Beispiel aller Workshops.
// Geld immer als ganze Cent (priceCents), nie als Kommazahl.
// Die IDs sind hier noch einfache Strings – in der Lektion ts-branded-types
// machst du daraus Branded Types, damit niemand OrderId und CustomerId vertauscht.

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
  priceCents: number // Preis pro Stück zum Bestellzeitpunkt
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

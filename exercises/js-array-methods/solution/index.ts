import type { Order, ProductId } from '#shop'

export type Seller = { productId: ProductId; quantity: number }

export const orderTotalCents = (order: Order): number =>
  order.items.reduce((sum, item) => sum + item.quantity * item.priceCents, 0)

const isOpen = (order: Order): boolean => order.status === 'draft' || order.status === 'placed'

export const openOrdersTotal = (orders: readonly Order[]): number =>
  orders.filter(isOpen).reduce((sum, order) => sum + orderTotalCents(order), 0)

export const topSellers = (orders: readonly Order[], n: number): Seller[] => {
  const quantities = orders
    .filter((order) => order.status !== 'cancelled')
    .flatMap((order) => order.items)
    .reduce<Record<ProductId, number>>(
      (sum, item) => ({ ...sum, [item.productId]: (sum[item.productId] ?? 0) + item.quantity }),
      {},
    )
  return Object.entries(quantities)
    .map(([productId, quantity]) => ({ productId, quantity }))
    .toSorted((a, b) => b.quantity - a.quantity || a.productId.localeCompare(b.productId))
    .slice(0, n)
}

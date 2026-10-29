import type { Order } from '#shop'

export const firstItemPrice = (order: Order): number | undefined => order.items[0]?.priceCents

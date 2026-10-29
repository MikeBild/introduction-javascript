import type { Product } from '#shop'

export const ORDER_STATUSES = ['draft', 'placed', 'paid', 'shipped', 'cancelled'] as const
export type OrderStatus = (typeof ORDER_STATUSES)[number]

export const isStatus = (value: unknown): value is OrderStatus =>
  typeof value === 'string' && (ORDER_STATUSES as readonly string[]).includes(value)

export type TaggedProduct = Product & { readonly tags: readonly string[] }

export const addTag = (product: TaggedProduct, tag: string): TaggedProduct =>
  product.tags.includes(tag) ? product : { ...product, tags: [...product.tags, tag] }

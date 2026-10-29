import type { CustomerId, OrderItem, ProductId } from '#shop'

export type Cart = {
  customerId: CustomerId
  items: readonly OrderItem[]
  meta: { coupon?: string; currency: 'EUR' }
}

export const addItem = (cart: Cart, item: OrderItem): Cart => {
  const exists = cart.items.some((current) => current.productId === item.productId)
  return {
    ...cart,
    items: exists
      ? cart.items.map((current) =>
          current.productId === item.productId ? { ...current, quantity: current.quantity + item.quantity } : current,
        )
      : [...cart.items, item],
  }
}

export const setQuantity = (cart: Cart, productId: ProductId, quantity: number): Cart => ({
  ...cart,
  items:
    quantity <= 0
      ? cart.items.filter((item) => item.productId !== productId)
      : cart.items.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
})

export const applyCoupon = (cart: Cart, coupon: string): Cart => ({
  ...cart,
  meta: { ...cart.meta, coupon },
})

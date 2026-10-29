import type { Customer, Order, Product } from './domain.ts'

// Beispieldaten. Die Funktionen liefern immer frische Kopien,
// damit kein Test die Daten eines anderen verändert.

export const products = (): Product[] => [
  { id: 'p-1', name: 'Hammer', priceCents: 1299, stock: 12 },
  { id: 'p-2', name: 'Schraubendreher-Set', priceCents: 2450, stock: 5 },
  { id: 'p-3', name: 'Zollstock', priceCents: 799, stock: 0 },
  { id: 'p-4', name: 'Akkuschrauber', priceCents: 8999, stock: 3 },
]

export const customers = (): Customer[] => [
  { id: 'c-1', name: 'Ada Schmidt', email: 'ada@example.org' },
  { id: 'c-2', name: 'Linus Weber', email: 'linus@example.org' },
]

export const orders = (): Order[] => [
  {
    id: 'o-1',
    customerId: 'c-1',
    status: 'paid',
    createdAt: '2026-10-01T09:15:00.000Z',
    items: [
      { productId: 'p-1', quantity: 2, priceCents: 1299 },
      { productId: 'p-3', quantity: 1, priceCents: 799 },
    ],
  },
  {
    id: 'o-2',
    customerId: 'c-2',
    status: 'placed',
    createdAt: '2026-10-02T14:30:00.000Z',
    items: [{ productId: 'p-4', quantity: 1, priceCents: 8999 }],
  },
  {
    id: 'o-3',
    customerId: 'c-1',
    status: 'draft',
    createdAt: '2026-10-03T08:00:00.000Z',
    items: [
      { productId: 'p-2', quantity: 1, priceCents: 2450 },
      { productId: 'p-1', quantity: 1, priceCents: 1299 },
    ],
  },
  {
    id: 'o-4',
    customerId: 'c-2',
    status: 'cancelled',
    createdAt: '2026-10-04T17:45:00.000Z',
    items: [{ productId: 'p-2', quantity: 3, priceCents: 2450 }],
  },
]

/** AUVYRA digital and physical bookstore pricing calculations */
export const FREE_DELIVERY_THRESHOLD = 0
export const DELIVERY_FEE = 0

export function deliveryFee(_subtotal: number) {
  return 0
}

/** Subtotal and final total are calculated from server/catalog prices and quantities. */
export function orderTotals(
  items: Array<{ price?: number; unitPrice?: number; quantity?: number }>,
) {
  const subtotal = items.reduce((sum, p) => {
    const cost = p.unitPrice ?? p.price ?? 0
    return sum + cost * (p.quantity ?? 1)
  }, 0)
  const delivery = 0 // Digital downloads & physical book delivery are free/included
  return { subtotal, delivery, total: subtotal }
}

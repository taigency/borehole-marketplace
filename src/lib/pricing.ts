/**
 * Single source of truth for order pricing.
 *
 * The 10% marketplace commission is charged ON TOP of the customer's bill
 * (a buyer-side service fee), so it is added into the total the customer pays.
 * Cart, checkout, and the orders API must all use these helpers so the number
 * the customer sees is exactly the number stored on the order.
 */

export const COMMISSION_RATE = 0.1 // 10% marketplace service fee
export const FREE_SHIPPING_THRESHOLD = 5000 // ZAR
export const FLAT_SHIPPING = 350 // ZAR

export interface PriceableItem {
  unit_price: number
  quantity: number
}

export interface OrderTotals {
  subtotal: number
  commission: number
  shipping: number
  total: number
}

/** Round to 2 decimals to avoid floating-point drift on currency amounts. */
function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

export function calculateSubtotal(items: PriceableItem[]): number {
  return round2(
    items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0)
  )
}

export function calculateShipping(subtotal: number): number {
  return subtotal > FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING
}

export function calculateCommission(subtotal: number): number {
  return round2(subtotal * COMMISSION_RATE)
}

/**
 * Authoritative order totals. Commission is added on top of the subtotal,
 * then shipping. This is used both to display prices and to persist them.
 */
export function calculateOrderTotals(items: PriceableItem[]): OrderTotals {
  const subtotal = calculateSubtotal(items)
  const commission = calculateCommission(subtotal)
  const shipping = calculateShipping(subtotal)
  const total = round2(subtotal + commission + shipping)

  return { subtotal, commission, shipping, total }
}

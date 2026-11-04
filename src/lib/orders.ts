import products, { formatPrice, getPrice, type BookEdition } from '@/data/products'
import type { CartItem } from './store'

export interface OrderCustomer {
  name: string
  email: string
  whatsapp: string
  address?: string
  city?: string
  pincode?: string
  notes?: string
}

export interface OrderItem {
  id: number
  cartKey: string
  name: string
  price: number
  quantity: number
  edition: BookEdition
  format: string
  category: string
}

export interface Order {
  id: string
  createdAt: string
  customer: OrderCustomer
  items: Array<OrderItem>
  hasDigitalItems: boolean
  hasPhysicalItems: boolean
  subtotal: number
  total: number
  paymentStatus: 'pending' | 'verified'
  paymentGateway: 'pending_verification' | 'upi_whatsapp' | 'stripe' | 'razorpay'
  deliveryEmailSent: boolean
  shippingStatus?: 'pending_verification' | 'processing' | 'dispatched'
}

const ORDERS_STORAGE_KEY = 'auvyra:orders'
const LAST_ORDER_KEY = 'auvyra:last_order_id'

export function generateOrderId(): string {
  const date = new Date()
  const year = date.getFullYear().toString().slice(-2)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const randomChars = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `AUV-${year}${month}${day}-${randomChars}`
}

export function validateCustomer(
  customer: OrderCustomer,
  options?: { requireAddress?: boolean },
): {
  valid: boolean
  errors: Partial<Record<keyof OrderCustomer, string>>
} {
  const errors: Partial<Record<keyof OrderCustomer, string>> = {}

  if (!customer.name || customer.name.trim().length < 2) {
    errors.name = 'Please enter your full name (at least 2 characters)'
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!customer.email || !emailRegex.test(customer.email.trim())) {
    errors.email = 'Please enter a valid email address for digital delivery'
  }

  const phoneDigits = customer.whatsapp.replace(/\D/g, '')
  if (!phoneDigits || phoneDigits.length < 10) {
    errors.whatsapp = 'Please enter a valid 10-digit WhatsApp phone number'
  }

  if (options?.requireAddress) {
    if (!customer.address || customer.address.trim().length < 8) {
      errors.address = 'Please enter complete delivery street address for physical books'
    }
    if (!customer.city || customer.city.trim().length < 2) {
      errors.city = 'Please enter city / town'
    }
    const pin = (customer.pincode || '').replace(/\D/g, '')
    if (!pin || pin.length < 6) {
      errors.pincode = 'Please enter a valid 6-digit postal pincode'
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}

/** Reads all placed orders from browser localStorage */
export function getAllOrders(): Array<Order> {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(ORDERS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/** Looks up an order by unique order ID */
export function getOrderById(orderId: string): Order | null {
  const orders = getAllOrders()
  return orders.find((o) => o.id === orderId) ?? null
}

/** Saves a newly placed order to local orders history */
export function saveOrder(order: Order): void {
  if (typeof window === 'undefined') return
  try {
    const existing = getAllOrders().filter((o) => o.id !== order.id)
    const updated = [order, ...existing]
    window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated))
    window.localStorage.setItem(LAST_ORDER_KEY, order.id)
  } catch (err) {
    console.error('Failed to save order to localStorage:', err)
  }
}

/** Gets the most recently placed order ID */
export function getLastOrderId(): string | null {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(LAST_ORDER_KEY)
}

/**
 * Creates and records a new order from cart items and customer details.
 * Calculates prices authoritatively from products data based on edition.
 */
export function createOrderFromCart(
  customer: OrderCustomer,
  cartItems: Array<Pick<CartItem, 'id' | 'edition' | 'quantity' | 'cartKey'>>,
): Order {
  const orderItems: Array<OrderItem> = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.id)
    if (!product) {
      throw new Error(`Product not found: ${item.id}`)
    }
    const edition = item.edition || 'digital'
    const unitPrice = getPrice(product, edition)

    return {
      id: product.id,
      cartKey: item.cartKey || `${product.id}:${edition}`,
      name: product.name,
      price: unitPrice,
      quantity: item.quantity,
      edition,
      format: product.format,
      category: product.category,
    }
  })

  const hasDigitalItems = orderItems.some((i) => i.edition === 'digital')
  const hasPhysicalItems = orderItems.some((i) => i.edition === 'physical')

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal // Digital delivery & physical courier shipping are free/included

  const newOrder: Order = {
    id: generateOrderId(),
    createdAt: new Date().toISOString(),
    customer: {
      name: customer.name.trim(),
      email: customer.email.trim(),
      whatsapp: customer.whatsapp.trim(),
      address: customer.address?.trim() || undefined,
      city: customer.city?.trim() || undefined,
      pincode: customer.pincode?.trim() || undefined,
      notes: customer.notes?.trim() || undefined,
    },
    items: orderItems,
    hasDigitalItems,
    hasPhysicalItems,
    subtotal,
    total,
    paymentStatus: 'pending', // Pending payment verification
    paymentGateway: 'pending_verification',
    deliveryEmailSent: false,
    shippingStatus: hasPhysicalItems ? 'pending_verification' : undefined,
  }

  saveOrder(newOrder)
  return newOrder
}

/**
 * Updates order payment status when payment is verified.
 */
export function setOrderPaymentVerified(orderId: string): Order | null {
  const order = getOrderById(orderId)
  if (!order) return null
  const updated: Order = {
    ...order,
    paymentStatus: 'verified',
    deliveryEmailSent: true,
    shippingStatus: order.hasPhysicalItems ? 'processing' : undefined,
  }
  saveOrder(updated)
  return updated
}

/**
 * Builds formatted text message for customer to share on WhatsApp with AUVYRA
 */
export function buildOrderConfirmationMessage(order: Order): string {
  const itemsText = order.items
    .map((item, idx) => {
      const editionTag =
        item.edition === 'physical' ? 'PHYSICAL PRINTED BOOK' : 'DIGITAL EBOOK (PDF)'
      return `${idx + 1}. ${item.name} [${editionTag}] — Qty: ${item.quantity} × ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}`
    })
    .join('\n')

  const deliveryNotice = [
    order.hasDigitalItems ? '• Digital files: Instant access unlocked upon verification' : '',
    order.hasPhysicalItems
      ? `• Physical books: Courier shipping to ${order.customer.city || 'your address'} (Pincode: ${order.customer.pincode || ''})`
      : '',
  ]
    .filter(Boolean)
    .join('\n')

  return [
    `*AUVYRA BOOKSTORE ORDER*`,
    `*Order ID:* ${order.id}`,
    `*Date:* ${new Date(order.createdAt).toLocaleDateString()}`,
    ``,
    `*Customer Details:*`,
    `Name: ${order.customer.name}`,
    `Email: ${order.customer.email}`,
    `WhatsApp: ${order.customer.whatsapp}`,
    ...(order.customer.address
      ? [
          `Shipping Address: ${order.customer.address}, ${order.customer.city || ''} - ${order.customer.pincode || ''}`,
        ]
      : []),
    ...(order.customer.notes ? [`Notes: ${order.customer.notes}`] : []),
    ``,
    `*Purchased Books:*`,
    itemsText,
    ``,
    `*Final Payable Amount:* ${formatPrice(order.total)}`,
    `*Payment Status:* PENDING VERIFICATION`,
    ``,
    `*Fulfillment:*`,
    deliveryNotice,
  ].join('\n')
}

import { createContext, useContext, useEffect, useState } from 'react'
import products, { getPrice, type BookEdition, type Product } from '@/data/products'

export type { BookEdition }

export interface CartItem extends Product {
  cartKey: string // Unique identifier: `${id}:${edition}`
  edition: BookEdition
  quantity: number
  unitPrice: number
}

interface SavedCartEntry {
  id: number
  edition?: BookEdition
  quantity: number
}

interface StoreContextValue {
  cart: Array<string> // Array of cartKeys e.g. ["1:digital", "1:physical"]
  wishlist: Array<number>
  cartItems: Array<CartItem>
  cartCount: number
  subtotal: number
  inCart: (id: number, edition?: BookEdition) => boolean
  addToCart: (id: number, edition?: BookEdition) => void
  increaseQuantity: (cartKey: string) => void
  decreaseQuantity: (cartKey: string) => void
  removeFromCart: (cartKey: string) => void
  clearCart: () => void
  isSaved: (id: number) => boolean
  toggleSaved: (id: number) => void
}

const StoreContext = createContext<StoreContextValue | null>(null)
const CART_KEY = 'auvyra:cart'
const WISH_KEY = 'auvyra:wishlist'
const MAX_QUANTITY = 99

export function makeCartKey(id: number, edition: BookEdition = 'digital'): string {
  return `${id}:${edition}`
}

export function parseCartKey(cartKey: string): { id: number; edition: BookEdition } {
  const [idStr, editionStr] = cartKey.split(':')
  const id = Number(idStr)
  const edition: BookEdition = editionStr === 'physical' ? 'physical' : 'digital'
  return { id, edition }
}

function readCart(): { keys: string[]; quantities: Record<string, number> } {
  try {
    const raw: unknown = JSON.parse(window.localStorage.getItem(CART_KEY) ?? '[]')
    const entries: SavedCartEntry[] = []

    if (Array.isArray(raw)) {
      for (const item of raw) {
        if (typeof item === 'number') {
          entries.push({ id: item, edition: 'digital', quantity: 1 })
        } else if (item && typeof item === 'object' && 'id' in item) {
          entries.push({
            id: Number(item.id),
            edition: item.edition === 'physical' ? 'physical' : 'digital',
            quantity: Number(item.quantity) || 1,
          })
        }
      }
    } else if (raw && typeof raw === 'object' && 'items' in raw && Array.isArray(raw.items)) {
      for (const item of raw.items) {
        if (item && typeof item === 'object' && 'id' in item) {
          entries.push({
            id: Number(item.id),
            edition: item.edition === 'physical' ? 'physical' : 'digital',
            quantity: Number(item.quantity) || 1,
          })
        }
      }
    }

    const keys: string[] = []
    const quantities: Record<string, number> = {}

    for (const entry of entries) {
      const product = products.find((p) => p.id === entry.id)
      if (!product) continue
      const edition = entry.edition ?? (product.productType === 'physical' ? 'physical' : 'digital')
      const key = makeCartKey(entry.id, edition)
      const qty = Math.min(MAX_QUANTITY, Math.max(1, Math.floor(entry.quantity || 1)))

      if (!keys.includes(key)) {
        keys.push(key)
        quantities[key] = qty
      } else {
        quantities[key] = Math.min(MAX_QUANTITY, (quantities[key] || 0) + qty)
      }
    }

    return { keys, quantities }
  } catch {
    return { keys: [], quantities: {} }
  }
}

function readWishlist(): Array<number> {
  try {
    const raw = JSON.parse(window.localStorage.getItem(WISH_KEY) ?? '[]')
    return Array.isArray(raw) ? raw.filter((id) => products.some((p) => p.id === id)) : []
  } catch {
    return []
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cartKeys, setCartKeys] = useState<Array<string>>([])
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [wishlist, setWishlist] = useState<Array<number>>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = readCart()
    setCartKeys(saved.keys)
    setQuantities(saved.quantities)
    setWishlist(readWishlist())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) {
      const serialized = cartKeys.map((key) => {
        const { id, edition } = parseCartKey(key)
        return { id, edition, quantity: quantities[key] ?? 1 }
      })
      window.localStorage.setItem(CART_KEY, JSON.stringify({ items: serialized }))
    }
  }, [cartKeys, quantities, hydrated])

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(WISH_KEY, JSON.stringify(wishlist))
    }
  }, [wishlist, hydrated])

  // Build hydrated CartItem list
  const cartItems: CartItem[] = cartKeys
    .map((key) => {
      const { id, edition } = parseCartKey(key)
      const product = products.find((p) => p.id === id)
      if (!product) return null
      const unitPrice = getPrice(product, edition)
      const quantity = quantities[key] ?? 1

      return {
        ...product,
        cartKey: key,
        edition,
        quantity,
        unitPrice,
        price: unitPrice, // Ensure price reflects chosen edition
      }
    })
    .filter((item): item is CartItem => item !== null)

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)

  const value: StoreContextValue = {
    cart: cartKeys,
    wishlist,
    cartItems,
    cartCount,
    subtotal,
    inCart: (id: number, edition?: BookEdition) => {
      if (edition) {
        return cartKeys.includes(makeCartKey(id, edition))
      }
      return cartKeys.some((k) => parseCartKey(k).id === id)
    },
    addToCart: (id: number, edition?: BookEdition) => {
      const product = products.find((p) => p.id === id)
      if (!product) return
      const chosenEdition: BookEdition =
        edition ?? (product.productType === 'physical' ? 'physical' : 'digital')
      const key = makeCartKey(id, chosenEdition)

      setCartKeys((current) => (current.includes(key) ? current : [...current, key]))
      setQuantities((current) => ({
        ...current,
        [key]: Math.min(MAX_QUANTITY, (current[key] ?? 0) + 1),
      }))
    },
    increaseQuantity: (cartKey: string) => {
      setQuantities((current) =>
        cartKeys.includes(cartKey)
          ? { ...current, [cartKey]: Math.min(MAX_QUANTITY, (current[cartKey] ?? 1) + 1) }
          : current,
      )
    },
    decreaseQuantity: (cartKey: string) => {
      setQuantities((current) =>
        cartKeys.includes(cartKey) && (current[cartKey] ?? 1) > 1
          ? { ...current, [cartKey]: current[cartKey] - 1 }
          : current,
      )
    },
    removeFromCart: (cartKey: string) => {
      setCartKeys((current) => current.filter((k) => k !== cartKey))
      setQuantities((current) => {
        const next = { ...current }
        delete next[cartKey]
        return next
      })
    },
    clearCart: () => {
      window.localStorage.setItem(CART_KEY, JSON.stringify({ items: [] }))
      setCartKeys([])
      setQuantities({})
    },
    isSaved: (id: number) => wishlist.includes(id),
    toggleSaved: (id: number) => {
      setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]))
    },
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}

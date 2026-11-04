import { z } from 'zod'
import { createServerFn } from '@tanstack/react-start'
import {
  authenticateAdmin,
  logoutSession,
  readDatabase,
  readSecurePdf,
  saveCoverImage,
  saveSecurePdf,
  verifySession,
  writeDatabase,
  type StoredProduct,
  type StoredOrder,
} from './adminDb'
import products, { categories } from '@/data/products'

// Login Action
export const adminLoginServerFn = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      email: z.string().email(),
      password: z.string().min(1),
    }),
  )
  .handler(async ({ data: { email, password } }) => {
    const auth = authenticateAdmin(email, password)
    if (!auth) {
      return { success: false, error: 'Invalid administrator email or password.' }
    }
    return {
      success: true,
      token: auth.token,
      admin: {
        id: auth.user.id,
        email: auth.user.email,
        name: auth.user.name,
      },
    }
  })

// Session Verification Action
export const adminVerifySessionServerFn = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      token: z.string().optional(),
    }),
  )
  .handler(async ({ data: { token } }) => {
    const session = verifySession(token)
    if (!session) {
      return { valid: false }
    }
    const db = readDatabase()
    const activeSessionsCount = Object.keys(db.sessions).length
    return {
      valid: true,
      admin: {
        id: session.adminId,
        email: session.email,
        name: session.name,
      },
      activeSessionsCount,
    }
  })

// Logout Action
export const adminLogoutServerFn = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      token: z.string(),
    }),
  )
  .handler(async ({ data: { token } }) => {
    logoutSession(token)
    return { success: true }
  })

// Fetch Complete Dashboard Data
export const adminGetDashboardDataServerFn = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      token: z.string(),
    }),
  )
  .handler(async ({ data: { token } }) => {
    const session = verifySession(token)
    if (!session) {
      throw new Error('Unauthorized administrator access')
    }

    const db = readDatabase()
    const activeAdmins = db.adminUsers.map((u) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      lastLogin: u.lastLogin,
    }))

    const activeSessionsList = Object.values(db.sessions).map((s) => ({
      adminId: s.adminId,
      name: s.name,
      email: s.email,
      createdAt: s.createdAt,
    }))

    return {
      version: db.version,
      products: db.products,
      orders: db.orders,
      categories,
      auditLog: db.auditLog.slice(0, 50),
      adminList: activeAdmins,
      activeSessionsList,
    }
  })

// Real-Time Polling Check for Live Sync
export const adminPollSyncServerFn = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      token: z.string(),
      clientVersion: z.number(),
    }),
  )
  .handler(async ({ data: { token, clientVersion } }) => {
    const session = verifySession(token)
    if (!session) {
      return { authorized: false, hasUpdate: false, serverVersion: 0 }
    }

    const db = readDatabase()
    return {
      authorized: true,
      hasUpdate: db.version > clientVersion,
      serverVersion: db.version,
    }
  })

// Add or Edit Book (With optimistic concurrency safety)
export const adminSaveProductServerFn = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      token: z.string(),
      product: z.object({
        id: z.number().optional(),
        slug: z.string().min(1),
        category: z.string(),
        format: z.string(),
        language: z.enum(['en', 'ta', 'both']),
        coverWord: z.string(),
        name: z.string().min(1),
        nameTa: z.string().min(1),
        shortDescription: z.string(),
        shortDescriptionTa: z.string(),
        description: z.string(),
        descriptionTa: z.string(),
        includes: z.array(z.string()),
        includesTa: z.array(z.string()),
        pages: z.number().min(1),
        price: z.number().min(0),
        digitalPrice: z.number().min(0),
        physicalPrice: z.number().optional(),
        productType: z.enum(['digital', 'physical', 'both']),
        physicalStock: z.number().min(0),
        featured: z.boolean().optional(),
        coverImage: z.string().optional(),
        dimensions: z.string().optional(),
        isbn: z.string().optional(),
        expectedVersion: z.number().optional(),
      }),
    }),
  )
  .handler(async ({ data: { token, product } }) => {
    const session = verifySession(token)
    if (!session) {
      throw new Error('Unauthorized administrator access')
    }

    const db = readDatabase()
    const now = new Date().toISOString()

    if (product.id) {
      // Edit existing product
      const index = db.products.findIndex((p) => p.id === product.id)
      if (index === -1) {
        return { success: false, error: 'Product not found' }
      }

      const existing = db.products[index]

      // Concurrency check: If another admin modified this book simultaneously
      if (product.expectedVersion && existing.version > product.expectedVersion) {
        return {
          success: false,
          conflict: true,
          currentProduct: existing,
          error: `Book was recently modified by ${existing.lastModifiedBy || 'another admin'}. Please review the updated version.`,
        }
      }

      const updated: StoredProduct = {
        ...existing,
        ...product,
        id: existing.id,
        version: existing.version + 1,
        lastModifiedBy: session.name,
        updatedAt: now,
      }

      db.products[index] = updated

      db.auditLog.unshift({
        id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        timestamp: now,
        adminName: session.name,
        action: 'UPDATE_BOOK',
        details: `${session.name} updated book "${updated.name}" (ID #${updated.id}, Digital: ₹${updated.digitalPrice}${updated.physicalPrice ? `, Physical: ₹${updated.physicalPrice}` : ''}, Stock: ${updated.physicalStock}).`,
      })

      writeDatabase(db)
      return { success: true, product: updated }
    } else {
      // Create new book
      const nextId = Math.max(0, ...db.products.map((p) => p.id)) + 1
      const newProduct: StoredProduct = {
        ...product,
        id: nextId,
        version: 1,
        lastModifiedBy: session.name,
        updatedAt: now,
      }

      db.products.unshift(newProduct)

      db.auditLog.unshift({
        id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        timestamp: now,
        adminName: session.name,
        action: 'ADD_BOOK',
        details: `${session.name} added new book "${newProduct.name}" (ID #${newProduct.id}, Type: ${newProduct.productType}).`,
      })

      writeDatabase(db)
      return { success: true, product: newProduct }
    }
  })

// Delete Book
export const adminDeleteProductServerFn = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      token: z.string(),
      productId: z.number(),
    }),
  )
  .handler(async ({ data: { token, productId } }) => {
    const session = verifySession(token)
    if (!session) {
      throw new Error('Unauthorized administrator access')
    }

    const db = readDatabase()
    const target = db.products.find((p) => p.id === productId)
    if (!target) return { success: false, error: 'Product not found' }

    db.products = db.products.filter((p) => p.id !== productId)

    db.auditLog.unshift({
      id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
      adminName: session.name,
      action: 'DELETE_BOOK',
      details: `${session.name} deleted book "${target.name}" (ID #${target.id}).`,
    })

    writeDatabase(db)
    return { success: true }
  })

// Fast Stock Inventory Adjuster
export const adminUpdateStockServerFn = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      token: z.string(),
      productId: z.number(),
      newStock: z.number().min(0),
    }),
  )
  .handler(async ({ data: { token, productId, newStock } }) => {
    const session = verifySession(token)
    if (!session) {
      throw new Error('Unauthorized administrator access')
    }

    const db = readDatabase()
    const target = db.products.find((p) => p.id === productId)
    if (!target) return { success: false, error: 'Product not found' }

    const oldStock = target.physicalStock
    target.physicalStock = newStock
    target.version += 1
    target.lastModifiedBy = session.name
    target.updatedAt = new Date().toISOString()

    db.auditLog.unshift({
      id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
      adminName: session.name,
      action: 'UPDATE_STOCK',
      details: `${session.name} adjusted physical stock of "${target.name}" from ${oldStock} to ${newStock}.`,
    })

    writeDatabase(db)
    return { success: true, physicalStock: newStock }
  })

// Update Order Status (Payment and Delivery)
export const adminUpdateOrderStatusServerFn = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      token: z.string(),
      orderId: z.string(),
      paymentStatus: z.enum(['pending', 'verified']),
      shippingStatus: z.enum(['pending_verification', 'processing', 'dispatched', 'delivered']).optional(),
    }),
  )
  .handler(async ({ data: { token, orderId, paymentStatus, shippingStatus } }) => {
    const session = verifySession(token)
    if (!session) {
      throw new Error('Unauthorized administrator access')
    }

    const db = readDatabase()
    const order = db.orders.find((o) => o.id === orderId)
    if (!order) return { success: false, error: 'Order not found' }

    order.paymentStatus = paymentStatus
    if (shippingStatus) {
      order.shippingStatus = shippingStatus
    } else if (paymentStatus === 'verified' && order.hasPhysicalItems && !order.shippingStatus) {
      order.shippingStatus = 'processing'
    }

    order.lastModifiedBy = session.name
    order.updatedAt = new Date().toISOString()

    db.auditLog.unshift({
      id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
      adminName: session.name,
      action: 'UPDATE_ORDER',
      details: `${session.name} updated order #${order.id} status: Payment = ${paymentStatus}${shippingStatus ? `, Shipping = ${shippingStatus}` : ''}.`,
    })

    writeDatabase(db)
    return { success: true, order }
  })

// Secure File Upload (PDFs and Cover Images)
export const adminUploadFileServerFn = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      token: z.string(),
      productId: z.number(),
      fileType: z.enum(['pdf', 'cover']),
      fileName: z.string(),
      base64Data: z.string(),
    }),
  )
  .handler(async ({ data: { token, productId, fileType, fileName, base64Data } }) => {
    const session = verifySession(token)
    if (!session) {
      throw new Error('Unauthorized administrator access')
    }

    const db = readDatabase()
    const product = db.products.find((p) => p.id === productId)
    if (!product) return { success: false, error: 'Product not found' }

    const now = new Date().toISOString()

    if (fileType === 'pdf') {
      const saved = saveSecurePdf(productId, fileName, base64Data)
      product.pdfFileName = saved.fileName
      product.pdfOriginalName = fileName
      product.pdfSize = saved.size
      product.pdfUploadedAt = now
      product.version += 1
      product.lastModifiedBy = session.name
      product.updatedAt = now

      db.auditLog.unshift({
        id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        timestamp: now,
        adminName: session.name,
        action: 'UPLOAD_PDF',
        details: `${session.name} uploaded secure digital PDF "${fileName}" (${(saved.size / 1024).toFixed(1)} KB) for book "${product.name}".`,
      })

      writeDatabase(db)
      return { success: true, pdfFileName: saved.fileName, pdfSize: saved.size }
    } else {
      const coverUrl = saveCoverImage(productId, fileName, base64Data)
      product.coverImage = coverUrl
      product.version += 1
      product.lastModifiedBy = session.name
      product.updatedAt = now

      db.auditLog.unshift({
        id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        timestamp: now,
        adminName: session.name,
        action: 'UPLOAD_COVER',
        details: `${session.name} uploaded new cover image for book "${product.name}".`,
      })

      writeDatabase(db)
      return { success: true, coverImage: coverUrl }
    }
  })

// Secure Authenticated PDF Download (Admin Only)
export const adminDownloadPdfServerFn = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      token: z.string(),
      fileName: z.string(),
    }),
  )
  .handler(async ({ data: { token, fileName } }) => {
    const session = verifySession(token)
    if (!session) {
      throw new Error('Unauthorized administrator access')
    }

    const buffer = readSecurePdf(fileName)
    if (!buffer) {
      return { success: false, error: 'File not found on secure server storage' }
    }

    return {
      success: true,
      base64: buffer.toString('base64'),
      mimeType: 'application/pdf',
      fileName,
    }
  })

// Public Storefront Catalog Loader (Reads from shared server DB)
export const getPublicStoreProductsServerFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    try {
      const db = readDatabase()
      return db.products
    } catch {
      return products
    }
  },
)

// Customer Order Submission (Authoritative server calculation & stock verification)
export const submitCustomerOrderServerFn = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      order: z.object({
        id: z.string(),
        createdAt: z.string(),
        customer: z.object({
          name: z.string().min(1, 'Name is required'),
          email: z.string().email('Valid email is required'),
          whatsapp: z.string().min(5, 'Valid contact number is required'),
          address: z.string().optional(),
          city: z.string().optional(),
          pincode: z.string().optional(),
          notes: z.string().optional(),
        }),
        items: z.array(
          z.object({
            id: z.number().int().positive(),
            cartKey: z.string(),
            name: z.string(),
            price: z.number().optional(), // ignored in favor of server price
            quantity: z.number().int().min(1).max(50),
            edition: z.enum(['digital', 'physical']),
            format: z.string(),
            category: z.string(),
          }),
        ).min(1, 'Order must contain at least one item'),
        paymentGateway: z.string().default('razorpay'),
        hasDigitalItems: z.boolean().optional(),
        hasPhysicalItems: z.boolean().optional(),
        subtotal: z.number().optional(),
        total: z.number().optional(),
        paymentStatus: z.string().optional(),
        shippingStatus: z.string().optional(),
      }),
    }),
  )
  .handler(async ({ data: { order } }) => {
    try {
      const db = readDatabase()
      const existing = db.orders.find((o) => o.id === order.id)
      if (existing) {
        return { success: true, orderId: order.id, total: existing.total }
      }

      // 1. Normalize customer data
      const normalizedEmail = order.customer.email.toLowerCase().trim()
      const normalizedName = order.customer.name.trim()
      const normalizedPhone = order.customer.whatsapp.trim()

      // 2. Aggregate duplicate cart items by (id, edition)
      const aggregatedMap = new Map<string, {
        id: number
        cartKey: string
        name: string
        quantity: number
        edition: 'digital' | 'physical'
        format: string
        category: string
      }>()

      for (const item of order.items) {
        const key = `${item.id}:${item.edition}`
        const existingItem = aggregatedMap.get(key)
        if (existingItem) {
          existingItem.quantity += item.quantity
          if (existingItem.quantity > 50) {
            existingItem.quantity = 50
          }
        } else {
          aggregatedMap.set(key, { ...item })
        }
      }

      const consolidatedItems = Array.from(aggregatedMap.values())

      // 3. Authoritative catalog verification & stock checks
      let hasDigitalItems = false
      let hasPhysicalItems = false
      let calculatedSubtotal = 0

      interface VerifiedItem {
        id: number
        cartKey: string
        name: string
        price: number
        quantity: number
        edition: 'digital' | 'physical'
        format: string
        category: string
      }

      const verifiedItems: VerifiedItem[] = []

      for (const item of consolidatedItems) {
        const product = db.products.find((p) => p.id === item.id)
        if (!product) {
          return { success: false, error: `Product ID #${item.id} is no longer available in the catalog.` }
        }

        // Validate format availability
        if (item.edition === 'physical') {
          if (product.productType === 'digital') {
            return { success: false, error: `"${product.name}" is only available as a digital edition.` }
          }
          if (typeof product.physicalStock === 'number' && product.physicalStock < item.quantity) {
            return {
              success: false,
              error: `Insufficient stock for "${product.name}". Available: ${product.physicalStock}, requested: ${item.quantity}.`,
            }
          }
          hasPhysicalItems = true
          const serverPrice = product.physicalPrice ?? product.price
          calculatedSubtotal += serverPrice * item.quantity
          verifiedItems.push({
            id: product.id,
            cartKey: item.cartKey,
            name: product.name,
            price: serverPrice,
            quantity: item.quantity,
            edition: 'physical',
            format: product.format,
            category: product.category,
          })
        } else {
          if (product.productType === 'physical') {
            return { success: false, error: `"${product.name}" is only available as a physical edition.` }
          }
          hasDigitalItems = true
          const serverPrice = product.digitalPrice ?? product.price
          // Digital editions are bought once per order
          const digitalQty = 1
          calculatedSubtotal += serverPrice * digitalQty
          verifiedItems.push({
            id: product.id,
            cartKey: item.cartKey,
            name: product.name,
            price: serverPrice,
            quantity: digitalQty,
            edition: 'digital',
            format: product.format,
            category: product.category,
          })
        }
      }

      // Validate physical shipping requirement
      if (hasPhysicalItems) {
        if (!order.customer.address?.trim() || !order.customer.city?.trim() || !order.customer.pincode?.trim()) {
          return {
            success: false,
            error: 'Complete shipping address (address, city, and pincode) is required for physical book orders.',
          }
        }
      }

      // Flat shipping rule: free above ₹999, else ₹60 if physical items present
      const shippingFee = hasPhysicalItems ? (calculatedSubtotal >= 999 ? 0 : 60) : 0
      const calculatedTotal = calculatedSubtotal + shippingFee

      // Deduct physical stock atomically
      for (const vItem of verifiedItems) {
        if (vItem.edition === 'physical') {
          const product = db.products.find((p) => p.id === vItem.id)
          if (product && typeof product.physicalStock === 'number') {
            product.physicalStock = Math.max(0, product.physicalStock - vItem.quantity)
            product.version += 1
            product.updatedAt = new Date().toISOString()
          }
        }
      }

      const storedOrder: StoredOrder = {
        id: order.id,
        createdAt: order.createdAt || new Date().toISOString(),
        customer: {
          name: normalizedName,
          email: normalizedEmail,
          whatsapp: normalizedPhone,
          address: order.customer.address?.trim(),
          city: order.customer.city?.trim(),
          pincode: order.customer.pincode?.trim(),
          notes: order.customer.notes?.trim(),
        },
        items: verifiedItems,
        hasDigitalItems,
        hasPhysicalItems,
        subtotal: calculatedSubtotal,
        total: calculatedTotal,
        paymentStatus: 'pending', // Strictly enforced server-side
        paymentGateway: order.paymentGateway || 'razorpay',
        shippingStatus: hasPhysicalItems ? 'pending_verification' : undefined,
        updatedAt: new Date().toISOString(),
      }

      db.orders.unshift(storedOrder)

      db.auditLog.unshift({
        id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        timestamp: new Date().toISOString(),
        adminName: 'Storefront',
        action: 'ORDER_PLACED',
        details: `Customer ${storedOrder.customer.name} placed order #${storedOrder.id} for ₹${storedOrder.total} (${storedOrder.items.length} items). Payment: pending.`,
      })

      writeDatabase(db)
      return {
        success: true,
        orderId: storedOrder.id,
        subtotal: storedOrder.subtotal,
        shippingFee,
        total: storedOrder.total,
      }
    } catch (err: any) {
      console.error('Failed to record order in shared database:', err)
      return { success: false, error: err.message || 'Failed to place order' }
    }
  })


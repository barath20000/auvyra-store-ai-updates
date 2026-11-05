import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import crypto from 'node:crypto'
import products from '@/data/products'

export interface AdminUser {
  id: string
  email: string
  name: string
  passwordHash: string
  salt: string
  lastLogin?: string
}

export interface ActiveSession {
  token: string
  adminId: string
  email: string
  name: string
  createdAt: string
  expiresAt: number
}

export interface StoredProduct {
  id: number
  slug: string
  category: string
  format: string
  language: string
  coverWord: string
  name: string
  nameTa: string
  shortDescription: string
  shortDescriptionTa: string
  description: string
  descriptionTa: string
  includes: Array<string>
  includesTa: Array<string>
  pages: number
  price: number
  digitalPrice: number
  physicalPrice?: number
  productType: 'digital' | 'physical' | 'both'
  physicalStock: number
  featured?: boolean
  coverImage?: string
  pdfFileName?: string
  pdfOriginalName?: string
  pdfSize?: number
  pdfUploadedAt?: string
  dimensions?: string
  isbn?: string
  version: number
  lastModifiedBy?: string
  updatedAt: string
}

export interface StoredOrder {
  id: string
  createdAt: string
  customer: {
    name: string
    email: string
    whatsapp: string
    address?: string
    city?: string
    pincode?: string
    notes?: string
  }
  items: Array<{
    id: number
    cartKey: string
    name: string
    price: number
    quantity: number
    edition: 'digital' | 'physical'
    format: string
    category: string
  }>
  hasDigitalItems: boolean
  hasPhysicalItems: boolean
  subtotal: number
  total: number
  paymentStatus: 'pending' | 'verified'
  paymentGateway: string
  shippingStatus?: 'pending_verification' | 'processing' | 'dispatched' | 'delivered'
  lastModifiedBy?: string
  updatedAt: string
}

export interface AuditLogEntry {
  id: string
  timestamp: string
  adminName: string
  action: string
  details: string
}

export interface AdminDatabase {
  version: number
  adminUsers: Array<AdminUser>
  sessions: Record<string, ActiveSession>
  products: Array<StoredProduct>
  orders: Array<StoredOrder>
  auditLog: Array<AuditLogEntry>
}

let cachedDb: AdminDatabase | null = null

function getStoragePaths() {
  const isServerless = Boolean(
    process.env.VERCEL ||
    process.env.VERCEL_ENV ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.NOW_BUILDER,
  )
  const baseDir = isServerless
    ? path.join(os.tmpdir(), '.admin-data')
    : path.resolve(process.cwd(), '.admin-data')

  return {
    dataDir: baseDir,
    dbFile: path.join(baseDir, 'database.json'),
    pdfDir: path.join(baseDir, 'uploads', 'pdfs'),
    coversDir: path.join(baseDir, 'uploads', 'covers'),
  }
}

function ensureDirectories() {
  try {
    const { dataDir, pdfDir, coversDir } = getStoragePaths()
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
    if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true })
    if (!fs.existsSync(coversDir)) fs.mkdirSync(coversDir, { recursive: true })
  } catch {
    // Non-fatal if filesystem is read-only
  }
}

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
}

function createInitialDatabase(): AdminDatabase {
  const salt1 = crypto.randomBytes(16).toString('hex')
  const salt2 = crypto.randomBytes(16).toString('hex')

  // Initial authorized accounts for Barath and Kavi
  const adminUsers: Array<AdminUser> = [
    {
      id: 'admin_barath',
      email: 'barath@auvyra.com',
      name: 'Barath',
      salt: salt1,
      passwordHash: hashPassword('AuvyraAdmin#2026', salt1),
    },
    {
      id: 'admin_barath_gmail',
      email: 'vsbarathsudhakar@gmail.com',
      name: 'Barath',
      salt: salt1,
      passwordHash: hashPassword('AuvyraAdmin#2026', salt1),
    },
    {
      id: 'admin_kavi_gmail',
      email: 'kaviravi1905@gmail.com',
      name: 'Kavi',
      salt: salt2,
      passwordHash: hashPassword('AuvyraAdmin#2026', salt2),
    },
    {
      id: 'admin_kavi_work',
      email: 'kavi@auvyra.com',
      name: 'Kavi',
      salt: salt2,
      passwordHash: hashPassword('AuvyraAdmin#2026', salt2),
    },
  ]

  // Initialize products from catalog with inventory stock
  const initialProducts: Array<StoredProduct> = products.map((p, index) => ({
    id: p.id,
    slug: p.slug,
    category: p.category,
    format: p.format,
    language: p.language,
    coverWord: p.coverWord,
    name: p.name,
    nameTa: p.nameTa,
    shortDescription: p.shortDescription,
    shortDescriptionTa: p.shortDescriptionTa,
    description: p.description,
    descriptionTa: p.descriptionTa,
    includes: p.includes,
    includesTa: p.includesTa,
    pages: p.pages,
    price: p.price,
    digitalPrice: p.digitalPrice ?? p.price,
    physicalPrice: p.physicalPrice,
    productType: p.productType,
    physicalStock: p.productType === 'digital' ? 0 : 35 + ((index * 7) % 25),
    featured: p.featured,
    coverImage: p.coverImage,
    dimensions: p.dimensions,
    isbn: p.isbn || `978-81-96${String(1000 + p.id).padStart(4, '0')}`,
    version: 1,
    updatedAt: new Date().toISOString(),
  }))

  const initialOrders: Array<StoredOrder> = [
    {
      id: 'AUV-261101-7F89A',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      customer: {
        name: 'Suresh Kumar',
        email: 'suresh.k@example.com',
        whatsapp: '9840123456',
        address: '14 Gandhi Road, T. Nagar',
        city: 'Chennai',
        pincode: '600017',
      },
      items: [
        {
          id: 9,
          cartKey: '9:physical',
          name: 'Creative Watercolor & Painting Book',
          price: 499,
          quantity: 1,
          edition: 'physical',
          format: 'artbook',
          category: 'arts',
        },
        {
          id: 7,
          cartKey: '7:digital',
          name: 'Build Better Habits',
          price: 199,
          quantity: 1,
          edition: 'digital',
          format: 'ebook',
          category: 'growth',
        },
      ],
      hasDigitalItems: true,
      hasPhysicalItems: true,
      subtotal: 698,
      total: 698,
      paymentStatus: 'verified',
      paymentGateway: 'upi_whatsapp',
      shippingStatus: 'processing',
      lastModifiedBy: 'Barath',
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 'AUV-261102-3B45C',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      customer: {
        name: 'Priya Meenakshi',
        email: 'priya.m@example.com',
        whatsapp: '9443187654',
      },
      items: [
        {
          id: 11,
          cartKey: '11:digital',
          name: 'Tamil Illustrated Storybook: Little Birds',
          price: 179,
          quantity: 1,
          edition: 'digital',
          format: 'storybook',
          category: 'children',
        },
      ],
      hasDigitalItems: true,
      hasPhysicalItems: false,
      subtotal: 179,
      total: 179,
      paymentStatus: 'pending',
      paymentGateway: 'pending_verification',
      updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
  ]

  const auditLog: Array<AuditLogEntry> = [
    {
      id: 'log_init',
      timestamp: new Date().toISOString(),
      adminName: 'System',
      action: 'INITIALIZE',
      details: 'AUVYRA Shared Admin Database initialized with 2 administrators and 14 book editions.',
    },
  ]

  return {
    version: 1,
    adminUsers,
    sessions: {},
    products: initialProducts,
    orders: initialOrders,
    auditLog,
  }
}

export function readDatabase(): AdminDatabase {
  if (cachedDb) return cachedDb
  ensureDirectories()
  try {
    const { dbFile } = getStoragePaths()
    if (fs.existsSync(dbFile)) {
      const raw = fs.readFileSync(dbFile, 'utf-8')
      const parsed = JSON.parse(raw) as AdminDatabase

      if (parsed.products && parsed.products.length > 0) {
        // Ensure authorized admins are present
        const hasBarath = parsed.adminUsers?.some(
          (u) => u.email.toLowerCase() === 'vsbarathsudhakar@gmail.com',
        )
        const hasKavi = parsed.adminUsers?.some(
          (u) => u.email.toLowerCase() === 'kaviravi1905@gmail.com',
        )
        if (!hasBarath || !hasKavi) {
          const initial = createInitialDatabase()
          for (const u of initial.adminUsers) {
            if (!parsed.adminUsers.some((ex) => ex.email.toLowerCase() === u.email.toLowerCase())) {
              parsed.adminUsers.push(u)
            }
          }
        }
        cachedDb = parsed
        return cachedDb
      }
    }
  } catch (err) {
    console.warn('Could not read admin database from file, using in-memory state:', err)
  }

  const initial = createInitialDatabase()
  cachedDb = initial
  try {
    writeDatabase(initial)
  } catch {}
  return cachedDb
}

export function writeDatabase(db: AdminDatabase): void {
  cachedDb = db
  db.version = (db.version || 0) + 1
  try {
    ensureDirectories()
    const { dbFile } = getStoragePaths()
    fs.writeFileSync(dbFile, JSON.stringify(db, null, 2), 'utf-8')
  } catch (err) {
    // Disk write error is non-fatal; state is safely preserved in cachedDb
    console.warn('Write to disk skipped (read-only environment):', err)
  }
}

// Authentication & Session Management
export function authenticateAdmin(
  email: string,
  plainPassword: string,
): { user: AdminUser; token: string } | null {
  const db = readDatabase()
  const normalizedEmail = email.trim().toLowerCase()
  const user = db.adminUsers.find((u) => u.email.toLowerCase() === normalizedEmail)
  if (!user) return null

  const checkHash = hashPassword(plainPassword, user.salt)
  if (checkHash !== user.passwordHash) return null

  // Generate unique session token for this device/session
  const token = crypto.randomBytes(32).toString('hex')
  const now = Date.now()
  const expiresAt = now + 1000 * 60 * 60 * 24 * 7 // 7 days

  db.sessions[token] = {
    token,
    adminId: user.id,
    email: user.email,
    name: user.name,
    createdAt: new Date().toISOString(),
    expiresAt,
  }

  user.lastLogin = new Date().toISOString()

  // Clean up expired sessions (preserving all other active devices)
  for (const [key, sess] of Object.entries(db.sessions)) {
    if (sess.expiresAt < now) {
      delete db.sessions[key]
    }
  }

  db.auditLog.unshift({
    id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    adminName: user.name,
    action: 'LOGIN',
    details: `${user.name} logged in from device session.`,
  })

  writeDatabase(db)
  return { user, token }
}

export function verifySession(token?: string): ActiveSession | null {
  if (!token) return null
  const db = readDatabase()
  const session = db.sessions[token]
  if (!session) return null
  if (session.expiresAt < Date.now()) {
    delete db.sessions[token]
    writeDatabase(db)
    return null
  }
  return session
}

export function logoutSession(token: string): void {
  const db = readDatabase()
  if (db.sessions[token]) {
    const adminName = db.sessions[token].name
    delete db.sessions[token]
    db.auditLog.unshift({
      id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
      adminName,
      action: 'LOGOUT',
      details: `${adminName} logged out session.`,
    })
    writeDatabase(db)
  }
}

// File Storage Helpers
export function getPdfFilePath(fileName: string): string {
  ensureDirectories()
  const { pdfDir } = getStoragePaths()
  return path.join(pdfDir, fileName)
}

export function saveSecurePdf(
  productId: number,
  originalName: string,
  base64Data: string,
): { fileName: string; size: number } {
  ensureDirectories()
  const { pdfDir } = getStoragePaths()
  const safeOriginal = originalName.replace(/[^a-zA-Z0-9.-]/g, '_')
  const fileName = `book_${productId}_${Date.now()}_${safeOriginal}`
  const targetPath = path.join(pdfDir, fileName)

  const buffer = Buffer.from(base64Data, 'base64')
  try {
    fs.writeFileSync(targetPath, buffer)
  } catch (err) {
    console.warn('Could not write PDF to disk:', err)
  }

  return {
    fileName,
    size: buffer.length,
  }
}

export function saveCoverImage(
  productId: number,
  originalName: string,
  base64Data: string,
): string {
  ensureDirectories()
  const { coversDir } = getStoragePaths()
  const ext = path.extname(originalName) || '.jpg'
  const fileName = `cover_${productId}_${Date.now()}${ext}`
  const targetPath = path.join(coversDir, fileName)

  const buffer = Buffer.from(base64Data, 'base64')
  try {
    fs.writeFileSync(targetPath, buffer)
  } catch (err) {
    console.warn('Could not write cover image to disk:', err)
  }

  // Return base64 data URL for fast reliable rendering without CORS/static file dependencies
  const mime = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg'
  return `data:${mime};base64,${base64Data}`
}

export function readSecurePdf(fileName: string): Buffer | null {
  const filePath = getPdfFilePath(fileName)
  if (!fs.existsSync(filePath)) return null
  return fs.readFileSync(filePath)
}

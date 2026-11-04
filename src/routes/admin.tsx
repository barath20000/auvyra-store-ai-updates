import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Download,
  Edit3,
  ExternalLink,
  Eye,
  FileText,
  History,
  Image as ImageIcon,
  KeyRound,
  LogOut,
  Minus,
  Package,
  Plus,
  RefreshCw,
  Search,
  Shield,
  ShoppingBag,
  Trash2,
  Upload,
  UserCheck,
  Users,
  X,
} from 'lucide-react'
import { LogoMark } from '@/components/Logo'
import { formatPrice } from '@/data/products'
import {
  adminDeleteProductServerFn,
  adminDownloadPdfServerFn,
  adminGetDashboardDataServerFn,
  adminLoginServerFn,
  adminLogoutServerFn,
  adminPollSyncServerFn,
  adminSaveProductServerFn,
  adminUpdateOrderStatusServerFn,
  adminUpdateStockServerFn,
  adminUploadFileServerFn,
  adminVerifySessionServerFn,
} from '@/lib/server/adminActions'
import type { StoredOrder, StoredProduct } from '@/lib/server/adminDb'

export const Route = createFileRoute('/admin')({
  component: AdminPage,
  head: () => ({ meta: [{ title: 'Admin Console — AUVYRA Bookstore' }] }),
})

interface AdminState {
  id: string
  email: string
  name: string
}

const SESSION_TOKEN_KEY = 'auvyra:admin_token'

export function AdminPage() {
  const [token, setToken] = useState<string | null>(null)
  const [admin, setAdmin] = useState<AdminState | null>(null)
  const [loading, setLoading] = useState(true)

  // Login form state
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loggingIn, setLoggingIn] = useState(false)

  // Dashboard Data
  const [version, setVersion] = useState<number>(0)
  const [productsList, setProductsList] = useState<Array<StoredProduct>>([])
  const [ordersList, setOrdersList] = useState<Array<StoredOrder>>([])
  const [auditLogs, setAuditLogs] = useState<Array<any>>([])
  const [activeSessions, setActiveSessions] = useState<Array<any>>([])
  const [adminUsers, setAdminUsers] = useState<Array<any>>([])

  // Dashboard UI State
  const [activeTab, setActiveTab] = useState<'books' | 'orders' | 'inventory' | 'audit' | 'admins'>('books')
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<'all' | 'digital' | 'physical' | 'both'>('all')
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all')

  // Real-time synchronization indicators
  const [lastSynced, setLastSynced] = useState<Date>(new Date())
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncToast, setSyncToast] = useState<string | null>(null)

  // Modals
  const [editingProduct, setEditingProduct] = useState<StoredProduct | null>(null)
  const [isNewBookModalOpen, setIsNewBookModalOpen] = useState(false)
  const [uploadModalProduct, setUploadModalProduct] = useState<StoredProduct | null>(null)
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<StoredOrder | null>(null)

  // Uploading state
  const [uploadingPdf, setUploadingPdf] = useState(false)
  const [uploadingCover, setUploadingCover] = useState(false)
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null)

  const versionRef = useRef(version)
  versionRef.current = version

  // Restore session from localStorage on initial load
  useEffect(() => {
    const savedToken = window.localStorage.getItem(SESSION_TOKEN_KEY)
    if (!savedToken) {
      setLoading(false)
      return
    }

    adminVerifySessionServerFn({ data: { token: savedToken } })
      .then((res) => {
        if (res.valid && res.admin) {
          setToken(savedToken)
          setAdmin(res.admin)
          loadDashboardData(savedToken)
        } else {
          window.localStorage.removeItem(SESSION_TOKEN_KEY)
          setLoading(false)
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  // Real-time polling: Every 3.5 seconds, check if another admin updated the database
  useEffect(() => {
    if (!token) return

    const pollInterval = setInterval(async () => {
      try {
        const poll = await adminPollSyncServerFn({
          data: { token, clientVersion: versionRef.current },
        })

        if (!poll.authorized) {
          handleLogout()
          return
        }

        if (poll.hasUpdate) {
          setIsSyncing(true)
          const data = await adminGetDashboardDataServerFn({ data: { token } })
          setVersion(data.version)
          setProductsList(data.products)
          setOrdersList(data.orders)
          setAuditLogs(data.auditLog)
          setActiveSessions(data.activeSessionsList)
          setAdminUsers(data.adminList)
          setLastSynced(new Date())
          setIsSyncing(false)

          setSyncToast('Live Synced: Updated with changes from other administrator.')
          setTimeout(() => setSyncToast(null), 3500)
        }
      } catch (err) {
        // Poll error ignored
      }
    }, 3500)

    return () => clearInterval(pollInterval)
  }, [token])

  const loadDashboardData = async (activeToken: string) => {
    setIsSyncing(true)
    try {
      const data = await adminGetDashboardDataServerFn({ data: { token: activeToken } })
      setVersion(data.version)
      setProductsList(data.products)
      setOrdersList(data.orders)
      setAuditLogs(data.auditLog)
      setActiveSessions(data.activeSessionsList)
      setAdminUsers(data.adminList)
      setLastSynced(new Date())
    } catch (err) {
      console.error('Failed to load dashboard data:', err)
    } finally {
      setIsSyncing(false)
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError(null)
    setLoggingIn(true)

    try {
      const res = await adminLoginServerFn({
        data: { email: emailInput.trim(), password: passwordInput },
      })

      if (res.success && res.token && res.admin) {
        window.localStorage.setItem(SESSION_TOKEN_KEY, res.token)
        setToken(res.token)
        setAdmin(res.admin)
        await loadDashboardData(res.token)
      } else {
        setLoginError(res.error || 'Invalid credentials. Please verify your email and password.')
      }
    } catch (err: any) {
      setLoginError('Authentication service unreachable. Please try again.')
    } finally {
      setLoggingIn(false)
    }
  }

  const handleLogout = async () => {
    if (token) {
      try {
        await adminLogoutServerFn({ data: { token } })
      } catch {}
    }
    window.localStorage.removeItem(SESSION_TOKEN_KEY)
    setToken(null)
    setAdmin(null)
  }

  // Quick Stock Inventory Adjuster
  const handleStockChange = async (productId: number, delta: number) => {
    if (!token) return
    const prod = productsList.find((p) => p.id === productId)
    if (!prod) return
    const newStock = Math.max(0, prod.physicalStock + delta)

    // Optimistic UI update
    setProductsList((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, physicalStock: newStock } : p)),
    )

    try {
      await adminUpdateStockServerFn({ data: { token, productId, newStock } })
    } catch (err) {
      // Revert if error
      if (token) loadDashboardData(token)
    }
  }

  // Save Book (Add or Edit)
  const handleSaveBook = async (bookData: Partial<StoredProduct>) => {
    if (!token) return
    try {
      const res = await adminSaveProductServerFn({
        data: {
          token,
          product: {
            id: bookData.id,
            slug: bookData.slug || `book-${Date.now()}`,
            category: bookData.category || 'career',
            format: bookData.format || 'ebook',
            language: (bookData.language as 'en' | 'ta' | 'both') || 'both',
            coverWord: bookData.coverWord || 'BOOK',
            name: bookData.name || 'Untitled Book',
            nameTa: bookData.nameTa || bookData.name || 'தலைப்பற்ற புத்தகம்',
            shortDescription: bookData.shortDescription || '',
            shortDescriptionTa: bookData.shortDescriptionTa || '',
            description: bookData.description || '',
            descriptionTa: bookData.descriptionTa || '',
            includes: bookData.includes || ['Book edition included'],
            includesTa: bookData.includesTa || ['புத்தகப் பதிப்பு சேர்க்கப்பட்டுள்ளது'],
            pages: Number(bookData.pages) || 50,
            price: Number(bookData.price) || Number(bookData.digitalPrice) || 199,
            digitalPrice: Number(bookData.digitalPrice) || Number(bookData.price) || 199,
            physicalPrice: bookData.physicalPrice ? Number(bookData.physicalPrice) : undefined,
            productType: bookData.productType || 'both',
            physicalStock: Number(bookData.physicalStock) || 0,
            featured: Boolean(bookData.featured),
            coverImage: bookData.coverImage,
            dimensions: bookData.dimensions,
            isbn: bookData.isbn,
            expectedVersion: bookData.version,
          },
        },
      })

      if (res.success) {
        setIsNewBookModalOpen(false)
        setEditingProduct(null)
        loadDashboardData(token)
      } else if (res.conflict) {
        alert(res.error)
        loadDashboardData(token)
      } else {
        alert(res.error || 'Failed to save book.')
      }
    } catch (err: any) {
      alert('Error saving book: ' + (err.message || 'Server error'))
    }
  }

  // Delete Book
  const handleDeleteBook = async (productId: number, bookName: string) => {
    if (!token) return
    if (!window.confirm(`Are you sure you want to delete "${bookName}"? This action cannot be undone.`)) {
      return
    }

    try {
      const res = await adminDeleteProductServerFn({ data: { token, productId } })
      if (res.success) {
        loadDashboardData(token)
      } else {
        alert(res.error || 'Failed to delete book.')
      }
    } catch (err: any) {
      alert('Error deleting book: ' + err.message)
    }
  }

  // Update Customer Order
  const handleUpdateOrderStatus = async (
    orderId: string,
    paymentStatus: 'pending' | 'verified',
    shippingStatus?: any,
  ) => {
    if (!token) return
    try {
      const res = await adminUpdateOrderStatusServerFn({
        data: { token, orderId, paymentStatus, shippingStatus },
      })
      if (res.success) {
        setOrdersList((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, paymentStatus, shippingStatus: shippingStatus || o.shippingStatus } : o)),
        )
      }
    } catch (err: any) {
      alert('Failed to update order: ' + err.message)
    }
  }

  // Secure PDF file upload
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>, product: StoredProduct) => {
    if (!token || !e.target.files?.[0]) return
    const file = e.target.files[0]
    if (file.type !== 'application/pdf') {
      alert('Only valid PDF files are accepted.')
      return
    }

    setUploadingPdf(true)
    setUploadSuccessMsg(null)

    const reader = new FileReader()
    reader.onload = async () => {
      const base64Data = (reader.result as string).split(',')[1]
      try {
        const res = await adminUploadFileServerFn({
          data: {
            token,
            productId: product.id,
            fileType: 'pdf',
            fileName: file.name,
            base64Data,
          },
        })

        if (res.success) {
          setUploadSuccessMsg(`PDF "${file.name}" uploaded securely to server!`)
          loadDashboardData(token)
        } else {
          alert('Upload failed: ' + res.error)
        }
      } catch (err: any) {
        alert('Upload error: ' + err.message)
      } finally {
        setUploadingPdf(false)
      }
    }
    reader.readAsDataURL(file)
  }

  // Cover image upload
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>, product: StoredProduct) => {
    if (!token || !e.target.files?.[0]) return
    const file = e.target.files[0]

    setUploadingCover(true)
    setUploadSuccessMsg(null)

    const reader = new FileReader()
    reader.onload = async () => {
      const base64Data = (reader.result as string).split(',')[1]
      try {
        const res = await adminUploadFileServerFn({
          data: {
            token,
            productId: product.id,
            fileType: 'cover',
            fileName: file.name,
            base64Data,
          },
        })

        if (res.success) {
          setUploadSuccessMsg(`Book cover updated successfully!`)
          loadDashboardData(token)
        } else {
          alert('Cover upload failed: ' + res.error)
        }
      } catch (err: any) {
        alert('Cover upload error: ' + err.message)
      } finally {
        setUploadingCover(false)
      }
    }
    reader.readAsDataURL(file)
  }

  // Authenticated Admin PDF Download
  const handleAdminDownloadPdf = async (fileName: string) => {
    if (!token) return
    try {
      const res = await adminDownloadPdfServerFn({ data: { token, fileName } })
      if (res.success && res.base64) {
        const byteCharacters = atob(res.base64)
        const byteNumbers = new Array(byteCharacters.length)
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)
        const blob = new Blob([byteArray], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } else {
        alert(res.error || 'Failed to download PDF')
      }
    } catch (err: any) {
      alert('Download error: ' + err.message)
    }
  }

  // Filter products
  const filteredProducts = productsList.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameTa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.coverWord.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter
    const matchesType = typeFilter === 'all' || p.productType === typeFilter
    return matchesSearch && matchesCategory && matchesType
  })

  // Filter orders
  const filteredOrders = ordersList.filter((o) => {
    if (orderStatusFilter === 'all') return true
    if (orderStatusFilter === 'verified') return o.paymentStatus === 'verified'
    if (orderStatusFilter === 'pending') return o.paymentStatus === 'pending'
    if (orderStatusFilter === 'physical') return o.hasPhysicalItems
    return true
  })

  // Metrics
  const totalBooksCount = productsList.length
  const totalPhysicalStock = productsList.reduce((acc, p) => acc + (p.physicalStock || 0), 0)
  const lowStockCount = productsList.filter((p) => (p.productType === 'physical' || p.productType === 'both') && p.physicalStock < 10).length
  const pendingOrdersCount = ordersList.filter((o) => o.paymentStatus === 'pending').length
  const verifiedOrdersCount = ordersList.filter((o) => o.paymentStatus === 'verified').length
  const verifiedRevenue = ordersList.filter((o) => o.paymentStatus === 'verified').reduce((acc, o) => acc + o.total, 0)

  if (loading) {
    return (
      <section className="flex min-h-[85vh] items-center justify-center bg-[#0B0A10]">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-8 w-8 animate-spin text-[#B99AF5]" />
          <span className="text-sm font-medium text-[#B5ADC5]">Verifying Administrator Access…</span>
        </div>
      </section>
    )
  }

  // LOGIN SCREEN
  if (!admin || !token) {
    return (
      <section className="flex min-h-[85vh] items-center justify-center bg-[#0B0A10] px-4 py-16">
        <div className="w-full max-w-md rounded-xl border border-[#49365D] bg-[#21182F] p-8 shadow-2xl sm:p-10">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-[#49365D] bg-[#140E20] shadow-inner">
              <Shield className="h-7 w-7 text-[#B99AF5]" />
            </div>
            <div className="eyebrow mb-1">AUTHORIZED PERSONNEL ONLY</div>
            <h1 className="font-serif text-3xl font-medium text-[#F7F4FC]">
              AUVYRA Admin Console
            </h1>
            <p className="mt-1.5 text-xs leading-relaxed text-[#B5ADC5]">
              Shared portal for authorized administrators: <strong>Barath &amp; Kavi</strong>
            </p>
          </div>

          {loginError && (
            <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-[#ff7b72]/40 bg-[#ff7b72]/15 p-3 text-xs text-[#ff7b72]">
              <AlertCircle size={15} className="mt-0.5 flex-none" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-[#F7F4FC]">
                Administrator Email
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="barath@auvyra.com or kaviravi1905@gmail.com"
                className="field w-full"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-[#F7F4FC]">
                Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                className="field w-full"
              />
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="btn btn-fill w-full !py-3 text-sm font-medium shadow-md"
            >
              {loggingIn ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Authenticating…</span>
                </>
              ) : (
                <>
                  <KeyRound size={16} />
                  <span>Sign In to Admin Console</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-[#49365D]/80 pt-5 text-center text-xs text-[#837996]">
            <p className="leading-relaxed">
              Restricted to authorized AUVYRA personnel. Concurrent sessions enabled for Barath &amp; Kavi across multiple devices.
            </p>
          </div>
        </div>
      </section>
    )
  }

  // MAIN ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#0B0A10] text-[#F7F4FC]">
      {/* Live sync toast notification */}
      {syncToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-lg border border-[#7851D8] bg-[#21182F] px-4 py-2.5 text-xs text-[#F7F4FC] shadow-2xl animate-bounce">
          <RefreshCw size={14} className="animate-spin text-[#B99AF5]" />
          <span>{syncToast}</span>
        </div>
      )}

      {/* Top Admin Bar */}
      <header className="border-b border-[#49365D] bg-[#140E20]">
        <div className="wrap flex min-h-[64px] flex-wrap items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-3">
            <LogoMark className="h-8 w-8" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl font-medium tracking-wide text-[#F7F4FC]">
                  AUVYRA Admin
                </span>
                <span className="rounded bg-[#7851D8]/20 border border-[#7851D8]/50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#B99AF5]">
                  Shared Console
                </span>
              </div>
            </div>
          </div>

          {/* Sync & Admin Status */}
          <div className="flex items-center gap-3">
            {/* Live Sync Status */}
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-[#49365D] bg-[#21182F] px-3 py-1 text-xs text-[#B5ADC5]">
              <span className={`h-2 w-2 rounded-full ${isSyncing ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
              <span>
                {isSyncing ? 'Syncing…' : `Live Synced (v${version}) · ${lastSynced.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
              </span>
              <button
                type="button"
                onClick={() => loadDashboardData(token)}
                disabled={isSyncing}
                title="Force refresh data"
                className="text-[#B99AF5] hover:text-[#F7F4FC]"
              >
                <RefreshCw size={12} className={isSyncing ? 'animate-spin' : ''} />
              </button>
            </div>

            {/* Logged In Badge */}
            <div className="flex items-center gap-2 rounded-lg border border-[#49365D] bg-[#21182F] px-3 py-1 text-xs">
              <UserCheck size={14} className="text-[#B99AF5]" />
              <span className="font-medium text-[#F7F4FC]">Admin: {admin.name}</span>
            </div>

            {/* View Storefront Link */}
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-[#49365D] px-2.5 py-1 text-xs text-[#B5ADC5] hover:border-[#7851D8] hover:text-[#F7F4FC]"
            >
              <span>View Store</span>
              <ExternalLink size={12} />
            </Link>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#49365D] px-3 py-1 text-xs text-[#B5ADC5] transition hover:border-[#ff7b72] hover:bg-[#ff7b72]/15 hover:text-[#ff7b72]"
            >
              <LogOut size={13} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="wrap flex gap-1 overflow-x-auto border-t border-[#49365D]/60 pt-1">
          <button
            type="button"
            onClick={() => setActiveTab('books')}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium transition ${
              activeTab === 'books'
                ? 'border-[#7851D8] text-[#F7F4FC]'
                : 'border-transparent text-[#B5ADC5] hover:text-[#F7F4FC]'
            }`}
          >
            <BookOpen size={14} />
            <span>Books &amp; Catalog ({productsList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium transition ${
              activeTab === 'orders'
                ? 'border-[#7851D8] text-[#F7F4FC]'
                : 'border-transparent text-[#B5ADC5] hover:text-[#F7F4FC]'
            }`}
          >
            <ShoppingBag size={14} />
            <span>Orders ({ordersList.length})</span>
            {pendingOrdersCount > 0 && (
              <span className="rounded-full bg-amber-500/20 px-1.5 py-0.2 font-mono text-[10px] text-amber-300">
                {pendingOrdersCount} pending
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium transition ${
              activeTab === 'inventory'
                ? 'border-[#7851D8] text-[#F7F4FC]'
                : 'border-transparent text-[#B5ADC5] hover:text-[#F7F4FC]'
            }`}
          >
            <Package size={14} />
            <span>Physical Inventory ({totalPhysicalStock} units)</span>
            {lowStockCount > 0 && (
              <span className="rounded-full bg-rose-500/20 px-1.5 py-0.2 font-mono text-[10px] text-rose-300">
                {lowStockCount} low
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium transition ${
              activeTab === 'audit'
                ? 'border-[#7851D8] text-[#F7F4FC]'
                : 'border-transparent text-[#B5ADC5] hover:text-[#F7F4FC]'
            }`}
          >
            <History size={14} />
            <span>Audit Log ({auditLogs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('admins')}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium transition ${
              activeTab === 'admins'
                ? 'border-[#7851D8] text-[#F7F4FC]'
                : 'border-transparent text-[#B5ADC5] hover:text-[#F7F4FC]'
            }`}
          >
            <Users size={14} />
            <span>Admins &amp; Sessions ({activeSessions.length} active)</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="wrap py-8">
        {/* STATS OVERVIEW CARDS */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-[#49365D] bg-[#21182F] p-4 shadow-sm">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#B5ADC5]">
              Total Titles in Catalog
            </span>
            <div className="mt-1 font-serif text-3xl font-medium text-[#F7F4FC]">
              {totalBooksCount}
            </div>
            <span className="text-[11px] text-[#B99AF5]">
              Digital &amp; Physical Editions
            </span>
          </div>

          <div className="rounded-xl border border-[#49365D] bg-[#21182F] p-4 shadow-sm">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#B5ADC5]">
              Physical Books Stock
            </span>
            <div className="mt-1 font-serif text-3xl font-medium text-[#F7F4FC]">
              {totalPhysicalStock}
            </div>
            <span className="text-[11px] text-amber-300">
              {lowStockCount > 0 ? `${lowStockCount} titles need restock` : 'Stock healthy'}
            </span>
          </div>

          <div className="rounded-xl border border-[#49365D] bg-[#21182F] p-4 shadow-sm">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#B5ADC5]">
              Total Orders
            </span>
            <div className="mt-1 font-serif text-3xl font-medium text-[#F7F4FC]">
              {ordersList.length}
            </div>
            <span className="text-[11px] text-[#B5ADC5]">
              {pendingOrdersCount} pending verification
            </span>
          </div>

          <div className="rounded-xl border border-[#49365D] bg-[#21182F] p-4 shadow-sm">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#B5ADC5]">
              Verified Revenue
            </span>
            <div className="mt-1 font-serif text-3xl font-medium text-[#F7F4FC] tabular-nums">
              {formatPrice(verifiedRevenue)}
            </div>
            <span className="text-[11px] text-emerald-400">
              {verifiedOrdersCount} orders confirmed
            </span>
          </div>
        </div>

        {/* TAB 1: BOOKS & CATALOG */}
        {activeTab === 'books' && (
          <div>
            {/* Filter and Action Bar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-1 flex-wrap items-center gap-3">
                <div className="relative min-w-[240px] flex-1">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#837996]" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search books by title, author, keyword…"
                    className="field w-full !pl-9 !py-2 text-xs"
                  />
                </div>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="field !py-2 text-xs cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="career">Education &amp; Career</option>
                  <option value="money">Money &amp; Business</option>
                  <option value="skills">Technology &amp; Skills</option>
                  <option value="growth">Lifestyle &amp; Growth</option>
                  <option value="children">Children &amp; Storybooks</option>
                  <option value="arts">Art, Drawing &amp; Painting</option>
                </select>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as any)}
                  className="field !py-2 text-xs cursor-pointer"
                >
                  <option value="all">All Formats</option>
                  <option value="digital">Digital Only</option>
                  <option value="physical">Physical Only</option>
                  <option value="both">Both Digital &amp; Physical</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setIsNewBookModalOpen(true)}
                className="btn btn-fill gap-1.5 !py-2 text-xs font-medium"
              >
                <Plus size={15} />
                <span>Add New Book</span>
              </button>
            </div>

            {/* Books Table / Grid */}
            <div className="overflow-x-auto rounded-xl border border-[#49365D] bg-[#21182F] shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#49365D] bg-[#140E20] text-[11px] font-mono uppercase tracking-wider text-[#B5ADC5]">
                  <tr>
                    <th className="p-3.5">Book Details</th>
                    <th className="p-3.5">Category &amp; Type</th>
                    <th className="p-3.5">Pricing</th>
                    <th className="p-3.5">Physical Stock</th>
                    <th className="p-3.5">Digital File (PDF)</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#49365D]/60">
                  {filteredProducts.map((book) => (
                    <tr key={book.id} className="transition-colors hover:bg-[#251b36]">
                      {/* Title & Cover */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          {book.coverImage ? (
                            <img
                              src={book.coverImage}
                              alt={book.name}
                              className="h-12 w-9 rounded object-cover border border-[#49365D]"
                            />
                          ) : (
                            <div className="flex h-12 w-9 items-center justify-center rounded border border-[#49365D] bg-[#140E20] text-[8px] font-mono text-[#B99AF5]">
                              {book.coverWord.slice(0, 4)}
                            </div>
                          )}
                          <div className="min-w-0 max-w-[260px]">
                            <span className="block truncate font-serif text-base font-medium text-[#F7F4FC]">
                              {book.name}
                            </span>
                            <span className="block truncate text-[11px] text-[#B5ADC5]">
                              {book.nameTa}
                            </span>
                            <span className="text-[10px] text-[#837996]">
                              ID #{book.id} · {book.pages} pages · {book.language.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category & Format */}
                      <td className="p-3.5">
                        <span className="block font-medium capitalize text-[#F7F4FC]">
                          {book.category}
                        </span>
                        <div className="mt-1 flex items-center gap-1.5">
                          {book.productType === 'both' ? (
                            <span className="rounded bg-[#7851D8]/20 border border-[#7851D8]/40 px-1.5 py-0.5 text-[9px] font-mono uppercase text-[#B99AF5]">
                              Digital + Print
                            </span>
                          ) : book.productType === 'physical' ? (
                            <span className="rounded bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.5 text-[9px] font-mono uppercase text-amber-300">
                              Physical Print
                            </span>
                          ) : (
                            <span className="rounded bg-[#7851D8]/15 border border-[#7851D8]/30 px-1.5 py-0.5 text-[9px] font-mono uppercase text-[#B99AF5]">
                              Digital eBook
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Pricing */}
                      <td className="p-3.5">
                        <div className="space-y-0.5 tabular-nums">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-[#837996]">Digital:</span>
                            <span className="font-medium text-[#F7F4FC]">
                              {formatPrice(book.digitalPrice)}
                            </span>
                          </div>
                          {book.physicalPrice && (
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] text-[#837996]">Physical:</span>
                              <span className="font-medium text-amber-300">
                                {formatPrice(book.physicalPrice)}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Physical Stock Counter */}
                      <td className="p-3.5">
                        {book.productType === 'digital' ? (
                          <span className="text-[11px] text-[#837996]">N/A (Digital)</span>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 rounded-lg border border-[#49365D] bg-[#140E20] px-2 py-1">
                            <button
                              type="button"
                              onClick={() => handleStockChange(book.id, -1)}
                              disabled={book.physicalStock <= 0}
                              className="rounded p-0.5 text-[#B5ADC5] hover:text-[#F7F4FC] disabled:opacity-30"
                              title="Decrease stock"
                            >
                              <Minus size={12} />
                            </button>
                            <span
                              className={`min-w-6 text-center font-mono text-xs font-semibold tabular-nums ${
                                book.physicalStock < 10 ? 'text-rose-400' : 'text-[#F7F4FC]'
                              }`}
                            >
                              {book.physicalStock}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleStockChange(book.id, 1)}
                              className="rounded p-0.5 text-[#B5ADC5] hover:text-[#F7F4FC]"
                              title="Increase stock"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        )}
                      </td>

                      {/* PDF File */}
                      <td className="p-3.5">
                        {book.pdfFileName ? (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleAdminDownloadPdf(book.pdfFileName!)}
                              className="inline-flex items-center gap-1 rounded bg-[#7851D8]/20 border border-[#7851D8]/40 px-2 py-1 text-[11px] text-[#B99AF5] transition hover:bg-[#7851D8] hover:text-[#F7F4FC]"
                              title="Download protected PDF"
                            >
                              <Download size={11} />
                              <span>Download PDF</span>
                            </button>
                            <span className="text-[10px] text-[#837996]">
                              {book.pdfSize ? `${(book.pdfSize / 1024).toFixed(0)} KB` : 'Uploaded'}
                            </span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setUploadModalProduct(book)}
                            className="inline-flex items-center gap-1 text-[11px] text-amber-300 hover:underline"
                          >
                            <Upload size={11} />
                            <span>Upload PDF</span>
                          </button>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setUploadModalProduct(book)}
                            className="rounded p-1.5 text-[#B5ADC5] hover:bg-[#140E20] hover:text-[#B99AF5]"
                            title="Upload files"
                          >
                            <Upload size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingProduct(book)}
                            className="rounded p-1.5 text-[#B5ADC5] hover:bg-[#140E20] hover:text-[#B99AF5]"
                            title="Edit book"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteBook(book.id, book.name)}
                            className="rounded p-1.5 text-[#B5ADC5] hover:bg-[#ff7b72]/15 hover:text-[#ff7b72]"
                            title="Delete book"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#B5ADC5]">Filter Orders:</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="field !py-1.5 text-xs"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending Payment Verification</option>
                  <option value="verified">Verified &amp; Paid</option>
                  <option value="physical">Physical Book Orders</option>
                </select>
              </div>

              <span className="text-xs text-[#837996]">
                Showing {filteredOrders.length} of {ordersList.length} orders
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#49365D] bg-[#21182F] shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#49365D] bg-[#140E20] text-[11px] font-mono uppercase tracking-wider text-[#B5ADC5]">
                  <tr>
                    <th className="p-3.5">Order ID &amp; Date</th>
                    <th className="p-3.5">Customer</th>
                    <th className="p-3.5">Items</th>
                    <th className="p-3.5">Total Amount</th>
                    <th className="p-3.5">Payment Status</th>
                    <th className="p-3.5">Physical Shipping</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#49365D]/60">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="transition-colors hover:bg-[#251b36]">
                      <td className="p-3.5">
                        <span className="block font-mono font-bold text-[#F7F4FC]">
                          {order.id}
                        </span>
                        <span className="text-[10px] text-[#837996]">
                          {new Date(order.createdAt).toLocaleDateString()} at{' '}
                          {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <span className="block font-medium text-[#F7F4FC]">
                          {order.customer.name}
                        </span>
                        <span className="block text-[11px] text-[#B5ADC5]">
                          {order.customer.email}
                        </span>
                        <span className="text-[10px] font-mono text-[#837996]">
                          WA: +91 {order.customer.whatsapp}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <div className="max-w-[220px] space-y-1">
                          {order.items.map((i, idx) => (
                            <div key={idx} className="truncate text-[11px]">
                              <span className="text-[#F7F4FC]">{i.name}</span>{' '}
                              <span className="font-mono text-[9px] uppercase text-[#B99AF5]">
                                [{i.edition}]
                              </span>{' '}
                              <span className="text-[#837996]">×{i.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="p-3.5 font-serif text-base font-medium text-[#F7F4FC] tabular-nums">
                        {formatPrice(order.total)}
                      </td>

                      {/* Payment Status Dropdown */}
                      <td className="p-3.5">
                        <select
                          value={order.paymentStatus}
                          onChange={(e) =>
                            handleUpdateOrderStatus(order.id, e.target.value as any, order.shippingStatus)
                          }
                          className={`rounded border px-2.5 py-1 text-xs font-medium cursor-pointer ${
                            order.paymentStatus === 'verified'
                              ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                              : 'border-amber-500/40 bg-amber-500/15 text-amber-300'
                          }`}
                        >
                          <option value="pending" className="bg-[#21182F] text-amber-300">
                            Pending Verification
                          </option>
                          <option value="verified" className="bg-[#21182F] text-emerald-300">
                            Verified &amp; Paid
                          </option>
                        </select>
                      </td>

                      {/* Shipping Status Dropdown */}
                      <td className="p-3.5">
                        {order.hasPhysicalItems ? (
                          <select
                            value={order.shippingStatus || 'pending_verification'}
                            onChange={(e) =>
                              handleUpdateOrderStatus(order.id, order.paymentStatus, e.target.value as any)
                            }
                            className="rounded border border-[#49365D] bg-[#140E20] px-2 py-1 text-[11px] text-amber-300 cursor-pointer"
                          >
                            <option value="pending_verification">Pending Verification</option>
                            <option value="processing">Processing / Packing</option>
                            <option value="dispatched">Dispatched via Courier</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        ) : (
                          <span className="text-[10px] text-[#837996]">N/A (Digital Order)</span>
                        )}
                      </td>

                      <td className="p-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedOrderDetails(order)}
                          className="inline-flex items-center gap-1 rounded border border-[#49365D] bg-[#140E20] px-2.5 py-1 text-xs text-[#B99AF5] hover:border-[#7851D8]"
                        >
                          <Eye size={12} />
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PHYSICAL INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="rounded-xl border border-[#49365D] bg-[#21182F] p-6 shadow-xl">
              <h2 className="font-serif text-2xl font-medium text-[#F7F4FC] mb-2">
                Physical Printed Book Stock Management
              </h2>
              <p className="text-xs text-[#B5ADC5] leading-relaxed max-w-2xl mb-6">
                Manage physical book stock levels across all printed editions. Both Barath and Kavi can view and adjust stock levels in real time from any device.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {productsList
                  .filter((p) => p.productType === 'physical' || p.productType === 'both')
                  .map((book) => (
                    <div
                      key={book.id}
                      className="flex flex-col justify-between rounded-lg border border-[#49365D] bg-[#140E20] p-4"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono uppercase text-[#B99AF5]">
                            {book.category}
                          </span>
                          <span
                            className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                              book.physicalStock < 10
                                ? 'bg-rose-500/20 text-rose-300'
                                : 'bg-emerald-500/20 text-emerald-300'
                            }`}
                          >
                            {book.physicalStock} in stock
                          </span>
                        </div>
                        <h3 className="mt-1 font-serif text-lg font-medium text-[#F7F4FC]">
                          {book.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-[#B5ADC5]">
                          Price: {formatPrice(book.physicalPrice || book.price)}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-[#49365D]/60 pt-3">
                        <span className="text-[11px] text-[#837996]">Quick Stock Adjust:</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleStockChange(book.id, -5)}
                            className="rounded bg-[#21182F] px-2 py-1 text-xs hover:bg-[#49365D]"
                            title="Subtract 5"
                          >
                            -5
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStockChange(book.id, -1)}
                            className="rounded bg-[#21182F] p-1 text-xs hover:bg-[#49365D]"
                            title="Subtract 1"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="min-w-6 text-center font-mono font-bold text-sm">
                            {book.physicalStock}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleStockChange(book.id, 1)}
                            className="rounded bg-[#21182F] p-1 text-xs hover:bg-[#49365D]"
                            title="Add 1"
                          >
                            <Plus size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStockChange(book.id, 10)}
                            className="rounded bg-[#21182F] px-2 py-1 text-xs text-[#B99AF5] hover:bg-[#49365D]"
                            title="Add 10"
                          >
                            +10
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: AUDIT LOG */}
        {activeTab === 'audit' && (
          <div className="rounded-xl border border-[#49365D] bg-[#21182F] p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-medium text-[#F7F4FC]">
                  Live Shared Activity &amp; Audit Log
                </h2>
                <p className="text-xs text-[#B5ADC5]">
                  Real-time timeline of changes executed by administrators (Barath &amp; Kavi)
                </p>
              </div>
              <span className="text-xs text-[#B99AF5]">
                {auditLogs.length} events logged
              </span>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-3 rounded-lg border border-[#49365D]/60 bg-[#140E20] p-3 text-xs"
                >
                  <div className="flex h-7 w-7 flex-none items-center justify-center rounded bg-[#7851D8]/20 text-[#B99AF5]">
                    <History size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-[#F7F4FC]">
                        {log.adminName}
                      </span>
                      <span className="font-mono text-[10px] text-[#837996]">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[#B5ADC5] leading-relaxed">
                      {log.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ADMINS & ACTIVE SESSIONS */}
        {activeTab === 'admins' && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Authorized Admins Card */}
            <div className="rounded-xl border border-[#49365D] bg-[#21182F] p-6 shadow-xl">
              <h2 className="font-serif text-2xl font-medium text-[#F7F4FC] mb-2">
                Authorized Administrators
              </h2>
              <p className="text-xs text-[#B5ADC5] mb-5">
                Two administrators have full co-management privileges over catalog, orders, and files.
              </p>

              <div className="space-y-3">
                {adminUsers.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between rounded-lg border border-[#49365D] bg-[#140E20] p-3.5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7851D8]/20 text-[#B99AF5] font-serif text-base font-bold">
                        {u.name[0]}
                      </div>
                      <div>
                        <span className="block font-medium text-[#F7F4FC]">{u.name}</span>
                        <span className="text-xs text-[#B5ADC5]">{u.email}</span>
                      </div>
                    </div>
                    <span className="rounded bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] text-emerald-300">
                      Co-Admin
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Concurrent Sessions Card */}
            <div className="rounded-xl border border-[#49365D] bg-[#21182F] p-6 shadow-xl">
              <h2 className="font-serif text-2xl font-medium text-[#F7F4FC] mb-2">
                Concurrent Active Sessions
              </h2>
              <p className="text-xs text-[#B5ADC5] mb-5">
                Both administrators can connect simultaneously from multiple devices without conflict.
              </p>

              <div className="space-y-3">
                {activeSessions.map((s, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg border border-[#49365D] bg-[#140E20] p-3.5"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-medium text-[#F7F4FC] text-xs">
                          {s.name} ({s.email})
                        </span>
                      </div>
                      <span className="mt-0.5 block text-[10px] text-[#837996]">
                        Session active since {new Date(s.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#B99AF5]">
                      Active Token
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: ADD / EDIT BOOK */}
      {(isNewBookModalOpen || editingProduct) && (
        <BookEditModal
          initialProduct={editingProduct}
          onClose={() => {
            setIsNewBookModalOpen(false)
            setEditingProduct(null)
          }}
          onSave={handleSaveBook}
        />
      )}

      {/* MODAL 2: SECURE FILE UPLOADER (PDF & COVERS) */}
      {uploadModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl border border-[#49365D] bg-[#21182F] p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between border-b border-[#49365D] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#B99AF5]">
                  Secure File Storage
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#F7F4FC]">
                  {uploadModalProduct.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setUploadModalProduct(null)}
                className="text-[#B5ADC5] hover:text-[#F7F4FC]"
              >
                <X size={18} />
              </button>
            </div>

            {uploadSuccessMsg && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/15 p-3 text-xs text-emerald-300">
                <CheckCircle2 size={15} />
                <span>{uploadSuccessMsg}</span>
              </div>
            )}

            <div className="space-y-5">
              {/* PDF Uploader */}
              <div className="rounded-lg border border-[#49365D] bg-[#140E20] p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#F7F4FC]">
                    <FileText size={15} className="text-[#B99AF5]" />
                    <span>Digital Product PDF File</span>
                  </div>
                  {uploadModalProduct.pdfFileName && (
                    <span className="text-[10px] text-emerald-400">
                      File currently attached
                    </span>
                  )}
                </div>

                <p className="mb-3 text-[11px] text-[#B5ADC5] leading-relaxed">
                  Files are stored in private server storage and only unlocked for verified customer orders.
                </p>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#49365D] bg-[#21182F] p-5 text-center transition hover:border-[#7851D8]">
                  <Upload size={20} className="mb-2 text-[#B99AF5]" />
                  <span className="text-xs font-medium text-[#F7F4FC]">
                    {uploadingPdf ? 'Uploading PDF…' : 'Choose or Drag PDF File'}
                  </span>
                  <span className="mt-1 text-[10px] text-[#837996]">
                    Accepts .pdf format up to 50MB
                  </span>
                  <input
                    type="file"
                    accept="application/pdf"
                    disabled={uploadingPdf}
                    onChange={(e) => handlePdfUpload(e, uploadModalProduct)}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Cover Image Uploader */}
              <div className="rounded-lg border border-[#49365D] bg-[#140E20] p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#F7F4FC]">
                    <ImageIcon size={15} className="text-[#B99AF5]" />
                    <span>Book Cover Image</span>
                  </div>
                </div>

                <p className="mb-3 text-[11px] text-[#B5ADC5] leading-relaxed">
                  Upload an image to override the default graphic cover placeholder.
                </p>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#49365D] bg-[#21182F] p-5 text-center transition hover:border-[#7851D8]">
                  <ImageIcon size={20} className="mb-2 text-[#B99AF5]" />
                  <span className="text-xs font-medium text-[#F7F4FC]">
                    {uploadingCover ? 'Updating Cover…' : 'Upload Cover Image'}
                  </span>
                  <span className="mt-1 text-[10px] text-[#837996]">
                    Accepts .jpg, .png, .webp
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingCover}
                    onChange={(e) => handleCoverUpload(e, uploadModalProduct)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setUploadModalProduct(null)}
                className="btn text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: ORDER DETAILS */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl border border-[#49365D] bg-[#21182F] p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between border-b border-[#49365D] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#B99AF5]">
                  Order #{selectedOrderDetails.id}
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#F7F4FC]">
                  Customer Order Breakdown
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrderDetails(null)}
                className="text-[#B5ADC5] hover:text-[#F7F4FC]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Customer Info */}
              <div className="rounded-lg border border-[#49365D] bg-[#140E20] p-3.5 space-y-1">
                <div className="font-semibold text-[#F7F4FC]">{selectedOrderDetails.customer.name}</div>
                <div className="text-[#B5ADC5]">Email: {selectedOrderDetails.customer.email}</div>
                <div className="text-[#B5ADC5]">WhatsApp: +91 {selectedOrderDetails.customer.whatsapp}</div>
                {selectedOrderDetails.customer.address && (
                  <div className="mt-2 border-t border-[#49365D]/60 pt-2 text-amber-300">
                    <span className="block font-medium">Shipping Address:</span>
                    <span className="text-[#F7F4FC]">
                      {selectedOrderDetails.customer.address}, {selectedOrderDetails.customer.city} —{' '}
                      {selectedOrderDetails.customer.pincode}
                    </span>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="rounded-lg border border-[#49365D] bg-[#140E20] p-3.5">
                <span className="block font-semibold text-[#F7F4FC] mb-2">Purchased Editions</span>
                <ul className="divide-y divide-[#49365D]/60">
                  {selectedOrderDetails.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between py-2">
                      <div>
                        <span className="font-medium text-[#F7F4FC]">{item.name}</span>
                        <span className="ml-2 rounded bg-[#7851D8]/20 px-1.5 py-0.2 font-mono text-[9px] uppercase text-[#B99AF5]">
                          {item.edition}
                        </span>
                      </div>
                      <span className="tabular-nums font-medium text-[#F7F4FC]">
                        {item.quantity} × {formatPrice(item.price)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex justify-between border-t border-[#49365D] pt-2 font-serif text-base font-bold text-[#F7F4FC]">
                  <span>Total Amount</span>
                  <span>{formatPrice(selectedOrderDetails.total)}</span>
                </div>
              </div>

              {/* Status Controls */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-[#B5ADC5] mb-1">Payment Status</label>
                  <select
                    value={selectedOrderDetails.paymentStatus}
                    onChange={(e) => {
                      const next = e.target.value as any
                      handleUpdateOrderStatus(selectedOrderDetails.id, next, selectedOrderDetails.shippingStatus)
                      setSelectedOrderDetails((prev) => prev ? { ...prev, paymentStatus: next } : null)
                    }}
                    className="field w-full text-xs"
                  >
                    <option value="pending">Pending</option>
                    <option value="verified">Verified &amp; Paid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-[#B5ADC5] mb-1">Shipping Status</label>
                  <select
                    value={selectedOrderDetails.shippingStatus || 'pending_verification'}
                    disabled={!selectedOrderDetails.hasPhysicalItems}
                    onChange={(e) => {
                      const next = e.target.value as any
                      handleUpdateOrderStatus(selectedOrderDetails.id, selectedOrderDetails.paymentStatus, next)
                      setSelectedOrderDetails((prev) => prev ? { ...prev, shippingStatus: next } : null)
                    }}
                    className="field w-full text-xs disabled:opacity-40"
                  >
                    <option value="pending_verification">Pending Verification</option>
                    <option value="processing">Processing / Packing</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrderDetails(null)}
                className="btn text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Book Edit / Add Sub-Component Modal
function BookEditModal({
  initialProduct,
  onClose,
  onSave,
}: {
  initialProduct: StoredProduct | null
  onClose: () => void
  onSave: (data: Partial<StoredProduct>) => void
}) {
  const isEditing = !!initialProduct

  const [name, setName] = useState(initialProduct?.name || '')
  const [nameTa, setNameTa] = useState(initialProduct?.nameTa || '')
  const [slug] = useState(initialProduct?.slug || '')
  const [category, setCategory] = useState(initialProduct?.category || 'career')
  const [format, setFormat] = useState(initialProduct?.format || 'ebook')
  const [productType, setProductType] = useState(initialProduct?.productType || 'both')
  const [digitalPrice, setDigitalPrice] = useState(initialProduct?.digitalPrice || 199)
  const [physicalPrice, setPhysicalPrice] = useState(initialProduct?.physicalPrice || 399)
  const [physicalStock, setPhysicalStock] = useState(initialProduct?.physicalStock || 25)
  const [pages, setPages] = useState(initialProduct?.pages || 80)
  const [language, setLanguage] = useState(initialProduct?.language || 'both')
  const [dimensions, setDimensions] = useState(initialProduct?.dimensions || 'Paperback Book')
  const [shortDescription, setShortDescription] = useState(initialProduct?.shortDescription || '')
  const [shortDescriptionTa, setShortDescriptionTa] = useState(initialProduct?.shortDescriptionTa || '')
  const [description, setDescription] = useState(initialProduct?.description || '')
  const [coverWord, setCoverWord] = useState(initialProduct?.coverWord || 'BOOK')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: initialProduct?.id,
      name,
      nameTa,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      format,
      productType: productType as any,
      digitalPrice: Number(digitalPrice),
      physicalPrice: productType !== 'digital' ? Number(physicalPrice) : undefined,
      price: Number(digitalPrice),
      physicalStock: productType !== 'digital' ? Number(physicalStock) : 0,
      pages: Number(pages),
      language: language as any,
      dimensions,
      shortDescription,
      shortDescriptionTa,
      description,
      descriptionTa: description,
      coverWord: coverWord.toUpperCase(),
      version: initialProduct?.version,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-[#49365D] bg-[#21182F] p-6 shadow-2xl sm:p-8">
        <div className="mb-6 flex items-start justify-between border-b border-[#49365D] pb-3">
          <div>
            <div className="eyebrow mb-1">CATALOG MANAGEMENT</div>
            <h2 className="font-serif text-2xl font-medium text-[#F7F4FC]">
              {isEditing ? `Edit "${initialProduct.name}"` : 'Add New Book to Bookstore'}
            </h2>
          </div>
          <button type="button" onClick={onClose} className="text-[#B5ADC5] hover:text-[#F7F4FC]">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-medium text-[#F7F4FC]">Book Title (English) *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Creative Watercolor & Painting Book"
                className="field w-full"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium text-[#F7F4FC]">Book Title (Tamil) *</label>
              <input
                type="text"
                required
                value={nameTa}
                onChange={(e) => setNameTa(e.target.value)}
                placeholder="உதா. படைப்பு நீர்வண்ண ஓவியப் புத்தகம்"
                className="field w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block font-medium text-[#F7F4FC]">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="field w-full cursor-pointer"
              >
                <option value="career">Education &amp; Career</option>
                <option value="money">Money &amp; Business</option>
                <option value="skills">Technology &amp; Skills</option>
                <option value="growth">Lifestyle &amp; Growth</option>
                <option value="children">Children &amp; Storybooks</option>
                <option value="arts">Art, Drawing &amp; Painting</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block font-medium text-[#F7F4FC]">Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="field w-full cursor-pointer"
              >
                <option value="ebook">eBook</option>
                <option value="guide">Guide</option>
                <option value="artbook">Art &amp; Drawing Book</option>
                <option value="storybook">Illustrated Storybook</option>
                <option value="workbook">Activity Workbook</option>
                <option value="template">Template</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block font-medium text-[#F7F4FC]">Product Type</label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value as any)}
                className="field w-full cursor-pointer font-semibold text-[#B99AF5]"
              >
                <option value="both">Both Digital &amp; Physical</option>
                <option value="digital">Digital Only</option>
                <option value="physical">Physical Print Only</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block font-medium text-[#F7F4FC]">Digital Price (₹)</label>
              <input
                type="number"
                min="0"
                required
                value={digitalPrice}
                onChange={(e) => setDigitalPrice(Number(e.target.value))}
                className="field w-full"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium text-[#F7F4FC]">
                Physical Price (₹) {productType === 'digital' && '(Disabled)'}
              </label>
              <input
                type="number"
                min="0"
                disabled={productType === 'digital'}
                value={physicalPrice}
                onChange={(e) => setPhysicalPrice(Number(e.target.value))}
                className="field w-full disabled:opacity-40"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium text-[#F7F4FC]">
                Physical Stock Units {productType === 'digital' && '(Disabled)'}
              </label>
              <input
                type="number"
                min="0"
                disabled={productType === 'digital'}
                value={physicalStock}
                onChange={(e) => setPhysicalStock(Number(e.target.value))}
                className="field w-full disabled:opacity-40"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block font-medium text-[#F7F4FC]">Total Pages</label>
              <input
                type="number"
                min="1"
                required
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="field w-full"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium text-[#F7F4FC]">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="field w-full"
              >
                <option value="both">Tamil + English</option>
                <option value="ta">Tamil</option>
                <option value="en">English</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block font-medium text-[#F7F4FC]">Cover Word</label>
              <input
                type="text"
                value={coverWord}
                onChange={(e) => setCoverWord(e.target.value)}
                placeholder="e.g. PAINTING"
                className="field w-full"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block font-medium text-[#F7F4FC]">
              Physical Dimensions &amp; Paper Quality
            </label>
            <input
              type="text"
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
              placeholder="e.g. A4 Lay-Flat Artbook (180gsm Cold-Pressed Watercolor Paper)"
              className="field w-full"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-[#F7F4FC]">Short Description (English)</label>
            <textarea
              rows={2}
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="field w-full resize-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-[#F7F4FC]">Short Description (Tamil)</label>
            <textarea
              rows={2}
              value={shortDescriptionTa}
              onChange={(e) => setShortDescriptionTa(e.target.value)}
              className="field w-full resize-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-[#F7F4FC]">Detailed Book Description</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="field w-full resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-[#49365D]">
            <button type="button" onClick={onClose} className="btn text-xs">
              Cancel
            </button>
            <button type="submit" className="btn btn-fill text-xs font-medium">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

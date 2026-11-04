import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Lock,
  Mail,
  Package,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  User,
} from 'lucide-react'
import { BookCover } from '@/components/BookCover'
import { formatPrice } from '@/data/products'
import { useCatalogText, useLanguage } from '@/lib/i18n'
import { useStore } from '@/lib/store'
import { orderTotals } from '@/lib/pricing'
import {
  createOrderFromCart,
  validateCustomer,
  type OrderCustomer,
} from '@/lib/orders'
import { submitCustomerOrderServerFn } from '@/lib/server/adminActions'

export const Route = createFileRoute('/checkout/')({
  component: CheckoutPage,
  head: () => ({ meta: [{ title: 'Checkout — AUVYRA Bookstore' }] }),
})

function CheckoutPage() {
  const { t } = useLanguage()
  const text = useCatalogText()
  const navigate = useNavigate()
  const { cartItems, clearCart } = useStore()

  const hasPhysical = cartItems.some((item) => item.edition === 'physical')
  const hasDigital = cartItems.some((item) => item.edition === 'digital')

  const [customer, setCustomer] = useState<OrderCustomer>({
    name: '',
    email: '',
    whatsapp: '',
    address: '',
    city: '',
    pincode: '',
    notes: '',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof OrderCustomer, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [duplicateGuard, setDuplicateGuard] = useState(false)

  const { subtotal, total } = orderTotals(cartItems)

  const handleInputChange = (field: keyof OrderCustomer, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()

    // Prevent duplicate submission
    if (submitting || duplicateGuard) return

    const { valid, errors: validationErrors } = validateCustomer(customer, {
      requireAddress: hasPhysical,
    })

    if (!valid) {
      setErrors(validationErrors)
      const firstErrorField = Object.keys(validationErrors)[0]
      const el = document.getElementById(`checkout-${firstErrorField}`)
      el?.focus()
      return
    }

    if (cartItems.length === 0) return

    setSubmitting(true)
    setDuplicateGuard(true)

    try {
      const newOrder = createOrderFromCart(
        customer,
        cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          edition: item.edition,
          cartKey: item.cartKey,
        })),
      )

      // Sync with shared server database for Barath and Kavi's admin console
      try {
        await submitCustomerOrderServerFn({
          data: {
            order: {
              id: newOrder.id,
              createdAt: newOrder.createdAt,
              customer: newOrder.customer,
              items: newOrder.items.map((i) => ({
                id: i.id,
                cartKey: i.cartKey,
                name: i.name,
                price: i.price,
                quantity: i.quantity,
                edition: i.edition,
                format: i.format,
                category: i.category,
              })),
              hasDigitalItems: newOrder.hasDigitalItems,
              hasPhysicalItems: newOrder.hasPhysicalItems,
              subtotal: newOrder.subtotal,
              total: newOrder.total,
              paymentStatus: newOrder.paymentStatus,
              paymentGateway: newOrder.paymentGateway,
              shippingStatus: newOrder.shippingStatus,
            },
          },
        })
      } catch (srvErr) {
        console.warn('Server sync deferred:', srvErr)
      }

      clearCart()

      navigate({
        to: '/checkout/success',
        search: { orderId: newOrder.id },
      })
    } catch (err) {
      console.error('Failed to place order:', err)
      setSubmitting(false)
      setDuplicateGuard(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <section className="min-h-[75vh] bg-[#0B0A10] py-16">
        <div className="wrap max-w-lg text-center">
          <div className="rounded-xl border border-[#49365D] bg-[#21182F] p-10 shadow-2xl">
            <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-[#B99AF5]/50" />
            <h1 className="mb-2 font-serif text-3xl font-medium text-[#F7F4FC]">
              {t('checkout.emptyCartTitle')}
            </h1>
            <p className="mb-6 text-sm leading-relaxed text-[#B5ADC5]">
              {t('checkout.emptyCartMsg')}
            </p>
            <Link to="/" hash="store" className="btn btn-fill w-full">
              {t('checkout.returnToStore')}
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-[80vh] bg-[#0B0A10] py-10 md:py-16">
      <div className="wrap">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#B5ADC5] transition-colors hover:text-[#B99AF5]"
          >
            <ArrowLeft size={14} />
            <span>{t('checkout.viewCart')}</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-[#B99AF5]">
            <Lock size={13} />
            <span className="font-mono text-[10px] uppercase tracking-widest">
              256-bit Secure Checkout
            </span>
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <div className="eyebrow">AUVYRA BOOKSTORE</div>
          <h1 className="mt-1 font-serif text-[36px] font-normal leading-tight text-[#F7F4FC] md:text-[44px]">
            {t('checkout.heading')}
          </h1>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#B5ADC5]">
            {t('checkout.subheading')}
          </p>
        </div>

        {/* Two-Column Checkout Layout */}
        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-12">
          {/* Left: Customer Information Form */}
          <div className="rounded-xl border border-[#49365D] bg-[#21182F] p-6 shadow-xl sm:p-8">
            <div className="mb-6 flex items-center gap-2.5 border-b border-[#49365D]/80 pb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#49365D] bg-[#140E20] text-[#B99AF5]">
                <User size={16} />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-medium text-[#F7F4FC]">
                  {t('checkout.customerHeading')}
                </h2>
                <span className="text-[11px] text-[#B5ADC5]">
                  {hasPhysical && hasDigital
                    ? 'For digital download access and physical book shipping'
                    : hasPhysical
                      ? 'For physical doorstep book shipping'
                      : 'For digital electronic delivery'}
                </span>
              </div>
            </div>

            <form onSubmit={handlePlaceOrder} noValidate className="space-y-5">
              {/* Customer Full Name */}
              <div>
                <label
                  htmlFor="checkout-name"
                  className="mb-1.5 flex items-center justify-between text-xs font-medium text-[#F7F4FC]"
                >
                  <span className="flex items-center gap-1.5">
                    <User size={13} className="text-[#B99AF5]" />
                    <span>{t('checkout.fullName')}</span>
                  </span>
                  <span className="text-[10px] uppercase text-[#ff7b72]">* Required</span>
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={customer.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder={t('checkout.fullNamePlaceholder')}
                  className={`field w-full ${
                    errors.name ? '!border-[#ff7b72] ring-1 ring-[#ff7b72]/30' : ''
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-[#ff7b72]">
                    <AlertCircle size={12} />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="checkout-email"
                  className="mb-1.5 flex items-center justify-between text-xs font-medium text-[#F7F4FC]"
                >
                  <span className="flex items-center gap-1.5">
                    <Mail size={13} className="text-[#B99AF5]" />
                    <span>{t('checkout.emailAddress')}</span>
                  </span>
                  <span className="text-[10px] uppercase text-[#ff7b72]">* Required</span>
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={customer.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={t('checkout.emailPlaceholder')}
                  className={`field w-full ${
                    errors.email ? '!border-[#ff7b72] ring-1 ring-[#ff7b72]/30' : ''
                  }`}
                />
                {errors.email ? (
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-[#ff7b72]">
                    <AlertCircle size={12} />
                    <span>{errors.email}</span>
                  </p>
                ) : (
                  <p className="mt-1 text-[11px] text-[#837996]">
                    Order receipt &amp; digital files will be delivered here.
                  </p>
                )}
              </div>

              {/* WhatsApp Mobile Number */}
              <div>
                <label
                  htmlFor="checkout-whatsapp"
                  className="mb-1.5 flex items-center justify-between text-xs font-medium text-[#F7F4FC]"
                >
                  <span className="flex items-center gap-1.5">
                    <Phone size={13} className="text-[#B99AF5]" />
                    <span>{t('checkout.whatsappNumber')}</span>
                  </span>
                  <span className="text-[10px] uppercase text-[#ff7b72]">* Required</span>
                </label>
                <input
                  id="checkout-whatsapp"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={customer.whatsapp}
                  onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                  placeholder={t('checkout.whatsappPlaceholder')}
                  className={`field w-full ${
                    errors.whatsapp ? '!border-[#ff7b72] ring-1 ring-[#ff7b72]/30' : ''
                  }`}
                />
                {errors.whatsapp ? (
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-[#ff7b72]">
                    <AlertCircle size={12} />
                    <span>{errors.whatsapp}</span>
                  </p>
                ) : (
                  <p className="mt-1 text-[11px] text-[#837996]">
                    {t('checkout.whatsappHelp')}
                  </p>
                )}
              </div>

              {/* Physical Delivery Address Section (When physical items are in cart) */}
              {hasPhysical && (
                <div className="rounded-lg border border-amber-500/30 bg-[#140E20] p-4 space-y-3.5">
                  <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
                    <Truck size={15} />
                    <span>{t('checkout.shippingAddress')} (Physical Books Shipping)</span>
                  </div>

                  <div>
                    <label
                      htmlFor="checkout-address"
                      className="mb-1 block text-xs font-medium text-[#F7F4FC]"
                    >
                      Door No., Street Address, Area <span className="text-[#ff7b72]">*</span>
                    </label>
                    <textarea
                      id="checkout-address"
                      rows={2}
                      required
                      value={customer.address || ''}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder={t('checkout.shippingStreetPlaceholder')}
                      className={`field w-full resize-none ${
                        errors.address ? '!border-[#ff7b72]' : ''
                      }`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-[11px] text-[#ff7b72]">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="checkout-city"
                        className="mb-1 block text-xs font-medium text-[#F7F4FC]"
                      >
                        City / Town <span className="text-[#ff7b72]">*</span>
                      </label>
                      <input
                        id="checkout-city"
                        type="text"
                        required
                        value={customer.city || ''}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder={t('checkout.shippingCityPlaceholder')}
                        className={`field w-full ${errors.city ? '!border-[#ff7b72]' : ''}`}
                      />
                      {errors.city && (
                        <p className="mt-1 text-[11px] text-[#ff7b72]">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="checkout-pincode"
                        className="mb-1 block text-xs font-medium text-[#F7F4FC]"
                      >
                        Postal Pincode <span className="text-[#ff7b72]">*</span>
                      </label>
                      <input
                        id="checkout-pincode"
                        type="text"
                        required
                        maxLength={6}
                        value={customer.pincode || ''}
                        onChange={(e) =>
                          handleInputChange('pincode', e.target.value.replace(/\D/g, ''))
                        }
                        placeholder={t('checkout.shippingPincodePlaceholder')}
                        className={`field w-full ${
                          errors.pincode ? '!border-[#ff7b72]' : ''
                        }`}
                      />
                      {errors.pincode && (
                        <p className="mt-1 text-[11px] text-[#ff7b72]">{errors.pincode}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Optional Order Notes */}
              <div>
                <label
                  htmlFor="checkout-notes"
                  className="mb-1.5 block text-xs font-medium text-[#B5ADC5]"
                >
                  {t('checkout.notesLabel')}
                </label>
                <textarea
                  id="checkout-notes"
                  rows={2}
                  value={customer.notes || ''}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder={t('checkout.notesPlaceholder')}
                  className="field w-full resize-none"
                />
              </div>

              {/* Payment Verification Information Box */}
              <div className="rounded-lg border border-[#49365D] bg-[#140E20] p-4 text-xs">
                <div className="mb-2 flex items-center gap-2 font-medium text-[#B99AF5]">
                  <Sparkles size={14} />
                  <span>{t('checkout.paymentHeading')}</span>
                </div>
                <p className="leading-relaxed text-[#B5ADC5]">
                  {t('checkout.paymentPendingNotice')}
                </p>
                <div className="mt-2.5 flex items-center gap-2 font-mono text-[11px] text-[#F7F4FC]">
                  <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
                  <span>
                    Status on order placement: <strong>Pending Verification</strong>
                  </span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting || duplicateGuard}
                  className="btn btn-fill w-full !py-3.5 !text-base font-medium shadow-lg"
                >
                  {submitting ? (
                    <span>{t('checkout.placingOrderBtn')}</span>
                  ) : (
                    <span>
                      {t('checkout.placeOrderBtn')} · {formatPrice(total)}
                    </span>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-center text-[11px] text-[#837996]">
                <ShieldCheck size={14} className="text-[#B99AF5]" />
                <span>{t('checkout.securityGuarantee')}</span>
              </div>
            </form>
          </div>

          {/* Right: Order Summary Sidebar */}
          <aside className="rounded-xl border border-[#49365D] bg-[#21182F] p-6 shadow-xl sm:p-7 lg:sticky lg:top-24">
            <div className="mb-4 flex items-center justify-between border-b border-[#49365D]/80 pb-3">
              <h2 className="font-serif text-2xl font-medium text-[#F7F4FC]">
                {t('checkout.orderSummary')}
              </h2>
              <span className="font-mono text-xs text-[#B99AF5]">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} {t('store.items')}
              </span>
            </div>

            {/* Selected Items List */}
            <ul className="mb-6 max-h-[380px] divide-y divide-[#49365D]/60 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <li key={item.cartKey} className="flex items-center gap-3.5 py-3">
                  <div className="w-12 flex-none sm:w-14">
                    <BookCover product={item} size="sm" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block truncate font-serif text-base font-medium text-[#F7F4FC]">
                      {text.name(item)}
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {item.edition === 'physical' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-300">
                          <Package size={11} />
                          <span>Physical Book</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#B99AF5]">
                          <FileText size={11} />
                          <span>Digital PDF</span>
                        </span>
                      )}
                      <span className="text-[#49365D]">•</span>
                      <span className="text-[11px] text-[#B5ADC5]">Qty {item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right font-serif text-base font-medium text-[#F7F4FC] tabular-nums">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </div>
                </li>
              ))}
            </ul>

            {/* Cost Breakdown */}
            <div className="border-t border-[#49365D] pt-4 text-sm">
              <div className="flex items-baseline justify-between text-[#B5ADC5]">
                <span>{t('cart.productSubtotal')}</span>
                <span className="font-medium text-[#F7F4FC] tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {hasDigital && (
                <div className="mt-2 flex items-baseline justify-between text-[#B5ADC5]">
                  <span>Digital Delivery (Email / WhatsApp)</span>
                  <span className="font-medium text-[#B99AF5]">{t('cart.included')}</span>
                </div>
              )}

              {hasPhysical && (
                <div className="mt-2 flex items-baseline justify-between text-[#B5ADC5]">
                  <span>Physical Shipping (Doorstep Courier)</span>
                  <span className="font-medium text-amber-300">Free / Included</span>
                </div>
              )}

              <div className="mt-4 flex items-baseline justify-between border-t border-[#49365D] pt-4">
                <span className="eyebrow text-xs">{t('cart.finalTotal')}</span>
                <span className="font-serif text-3xl font-medium text-[#F7F4FC] tabular-nums">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            {/* Delivery Notice */}
            <div className="mt-6 rounded-lg border border-[#49365D]/80 bg-[#140E20] p-3 text-[11px] leading-relaxed text-[#B5ADC5]">
              <div className="mb-1 flex items-center gap-1.5 font-medium text-[#B99AF5]">
                <CheckCircle2 size={13} />
                <span>Order Fulfillment Guarantee</span>
              </div>
              <p>
                {hasPhysical && hasDigital
                  ? 'Digital files will be unlocked upon payment verification, and physical books will be shipped to your address.'
                  : hasPhysical
                    ? 'Physical books are safely packed and dispatched with tracking after payment verification.'
                    : 'Digital files and receipts will be delivered immediately upon payment verification.'}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

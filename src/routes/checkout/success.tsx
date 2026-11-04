import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  AlertCircle,
  BookOpen,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Download,
  FileText,
  Lock,
  MessageCircle,
  Package,
  ShieldCheck,
  Truck,
  Unlock,
} from 'lucide-react'
import { LogoMark } from '@/components/Logo'
import { formatPrice } from '@/data/products'
import { useLanguage } from '@/lib/i18n'
import { useStore } from '@/lib/store'
import { WHATSAPP_DISPLAY, whatsappLink } from '@/lib/site'
import {
  buildOrderConfirmationMessage,
  getLastOrderId,
  getOrderById,
  setOrderPaymentVerified,
  type Order,
} from '@/lib/orders'

export const Route = createFileRoute('/checkout/success')({
  validateSearch: (search: Record<string, unknown>): { orderId?: string } => ({
    orderId: typeof search.orderId === 'string' ? search.orderId : undefined,
  }),
  component: CheckoutSuccess,
  head: () => ({ meta: [{ title: 'Order Confirmation — AUVYRA Bookstore' }] }),
})

function CheckoutSuccess() {
  const { t } = useLanguage()
  const { clearCart } = useStore()
  const { orderId: searchOrderId } = Route.useSearch()

  const [order, setOrder] = useState<Order | null>(null)
  const [copied, setCopied] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null)

  useEffect(() => {
    clearCart()

    const targetId = searchOrderId || getLastOrderId()
    if (targetId) {
      const found = getOrderById(targetId)
      if (found) setOrder(found)
    }
  }, [searchOrderId])

  const copyOrderId = () => {
    if (!order) return
    navigator.clipboard?.writeText(order.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSimulateVerification = () => {
    if (!order) return
    const updated = setOrderPaymentVerified(order.id)
    if (updated) setOrder({ ...updated })
  }

  const handleDownload = (key: string, title: string, format: string) => {
    if (order?.paymentStatus !== 'verified') return

    setDownloadSuccess(key)
    const blob = new Blob(
      [
        `AUVYRA DIGITAL BOOKSTORE\n\nTitle: ${title}\nFormat: ${format.toUpperCase()}\nOrder ID: ${order.id}\nCustomer: ${order.customer.name} (${order.customer.email})\nEdition: Authorized Digital License\nStatus: Verified\n\nThank you for choosing AUVYRA.`,
      ],
      { type: 'text/plain;charset=utf-8' },
    )
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `AUVYRA-${title.replace(/[^a-zA-Z0-9]/g, '_')}-${format.toUpperCase()}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setTimeout(() => setDownloadSuccess(null), 3000)
  }

  if (!order) {
    return (
      <section className="flex min-h-[75vh] items-center justify-center bg-[#0B0A10] px-5 py-16">
        <div className="max-w-lg rounded-xl border border-[#49365D] bg-[#21182F] p-8 text-center shadow-2xl md:p-12">
          <LogoMark className="mx-auto mb-6 h-16 w-16 text-[#B99AF5]" />
          <h1 className="mb-3 font-serif text-[34px] font-normal leading-tight text-[#F7F4FC]">
            {t('success.title')}
          </h1>
          <p className="mb-8 text-[14px] leading-relaxed text-[#B5ADC5]">
            {t('success.body')}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn btn-fill">
              {t('common.home')}
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener"
              className="btn"
            >
              WhatsApp Support · {WHATSAPP_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    )
  }

  const isVerified = order.paymentStatus === 'verified'
  const digitalItems = order.items.filter((i) => i.edition === 'digital')
  const physicalItems = order.items.filter((i) => i.edition === 'physical')

  return (
    <section className="min-h-[85vh] bg-[#0B0A10] py-12 md:py-20">
      <div className="wrap max-w-3xl">
        {/* Header confirmation card */}
        <div className="mb-8 rounded-xl border border-[#49365D] bg-[#21182F] p-6 text-center shadow-2xl sm:p-10">
          <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center">
            <LogoMark className="h-16 w-16 drop-shadow-[0_0_18px_rgba(120,81,216,0.35)]" />
            <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-[#21182F] bg-[#7851D8] p-1 text-[#F7F4FC]">
              <Check size={16} strokeWidth={2.5} />
            </div>
          </div>

          <div className="eyebrow mb-2">ORDER RECORDED</div>
          <h1 className="mb-2 font-serif text-[32px] font-normal leading-tight text-[#F7F4FC] sm:text-[40px]">
            {t('confirmation.title')}
          </h1>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-[#B5ADC5]">
            {t('confirmation.subtitle')}
          </p>

          {/* Order ID Banner */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 rounded-lg border border-[#49365D] bg-[#140E20] px-4 py-2.5">
            <span className="text-xs uppercase tracking-wider text-[#B5ADC5]">
              {t('confirmation.orderIdLabel')}:
            </span>
            <span className="font-mono text-base font-bold text-[#F7F4FC]">
              {order.id}
            </span>
            <button
              type="button"
              onClick={copyOrderId}
              className="inline-flex items-center gap-1 rounded bg-[#21182F] px-2 py-1 text-[11px] font-medium text-[#B99AF5] transition-colors hover:bg-[#7851D8] hover:text-[#F7F4FC]"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Payment Verification Status Card */}
        <div className="mb-8 rounded-xl border border-[#49365D] bg-[#21182F] p-6 sm:p-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#B5ADC5]">
                {t('confirmation.statusLabel')}
              </span>
              <div className="mt-1 flex items-center gap-2">
                {isVerified ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
                    <CheckCircle2 size={13} />
                    <span>{t('confirmation.statusVerified')}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-300">
                    <Clock size={13} />
                    <span>{t('confirmation.statusPending')}</span>
                  </span>
                )}
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs uppercase tracking-wider text-[#B5ADC5]">Total Payable</span>
              <div className="font-serif text-2xl font-medium text-[#F7F4FC] tabular-nums">
                {formatPrice(order.total)}
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-[#49365D]/80 pt-4 text-xs leading-relaxed text-[#B5ADC5]">
            {isVerified ? (
              <p className="flex items-center gap-2 text-emerald-300">
                <CheckCircle2 size={14} className="flex-none" />
                <span>
                  Payment confirmed! Digital access is unlocked and physical copies are being
                  prepared.
                </span>
              </p>
            ) : (
              <p className="flex items-start gap-2 text-amber-200/90">
                <AlertCircle size={15} className="mt-0.5 flex-none text-amber-400" />
                <span>
                  Your order is placed! Once payment is verified by our team (5–15 min),
                  digital files unlock instantly and physical books dispatch via courier.
                </span>
              </p>
            )}
          </div>

          {!isVerified && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#49365D]/60 bg-[#140E20] p-3 text-xs">
              <span className="text-[#B5ADC5]">
                Testing or demonstrating order verification?
              </span>
              <button
                type="button"
                onClick={handleSimulateVerification}
                className="inline-flex items-center gap-1.5 rounded border border-[#7851D8] bg-[#7851D8]/20 px-3 py-1.5 font-medium text-[#B99AF5] transition hover:bg-[#7851D8] hover:text-[#F7F4FC]"
              >
                <Unlock size={13} />
                <span>{t('confirmation.simulateVerification')}</span>
              </button>
            </div>
          )}
        </div>

        {/* Digital Downloads Section (If order contains digital products) */}
        {digitalItems.length > 0 && (
          <div className="mb-8 rounded-xl border border-[#49365D] bg-[#21182F] p-6 sm:p-7">
            <div className="mb-4 flex items-center gap-2 border-b border-[#49365D]/80 pb-3">
              <FileText size={18} className="text-[#B99AF5]" />
              <h2 className="font-serif text-2xl font-medium text-[#F7F4FC]">
                Digital Products ({digitalItems.length})
              </h2>
            </div>

            <ul className="divide-y divide-[#49365D]/60">
              {digitalItems.map((item) => (
                <li
                  key={item.cartKey}
                  className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg font-medium text-[#F7F4FC]">
                      {item.name}
                    </h3>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-[#B5ADC5]">
                      <span className="rounded bg-[#140E20] px-1.5 py-0.5 font-mono text-[10px] uppercase text-[#B99AF5]">
                        Digital PDF
                      </span>
                      <span>Qty: {item.quantity}</span>
                      <span>•</span>
                      <span className="tabular-nums font-medium text-[#F7F4FC]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  <div>
                    {isVerified ? (
                      <button
                        type="button"
                        onClick={() => handleDownload(item.cartKey, item.name, item.format)}
                        className="btn btn-fill !px-4 !py-2 text-xs"
                      >
                        {downloadSuccess === item.cartKey ? (
                          <>
                            <Check size={14} />
                            <span>Downloaded!</span>
                          </>
                        ) : (
                          <>
                            <Download size={14} />
                            <span>Download PDF</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled
                        aria-disabled="true"
                        title="Download locked until payment verification completes"
                        className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-md border border-[#49365D] bg-[#140E20] px-3.5 py-2 text-xs font-medium text-[#837996] opacity-70"
                      >
                        <Lock size={13} />
                        <span>Download Locked</span>
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Physical Books Section (If order contains physical products) */}
        {physicalItems.length > 0 && (
          <div className="mb-8 rounded-xl border border-[#49365D] bg-[#21182F] p-6 sm:p-7">
            <div className="mb-4 flex items-center gap-2 border-b border-[#49365D]/80 pb-3">
              <Package size={18} className="text-amber-400" />
              <h2 className="font-serif text-2xl font-medium text-[#F7F4FC]">
                Physical Books for Doorstep Delivery ({physicalItems.length})
              </h2>
            </div>

            <ul className="divide-y divide-[#49365D]/60">
              {physicalItems.map((item) => (
                <li
                  key={item.cartKey}
                  className="flex flex-col justify-between gap-2 py-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#F7F4FC]">
                      {item.name}
                    </h3>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-[#B5ADC5]">
                      <span className="rounded bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.5 font-mono text-[10px] uppercase text-amber-300">
                        Printed Edition
                      </span>
                      <span>Qty: {item.quantity}</span>
                      <span>•</span>
                      <span className="tabular-nums font-medium text-[#F7F4FC]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    {isVerified ? (
                      <span className="inline-flex items-center gap-1 rounded bg-amber-500/15 px-2.5 py-1 text-amber-300">
                        <Truck size={13} />
                        <span>Preparing for Courier Dispatch</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded bg-[#140E20] border border-[#49365D] px-2.5 py-1 text-[#B5ADC5]">
                        <Clock size={13} />
                        <span>Dispatches after verification</span>
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {order.customer.address && (
              <div className="mt-4 rounded-lg border border-amber-500/25 bg-[#140E20] p-3 text-xs text-[#B5ADC5]">
                <div className="font-medium text-amber-300 mb-1 flex items-center gap-1.5">
                  <Truck size={13} />
                  <span>Shipping Destination</span>
                </div>
                <p className="text-[#F7F4FC]">
                  {order.customer.address}, {order.customer.city} — {order.customer.pincode}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Customer Information Summary */}
        <div className="mb-8 rounded-xl border border-[#49365D] bg-[#21182F] p-6 sm:p-7">
          <h2 className="mb-4 font-serif text-xl font-medium text-[#F7F4FC]">
            {t('confirmation.customerDetails')}
          </h2>
          <dl className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-3">
            <div className="rounded-lg border border-[#49365D]/60 bg-[#140E20] p-3">
              <dt className="text-[#B5ADC5]">Customer Name</dt>
              <dd className="mt-1 font-medium text-[#F7F4FC]">{order.customer.name}</dd>
            </div>
            <div className="rounded-lg border border-[#49365D]/60 bg-[#140E20] p-3">
              <dt className="text-[#B5ADC5]">Delivery Email</dt>
              <dd className="mt-1 truncate font-medium text-[#F7F4FC]">
                {order.customer.email}
              </dd>
            </div>
            <div className="rounded-lg border border-[#49365D]/60 bg-[#140E20] p-3">
              <dt className="text-[#B5ADC5]">WhatsApp Contact</dt>
              <dd className="mt-1 font-medium text-[#F7F4FC]">
                {order.customer.whatsapp}
              </dd>
            </div>
          </dl>
          {order.customer.notes && (
            <div className="mt-3 rounded-lg border border-[#49365D]/60 bg-[#140E20] p-3 text-xs">
              <span className="text-[#B5ADC5]">Notes: </span>
              <span className="text-[#F7F4FC]">{order.customer.notes}</span>
            </div>
          )}
        </div>

        {/* Next Steps & WhatsApp Confirmation CTA */}
        <div className="rounded-xl border border-[#49365D] bg-[#21182F] p-6 text-center shadow-xl sm:p-8">
          <h2 className="mb-2 font-serif text-2xl font-medium text-[#F7F4FC]">
            Confirm &amp; Message on WhatsApp
          </h2>
          <p className="mx-auto mb-6 max-w-lg text-xs leading-relaxed text-[#B5ADC5]">
            Message us on WhatsApp with your Order ID to share your payment confirmation or ask any questions about your digital downloads or physical book courier delivery.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={whatsappLink(buildOrderConfirmationMessage(order))}
              target="_blank"
              rel="noopener"
              className="btn btn-fill !px-6 !py-3 text-sm"
            >
              <MessageCircle size={16} />
              <span>{t('confirmation.sendOnWhatsapp')}</span>
            </a>
            <Link to="/" hash="store" className="btn !px-5 !py-3 text-sm">
              <BookOpen size={16} />
              <span>Explore More Books</span>
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-center text-[11px] text-[#837996]">
            <ShieldCheck size={13} className="text-[#B99AF5]" />
            <span>Digital &amp; Physical Bookstore Guarantee · AUVYRA by Barath &amp; Kavi</span>
          </div>
        </div>
      </div>
    </section>
  )
}

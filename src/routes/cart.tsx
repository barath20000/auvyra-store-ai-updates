
import { Link, createFileRoute } from '@tanstack/react-router'
import { BookOpen, FileText, Minus, Package, Plus, ShoppingBag, X } from 'lucide-react'
import { categories, formatPrice } from '@/data/products'
import { BookCover } from '@/components/BookCover'
import { CheckoutButton } from '@/components/CheckoutButton'
import { OrderTotals } from '@/components/OrderTotals'
import { useCatalogText, useLanguage } from '@/lib/i18n'
import { useStore } from '@/lib/store'
import { orderTotals } from '@/lib/pricing'

export const Route = createFileRoute('/cart')({
  component: CartPage,
  head: () => ({ meta: [{ title: 'Your cart — AUVYRA Bookstore' }] }),
})

function CartPage() {
  const { t } = useLanguage()
  const text = useCatalogText()
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useStore()
  const { total } = orderTotals(cartItems)

  const hasPhysical = cartItems.some((i) => i.edition === 'physical')
  const hasDigital = cartItems.some((i) => i.edition === 'digital')

  return (
    <section className="min-h-[65vh] bg-[#F7F3EA] py-12 text-[#30263A] md:py-16">
      <div className="wrap">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5D9C5] bg-white text-[#302044]">
              <ShoppingBag size={20} strokeWidth={1.8} />
            </div>
            <h1 className="font-serif text-[38px] font-normal leading-tight text-[#30263A] md:text-[46px]">
              {t('cart.title')}
            </h1>
          </div>

          <Link
            to="/"
            hash="store"
            className="text-xs font-medium text-[#8A6A36] hover:underline"
          >
            ← Continue shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#D6B56D] bg-white py-16 text-center shadow-sm">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-[#B9954D]/60" />
            <p className="mb-6 text-sm text-[#756B7D]">{t('cart.empty')}</p>
            <Link to="/" hash="store" className="btn btn-fill">
              {t('cart.browse')}
            </Link>
          </div>
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px]">
            {/* Cart Items List */}
            <ul className="divide-y divide-[#E5D9C5] rounded-xl border border-[#E5D9C5] bg-white shadow-sm">
              {cartItems.map((p) => {
                const category = categories.find((c) => c.id === p.category) || categories[0]
                const isPhysical = p.edition === 'physical'

                return (
                  <li
                    key={p.cartKey}
                    className="flex items-center gap-4 p-4 transition-colors hover:bg-[#FCFAF5] sm:gap-5 sm:p-5"
                  >
                    <Link
                      to="/products/$productId"
                      params={{ productId: String(p.id) }}
                      className="w-16 flex-none sm:w-20"
                      aria-label={text.name(p)}
                    >
                      <BookCover product={p} size="sm" />
                    </Link>

                    <div className="min-w-0 flex-1">
                      {/* Edition & Category Tag */}
                      <div className="flex flex-wrap items-center gap-2">
                        {isPhysical ? (
                          <span className="inline-flex items-center gap-1 rounded border border-[#D6B56D]/50 bg-[#F7F3EA] px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-[#80602F]">
                            <Package size={10} />
                            <span>Physical Book</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded border border-[#D6B56D]/50 bg-[#F7F3EA] px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-[#80602F]">
                            <FileText size={10} />
                            <span>Digital PDF</span>
                          </span>
                        )}
                        <span className="text-[10px] uppercase tracking-wider text-[#756B7D]">
                          {text.category(category)}
                        </span>
                      </div>

                      {/* Title */}
                      <Link
                        to="/products/$productId"
                        params={{ productId: String(p.id) }}
                        className="mt-1 block font-serif text-lg font-medium leading-tight text-[#30263A] transition-colors hover:text-[#8A6A36] sm:text-xl"
                      >
                        {text.name(p)}
                      </Link>

                      <div className="mt-1 text-[11px] text-[#756B7D]">
                        <span className="tabular-nums">{formatPrice(p.unitPrice)}</span> each ·{' '}
                        {text.language(p.language)} · {p.pages}p
                      </div>
                    </div>

                    {/* Quantity & Item Cost */}
                    <div className="flex flex-col items-end gap-2.5">
                      <div className="font-serif text-xl font-medium text-[#302044] tabular-nums">
                        {formatPrice(p.unitPrice * p.quantity)}
                      </div>

                      {/* Quantity Selector */}
                      <div
                        className="inline-flex items-center rounded-md border border-[#E5D9C5] bg-[#F7F3EA]"
                        aria-label={`Quantity for ${text.name(p)}`}
                      >
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(p.cartKey)}
                          disabled={p.quantity <= 1}
                          aria-label="Decrease quantity"
                          className="p-1.5 text-[#756B7D] transition hover:text-[#302044] disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <Minus size={14} />
                        </button>
                        <span
                          aria-live="polite"
                          className="min-w-8 text-center text-xs font-medium text-[#30263A] tabular-nums"
                        >
                          {p.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(p.cartKey)}
                          disabled={p.quantity >= 99}
                          aria-label="Increase quantity"
                          className="p-1.5 text-[#756B7D] transition hover:text-[#302044] disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(p.cartKey)}
                        className="inline-flex items-center gap-1 text-[11px] text-[#756B7D] transition-colors hover:text-red-600"
                      >
                        <X size={12} /> {t('cart.remove')}
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>

            {/* Order Summary */}
            <aside className="rounded-xl border border-[#E5D9C5] bg-white p-6 shadow-sm lg:sticky lg:top-24">
              <OrderTotals items={cartItems} />

              <div className="my-4 space-y-1.5 rounded-lg border border-[#E5D9C5] bg-[#F7F3EA] p-3 text-[11px] text-[#756B7D]">
                {hasDigital && (
                  <div className="flex items-center gap-1.5 text-[#80602F]">
                    <FileText size={12} />
                    <span>Digital downloads: Delivered to Email &amp; WhatsApp</span>
                  </div>
                )}
                {hasPhysical && (
                  <div className="flex items-center gap-1.5 text-[#80602F]">
                    <Package size={12} />
                    <span>Physical books: Free doorstep courier shipping</span>
                  </div>
                )}
              </div>

              <CheckoutButton
                items={cartItems.map((p) => ({
                  id: p.id,
                  quantity: p.quantity,
                  edition: p.edition,
                }))}
                label={`${t('cart.checkout')} · ${formatPrice(total)}`}
              />

              <p className="mt-4 text-center text-[11px] text-[#756B7D]">
                Safe &amp; Secure Order Processing · AUVYRA
              </p>
            </aside>
          </div>
        )}
      </div>
    </section>
  )
                            }

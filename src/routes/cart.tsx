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
    <section className="min-h-[65vh] bg-[#0B0A10] py-12 md:py-16">
      <div className="wrap">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#49365D] bg-[#21182F] text-[#B99AF5]">
              <ShoppingBag size={20} strokeWidth={1.8} />
            </div>
            <h1 className="font-serif text-[38px] font-normal leading-tight text-[#F7F4FC] md:text-[46px]">
              {t('cart.title')}
            </h1>
          </div>

          <Link
            to="/"
            hash="store"
            className="text-xs font-medium text-[#B99AF5] hover:underline"
          >
            ← Continue shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#49365D] bg-[#21182F] py-16 text-center shadow-lg">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-[#B99AF5]/50" />
            <p className="mb-6 text-sm text-[#B5ADC5]">{t('cart.empty')}</p>
            <Link to="/" hash="store" className="btn btn-fill">
              {t('cart.browse')}
            </Link>
          </div>
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px]">
            {/* Cart Items List */}
            <ul className="divide-y divide-[#49365D] rounded-xl border border-[#49365D] bg-[#21182F] shadow-lg">
              {cartItems.map((p) => {
                const category = categories.find((c) => c.id === p.category) || categories[0]
                const isPhysical = p.edition === 'physical'

                return (
                  <li
                    key={p.cartKey}
                    className="flex items-center gap-4 p-4 transition-colors hover:bg-[#251b36] sm:gap-5 sm:p-5"
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
                          <span className="inline-flex items-center gap-1 rounded bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-amber-300">
                            <Package size={10} />
                            <span>Physical Book</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded bg-[#7851D8]/20 border border-[#7851D8]/40 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-[#B99AF5]">
                            <FileText size={10} />
                            <span>Digital PDF</span>
                          </span>
                        )}
                        <span className="text-[10px] uppercase tracking-wider text-[#B5ADC5]">
                          {text.category(category)}
                        </span>
                      </div>

                      {/* Title */}
                      <Link
                        to="/products/$productId"
                        params={{ productId: String(p.id) }}
                        className="mt-1 block font-serif text-lg font-medium leading-tight text-[#F7F4FC] transition-colors hover:text-[#B99AF5] sm:text-xl"
                      >
                        {text.name(p)}
                      </Link>

                      <div className="mt-1 text-[11px] text-[#B5ADC5]">
                        <span className="tabular-nums">{formatPrice(p.unitPrice)}</span> each ·{' '}
                        {text.language(p.language)} · {p.pages}p
                      </div>
                    </div>

                    {/* Quantity & Item Cost */}
                    <div className="flex flex-col items-end gap-2.5">
                      <div className="font-serif text-xl font-medium text-[#F7F4FC] tabular-nums">
                        {formatPrice(p.unitPrice * p.quantity)}
                      </div>

                      {/* Quantity Selector */}
                      <div
                        className="inline-flex items-center rounded-md border border-[#49365D] bg-[#140E20]"
                        aria-label={`Quantity for ${text.name(p)}`}
                      >
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(p.cartKey)}
                          disabled={p.quantity <= 1}
                          aria-label={`Decrease quantity`}
                          className="p-1.5 text-[#B5ADC5] transition hover:text-[#F7F4FC] disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <Minus size={14} />
                        </button>
                        <span
                          aria-live="polite"
                          className="min-w-8 text-center text-xs font-medium text-[#F7F4FC] tabular-nums"
                        >
                          {p.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(p.cartKey)}
                          disabled={p.quantity >= 99}
                          aria-label={`Increase quantity`}
                          className="p-1.5 text-[#B5ADC5] transition hover:text-[#F7F4FC] disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(p.cartKey)}
                        className="inline-flex items-center gap-1 text-[11px] text-[#B5ADC5] transition-colors hover:text-[#ff7b72]"
                      >
                        <X size={12} /> {t('cart.remove')}
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>

            {/* Order Summary Aside */}
            <aside className="rounded-xl border border-[#49365D] bg-[#21182F] p-6 shadow-xl lg:sticky lg:top-24">
              <OrderTotals items={cartItems} />

              <div className="my-4 space-y-1.5 rounded-lg border border-[#49365D]/60 bg-[#140E20] p-3 text-[11px] text-[#B5ADC5]">
                {hasDigital && (
                  <div className="flex items-center gap-1.5 text-[#B99AF5]">
                    <FileText size={12} />
                    <span>Digital downloads: Delivered to Email &amp; WhatsApp</span>
                  </div>
                )}
                {hasPhysical && (
                  <div className="flex items-center gap-1.5 text-amber-300">
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

              <p className="mt-4 text-center text-[11px] text-[#837996]">
                Safe &amp; Secure Order Processing · AUVYRA
              </p>
            </aside>
          </div>
        )}
      </div>
    </section>
  )
}

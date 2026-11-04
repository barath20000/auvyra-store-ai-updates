import { Link, createFileRoute, notFound, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import {
  ArrowLeft,
  BookOpen,
  Check,
  FileText,
  Heart,
  Package,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from 'lucide-react'
import products, {
  categories,
  formatPrice,
  getProduct,
  getPrice,
  hasDigitalEdition,
  hasPhysicalEdition,
  type BookEdition,
} from '@/data/products'
import { BookCover } from '@/components/BookCover'
import { ProductCard } from '@/components/ProductCard'
import { useCatalogText, useLanguage } from '@/lib/i18n'
import { useStore } from '@/lib/store'
import { getPublicStoreProductsServerFn } from '@/lib/server/adminActions'

export const Route = createFileRoute('/products/$productId')({
  component: ProductPage,
  notFoundComponent: ProductNotFound,
  loader: async ({ params }) => {
    const id = Number(params.productId)
    try {
      const liveProducts = await getPublicStoreProductsServerFn()
      const live = (liveProducts as any[]).find((p) => p.id === id)
      if (live) return live
    } catch {
      // fallback
    }
    const product = getProduct(id)
    if (!product) throw notFound()
    return product
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — AUVYRA Bookstore` },
          { name: 'description', content: loaderData.shortDescription },
        ]
      : [],
  }),
})

function ProductPage() {
  const product = Route.useLoaderData()
  const { t } = useLanguage()
  const text = useCatalogText()
  const navigate = useNavigate()
  const { inCart, addToCart, isSaved, toggleSaved } = useStore()
  const category = categories.find((c) => c.id === product.category) || categories[0]

  // Default edition
  const [selectedEdition, setSelectedEdition] = useState<BookEdition>(
    hasDigitalEdition(product) ? 'digital' : 'physical',
  )

  const activePrice = getPrice(product, selectedEdition)
  const isAdded = inCart(product.id, selectedEdition)
  const saved = isSaved(product.id)
  const hasBoth = hasDigitalEdition(product) && hasPhysicalEdition(product)

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .concat(products.filter((p) => p.category !== product.category && p.featured))
    .slice(0, 3)

  const handleBuyNow = () => {
    addToCart(product.id, selectedEdition)
    navigate({ to: '/checkout' })
  }

  const specs: Array<[string, string]> = [
    [
      t('product.format'),
      selectedEdition === 'physical'
        ? `Printed Book (${product.dimensions || 'Paperback Book'})`
        : `Digital eBook (${text.format(product.format)})`,
    ],
    [t('product.language'), text.language(product.language)],
    [t('product.length'), `${product.pages} ${t('card.pages')}`],
    [
      t('product.delivery'),
      selectedEdition === 'physical'
        ? 'Doorstep Courier Delivery'
        : 'Instant Digital PDF Download',
    ],
  ]

  return (
    <div className="bg-[#0B0A10]">
      {/* Product Main Display Section */}
      <section className="relative overflow-hidden border-b border-[#49365D] bg-[#0B0A10] py-10 md:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_30%,_rgba(120,81,216,0.14),_transparent_75%)]" />

        <div className="wrap relative">
          <Link
            to="/"
            hash="store"
            className="mb-8 inline-flex items-center gap-2 text-[13px] font-medium text-[#B5ADC5] transition-colors hover:text-[#B99AF5]"
          >
            <ArrowLeft size={15} />
            <span>{t('product.back')}</span>
          </Link>

          <div className="grid items-start gap-10 md:grid-cols-[.9fr_1.1fr] md:gap-16">
            {/* Left: Book Cover Stage */}
            <div className="flex flex-col items-center rounded-xl border border-[#49365D] bg-[#140E20] px-8 py-10 shadow-2xl md:py-16">
              <BookCover
                product={product}
                size="lg"
                className="w-full max-w-[290px] -rotate-1 transition-transform duration-300 hover:rotate-0 hover:scale-105"
              />
              <div className="mt-5 flex items-center gap-2 text-xs text-[#B5ADC5]">
                {selectedEdition === 'physical' ? (
                  <span className="flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1 font-medium text-amber-300">
                    <Package size={13} />
                    <span>Physical Printed Edition Selected</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 rounded-full border border-[#7851D8]/40 bg-[#7851D8]/15 px-3 py-1 font-medium text-[#B99AF5]">
                    <FileText size={13} />
                    <span>Digital Download Edition Selected</span>
                  </span>
                )}
              </div>
            </div>

            {/* Right: Book Details & Actions */}
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[#B99AF5]">
                <span className="flex items-center gap-1.5">
                  <BookOpen size={13} className="text-[#B99AF5]" />
                  <span>{text.category(category)}</span>
                </span>
                <span className="text-[#49365D]">•</span>
                <span className="text-[#B5ADC5]">{text.format(product.format)}</span>
                <span className="text-[#49365D]">•</span>
                <span className="text-[#B5ADC5]">{text.productType(product.productType)}</span>
              </div>

              <h1 className="mb-4 mt-3 font-serif text-[38px] font-normal leading-[1.08] text-[#F7F4FC] md:text-[52px]">
                {text.name(product)}
              </h1>

              <p className="mb-6 text-[15px] leading-relaxed text-[#B5ADC5]">
                {text.description(product)}
              </p>

              {/* Format / Edition Selection Box */}
              <div className="mb-6 rounded-xl border border-[#49365D] bg-[#140E20] p-4">
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#B5ADC5]">
                    {t('edition.selectPrompt')}
                  </span>
                  {hasBoth && (
                    <span className="flex items-center gap-1 text-[11px] text-[#B99AF5]">
                      <Sparkles size={11} />
                      <span>{t('edition.bothAvailable')}</span>
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Digital Option */}
                  {hasDigitalEdition(product) && (
                    <button
                      type="button"
                      onClick={() => setSelectedEdition('digital')}
                      className={`flex flex-col rounded-lg border p-3.5 text-left transition-all ${
                        selectedEdition === 'digital'
                          ? 'border-[#7851D8] bg-[#291D3C] shadow-[0_0_16px_rgba(120,81,216,0.3)] ring-1 ring-[#7851D8]'
                          : 'border-[#49365D] bg-[#21182F] hover:border-[#7851D8]/60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-medium text-[#F7F4FC] text-sm">
                          <FileText size={15} className="text-[#B99AF5]" />
                          <span>Digital Edition</span>
                        </span>
                        <span className="font-serif text-lg font-medium text-[#F7F4FC]">
                          {formatPrice(product.digitalPrice ?? product.price)}
                        </span>
                      </div>
                      <span className="mt-1 text-[11px] text-[#B5ADC5]">
                        Instant PDF download • Mobile, tablet &amp; laptop
                      </span>
                    </button>
                  )}

                  {/* Physical Option */}
                  {hasPhysicalEdition(product) && (
                    <button
                      type="button"
                      onClick={() => setSelectedEdition('physical')}
                      className={`flex flex-col rounded-lg border p-3.5 text-left transition-all ${
                        selectedEdition === 'physical'
                          ? 'border-[#7851D8] bg-[#291D3C] shadow-[0_0_16px_rgba(120,81,216,0.3)] ring-1 ring-[#7851D8]'
                          : 'border-[#49365D] bg-[#21182F] hover:border-[#7851D8]/60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-medium text-[#F7F4FC] text-sm">
                          <Package size={15} className="text-amber-400" />
                          <span>Physical Book</span>
                        </span>
                        <span className="font-serif text-lg font-medium text-[#F7F4FC]">
                          {formatPrice(product.physicalPrice!)}
                        </span>
                      </div>
                      <span className="mt-1 text-[11px] text-[#B5ADC5]">
                        Printed book • Courier delivery to your door
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* Price & Delivery Notice */}
              <div className="mb-6 flex flex-wrap items-baseline gap-4">
                <div className="font-serif text-4xl font-medium text-[#F7F4FC] tabular-nums">
                  {formatPrice(activePrice)}
                </div>
                <div className="flex items-center gap-2 text-xs text-[#B5ADC5]">
                  {selectedEdition === 'physical' ? (
                    <span className="flex items-center gap-1 text-amber-300">
                      <Truck size={14} />
                      <span>Physical Delivery Included (Free shipping)</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[#B99AF5]">
                      <FileText size={14} />
                      <span>Instant Digital Download Included</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Purchase / Cart Actions */}
              <div className="mb-3.5 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="btn btn-fill w-full gap-2 !py-3 font-medium shadow-md"
                >
                  <ShoppingBag size={16} />
                  <span>
                    {t('product.buy')} · {formatPrice(activePrice)}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => addToCart(product.id, selectedEdition)}
                  disabled={isAdded}
                  className={`btn h-fit !py-3 ${
                    isAdded
                      ? '!border-[#7851D8]/50 !bg-[#7851D8]/20 !text-[#B99AF5] !cursor-default !opacity-100'
                      : ''
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check size={15} /> {t('card.added')} ({selectedEdition})
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={15} /> {t('card.add')} ({selectedEdition})
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => toggleSaved(product.id)}
                  aria-pressed={saved}
                  aria-label={saved ? t('card.saved') : t('card.save')}
                  className={`btn h-fit !p-3 ${
                    saved
                      ? '!border-[#7851D8] !bg-[#7851D8]/20 !text-[#B99AF5]'
                      : 'border-[#49365D] bg-[#21182F] text-[#B5ADC5] hover:border-[#7851D8]'
                  }`}
                >
                  <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
                  <span className="sm:sr-only">{saved ? t('card.saved') : t('card.save')}</span>
                </button>
              </div>

              <p className="mb-8 flex items-center gap-2 text-[12px] text-[#B5ADC5]">
                <ShieldCheck size={14} className="text-[#B99AF5]" />
                <span>AUVYRA Quality &amp; Satisfaction Guarantee</span>
              </p>

              {/* Specification Grid */}
              <dl className="mb-8 grid grid-cols-2 border-y border-[#49365D]">
                {specs.map(([label, value]) => (
                  <div
                    key={label}
                    className="border-b border-[#49365D] py-3.5 pr-4 last:border-b-0 [&:nth-last-child(2)]:border-b-0"
                  >
                    <dt className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#B99AF5]">
                      {label}
                    </dt>
                    <dd className="mt-1 text-[13px] font-medium text-[#F7F4FC]">{value}</dd>
                  </div>
                ))}
              </dl>

              {/* What's Inside section */}
              <h2 className="mb-3.5 font-serif text-2xl font-medium text-[#F7F4FC]">
                {t('product.includes')}
              </h2>
              <ul className="space-y-2.5 text-[14px] text-[#B5ADC5]">
                {text.includes(product).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 text-xs text-[#B99AF5]">✦</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Books */}
      <section className="border-t border-[#49365D]/40 bg-[#0B0A10] py-16">
        <div className="wrap">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="eyebrow">AUVYRA BOOKSTORE</div>
              <h2 className="mt-1 font-serif text-[30px] font-normal text-[#F7F4FC] md:text-[36px]">
                {t('product.related')}
              </h2>
            </div>
            <Link to="/" hash="store" className="text-xs font-medium text-[#B99AF5] hover:underline">
              View all books
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function ProductNotFound() {
  const { t } = useLanguage()
  return (
    <div className="wrap py-24 text-center">
      <h1 className="mb-4 font-serif text-4xl text-[#F7F4FC]">{t('notFound.title')}</h1>
      <Link to="/" hash="store" className="btn btn-fill">
        {t('product.back')}
      </Link>
    </div>
  )
}

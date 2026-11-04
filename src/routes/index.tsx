import { Link, createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import {
  BookOpen,
  Compass,
  Download,
  FileText,
  Heart,
  MessageCircle,
  Package,
  Search,
  Zap,
} from 'lucide-react'
import products, {
  categories,
  hasDigitalEdition,
  hasPhysicalEdition,
  type CategoryId,
  type Format,
} from '@/data/products'
import { BookCover } from '@/components/BookCover'
import { LogoMark } from '@/components/Logo'
import { ProductCard } from '@/components/ProductCard'
import { useCatalogText, useLanguage } from '@/lib/i18n'
import type { TKey } from '@/lib/i18n'
import { useStore } from '@/lib/store'
import { WHATSAPP_DISPLAY, whatsappLink } from '@/lib/site'
import { getPublicStoreProductsServerFn } from '@/lib/server/adminActions'

export const Route = createFileRoute('/')({
  loader: async () => {
    try {
      const liveProducts = await getPublicStoreProductsServerFn()
      if (Array.isArray(liveProducts) && liveProducts.length > 0) {
        return { products: liveProducts }
      }
    } catch {
      // fallback
    }
    return { products }
  },
  component: Home,
})

function Home() {
  const loaderData = Route.useLoaderData()
  const liveProducts =
    loaderData?.products && loaderData.products.length > 0 ? loaderData.products : products

  return (
    <>
      <Hero productsList={liveProducts as any} />
      <Promises />
      <Store productsList={liveProducts as any} />
      <About />
      <Contact />
    </>
  )
}

function Hero({ productsList }: { productsList: Array<any> }) {
  const { t } = useLanguage()
  const featured = productsList.filter((p) => p.featured)
  const [back, front] = [featured[0], featured[2] ?? featured[1]]

  return (
    <section className="relative overflow-hidden border-b border-[#49365D] bg-[#0B0A10] py-16 md:py-24">
      {/* Subtle purple radial background highlight */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,_rgba(120,81,216,0.22),_transparent_75%)]" />

      {/* Subtle grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #B99AF5 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="wrap relative grid items-center gap-12 md:grid-cols-[1.15fr_.85fr] md:gap-14">
        <div>
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#49365D] bg-[#21182F]/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#B99AF5]">
            <BookOpen size={13} className="text-[#B99AF5]" />
            <span>DIGITAL &amp; PHYSICAL BOOKSTORE</span>
          </div>

          {/* Main Hero Heading */}
          <h1 className="my-5 font-serif text-[clamp(40px,5.8vw,70px)] font-normal leading-[1.05] tracking-tight text-[#F7F4FC]">
            {t('hero.title')}
          </h1>

          {/* Hero Subtitle */}
          <p className="mb-8 max-w-[540px] text-[15px] leading-relaxed text-[#B5ADC5]">
            Discover curated eBooks, digital storybooks, drawing workbooks, and printed physical editions in Tamil and English — with instant downloads and doorstep courier delivery.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3.5">
            <a
              href="#books"
              className="btn btn-fill !px-6 !py-3 text-[14px] font-medium"
            >
              <BookOpen size={16} />
              <span>{t('hero.cta')}</span>
            </a>
            <Link
              to="/"
              hash="about"
              className="btn !px-5 !py-3 text-[14px]"
            >
              <Compass size={16} />
              <span>{t('hero.story')}</span>
            </Link>
          </div>

          {/* Bookstore trust tags */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] tracking-widest text-[#B5ADC5]/80">
            <span className="flex items-center gap-1.5">
              <FileText size={13} className="text-[#B99AF5]" />
              <span>DIGITAL EBOOKS &amp; GUIDES</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Package size={13} className="text-amber-300" />
              <span>PRINTED PHYSICAL BOOKS</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Zap size={13} className="text-[#B99AF5]" />
              <span>BILINGUAL (EN & தமிழ்)</span>
            </span>
          </div>
        </div>

        {/* Hero Book Cover Visual Showcase */}
        <div className="relative mx-auto flex h-[310px] w-full max-w-[380px] items-center justify-center md:h-[380px]">
          <div className="absolute h-[260px] w-[260px] rounded-full border border-[#7851D8]/30 bg-[#21182F]/40 shadow-[0_0_80px_rgba(120,81,216,0.18)] backdrop-blur-[2px] md:h-[310px] md:w-[310px]" />

          {back && (
            <Link
              to="/products/$productId"
              params={{ productId: String(back.id) }}
              className="absolute left-[8%] top-[6%] w-[140px] rotate-[-8deg] opacity-90 transition-transform duration-300 hover:rotate-[-4deg] hover:scale-105 md:w-[170px]"
              aria-label={`Featured: ${back.name}`}
            >
              <BookCover product={back} />
            </Link>
          )}

          {front && (
            <Link
              to="/products/$productId"
              params={{ productId: String(front.id) }}
              className="relative ml-14 mt-6 w-[160px] rotate-[5deg] transition-transform duration-300 hover:rotate-0 hover:scale-105 md:w-[195px]"
              aria-label={`Featured: ${front.name}`}
            >
              <BookCover product={front} />
            </Link>
          )}

          {/* Floating pill badge */}
          <div className="absolute -bottom-2 right-2 flex items-center gap-2 rounded-full border border-[#49365D] bg-[#21182F]/90 px-3 py-1.5 text-[11px] font-medium text-[#F7F4FC] shadow-lg backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#7851D8] animate-pulse" />
            <span>Digital Downloads &amp; Physical Shipping</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Promises() {
  const { t } = useLanguage()
  const items: Array<{ titleKey: TKey; bodyKey: TKey; icon: typeof BookOpen }> = [
    { titleKey: 'promise.1t', bodyKey: 'promise.1b', icon: Download },
    { titleKey: 'promise.2t', bodyKey: 'promise.2b', icon: BookOpen },
    { titleKey: 'promise.3t', bodyKey: 'promise.3b', icon: Zap },
    { titleKey: 'promise.4t', bodyKey: 'promise.4b', icon: MessageCircle },
  ]

  return (
    <section className="border-b border-[#49365D] bg-[#140E20] py-8">
      <div className="wrap grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {items.map(({ titleKey, bodyKey, icon: Icon }) => (
          <div key={titleKey} className="flex items-start gap-3.5">
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-md border border-[#49365D] bg-[#21182F] text-[#B99AF5]">
              <Icon size={16} strokeWidth={1.8} />
            </div>
            <div>
              <div className="font-serif text-lg leading-tight text-[#F7F4FC]">
                {t(titleKey)}
              </div>
              <div className="mt-1 text-[12px] leading-relaxed text-[#B5ADC5]">
                {t(bodyKey)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Store({ productsList }: { productsList: Array<any> }) {
  const { t } = useLanguage()
  const text = useCatalogText()
  const { wishlist } = useStore()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategoryId | 'all'>('all')
  const [format, setFormat] = useState<Format | 'all'>('all')
  const [productTypeFilter, setProductTypeFilter] = useState<'all' | 'digital' | 'physical'>('all')
  const [onlySaved, setOnlySaved] = useState(false)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return productsList.filter((p) => {
      const haystack = [
        p.name,
        p.nameTa,
        p.shortDescription,
        p.shortDescriptionTa,
        p.coverWord,
      ]
        .join(' ')
        .toLowerCase()

      const matchesType =
        productTypeFilter === 'all' ||
        (productTypeFilter === 'digital' && hasDigitalEdition(p)) ||
        (productTypeFilter === 'physical' && hasPhysicalEdition(p))

      return (
        (!q || haystack.includes(q)) &&
        matchesType &&
        (category === 'all' || p.category === category) &&
        (format === 'all' || p.format === format) &&
        (!onlySaved || wishlist.includes(p.id))
      )
    })
  }, [productsList, query, category, format, productTypeFilter, onlySaved, wishlist])

  const reset = () => {
    setQuery('')
    setCategory('all')
    setFormat('all')
    setProductTypeFilter('all')
    setOnlySaved(false)
  }

  const digitalCount = productsList.filter(hasDigitalEdition).length
  const physicalCount = productsList.filter(hasPhysicalEdition).length

  return (
    <section
      id="books"
      className="scroll-mt-24 border-b border-[#49365D]/40 bg-[#0B0A10] py-16 md:py-20"
    >
      <span id="store" className="-mt-24 block h-0" />

      <div className="wrap">
        {/* Section Heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="eyebrow">{t('store.eyebrow')}</div>
            <h2 className="mt-2 font-serif text-[34px] font-normal leading-tight text-[#F7F4FC] md:text-[42px]">
              {t('store.title')}
            </h2>
          </div>
          <p className="max-w-[460px] text-[13px] leading-relaxed text-[#B5ADC5]">
            Browse our complete collection of digital eBooks, drawing workbooks, children’s storybooks, and printed physical editions.
          </p>
        </div>

        {/* Product Type Filter Pills (Digital vs Physical vs All) */}
        <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-[#49365D]/60 pb-5">
          <button
            type="button"
            onClick={() => setProductTypeFilter('all')}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
              productTypeFilter === 'all'
                ? 'border-[#7851D8] bg-[#7851D8] text-[#F7F4FC] shadow-[0_0_12px_rgba(120,81,216,0.3)]'
                : 'border-[#49365D] bg-[#21182F] text-[#B5ADC5] hover:border-[#7851D8]/60 hover:text-[#F7F4FC]'
            }`}
          >
            <BookOpen size={14} />
            <span>All Books ({products.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setProductTypeFilter('digital')}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
              productTypeFilter === 'digital'
                ? 'border-[#7851D8] bg-[#7851D8] text-[#F7F4FC] shadow-[0_0_12px_rgba(120,81,216,0.3)]'
                : 'border-[#49365D] bg-[#21182F] text-[#B5ADC5] hover:border-[#7851D8]/60 hover:text-[#F7F4FC]'
            }`}
          >
            <FileText size={14} className="text-[#B99AF5]" />
            <span>Digital Products ({digitalCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setProductTypeFilter('physical')}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
              productTypeFilter === 'physical'
                ? 'border-[#7851D8] bg-[#7851D8] text-[#F7F4FC] shadow-[0_0_12px_rgba(120,81,216,0.3)]'
                : 'border-[#49365D] bg-[#21182F] text-[#B5ADC5] hover:border-[#7851D8]/60 hover:text-[#F7F4FC]'
            }`}
          >
            <Package size={14} className="text-amber-400" />
            <span>Physical Books ({physicalCount})</span>
          </button>
        </div>

        {/* Category Cards */}
        <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => {
            const active = category === c.id
            const count = products.filter((p) => p.category === c.id).length
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(active ? 'all' : c.id)}
                aria-pressed={active}
                className={`rounded-lg border p-3.5 text-left transition-all ${
                  active
                    ? 'border-[#7851D8] bg-[#291D3C] shadow-[0_0_18px_rgba(120,81,216,0.25)]'
                    : 'border-[#49365D] bg-[#21182F] hover:border-[#7851D8]/70 hover:bg-[#251b36]'
                }`}
              >
                <span className="block font-serif text-[16px] font-medium leading-tight text-[#F7F4FC]">
                  {text.category(c)}
                </span>
                <span className="mt-1 block text-[10px] text-[#B5ADC5] line-clamp-1">
                  {text.categoryBlurb(c)}
                </span>
                <span className="mt-2 inline-block text-[10px] font-mono font-medium tracking-[0.14em] text-[#B99AF5]">
                  {count} {t('store.items')}
                </span>
              </button>
            )
          })}
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-7 flex flex-wrap items-center gap-3">
          <label className="relative min-w-[220px] flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#837996]"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, topic, author or keyword…"
              aria-label={t('store.search')}
              className="field w-full !pl-10"
            />
          </label>

          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as Format | 'all')}
            aria-label={t('product.format')}
            className="field cursor-pointer"
          >
            <option value="all">{t('store.allFormats')}</option>
            <option value="ebook">{text.format('ebook')}</option>
            <option value="template">{text.format('template')}</option>
            <option value="guide">{text.format('guide')}</option>
            <option value="artbook">{text.format('artbook')}</option>
            <option value="storybook">{text.format('storybook')}</option>
            <option value="workbook">{text.format('workbook')}</option>
          </select>

          <button
            type="button"
            onClick={() => setOnlySaved((v) => !v)}
            aria-pressed={onlySaved}
            className={`field flex cursor-pointer items-center gap-2 transition-colors ${
              onlySaved
                ? '!border-[#7851D8] !bg-[#7851D8]/20 !text-[#B99AF5]'
                : 'hover:border-[#7851D8]'
            }`}
          >
            <Heart
              size={15}
              strokeWidth={1.8}
              fill={onlySaved ? 'currentColor' : 'none'}
              className="text-[#B99AF5]"
            />
            <span>
              {t('store.wishlist')} ({wishlist.length})
            </span>
          </button>
        </div>

        {/* Products Grid */}
        {visible.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-[#49365D] bg-[#21182F] py-16 text-center">
            <p className="mb-4 text-sm text-[#B5ADC5]">{t('store.empty')}</p>
            <button type="button" onClick={reset} className="btn">
              {t('store.reset')}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function About() {
  const { t } = useLanguage()
  return (
    <section
      id="about"
      className="scroll-mt-24 border-y border-[#49365D] bg-[#140E20] py-16 md:py-20"
    >
      <div className="wrap grid items-center gap-10 md:grid-cols-[.85fr_1.15fr] md:gap-16">
        <div className="rounded-lg border border-[#49365D] bg-[#21182F] p-8 text-center shadow-lg">
          <LogoMark className="mx-auto mb-4 h-16 w-16 drop-shadow-[0_0_15px_rgba(120,81,216,0.35)]" />
          <strong className="block font-serif text-3xl font-medium tracking-[0.2em] text-[#F7F4FC]">
            AUVYRA
          </strong>
          <span className="mt-1.5 block text-[9px] tracking-[0.26em] text-[#B5ADC5]">
            KNOWLEDGE BEYOND LIMITS
          </span>
          <div className="my-4 mx-auto h-px w-16 bg-[#49365D]" />
          <span className="block font-serif text-lg italic text-[#B99AF5]">
            Barath &amp; Kavi
          </span>
          <span className="mt-1 block text-[11px] text-[#B5ADC5]">
            Founders &amp; Authors
          </span>
        </div>

        <div>
          <div className="eyebrow">{t('about.eyebrow')}</div>
          <h2 className="mb-4 mt-2 font-serif text-[34px] font-normal leading-tight text-[#F7F4FC] md:text-[42px]">
            {t('about.title')}
          </h2>
          <p className="text-[14px] leading-relaxed text-[#B5ADC5]">
            {t('about.body')}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5 text-[12px] text-[#F7F4FC]">
            {(['about.v1', 'about.v2', 'about.v3'] as const).map((k) => (
              <span key={k} className="flex items-center gap-2">
                <span className="text-[#B99AF5]">✦</span>
                <span>{t(k)}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { t } = useLanguage()
  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-[#0B0A10] py-16 text-center md:py-20"
    >
      <div className="wrap">
        <div className="mx-auto max-w-xl rounded-xl border border-[#49365D] bg-[#21182F] p-8 md:p-12">
          <div className="eyebrow">{t('contact.eyebrow')}</div>
          <h2 className="my-3 font-serif text-[32px] font-normal leading-tight text-[#F7F4FC] md:text-[38px]">
            {t('contact.title')}
          </h2>
          <p className="mx-auto mb-7 max-w-md text-[13px] leading-relaxed text-[#B5ADC5]">
            {t('contact.body')}
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener"
            className="btn btn-fill !px-6 !py-3 text-[14px]"
          >
            <MessageCircle size={16} />
            <span>WhatsApp AUVYRA · {WHATSAPP_DISPLAY}</span>
          </a>
        </div>
      </div>
    </section>
  )
}

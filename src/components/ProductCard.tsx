import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  BookOpen,
  Check,
  FileText,
  Heart,
  Package,
  ShoppingBag,
  Sparkles,
} from 'lucide-react'
import { BookCover } from './BookCover'
import {
  categories,
  formatPrice,
  getPrice,
  hasDigitalEdition,
  hasPhysicalEdition,
} from '@/data/products'
import type { BookEdition, Product } from '@/data/products'
import { useCatalogText, useLanguage } from '@/lib/i18n'
import { useStore } from '@/lib/store'

export function ProductCard({ product }: { product: Product }) {
  const { t } = useLanguage()
  const text = useCatalogText()
  const { inCart, addToCart, isSaved, toggleSaved } = useStore()
  const category = categories.find((c) => c.id === product.category) || categories[0]

  // Default edition: prefer digital if available, otherwise physical
  const [selectedEdition, setSelectedEdition] = useState<BookEdition>(
    hasDigitalEdition(product) ? 'digital' : 'physical',
  )

  const activePrice = getPrice(product, selectedEdition)
  const isAdded = inCart(product.id, selectedEdition)
  const saved = isSaved(product.id)

  const hasBoth = hasDigitalEdition(product) && hasPhysicalEdition(product)

  return (
    <article className="group relative flex flex-col rounded-lg border border-[#49365D] bg-[#21182F] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#7851D8] hover:shadow-[0_12px_28px_rgba(120,81,216,0.18)] sm:p-5">
      {/* Product Type Badge at top right */}
      <div className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full border border-[#49365D] bg-[#140E20]/90 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-[#B99AF5] backdrop-blur-md">
        {product.productType === 'both' ? (
          <>
            <Sparkles size={10} className="text-[#B99AF5]" />
            <span>Digital + Print</span>
          </>
        ) : product.productType === 'physical' ? (
          <>
            <Package size={10} className="text-amber-400" />
            <span>Printed Book</span>
          </>
        ) : (
          <>
            <FileText size={10} className="text-[#B99AF5]" />
            <span>Digital eBook</span>
          </>
        )}
      </div>

      {/* Book Cover Showcase Area */}
      <Link
        to="/products/$productId"
        params={{ productId: String(product.id) }}
        className="relative mb-3.5 flex items-center justify-center overflow-hidden rounded-md border border-[#49365D]/70 bg-[#130E20] px-6 py-6 transition-colors group-hover:border-[#7851D8]/60 group-hover:bg-[#181128] sm:py-7"
        aria-label={`View ${text.name(product)}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(120,81,216,0.15),_transparent_70%)]" />

        <BookCover
          product={product}
          className="mx-auto max-w-[155px] -rotate-1 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-[1.03]"
        />
      </Link>

      {/* Category & Format Tag */}
      <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-[#B99AF5]">
        <BookOpen size={11} className="text-[#B99AF5]" />
        <span>{text.category(category)}</span>
        <span className="text-[#49365D]">•</span>
        <span className="text-[#B5ADC5]">{text.format(product.format)}</span>
      </div>

      {/* Book Title */}
      <h3 className="mt-1 font-serif text-[21px] font-medium leading-snug text-[#F7F4FC]">
        <Link
          to="/products/$productId"
          params={{ productId: String(product.id) }}
          className="transition-colors hover:text-[#B99AF5]"
        >
          {text.name(product)}
        </Link>
      </h3>

      {/* Short Description */}
      <p className="mb-3.5 mt-1 line-clamp-2 text-[13px] leading-relaxed text-[#B5ADC5]">
        {text.short(product)}
      </p>

      {/* Format Selector if available in both Digital & Physical */}
      {hasBoth && (
        <div className="mb-3 flex items-center rounded-md border border-[#49365D] bg-[#140E20] p-0.5 text-[11px]">
          <button
            type="button"
            onClick={() => setSelectedEdition('digital')}
            className={`flex-1 rounded py-1 text-center font-medium transition-all ${
              selectedEdition === 'digital'
                ? 'bg-[#7851D8] text-[#F7F4FC] shadow-sm'
                : 'text-[#B5ADC5] hover:text-[#F7F4FC]'
            }`}
          >
            Digital (PDF)
          </button>
          <button
            type="button"
            onClick={() => setSelectedEdition('physical')}
            className={`flex-1 rounded py-1 text-center font-medium transition-all ${
              selectedEdition === 'physical'
                ? 'bg-[#7851D8] text-[#F7F4FC] shadow-sm'
                : 'text-[#B5ADC5] hover:text-[#F7F4FC]'
            }`}
          >
            Printed Book
          </button>
        </div>
      )}

      {/* Price & Action Area */}
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#49365D]/80 pt-3.5">
        <div>
          <div className="font-serif text-2xl font-medium tracking-tight text-[#F7F4FC] tabular-nums">
            {formatPrice(activePrice)}
          </div>
          <div className="text-[11px] text-[#B5ADC5]">
            {selectedEdition === 'physical' ? (
              <span className="text-amber-300/90 font-medium">Physical Print</span>
            ) : (
              <span>Instant Digital PDF</span>
            )}
            {' · '}
            {product.pages}p
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Wishlist Button */}
          <button
            type="button"
            onClick={() => toggleSaved(product.id)}
            aria-pressed={saved}
            aria-label={saved ? t('card.saved') : t('card.save')}
            className={`flex h-10 w-10 items-center justify-center rounded-md border transition-all ${
              saved
                ? 'border-[#7851D8] bg-[#7851D8]/20 text-[#B99AF5] shadow-[0_0_10px_rgba(120,81,216,0.3)]'
                : 'border-[#49365D] bg-[#140E20] text-[#B5ADC5] hover:border-[#7851D8] hover:text-[#B99AF5]'
            }`}
          >
            <Heart
              size={16}
              strokeWidth={1.8}
              fill={saved ? 'currentColor' : 'none'}
            />
          </button>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={() => addToCart(product.id, selectedEdition)}
            disabled={isAdded}
            className={`inline-flex items-center justify-center gap-1.5 rounded-md px-3.5 py-2 text-xs font-medium tracking-wide transition-all ${
              isAdded
                ? 'cursor-default border border-[#7851D8]/50 bg-[#7851D8]/20 text-[#B99AF5]'
                : 'btn-fill'
            }`}
          >
            {isAdded ? (
              <>
                <Check size={14} strokeWidth={2.2} />
                <span>{t('card.added')}</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} strokeWidth={1.8} />
                <span>{t('card.add')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}

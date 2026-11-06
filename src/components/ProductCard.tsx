
   
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

  const [selectedEdition, setSelectedEdition] = useState<BookEdition>(
    hasDigitalEdition(product) ? 'digital' : 'physical',
  )

  const activePrice = getPrice(product, selectedEdition)
  const isAdded = inCart(product.id, selectedEdition)
  const saved = isSaved(product.id)

  const hasBoth = hasDigitalEdition(product) && hasPhysicalEdition(product)

  return (
    <article className="group relative flex flex-col rounded-lg border border-[#E5D9C5] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D6B56D] hover:shadow-[0_12px_28px_rgba(48,38,58,0.10)] sm:p-5">
      {/* Product Type Badge */}
      <div className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full border border-[#E5D9C5] bg-[#F7F3EA]/95 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-[#302044] backdrop-blur-md">
        {product.productType === 'both' ? (
          <>
            <Sparkles size={10} className="text-[#B9954D]" />
            <span>Digital + Print</span>
          </>
        ) : product.productType === 'physical' ? (
          <>
            <Package size={10} className="text-[#B9954D]" />
            <span>Printed Book</span>
          </>
        ) : (
          <>
            <FileText size={10} className="text-[#B9954D]" />
            <span>Digital eBook</span>
          </>
        )}
      </div>

      {/* Book Cover */}
      <Link
        to="/products/$productId"
        params={{ productId: String(product.id) }}
        className="relative mb-3.5 flex items-center justify-center overflow-hidden rounded-md border border-[#E5D9C5] bg-[#F7F3EA] px-6 py-6 transition-colors group-hover:border-[#D6B56D] sm:py-7"
        aria-label={`View ${text.name(product)}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(214,181,109,0.12),_transparent_70%)]" />

        <BookCover
          product={product}
          className="mx-auto max-w-[155px] -rotate-1 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-[1.03]"
        />
      </Link>

      {/* Category & Format */}
      <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-[#756B7D]">
        <BookOpen size={11} className="text-[#B9954D]" />
        <span>{text.category(category)}</span>
        <span className="text-[#D6B56D]">•</span>
        <span className="text-[#756B7D]">{text.format(product.format)}</span>
      </div>

      {/* Book Title */}
      <h3 className="mt-1 font-serif text-[21px] font-medium leading-snug text-[#30263A]">
        <Link
          to="/products/$productId"
          params={{ productId: String(product.id) }}
          className="transition-colors hover:text-[#8A6A36]"
        >
          {text.name(product)}
        </Link>
      </h3>

      {/* Description */}
      <p className="mb-3.5 mt-1 line-clamp-2 text-[13px] leading-relaxed text-[#756B7D]">
        {text.short(product)}
      </p>

      {/* Edition Selector */}
      {hasBoth && (
        <div className="mb-3 flex items-center rounded-md border border-[#E5D9C5] bg-[#F7F3EA] p-0.5 text-[11px]">
          <button
            type="button"
            onClick={() => setSelectedEdition('digital')}
            className={`flex-1 rounded py-1 text-center font-medium transition-all ${
              selectedEdition === 'digital'
                ? 'bg-[#302044] text-[#F7F3EA] shadow-sm'
                : 'text-[#756B7D] hover:text-[#302044]'
            }`}
          >
            Digital (PDF)
          </button>
          <button
            type="button"
            onClick={() => setSelectedEdition('physical')}
            className={`flex-1 rounded py-1 text-center font-medium transition-all ${
              selectedEdition === 'physical'
                ? 'bg-[#302044] text-[#F7F3EA] shadow-sm'
                : 'text-[#756B7D] hover:text-[#302044]'
            }`}
          >
            Printed Book
          </button>
        </div>
      )}

      {/* Price & Actions */}
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#E5D9C5] pt-3.5">
        <div>
          <div className="font-serif text-2xl font-medium tracking-tight text-[#302044] tabular-nums">
            {formatPrice(activePrice)}
          </div>
          <div className="text-[11px] text-[#756B7D]">
            {selectedEdition === 'physical' ? (
              <span className="font-medium text-[#8A6A36]">Physical Print</span>
            ) : (
              <span>Instant Digital PDF</span>
            )}
            {' · '}
            {product.pages}p
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Wishlist */}
          <button
            type="button"
            onClick={() => toggleSaved(product.id)}
            aria-pressed={saved}
            aria-label={saved ? t('card.saved') : t('card.save')}
            className={`flex h-10 w-10 items-center justify-center rounded-md border transition-all ${
              saved
                ? 'border-[#D6B56D] bg-[#F7F3EA] text-[#8A6A36]'
                : 'border-[#E5D9C5] bg-white text-[#756B7D] hover:border-[#D6B56D] hover:text-[#8A6A36]'
            }`}
          >
            <Heart
              size={16}
              strokeWidth={1.8}
              fill={saved ? 'currentColor' : 'none'}
            />
          </button>

          {/* Add to Cart */}
          <button
            type="button"
            onClick={() => addToCart(product.id, selectedEdition)}
            disabled={isAdded}
            className={`inline-flex items-center justify-center gap-1.5 rounded-md px-3.5 py-2 text-xs font-medium tracking-wide transition-all ${
              isAdded
                ? 'cursor-default border border-[#D6B56D] bg-[#F7F3EA] text-[#75602F]'
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

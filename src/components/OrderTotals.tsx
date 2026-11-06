
import { formatPrice } from '@/data/products'
import { useLanguage } from '@/lib/i18n'
import { orderTotals } from '@/lib/pricing'

/** Product subtotal and final total, recalculated from catalog prices and quantities. */
export function OrderTotals({
  items,
  totalClassName = 'font-serif text-3xl font-medium text-[#302044]',
}: {
  items: Array<{ price: number; quantity?: number }>
  totalClassName?: string
}) {
  const { t } = useLanguage()
  const { subtotal, total } = orderTotals(items)

  return (
    <div>
      <dl className="space-y-2 text-sm">
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-[#756B7D]">{t('cart.productSubtotal')}</dt>
          <dd className="tabular-nums font-medium text-[#30263A]">
            {formatPrice(subtotal)}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-[#756B7D]">{t('cart.digitalDelivery')}</dt>
          <dd className="font-medium text-[#8A6A36]">
            {t('cart.included')}
          </dd>
        </div>
      </dl>

      <div className="mt-3.5 flex items-baseline justify-between gap-3 border-t border-[#E5D9C5] pt-3.5">
        <span className="eyebrow text-xs text-[#756B7D]">
          {t('cart.finalTotal')}
        </span>
        <span className={`${totalClassName} tabular-nums`}>
          {formatPrice(total)}
        </span>
      </div>
    </div>
  )
}

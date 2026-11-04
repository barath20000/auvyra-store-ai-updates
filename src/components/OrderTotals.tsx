import { formatPrice } from '@/data/products'
import { useLanguage } from '@/lib/i18n'
import { orderTotals } from '@/lib/pricing'

/** Product subtotal and final total, recalculated from catalog prices and quantities. */
export function OrderTotals({
  items,
  totalClassName = 'font-serif text-3xl font-medium text-[#F7F4FC]',
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
          <dt className="text-[#B5ADC5]">{t('cart.productSubtotal')}</dt>
          <dd className="tabular-nums font-medium text-[#F7F4FC]">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-[#B5ADC5]">{t('cart.digitalDelivery')}</dt>
          <dd className="font-medium text-[#B99AF5]">{t('cart.included')}</dd>
        </div>
      </dl>
      <div className="mt-3.5 flex items-baseline justify-between gap-3 border-t border-[#49365D] pt-3.5">
        <span className="eyebrow text-xs">{t('cart.finalTotal')}</span>
        <span className={`${totalClassName} tabular-nums`}>{formatPrice(total)}</span>
      </div>
    </div>
  )
}

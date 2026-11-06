
import { useNavigate } from '@tanstack/react-router'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import type { BookEdition } from '@/data/products'
import { useStore } from '@/lib/store'

export function CheckoutButton({
  items,
  label,
  className = '',
}: {
  items: Array<{ id: number; quantity: number; edition?: BookEdition }>
  label: string
  className?: string
}) {
  const navigate = useNavigate()
  const { addToCart, inCart } = useStore()

  const handleCheckout = () => {
    for (const item of items) {
      if (!inCart(item.id, item.edition)) {
        addToCart(item.id, item.edition)
      }
    }
    navigate({ to: '/checkout' })
  }

  return (
    <div className={className}>
      <button
        type="button"
        disabled={items.length === 0}
        onClick={handleCheckout}
        className="btn btn-fill w-full gap-2 !py-3 font-medium shadow-md transition-all hover:shadow-[0_4px_16px_rgba(214,181,109,0.35)]"
      >
        <ShoppingBag size={16} />
        <span>{label}</span>
        <ArrowRight size={14} className="opacity-80" />
      </button>
    </div>
  )
}

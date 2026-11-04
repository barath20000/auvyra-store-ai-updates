import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { formatPrice } from '@/data/products'
import type { CartItem } from '@/lib/store'
import { useCatalogText, useLanguage } from '@/lib/i18n'
import type { TKey } from '@/lib/i18n'
import { whatsappLink } from '@/lib/site'
import { orderTotals } from '@/lib/pricing'
import { OrderTotals } from './OrderTotals'

interface Details {
  name: string
  mobile: string
  address: string
  pincode: string
}

type Errors = Partial<Record<keyof Details, TKey>>

const EMPTY: Details = { name: '', mobile: '', address: '', pincode: '' }
const DETAILS_KEY = 'auvyra:customer'

/** Accepts 10-digit Indian mobiles, optionally prefixed with +91, 91 or 0. */
export function normalizeMobile(raw: string) {
  const digits = raw.replace(/[\s\-()]/g, '').replace(/^\+/, '')
  const local = digits.replace(/^(91|0)(?=\d{10}$)/, '')
  return /^[6-9]\d{9}$/.test(local) ? local : null
}

export function validate(d: Details): Errors {
  const errors: Errors = {}
  if (d.name.trim().length < 2) errors.name = 'order.err.name'
  if (!d.mobile.trim()) errors.mobile = 'order.err.required'
  else if (!normalizeMobile(d.mobile)) errors.mobile = 'order.err.mobile'
  if (!d.address.trim()) errors.address = 'order.err.required'
  else if (d.address.trim().length < 10) errors.address = 'order.err.address'
  if (!d.pincode.trim()) errors.pincode = 'order.err.required'
  else if (!/^[1-9]\d{5}$/.test(d.pincode.trim())) errors.pincode = 'order.err.pincode'
  return errors
}

export function buildOrderMessage(d: Details, items: Array<CartItem>) {
  const { subtotal, total } = orderTotals(items)
  const mobile = normalizeMobile(d.mobile) ?? d.mobile.trim()
  return [
    '*New order — AUVYRA*',
    '',
    '*Customer details*',
    `Name: ${d.name.trim()}`,
    `Mobile: +91 ${mobile}`,
    `Address: ${d.address.trim().replace(/,?\s*\n\s*/g, ', ')}`,
    `Pincode: ${d.pincode.trim()}`,
    '',
    '*Order*',
    ...items.map(
      (p, i) => {
        const unit = p.unitPrice ?? p.price
        const edTag = p.edition === 'physical' ? 'Physical' : 'Digital'
        return `${i + 1}. ${p.name} [${edTag}] — Qty ${p.quantity} × ${formatPrice(unit)} = ${formatPrice(unit * p.quantity)}`
      },
    ),
    '',
    `Total items: ${items.reduce((sum, item) => sum + item.quantity, 0)}`,
    `Product subtotal: ${formatPrice(subtotal)}`,
    'Digital delivery: Included',
    `*Final total: ${formatPrice(total)}*`,
  ].join('\n')
}

/** Modal form that collects customer details, then opens a prefilled WhatsApp order. */
export function WhatsAppOrderForm({
  items,
  open,
  onClose,
}: {
  items: Array<CartItem>
  open: boolean
  onClose: () => void
}) {
  const { t } = useLanguage()
  const text = useCatalogText()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [details, setDetails] = useState<Details>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(DETAILS_KEY) ?? 'null')
      if (saved && typeof saved === 'object') setDetails({ ...EMPTY, ...saved })
    } catch {
      // ignore unreadable saved details
    }
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      setSent(false)
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  const update = (field: keyof Details) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value
    setDetails((d) => ({ ...d, [field]: value }))
    if (errors[field]) setErrors((errs) => ({ ...errs, [field]: undefined }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validate(details)
    setErrors(found)
    const firstInvalid = (Object.keys(found) as Array<keyof Details>)[0]
    if (firstInvalid) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }
    window.localStorage.setItem(DETAILS_KEY, JSON.stringify(details))
    const url = whatsappLink(buildOrderMessage(details, items))
    const win = window.open(url, '_blank', 'noopener')
    if (!win) window.location.href = url
    setSent(true)
  }

  const fieldClass = (field: keyof Details) =>
    `field w-full ${errors[field] ? '!border-[#ff7b72]' : ''}`

  const errorText = (field: keyof Details) =>
    errors[field] ? (
      <p id={`order-${field}-error`} role="alert" className="mt-1 text-[11px] text-[#ff7b72]">
        {t(errors[field]!)}
      </p>
    ) : null

  const a11y = (field: keyof Details) => ({
    id: `order-${field}`,
    name: field,
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `order-${field}-error` : undefined,
  })

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      aria-labelledby="order-title"
      className="m-0 mt-auto max-h-[92dvh] w-full max-w-none overflow-y-auto rounded-t-xl border border-[#49365D] bg-[#21182F] p-0 text-[#F7F4FC] backdrop:bg-black/75 backdrop:backdrop-blur-sm sm:m-auto sm:max-h-[90vh] sm:max-w-lg sm:rounded-xl shadow-2xl"
    >
      <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#49365D] bg-[#21182F] px-5 py-4 sm:px-7">
        <div>
          <div className="eyebrow">{t('order.eyebrow')}</div>
          <h2 id="order-title" className="font-serif text-[26px] font-normal leading-tight text-[#F7F4FC]">
            {t('order.title')}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t('order.close')}
          className="-mr-2 rounded-md p-2 text-[#B5ADC5] transition-colors hover:bg-[#140E20] hover:text-[#F7F4FC]"
        >
          <X size={18} />
        </button>
      </div>

      {sent ? (
        <div className="px-5 py-8 text-center sm:px-7">
          <h3 className="mb-2 font-serif text-2xl text-[#F7F4FC]">{t('order.sentTitle')}</h3>
          <p className="mb-6 text-sm text-[#B5ADC5]">{t('order.sentBody')}</p>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <a
              href={whatsappLink(buildOrderMessage(details, items))}
              target="_blank"
              rel="noopener"
              className="btn"
            >
              {t('order.reopen')}
            </a>
            <button type="button" onClick={onClose} className="btn btn-fill">
              {t('order.done')}
            </button>
          </div>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit} className="px-5 pb-6 pt-5 sm:px-7">
          <div className="mb-5 rounded-lg border border-[#49365D] bg-[#140E20] p-4">
            <ul className="space-y-1.5 text-sm">
              {items.map((p) => (
                <li key={p.cartKey || p.id} className="flex items-baseline justify-between gap-3 text-[#F7F4FC]">
                  <span className="min-w-0">
                    {text.name(p)}{' '}
                    <span className="text-[#B5ADC5]">
                      [{p.edition === 'physical' ? 'Physical' : 'Digital'}] × {p.quantity}
                    </span>
                  </span>
                  <span className="flex-none font-medium tabular-nums">
                    {formatPrice((p.unitPrice ?? p.price) * p.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 border-t border-[#49365D] pt-3">
              <OrderTotals items={items} totalClassName="font-serif text-2xl font-medium text-[#F7F4FC]" />
            </div>
          </div>

          <div className="grid gap-4">
            <div>
              <label htmlFor="order-name" className="mb-1.5 block text-[13px]">
                {t('order.name')} <span className="text-gold">*</span>
              </label>
              <input
                {...a11y('name')}
                type="text"
                autoComplete="name"
                required
                maxLength={80}
                value={details.name}
                onChange={update('name')}
                className={fieldClass('name')}
              />
              {errorText('name')}
            </div>

            <div>
              <label htmlFor="order-mobile" className="mb-1.5 block text-[13px]">
                {t('order.mobile')} <span className="text-gold">*</span>
              </label>
              <input
                {...a11y('mobile')}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                maxLength={16}
                placeholder="98765 43210"
                value={details.mobile}
                onChange={update('mobile')}
                className={fieldClass('mobile')}
              />
              {errorText('mobile')}
            </div>

            <div>
              <label htmlFor="order-address" className="mb-1.5 block text-[13px]">
                {t('order.address')} <span className="text-gold">*</span>
              </label>
              <textarea
                {...a11y('address')}
                rows={3}
                autoComplete="street-address"
                required
                maxLength={400}
                placeholder={t('order.addressHint')}
                value={details.address}
                onChange={update('address')}
                className={`${fieldClass('address')} resize-y`}
              />
              {errorText('address')}
            </div>

            <div>
              <label htmlFor="order-pincode" className="mb-1.5 block text-[13px]">
                {t('order.pincode')} <span className="text-gold">*</span>
              </label>
              <input
                {...a11y('pincode')}
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                required
                maxLength={6}
                placeholder="600001"
                value={details.pincode}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, '')
                  update('pincode')(e)
                }}
                className={`${fieldClass('pincode')} sm:max-w-[180px]`}
              />
              {errorText('pincode')}
            </div>
          </div>

          <button type="submit" className="btn btn-fill mt-6 w-full">
            {t('order.submit')}
          </button>
          <p className="mt-3 text-center text-[11px] text-muted">{t('order.note')}</p>
        </form>
      )}
    </dialog>
  )
}

import { Link, createFileRoute } from '@tanstack/react-router'
import { LogoMark } from '@/components/Logo'
import { useLanguage } from '@/lib/i18n'

export const Route = createFileRoute('/checkout/cancel')({
  component: CheckoutCancel,
  head: () => ({ meta: [{ title: 'Checkout cancelled — AUVYRA' }] }),
})

function CheckoutCancel() {
  const { t } = useLanguage()
  return (
    <section className="flex min-h-[75vh] items-center justify-center bg-[#0B0A10] px-5 py-16">
      <div className="max-w-lg rounded-xl border border-[#49365D] bg-[#21182F] p-8 text-center shadow-2xl md:p-12">
        <LogoMark className="mx-auto mb-6 h-16 w-16 opacity-75" />
        <h1 className="mb-3 font-serif text-[34px] font-normal leading-tight text-[#F7F4FC] md:text-[38px]">
          {t('cancel.title')}
        </h1>
        <p className="mb-8 text-[14px] leading-relaxed text-[#B5ADC5]">
          {t('cancel.body')}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/cart" className="btn btn-fill">
            {t('cancel.back')}
          </Link>
          <Link to="/" className="btn">
            {t('common.home')}
          </Link>
        </div>
      </div>
    </section>
  )
}

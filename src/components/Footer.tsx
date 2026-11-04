import { LogoMark } from './Logo'
import { useLanguage } from '@/lib/i18n'
import { WHATSAPP_DISPLAY, whatsappLink } from '@/lib/site'

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="border-t border-[#49365D] bg-[#0B0A10] py-9 text-[12px] text-[#B5ADC5]">
      <div className="wrap flex flex-wrap items-center justify-between gap-5">
        <span className="flex items-center gap-2.5 font-medium tracking-[0.2em] text-[#F7F4FC]">
          <LogoMark className="h-6 w-6" />
          AUVYRA
        </span>

        <div className="flex items-center gap-6">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener"
            className="transition-colors hover:text-[#B99AF5]"
          >
            WhatsApp Support · {WHATSAPP_DISPLAY}
          </a>
        </div>

        <span className="text-[#837996]">
          © {new Date().getFullYear()} AUVYRA. {t('footer.rights')}
        </span>
      </div>
    </footer>
  )
}


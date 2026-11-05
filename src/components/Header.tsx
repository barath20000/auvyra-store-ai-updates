
import { Link } from '@tanstack/react-router'
import { ShoppingBag } from 'lucide-react'
import { Logo } from './Logo'
import { useLanguage } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'
import { useStore } from '@/lib/store'

export function Header() {
  const { t, lang, setLang } = useLanguage()
  const { cartCount } = useStore()

  return (
    <header className="sticky top-0 z-30 border-b border-[#49365D] bg-[#0B0A10]/90 backdrop-blur-md">
      <div className="wrap flex min-h-[64px] items-center justify-between gap-3 md:min-h-[74px] md:gap-4">
        <Link to="/" aria-label="AUVYRA home" className="transition-opacity hover:opacity-90">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 text-[13px] tracking-wide text-[#B5ADC5] md:flex">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div
            role="group"
            aria-label="Language selection"
            className="flex overflow-hidden rounded-md border border-[#49365D] bg-[#21182F] text-xs"
          >
            {(
              [
                ['en', 'EN'],
                ['ta', 'தமிழ்'],
              ] as Array<[Lang, string]>
            ).map(([code, label]) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`px-3 py-1.5 font-medium transition-all ${
                  lang === code
                    ? 'bg-[#7851D8] text-[#F7F4FC] shadow-sm'
                    : 'text-[#B5ADC5] hover:bg-[#2c203f] hover:text-[#F7F4FC]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Cart Link with Badge */}
          <Link
            to="/cart"
            aria-label={`${t('nav.cart')} (${cartCount})`}
            className="relative flex h-[38px] w-[42px] items-center justify-center rounded-md border border-[#49365D] bg-[#21182F]/70 text-[#B99AF5] transition-all hover:border-[#7851D8] hover:bg-[#21182F] hover:text-[#F7F4FC] hover:shadow-[0_0_12px_rgba(120,81,216,0.3)]"
          >
            <ShoppingBag size={18} strokeWidth={1.7} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#7851D8] px-1 text-[10px] font-bold text-[#F7F4FC] shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile navigation bar */}
      <nav className="wrap flex justify-center gap-6 border-t border-[#49365D]/60 py-2.5 text-[13px] text-[#B5ADC5] md:hidden">
        <NavLinks />
      </nav>
    </header>
  )
}

function NavLinks() {
  const { t } = useLanguage()

  return (
    <>
      <Link
        to="/"
        hash="store"
        className="transition-colors hover:text-[#B99AF5]"
      >
        {t('nav.store')}
      </Link>

      <Link
        to="/"
        hash="about"
        className="transition-colors hover:text-[#B99AF5]"
      >
        {t('nav.about')}
      </Link>

      <Link
        to="/"
        hash="contact"
        className="transition-colors hover:text-[#B99AF5]"
      >
        {t('nav.contact')}
      </Link>

      <a
        href="/admin"
        className="font-medium text-[#D6B56D] transition-colors hover:text-[#F7DFA5]"
      >
        Admin Login
      </a>
    </>
  )
}

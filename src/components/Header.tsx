
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
    <header className="sticky top-0 z-30 border-b border-[#B9954D]/40 bg-[#302044]/95 text-[#F7F3EA] backdrop-blur-md">
      <div className="wrap flex min-h-[64px] items-center justify-between gap-3 md:min-h-[74px] md:gap-4">
        <Link to="/" aria-label="AUVYRA home" className="transition-opacity hover:opacity-90">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 text-[13px] tracking-wide text-[#F0EADF] md:flex">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div
            role="group"
            aria-label="Language selection"
            className="flex overflow-hidden rounded-md border border-[#D6B56D]/50 bg-[#241832] text-xs"
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
                    ? 'bg-[#D6B56D] text-[#302044] shadow-sm'
                    : 'text-[#F0EADF] hover:bg-[#49365D] hover:text-white'
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
            className="relative flex h-[38px] w-[42px] items-center justify-center rounded-md border border-[#D6B56D]/60 bg-[#49365D] text-[#F0EADF] transition-all hover:border-[#E8D5A5] hover:bg-[#5A426F] hover:text-white"
          >
            <ShoppingBag size={18} strokeWidth={1.7} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#D6B56D] px-1 text-[10px] font-bold text-[#302044] shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile navigation bar */}
      <nav className="wrap flex justify-center gap-6 border-t border-[#D6B56D]/30 py-2.5 text-[13px] text-[#F0EADF] md:hidden">
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
        className="transition-colors hover:text-[#E8D5A5]"
      >
        {t('nav.store')}
      </Link>

      <Link
        to="/"
        hash="about"
        className="transition-colors hover:text-[#E8D5A5]"
      >
        {t('nav.about')}
      </Link>

      <Link
        to="/"
        hash="contact"
        className="transition-colors hover:text-[#E8D5A5]"
      >
        {t('nav.contact')}
      </Link>

      <a
        href="/admin"
        className="font-medium text-[#E8D5A5] transition-colors hover:text-white"
      >
        Admin Login
      </a>
    </>
  )
}


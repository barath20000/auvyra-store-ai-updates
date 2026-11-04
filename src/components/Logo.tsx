/** The BK open-book mark: Barath (left page) and Kavi (right page). */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="auvyra-logo-glow" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B99AF5" />
          <stop offset="100%" stopColor="#7851D8" />
        </linearGradient>
      </defs>
      <path
        d="M7 15c10-4 18-2 25 5v33C24 46 16 44 7 48V15Z"
        stroke="url(#auvyra-logo-glow)"
        strokeWidth="2.4"
      />
      <path
        d="M57 15c-10-4-18-2-25 5v33c8-7 16-9 25-5V15Z"
        stroke="url(#auvyra-logo-glow)"
        strokeWidth="2.4"
      />
      <path d="M32 20v31" stroke="#7851D8" strokeWidth="1.6" />
      <text x="13" y="37" fontSize="12" fontFamily="Georgia, serif" fill="#B99AF5" fontWeight="bold">
        B
      </text>
      <text x="39" y="37" fontSize="12" fontFamily="Georgia, serif" fill="#B99AF5" fontWeight="bold">
        K
      </text>
    </svg>
  )
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="h-9 w-9 flex-none sm:h-10 sm:w-10 drop-shadow-[0_0_12px_rgba(120,81,216,0.35)]" />
      <span className="leading-none">
        <span className="block font-serif text-[22px] font-medium tracking-[0.18em] text-[#F7F4FC] sm:text-[25px]">
          AUVYRA
        </span>
        <span className="mt-1 hidden text-[8px] tracking-[0.24em] text-[#B5ADC5] sm:block">
          KNOWLEDGE BEYOND LIMITS
        </span>
      </span>
    </span>
  )
}


import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { NotFound } from '@/components/NotFound'
import { LanguageProvider } from '@/lib/i18n'
import { StoreProvider } from '@/lib/store'

import '../styles.css'

const siteName = 'AUVYRA — Knowledge Beyond Limits'
const siteDescription =
  'AUVYRA is a premium digital publishing store by Barath and Kavi — eBooks, templates and practical guides in Tamil and English.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: siteName,
      },
      {
        name: 'description',
        content: siteDescription,
      },
      {
        property: 'og:title',
        content: siteName,
      },
      {
        property: 'og:description',
        content: siteDescription,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary',
      },
      {
        name: 'theme-color',
        content: '#0B0A10',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/auvyra-logo.png',
        type: 'image/png',
      },
      {
        rel: 'icon',
        href: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        rel: 'apple-touch-icon',
        href: '/auvyra-logo.png',
      },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=Noto+Sans+Tamil:wght@400;500;600&family=Noto+Serif+Tamil:wght@400;500;600&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-[#0B0A10] text-[#F7F4FC] antialiased">
        <LanguageProvider>
          <StoreProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </StoreProvider>
        </LanguageProvider>
        <Scripts />
      </body>
    </html>
  )
}

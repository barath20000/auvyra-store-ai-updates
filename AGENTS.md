# AUVYRA store — agent notes

The bilingual (English/Tamil) digital-products store for AUVYRA, built with TanStack Start, React 19, Tailwind v4 and Stripe Checkout, and deployed on Netlify.

## Key files

- `src/data/products.ts`: **the catalog**. It holds categories, products (bilingual fields, format, language, pages, `price` in whole INR) and `formatPrice`. It is the server-side source of truth for checkout prices.
- `src/lib/i18n.tsx`: `LanguageProvider`, `useLanguage().t(key)` with an `[en, ta]` dictionary, and `useCatalogText()` for localized product and category fields. Add every new UI string to the dictionary in both languages.
- `src/lib/store.tsx`: `StoreProvider` / `useStore()`, which keeps the cart and wishlist as arrays of product ids in localStorage. Each digital title is bought once, so there are no quantities.
- `src/lib/stripe.ts`: `getStripeEnabled` and `createCheckoutSession(productIds[])`. The session is in `inr`, and the ids are validated with zod and looked up server-side.
- `src/lib/site.ts`: the WhatsApp contact number and `whatsappLink()`.
- `src/components/`: `Logo` (the BK open-book SVG mark), `Header` (nav, language toggle, cart count), `Footer`, `BookCover` (CSS typographic covers with per-category tints), `ProductCard`, and `CheckoutButton` (Stripe, falling back to WhatsApp ordering when `STRIPE_SECRET_KEY` is missing).
- `src/routes/`: `index.tsx` (hero, promises, store with filters, about, contact), `products/$productId.tsx`, `cart.tsx`, and `checkout/success.tsx` / `checkout/cancel.tsx`.

## Conventions

- Theme tokens live in `@theme` in `src/styles.css` (`ivory`, `cream`, `gold`, `gold-light`, `gold-deep`, `ink`, `muted`, `line`). Shared classes are `.wrap`, `.eyebrow`, `.btn`, `.btn-fill` and `.field`.
- Headings use `font-serif` (Cormorant Garamond with a Noto Serif Tamil fallback). Body text uses Inter with Noto Sans Tamil. Fonts load from Google Fonts in `__root.tsx`.
- Browser APIs (localStorage, `document.lang`) are used only inside effects or handlers. SSR always renders English and the saved language applies after hydration.
- Never trust client prices. Checkout reads them from `products.ts`.

## Known gaps

- There is no payment webhook or automatic file delivery. The success page tells buyers their files are sent to their checkout email, so the team currently fulfils orders by hand from the Stripe dashboard. Session metadata includes `product_ids`.
- Nothing about orders is stored yet. If you add order storage, use Netlify Database.

# AUVYRA — Knowledge Beyond Limits

The online store for **AUVYRA**, a premium digital publishing house founded by Barath and Kavi. AUVYRA sells eBooks, templates and practical guides in Tamil and English across four categories:

- Education & Career
- Money & Business
- Technology & Skills
- Lifestyle & Personal Growth

The site uses a clean white and champagne-gold look with the BK open-book logo, and it works well on phones.

## Features

- **Bilingual interface**: switch between English and தமிழ் from the header. The choice is remembered.
- **Store**: category tiles, search (works in English and Tamil), a format filter (eBook / Template / Guide) and a saved-items wishlist.
- **Product pages**: a large cover, description, specs (format, language, length, delivery), what's inside, Buy now / Add to cart / Save, and related titles.
- **Cart**: holds several titles and checks out in a single Stripe payment in Indian rupees.
- **WhatsApp fallback**: if online payments aren't configured, the buy buttons become "Order on WhatsApp" with the order details already filled in.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19, file-based routing, server functions)
- Tailwind CSS v4
- Stripe Checkout (server-created sessions; prices always come from the server-side catalog)
- Deployed on Netlify

## Running locally

```bash
pnpm install
netlify dev        # or: pnpm dev
```

### Environment variables

| Name | Purpose |
| --- | --- |
| `STRIPE_SECRET_KEY` | Turns on online checkout. Without it, buy buttons fall back to WhatsApp ordering. |
| `SITE_URL` | Optional. The origin used for Stripe's return pages. On Netlify it falls back to the site URL automatically. |

## Editing the catalog

All products, prices (in ₹) and categories are in `src/data/products.ts`, with English and Tamil text for each. All interface text is in the dictionary in `src/lib/i18n.tsx`.

## Next steps

- **Automatic file delivery**: a Stripe webhook that confirms payment and emails a secure download link for each purchased title. For now, files are delivered by the AUVYRA team.
- Real cover artwork. Covers are currently typographic and drawn in CSS.
- Customer reviews and ratings once titles have buyers.
- Customer accounts with an order history and a re-download library.

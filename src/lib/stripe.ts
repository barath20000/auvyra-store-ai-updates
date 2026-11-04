import { z } from 'zod'
import { createServerFn } from '@tanstack/react-start'
import { getRequestUrl } from '@tanstack/react-start/server'
import products from '@/data/products'

export const getStripeEnabled = createServerFn({ method: 'GET' }).handler(
  () => !!process.env.STRIPE_SECRET_KEY
)

function siteOrigin() {
  // SITE_URL overrides; otherwise return buyers to the host they checked out on
  // (production, a deploy preview or local dev).
  return process.env.SITE_URL ?? getRequestUrl().origin
}

export const createCheckoutSession = createServerFn({
  method: 'POST',
})
  .validator(
    z.array(
      z.object({
        id: z.number().int().positive(),
        quantity: z.number().int().min(1).max(99),
      }),
    ).min(1).max(50),
  )
  .handler(async ({ data: cartItems }) => {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Stripe is not configured')
    }

    // Prices are always taken from the server-side catalog, never the client.
    const uniqueItems = [...new Map(cartItems.map((item) => [item.id, item])).values()]
    const items = uniqueItems.map(({ id, quantity }) => {
      const product = products.find((p) => p.id === id)
      if (!product) throw new Error('Product not found')
      return { product, quantity }
    })

    // AUVYRA sells digital downloads, so no physical delivery fee applies.
    const { default: Stripe } = await import('stripe')

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const origin = siteOrigin()

    const session = await stripe.checkout.sessions.create({
      allowed_payment_method_types: ['card'],
      line_items: items.map(({ product, quantity }) => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: `${product.name} — AUVYRA`,
            description: product.shortDescription,
          },
          unit_amount: product.price * 100,
        },
        quantity,
      })),
      mode: 'payment',
      metadata: {
        product_ids: items.map(({ product }) => product.id).join(','),
        quantities: items.map(({ quantity }) => quantity).join(','),
      },
      success_url: `${origin}/checkout/success`,
      cancel_url: `${origin}/checkout/cancel`,
    })

    return session.url
  })

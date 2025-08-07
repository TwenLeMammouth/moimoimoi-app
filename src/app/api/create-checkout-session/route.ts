
import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

export async function POST(req: NextRequest) {
  const { priceId } = await req.json()

  // ✅ Appel REST vers Supabase pour récupérer le type du produit
  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/products?price_id=eq.${priceId}`, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
    },
  })

//   const text = await response.text()
// console.log('[SUPABASE REST]', text)

  const products = await response.json()
  const product = products[0]

  if (!product) {
    console.error('[STRIPE] Produit non trouvé pour price_id:', priceId)
    return NextResponse.json({ error: 'Produit introuvable' }, { status: 400 })
  }

  // ✅ Vérifie l’URL de redirection
  const successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/success`
  const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/cancel`

  console.log('[STRIPE] priceId:', priceId)
  console.log('[STRIPE] product.type:', product.type)
  console.log('[STRIPE] successUrl:', successUrl)
  console.log('[STRIPE] cancelUrl:', cancelUrl)

  if (!successUrl.startsWith('https://') && !successUrl.startsWith('http://')) {
    return NextResponse.json({ error: 'Invalid success_url. Set NEXT_PUBLIC_BASE_URL.' }, { status: 400 })
  }
  

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode: product.type === 'subscription' ? 'subscription' : 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
  })

  return NextResponse.json({ sessionId: session.id })
}

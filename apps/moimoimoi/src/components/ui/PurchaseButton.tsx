'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PurchaseButton({ priceId }: { priceId: string }) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      })

      const data = await res.json()

      if (!data.sessionId) {
        throw new Error('No sessionId returned')
      }

      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe failed to load')

      const result = await stripe.redirectToCheckout({ sessionId: data.sessionId })

      if (result.error) {
        console.error(result.error.message)
      }
    } catch (err) {
      console.error('Checkout error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? 'Redirecting…' : 'Acheter'}
    </button>
  )
}

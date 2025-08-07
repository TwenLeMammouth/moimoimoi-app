// src/app/products/page.tsx

"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-browser'
import PurchaseButton from '@/components/ui/PurchaseButton'

type Product = {
  id: string
  name: string
  description: string | null
  price_id: string
  type: 'one_time' | 'subscription'
}

export default function ProductsPage() {

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'active')

      if (error) {
        console.error('Erreur Supabase:', error.message)
      } else {
        setProducts(data as Product[])
      }

      setLoading(false)
    }

    fetchProducts()
  }, [])

  if (loading) return <p>Chargement...</p>

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Nos tests disponibles</h1>

      {products.length === 0 && <p>Aucun produit disponible pour le moment.</p>}

      {products.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded shadow-md bg-white space-y-2"
        >
          <h2 className="text-xl font-semibold">{product.name}</h2>
          {product.description && <p className="text-gray-700">{product.description}</p>}
          <PurchaseButton priceId={product.price_id} />
        </div>
      ))}
    </div>
  )
}

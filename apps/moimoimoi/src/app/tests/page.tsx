'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Test = {
  test_id: string
  title: string
  description: string
  image_url?: string
  price?: number
  active: boolean
}

export default function TestsPage() {
  const [tests, setTests] = useState<Test[]>([])

  useEffect(() => {
    const fetchTests = async () => {
      const res = await fetch('/api/tests') // À créer côté API route
      const data = await res.json()
      setTests(data)
    }

    fetchTests()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Tests disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tests.map((test) => (
          <div
            key={test.test_id}
            className="border rounded-xl p-4 bg-white shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{test.title}</h2>
            <p className="text-gray-600 mb-4">{test.description}</p>

            <Link href={`/tests/start/${test.test_id}`}>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Faire ce test
              </button>
            </Link>
            
          </div>
        ))}
      </div>
    </div>
  )
}

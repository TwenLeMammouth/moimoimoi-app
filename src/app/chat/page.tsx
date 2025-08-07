'use client'

import { useState } from 'react'
import { useSession } from '@supabase/auth-helpers-react'

export default function ChatPage() {
  const session = useSession()
  console.log('👤 Session côté client:', session)
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!input.trim()) return
    setLoading(true)

    const res = await fetch('/api/agent/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ message: input }),
      credentials: 'include',
    })

    const data = await res.json()
    setResponse(data.response)
    setLoading(false)
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Parle à MMMask</h1>

      {session ? (
        <>
          <textarea
            className="w-full p-3 border rounded mb-4"
            rows={4}
            placeholder="Ce que tu veux dire à MMMask..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Réponse en cours...' : 'Envoyer'}
          </button>
        </>
      ) : (
        <p className="text-red-500 font-semibold">
          Tu dois être connecté pour parler à MMMask.
        </p>
      )}

      {response && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Réponse de MMMask :</h2>
          <p>{response}</p>
        </div>
      )}
    </main>
  )
}

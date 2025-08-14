'use client'

import { useState } from 'react'
// import { supabase } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react'


export default function LoginPage() {
  const supabase = useSupabaseClient()

  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleAuth = async () => {
    setLoading(true)
    setError(null)
    setMessage(null)

    if (isSignup) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError(error.message)
      } else {
        setMessage("Un email de confirmation a été envoyé.")
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
      } else {
        router.push('/')
      }
    }

    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-xl font-bold mb-4">{isSignup ? 'Créer un compte' : 'Connexion'}</h1>
      
      <input
        className="w-full border p-2 mb-2"
        type="email"
        placeholder="Adresse email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <input
        className="w-full border p-2 mb-2"
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {message && <p className="text-green-600 text-sm mb-2">{message}</p>}

      <button
        className="bg-black text-white px-4 py-2 w-full"
        onClick={handleAuth}
        disabled={loading}
      >
        {loading ? 'Traitement...' : isSignup ? 'Créer un compte' : 'Se connecter'}
      </button>

      <p className="text-sm text-center mt-4">
        {isSignup ? "Déjà un compte ?" : "Pas encore de compte ?"}{' '}
        <button onClick={() => setIsSignup(!isSignup)} className="underline">
          {isSignup ? "Se connecter" : "Créer un compte"}
        </button>
      </p>
    </div>
  )
}

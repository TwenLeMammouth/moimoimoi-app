'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../../../../packages/supabase/src/client'
import Logo from './Logo'

export default function Header() {
  const [user, setUser] = useState<any>(null)
  const [displayName, setDisplayName] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user?.id) {
        const { data: profile, error } = await supabase
          .from('user_profile')
          .select('display_name')
          .eq('user_id', user.id)
          .single()

        if (!error && profile?.display_name) {
          setDisplayName(profile.display_name)
        }
      }
    }

    fetchUserAndProfile()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null
      setUser(user)

      if (user?.id) {
        supabase
          .from('user_profile')
          .select('display_name')
          .eq('user_id', user.id)
          .single()
          .then(({ data: profile }) => {
            if (profile?.display_name) setDisplayName(profile.display_name)
          })
      } else {
        setDisplayName(null)
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <header className="w-full px-4 py-2 border-b flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2">
        <Logo size={40} />
        <span className="font-bold text-lg">MoiMoiMoi</span>
      </Link>

      <div className="flex items-center gap-4">
        {displayName && (
          <span className="text-sm font-medium text-gray-800 dark:text-white">
            Salut {displayName} !
          </span>
        )}

        {user ? (
          <button onClick={handleLogout} className="text-sm underline">
            Déconnexion
          </button>
        ) : (
          <Link href="/login" className="text-sm underline">
            Connexion
          </Link>
        )}
      </div>
    </header>
  )
}

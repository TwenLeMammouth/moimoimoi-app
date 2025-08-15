'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../../../packages/supabase/src/client'

export default function ProfileSetup() {
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    display_name: '',
    gender: '',
    age_group: '',
    main_goal: '',
    communication_style: '',
  })
  const router = useRouter()

  useEffect(() => {
    // Vérifie si le profil existe
    const checkProfile = async () => {
      const { data, error } = await supabase
        .from('user_profile')
        .select('*')
        .single()

      if (data && !error) {
        router.push('/chat')
      } else {
        setLoading(false)
      }
    }

    checkProfile()
  }, [router])

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    const { error } = await supabase.from('user_profile').insert([
      {
        ...form,
        user_id: (await supabase.auth.getUser()).data.user?.id,
      },
    ])

    if (!error) {
      router.push('/chat')
    } else {
      alert('Erreur lors de l’enregistrement.')
    }
  }

  if (loading) return <p className="p-4">Chargement…</p>

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">🎭 MMMask te salue !</h1>
      <p>Avant de commencer, j’aimerais mieux te cerner.</p>

      <div>
        <label className="font-semibold">Comment puis-je t’appeler ?</label>
        <input
          className="w-full border p-2 rounded mt-1"
          value={form.display_name}
          onChange={(e) => handleChange('display_name', e.target.value)}
        />
      </div>

      <div>
        <label className="font-semibold">Tu te reconnais plutôt comme…</label>
        <select
          className="w-full border p-2 rounded mt-1"
          value={form.gender}
          onChange={(e) => handleChange('gender', e.target.value)}
        >
          <option value="">-- Choisir --</option>
          <option value="homme">Un homme</option>
          <option value="femme">Une femme</option>
          <option value="non-binaire">Non-binaire</option>
          <option value="autre">Autre</option>
          <option value="non-dit">Je préfère ne pas dire</option>
        </select>
      </div>

      <div>
        <label className="font-semibold">Quel est ton âge (approximatif) ?</label>
        <select
          className="w-full border p-2 rounded mt-1"
          value={form.age_group}
          onChange={(e) => handleChange('age_group', e.target.value)}
        >
          <option value="">-- Choisir --</option>
          <option value="18-25">18–25</option>
          <option value="25-35">25–35</option>
          <option value="35-50">35–50</option>
          <option value="50+">50+</option>
        </select>
      </div>

      <div>
        <label className="font-semibold">Qu’est-ce qui t’amène ici ?</label>
        <input
          className="w-full border p-2 rounded mt-1"
          placeholder="Ex : Mieux me comprendre, me motiver, faire le point…"
          value={form.main_goal}
          onChange={(e) => handleChange('main_goal', e.target.value)}
        />
      </div>

      <div>
        <label className="font-semibold">Quel style de réponse préfères-tu ?</label>
        <select
          className="w-full border p-2 rounded mt-1"
          value={form.communication_style}
          onChange={(e) => handleChange('communication_style', e.target.value)}
        >
          <option value="">-- Choisir --</option>
          <option value="fun">Fun & imagé 🎭</option>
          <option value="profond">Sérieux & profond 🌊</option>
          <option value="visuel">Avec des métaphores visuelles 🌅</option>
          <option value="direct">Franc et direct 🪓</option>
        </select>
      </div>

      <button
        className="bg-purple-600 text-white px-4 py-2 rounded w-full mt-4"
        onClick={handleSubmit}
      >
        Valider et rencontrer MMMask
      </button>
    </main>
  )
}

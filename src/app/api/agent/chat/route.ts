import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources/chat'
import { createServerClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'
import CryptoJS from 'crypto-js'
import { createClient } from '@/lib/supabase/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

// Fonction de chiffrement simple (v1)
function encrypt(text: string): string {
  const secret = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'mmmask_dev_key'
  return CryptoJS.AES.encrypt(text, secret).toString()
}

export async function POST(req: Request) {
  console.log('[MMMASK] > Requête reçue')

  const { message } = await req.json()
  if (!message || typeof message !== 'string') {
    return NextResponse.json({ error: 'Message invalide.' }, { status: 400 })
  }

  console.log('[MMMASK] > Message utilisateur :', message)

  const cookieStore = cookies()
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) console.error('[MMMASK] > Erreur getUser :', userError)
  console.log('[MMMASK] > Utilisateur Supabase :', user)

  if (!user) {
    return NextResponse.json({ error: 'Utilisateur non connecté.' }, { status: 401 })
  }

  const { data: profile, error: profileError } = await supabase
    .from('user_profile')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (profileError) console.error('[MMMASK] > Erreur récupération profil :', profileError)

  const profileContext = profile
    ? `
Tu parles à ${profile.display_name || 'cet utilisateur'}.
Il se reconnaît comme "${profile.gender || 'non précisé'}", a entre ${profile.age_group || 'âge inconnu'} ans.
Il cherche à "${profile.main_goal || 'aucun objectif précisé'}".
Il préfère un style de réponse ${profile.communication_style || 'classique'}.
  `.trim()
    : ''

  const promptMessages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: `
Tu es MMMask, un agent de théâtre numérique.
Tu parles avec humour, un peu d'absurde, mais tu restes toujours bienveillant.
Tu aides l'utilisateur à se comprendre, sans jugement, et tu réponds à des questions personnelles ou introspectives.
Ne donne jamais de conseils médicaux.

Contexte utilisateur :
${profileContext}
      `.trim(),
    },
    {
      role: 'user',
      content: message,
    },
  ]

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: promptMessages,
      temperature: 0.9,
    })

    const response = completion.choices[0].message.content || '[Aucune réponse]'

    await supabase.from('user_memory').insert([
      {
        user_id: user.id,
        key: 'chat',
        value: encrypt(
          JSON.stringify({
            user: message,
            mmmask: response,
            summary: '',
            timestamp: new Date().toISOString(),
          })
        ),
        source: 'MMMask',
      },
    ])

    return NextResponse.json({ response })
  } catch (error: any) {
    console.error('[MMMASK_ERROR]', error)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}

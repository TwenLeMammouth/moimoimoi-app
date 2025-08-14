import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function Page({ params }: { params: { test_id: string } }) {
  const supabase = await createClient()
  const { test_id } = await params

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Vérifier session existante en draft
  const { data: existing } = await supabase
    .from('test_sessions')
    .select('id')
    .eq('user_id', user.id)
    .eq('test_id', test_id)
    .eq('status', 'draft')
    .limit(1)
    .maybeSingle()

  if (existing) {
    redirect(`/tests/session/${existing.id}`)
  }

  // Sinon, créer une nouvelle session
  const { data: session, error } = await supabase
    .from('test_sessions')
    .insert({
      user_id: user.id,
      test_id,
      status: 'draft',
    })
    .select('id')
    .single()

  if (error || !session) {
    console.error('[TestSession Error]', error)
    throw new Error(error?.message ?? 'Erreur création session')
  }

  redirect(`/tests/session/${session.id}`)
}

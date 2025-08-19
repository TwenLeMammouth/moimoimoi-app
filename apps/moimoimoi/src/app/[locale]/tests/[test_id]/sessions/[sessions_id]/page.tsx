import { notFound, redirect } from 'next/navigation'
import { useState, type JSX } from 'react'
import { supabaseServer } from '@/lib/supabase/supabase-server'
import { Card, Badge, Progress } from '@oxymammoth/ui'

export default async function Page({ params }: { params: Promise<{ locale: string; test_id: string; session_id: string }> }): Promise<JSX.Element> {
  const { test_id, session_id } = await params
  const sb = await supabaseServer()

  const { data: { user } } = await sb.auth.getUser()
  if (!user) redirect('/login')

  // 1) Session
  const { data: session } = await sb
    .from('test_sessions')
    .select('id, status, started_at, completed_at, test_id')
    .eq('id', session_id)
    .eq('user_id', user.id)
    .maybeSingle()
  if (!session) notFound()

  // 2) Facettes du test
  const { data: facets } = await sb
    .from('facets')
    .select('id, facet_id, category')
    .eq('test_id', test_id)

  // 3) Questions (id → facet)
  const { data: questions } = await sb
    .from('questions')
    .select('id, facet_id, question_num')
    .eq('test_id', test_id)

  const qFacet = new Map<string, string>()
  for (const q of questions || []) qFacet.set(q.id, q.facet_id || '')

  // 4) Réponses de la session
  const { data: responses } = await sb
    .from('responses')
    .select('question_id, numeric_answer')
    .eq('session_id', session_id)
    .eq('user_id', user.id)

  // Agrégats par facette (moyenne des numeric_answer)
  const acc = new Map<string, { sum: number; n: number }>()
  for (const r of responses || []) {
    const fid = qFacet.get(r.question_id!)
    if (!fid || r.numeric_answer == null) continue
    const cur = acc.get(fid) || { sum: 0, n: 0 }
    acc.set(fid, { sum: cur.sum + r.numeric_answer, n: cur.n + 1 })
  }
  const stats = (facets || []).map(f => {
    const s = acc.get(f.facet_id || '')
    const avg = s && s.n ? Math.round((s.sum / s.n) * 100) / 100 : null
    return { facet_id: f.facet_id || String(f.id), name: f.category || f.facet_id || '—', avg, n: s?.n || 0 }
  })

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Résultats</h1>
        <span className="text-sm opacity-70">Session: {session.id.slice(0,8)}…</span>
      </div>

      <Card className="p-4">
        <div className="grid md:grid-cols-2 gap-4">
          {stats.map(s => (
            <div key={s.facet_id} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{s.name}</span>
                <Badge variant={s.avg == null ? 'warning' : 'info'}>
                  {s.n} réponses
                </Badge>
              </div>
              <Progress value={s.avg ? Math.round((s.avg/6)*100) : 0} max={100} />
              <div className="text-sm opacity-70">Moyenne: {s.avg ?? '—'}</div>
            </div>
          ))}
        </div>
      </Card>

      <RequestAnalysisButton testId={test_id} sessionId={session_id} />
    </main>
  )
}

// Petit bouton client pour lancer l’analyse IA
function RequestAnalysisButton({ testId, sessionId }: { testId: string; sessionId: string }) {
  'use client'
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<null | string>(null)
  return (
    <Card className="p-4 flex items-center justify-between">
      <div>
        <div className="font-medium">Analyse IA par facette</div>
        <div className="text-sm opacity-70">Mise en file d’attente côté serveur</div>
      </div>
      <button
        disabled={loading}
        onClick={async () => {
          setLoading(true)
          try {
            const res = await fetch(`/api/tests/${testId}/sessions/${sessionId}/analysis`, { method: 'POST' })
            const j = await res.json()
            if (!res.ok) throw new Error(j.error || 'Erreur')
            setOk(`Mis en file: ${j.enqueued}`)
          } catch (e: any) {
            setOk(e.message)
          } finally { setLoading(false) }
        }}
        className="px-4 py-2 rounded-2xl bg-brand text-white disabled:opacity-60"
      >{loading ? '…' : 'Lancer'}</button>
      {ok && <div className="text-sm opacity-70">{ok}</div>}
    </Card>
  )
}
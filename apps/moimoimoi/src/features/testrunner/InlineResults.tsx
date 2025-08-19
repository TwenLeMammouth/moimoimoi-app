'use client'
import * as React from 'react'
import { Card } from '@oxymammoth/ui'

type Facet = { facet_id: string; name?: string }
type Stat  = { answered: number; total: number; avg: number|null }

function makeSummary(name: string, avg: number|null) {
  if (avg == null) return `Pas assez de réponses pour ${name}.`
  if (avg >= 4.2) return `${name}: tendance forte et régulière. Capitalise dessus pour rayonner au quotidien.`
  if (avg >= 3.2) return `${name}: plutôt stable. Quelques micro-ajustements feront la différence.`
  if (avg >= 2.4) return `${name}: zone neutre. On peut explorer des routines simples.`
  return `${name}: fragile en ce moment. On propose 1–2 tests complémentaires pour creuser.`
}

export default function InlineResults({
  facets,
  stats
}: { facets: Facet[]; stats: Record<string, Stat> }) {
  const [ready, setReady] = React.useState<Record<string, boolean>>({})
  const [summ, setSumm] = React.useState<Record<string, string>>({})

  React.useEffect(() => {
    // Simulation: on "débloque" chaque facette avec un léger décalage
    facets.forEach((f, i) => {
      const t = setTimeout(() => {
        const s = stats[f.facet_id]
        setSumm(prev => ({ ...prev, [f.facet_id]: makeSummary(f.name || f.facet_id, s?.avg ?? null) }))
        setReady(prev => ({ ...prev, [f.facet_id]: true }))
      }, 700 + i * 900)
      return () => clearTimeout(t)
    })
  }, [facets, stats])

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Résumé du test</h2>
      {facets.map((f) => {
        const s = stats[f.facet_id]
        const pct = s?.total ? Math.round((s.answered / s.total) * 100) : 0
        return (
          <Card key={f.facet_id} className="p-5">
            <div className="flex items-center justify-between">
              <div className="font-medium">{f.name || f.facet_id}</div>
              <div className="text-sm opacity-70">{s?.avg != null ? `moy. ${s.avg}` : '—'}</div>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
              <div className="h-full bg-brand" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-3 text-sm leading-relaxed">
              {ready[f.facet_id] ? (
                <span>{summ[f.facet_id]}</span>
              ) : (
                <span className="opacity-70 italic">Analyse en cours…</span>
              )}
            </div>
          </Card>
        )
      })}

      <div className="pt-2 text-sm opacity-70">
        Ces textes sont <strong>mockés</strong> pour le flux. Demain, on branche la vraie file d’IA.
      </div>
    </div>
  )
}

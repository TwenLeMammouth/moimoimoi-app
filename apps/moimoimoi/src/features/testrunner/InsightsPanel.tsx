'use client'
import * as React from 'react'
import { Card, Progress, Badge } from '@oxymammoth/ui'

export type FacetInfo = { facet_id: string; name: string }
export type FacetStats = { answered: number; total: number; avg: number|null; status: 'queued'|'processing'|'ready'|'error' }

export function InsightsPanel({
  facets,
  stats,
}: { facets: FacetInfo[]; stats: Record<string, FacetStats> }){
  return (
    <Card className="p-4 shadow-soft rounded-2xl bg-white/90">
      <div className="text-sm opacity-70 mb-2">Insights</div>
      <div className="space-y-3">
        {facets.map(f => {
          const s = stats[f.facet_id] || { answered:0, total:0, avg:null, status:'queued' as const }
          const pct = s.total ? Math.round((s.answered / s.total) * 100) : 0
          return (
            <div key={f.facet_id} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="font-medium text-sm">{f.name || f.facet_id}</div>
                <Badge variant={s.status === 'ready' ? 'success' : s.status === 'processing' ? 'info' : s.status === 'error' ? 'warning' : 'default'}>
                  {s.status}
                </Badge>
              </div>
              <Progress value={pct} max={100} />
              <div className="text-xs opacity-70">{s.answered}/{s.total} • moyenne {s.avg ?? '—'}</div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
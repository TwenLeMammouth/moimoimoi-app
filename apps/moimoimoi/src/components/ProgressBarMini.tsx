'use client'

import React from 'react'
import { cn } from '@/lib/utils'

type Question = { id: string; facet_id: string }
type Facet    = { facet_id: string; category?: string; name?: string }
type Answer   = { numeric_answer?: number | null; text_answer?: string | null }

type FacetStatus = 'queued'|'processing'|'ready'|'error'

export function ProgressBarMini({
  questions, facets, currentQuestionId, answers, facetStatus = {}, className, size = 'md', showLegend = false,
}: {
  questions: Question[]
  facets?: Facet[]
  currentQuestionId: string
  answers: Record<string, Answer>
  facetStatus?: Record<string, FacetStatus>
  className?: string
  size?: 'sm'|'md'|'lg'
  showLegend?: boolean
}) {
  const dims = size === 'lg' ? 'w-5 h-5' : size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'

  const facetsList: Facet[] = (facets && facets.length)
    ? facets
    : Array.from(new Set(questions.map(q => q.facet_id))).map(fid => ({ facet_id: fid }))

  const byFacet = facetsList.map(f => {
    const qs = questions.filter(q => q.facet_id === f.facet_id)
    const status: FacetStatus = facetStatus[f.facet_id] ?? 'queued'
    return { facet: f, qs, status }
  })

  const iaDot = (s: FacetStatus) =>
    s === 'ready' ? 'bg-emerald-500' : s === 'processing' ? 'bg-brand' : s === 'queued' ? 'bg-muted' : 'bg-amber-500'

  return (
    <div className={cn(
      'w-full space-y-3 p-3 rounded-xl border border-soft bg-white/90 dark:bg-gray-900/80 shadow-soft',
      className
    )}>
      {byFacet.map(({ facet, qs, status }) => (
        <div key={facet.facet_id} className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-ink/80 dark:text-white/80">
            <span className={cn('inline-block w-2 h-2 rounded-full', iaDot(status))} />
            <span className="capitalize">{facet.name || facet.category || facet.facet_id}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {qs.map((q, i) => {
              const ans = answers[q.id]
              const isAnswered = typeof ans?.numeric_answer === 'number'
              const isEnriched = isAnswered && !!ans?.text_answer?.trim()
              const isActive = currentQuestionId === q.id
              const isLocked = status === 'ready'
              return (
                <div
                  key={q.id}
                  aria-label={`Q${i+1}`}
                  title={`Q${i+1}`}
                  className={cn(
                    'rounded-[4px] border transition-all',
                    dims,
                    'border-black/15 dark:border-white/20',
                    isLocked
                      ? 'bg-gray-400'
                      : isEnriched
                        ? 'bg-indigo-500'
                        : isAnswered
                          ? 'bg-emerald-500'
                          : 'bg-gray-300 dark:bg-gray-700',
                    isActive && 'ring-2 ring-brand ring-offset-1 ring-offset-white dark:ring-offset-gray-900'
                  )}
                />
              )
            })}
          </div>
        </div>
      ))}

      {showLegend && (
        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-muted">
          {[
            ['bg-gray-300 dark:bg-gray-700','Non répondu'],
            ['bg-emerald-500','Répondu'],
            ['bg-indigo-500','Réponse + note'],
            ['bg-gray-400','Facette analysée'],
          ].map(([dot, label]) => (
            <span key={label} className="inline-flex items-center gap-1">
              <span className={cn('inline-block w-3 h-3 rounded-[3px] border border-black/15 dark:border-white/20', dot)} />
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
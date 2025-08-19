'use client'

export async function bootstrapAnalysis(sessionId: string){
  try { await fetch(`/api/analysis/session/${sessionId}/bootstrap`, { method: 'POST' }) } catch {}
}

let facetTimers: Record<string, any> = {}
export function maybeAnalyzeFacet(sessionId: string, facetId: string, answered: number, total: number){
  const ratio = total ? answered/total : 0
  const should = ratio >= 0.5 // palier minimal; l’ultime analyse se fera à 100%
  if (!should) return
  // debounce par facet
  clearTimeout(facetTimers[facetId])
  facetTimers[facetId] = setTimeout(async () => {
    try { await fetch(`/api/analysis/session/${sessionId}/facet/${encodeURIComponent(facetId)}`, { method: 'POST' }) } catch {}
  }, 400)
}
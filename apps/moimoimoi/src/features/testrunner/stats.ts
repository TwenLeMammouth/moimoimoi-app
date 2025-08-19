import type { Question } from './types'

type Answers = Record<string, { numeric_answer?: number|null; text_answer?: string|null }>

export function computeFacetStats(questions: Question[], answers: Answers){
  const tot: Record<string,{sum:number; n:number; total:number}> = {}
  for (const q of questions){
    const f = q.facet_id || '—'
    tot[f] ||= { sum:0, n:0, total:0 }
    tot[f].total++
    const a = answers[q.id]?.numeric_answer
    if (typeof a === 'number'){ tot[f].sum += a; tot[f].n++ }
  }
  const out: Record<string,{answered:number; total:number; avg:number|null}> = {}
  for (const fid of Object.keys(tot)){
    const t = tot[fid]
    out[fid] = { answered: t.n, total: t.total, avg: t.n ? Math.round((t.sum/t.n)*100)/100 : null }
  }
  return out
}

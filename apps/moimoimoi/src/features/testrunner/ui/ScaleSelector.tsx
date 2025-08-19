
'use client'

import * as React from 'react'

export function ScaleSelector({
  value,
  onChange,
  steps = 5
}: { value?: number; onChange: (v:number)=>void; steps?: 5|6 }) {
  return (
    <div className="flex gap-2" role="radiogroup" aria-label="réponses">
      {Array.from({ length: steps }, (_, i) => i + 1).map(v => {
        const active = value === v
        return (
          <button key={v} type="button" role="radio" aria-checked={active}
            onClick={() => onChange(v)}
            className={[
              'h-11 w-11 rounded-xl border transition-all',
              'border-white/15 bg-white/[0.06] hover:bg-white/10',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
              active && 'bg-white text-black'
            ].join(' ')}
          >{v}</button>
        )
      })}
    </div>
  )
}

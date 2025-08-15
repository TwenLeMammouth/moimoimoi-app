
'use client'

import * as React from 'react'
import { cn } from '@oxymammoth/ui'

export function ScaleSelector({ value, onChange, steps=5 }: { value?: number; onChange: (v:number)=>void; steps?: 5|6 }) {
  return (
    <div className="flex gap-2" role="radiogroup" aria-label="réponses">
      {Array.from({ length: steps }, (_, i) => i + 1).map((v) => {
        const active = value === v
        return (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={active}
            className={cn(
              'h-10 w-10 rounded-lg border border-black/10 dark:border-white/10 transition-all',
              'hover:scale-[1.02] active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand',
              active ? 'bg-brand text-white' : 'bg-white/60 dark:bg-white/[0.06]'
            )}
            onClick={() => onChange(v)}
          >{v}</button>
        )
      })}
    </div>
  )
}
'use client'
import * as React from 'react'

export function LongTextInput({
  value, onChange, max=300
}: { value?: string; onChange: (v:string)=>void; max?: number }) {
  return (
    <div className="space-y-1">
      <textarea
        className="w-full min-h-[120px] rounded-xl border border-white/15 bg-white/[0.06] p-3
                   outline-none focus:ring-2 focus:ring-white/60 placeholder:opacity-40"
        placeholder="Ajoute ce que tu veux …"
        value={value || ''}
        maxLength={max}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="text-xs opacity-60 text-right">{(value?.length || 0)}/{max}</div>
    </div>
  )
}
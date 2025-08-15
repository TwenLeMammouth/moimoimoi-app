'use client'
import * as React from 'react'

export function LongTextInput({ value, onChange, max=300 }: { value?: string; onChange: (v:string)=>void; max?: number }) {
  return (
    <div className="space-y-1">
      <textarea
        className="w-full min-h-[96px] rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/[0.06] p-3 outline-none focus:ring-2 focus:ring-brand"
        value={value || ''}
        maxLength={max}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="text-xs opacity-60 text-right">{(value?.length || 0)}/{max}</div>
    </div>
  )
}
import * as React from 'react'
import { cn } from '../lib/cn'

export function Progress({ value, max = 100, className }: { value: number; max?: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className={cn('h-2 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden', className)}>
      <div className="h-full bg-brand" style={{ width: `${pct}%` }} />
    </div>
  )
}
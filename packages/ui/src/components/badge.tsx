import * as React from 'react'
import { cn } from '../lib/cn'

type Variant = 'neutral' | 'success' | 'warning' | 'danger' | 'info'

const styles: Record<Variant, string> = {
  neutral: 'bg-black/5 dark:bg-white/10 text-foreground/80',
  success: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  warning: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
  danger: 'bg-red-500/15 text-red-600 dark:text-red-400',
  info: 'bg-blue-500/15 text-blue-700 dark:text-blue-400'
}

export function Badge({ className, variant='neutral', ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', styles[variant], className)} {...props} />
  )
}
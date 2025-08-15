import * as React from 'react'
import { cn } from '../lib/cn'

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'elevated' | 'outline' | 'ghost'
}

export function Card({ className, variant='elevated', ...props }: CardProps) {
  const base = 'rounded-2xl p-4 md:p-6 transition-shadow'
  const styles = variant === 'elevated'
    ? 'bg-white/80 dark:bg-white/5 shadow-soft backdrop-blur'
    : variant === 'outline'
      ? 'border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.03]'
      : 'bg-transparent'
  return <div className={cn(base, styles, className)} {...props} />
}
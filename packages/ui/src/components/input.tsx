import * as React from 'react'
import { cn } from '../lib/cn'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  help?: string
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, help, error, className, id, ...props }, ref) => {
    const inputId = id || React.useId()
    return (
      <div className="space-y-1">
        {label && <label htmlFor={inputId} className="text-sm font-medium opacity-80">{label}</label>}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-xl border bg-white/90 dark:bg-white/[0.06] px-3 py-2',
            'border-black/10 dark:border-white/10 outline-none focus:ring-2 focus:ring-brand',
            error && 'border-red-400/60 focus:ring-red-400/60',
            className
          )}
          {...props}
        />
        {help && !error && <p className="text-xs opacity-70">{help}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
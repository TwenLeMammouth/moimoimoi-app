'use client'

import React from 'react'
import clsx from 'clsx'
import { cn } from '@/lib/utils'

type TextInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  name?: string
  type?: 'text' | 'email' | 'password'
}

export const TextInput = ({
  value,
  onChange,
  placeholder = '',
  disabled = false,
  className = '',
  name,
  type = 'text',
}: TextInputProps) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      placeholder={placeholder}
      className={clsx(
        'rounded-xl border border-neutral-300 px-4 py-2 text-base shadow-sm',
        'focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/50',
        'transition-all duration-200',
        'bg-white text-black',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    />
  )
}

export function LongTextInput({
  value,
  onChange,
  placeholder,
  maxLength = 300,
  disabled
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  maxLength?: number
  disabled?: boolean
}) {
  return (
    <div className="relative w-full">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "w-full resize-none rounded-xl border border-neutral-300",
          "px-4 py-3 pr-12 text-base shadow-sm",
          "focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/50",
          "min-h-[120px]"
        )}
        rows={5}
      />
      <span className="absolute bottom-2 right-3 text-xs text-neutral-500 opacity-70">
        {value.length} / {maxLength}
      </span>
    </div>
  )
}

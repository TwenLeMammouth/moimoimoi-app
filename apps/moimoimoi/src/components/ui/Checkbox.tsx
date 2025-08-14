'use client'

import React from 'react'
import clsx from 'clsx'

type CheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  name?: string
  disabled?: boolean
  className?: string
}

export const Checkbox = ({
  checked,
  onChange,
  label,
  name,
  disabled = false,
  className = '',
}: CheckboxProps) => {
  return (
    <label className={clsx(
      'flex items-center gap-3 cursor-pointer select-none',
      disabled && 'opacity-50'
    )}>
      <div className="relative w-5 h-5">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="peer sr-only"
        />
        <div className="w-6 h-6 rounded-md border border-neutral-400 peer-checked:bg-[color:var(--color-primary)] peer-checked:border-[color:var(--color-primary)] transition-colors duration-150" />
        <svg
          className="absolute left-0 top-0 w-6 h-6 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-150 text-white"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      {label && <span className="text-[17px]">{label}</span>}
    </label>
  )
}

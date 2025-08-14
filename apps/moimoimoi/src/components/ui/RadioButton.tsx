'use client'

import React from 'react'
import clsx from 'clsx'

type RadioButtonProps = {
  value: string
  current: string
  onChange: (value: string) => void
  label?: string
  name: string
  disabled?: boolean
  className?: string
}

export const RadioButton = ({
  value,
  current,
  onChange,
  label,
  name,
  disabled = false,
  className = '',
}: RadioButtonProps) => {
  return (
    <label
      className={clsx(
        'flex items-center gap-3 cursor-pointer select-none',
        disabled && 'opacity-50'
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={value === current}
        onChange={() => onChange(value)}
        disabled={disabled}
        className="sr-only peer"
      />
      <div
        className={clsx(
          'w-6 h-6 rounded-full border border-neutral-400 flex items-center justify-center transition-colors duration-150',
          value === current && 'border-[color:var(--color-primary)]'
        )}
      >
        <div
          className={clsx(
            'w-3 h-3 rounded-full bg-[color:var(--color-primary)] transition-transform duration-150',
            value === current ? 'scale-100' : 'scale-0'
          )}
        />
      </div>
      {label && <span className="text-[17px]">{label}</span>}
    </label>
  )
}

'use client'

import React from 'react'
import clsx from 'clsx'

export function ScaleSelector({
  value,
  onChange,
  size = 5,
  labels,
}: {
  value: number
  onChange: (val: number) => void
  size?: number
  labels?: { [key: number]: string }
}) {
  const steps = Array.from({ length: size }, (_, i) => i + 1)

  return (
    <div className="flex gap-3 justify-center items-center py-4">
      {steps.map((step) => {
        const selected = value === step

        // Fraction de progression (0 à 1)
        const fraction = (step - 1) / (size - 1)

        // Visuels dynamiques progressifs
        const brightness = 1 + fraction * 0.25 // 1.00 → 1.25
        const saturate = 1 + fraction * 0.5    // 1.00 → 1.50
        const shadowLevel = Math.round(fraction * 3) // 0 → 3
        const shadows = [
          'none',
          '0 1px 2px rgba(0,0,0,0.1)',
          '0 2px 4px rgba(0,0,0,0.15)',
          '0 3px 6px rgba(0,0,0,0.2)',
        ]

        return (
          <button
            key={step}
            onClick={() => onChange(step)}
            className={clsx(
              'w-14 h-14 rounded-full text-md font-semibold flex items-center justify-center',
              'transition-all duration-200',
              selected
                ? 'bg-white text-black ring-2 ring-[color:var(--color-primary)] scale-110'
                : 'text-black bg-[color:var(--color-primary)] hover:scale-105'
            )}
            style={
              !selected
                ? {
                    filter: `brightness(${brightness}) saturate(${saturate})`,
                    boxShadow: shadows[shadowLevel],
                  }
                : undefined
            }
            title={labels?.[step] || ''}
          >
            {step}
          </button>
        )
      })}
    </div>
  )
}

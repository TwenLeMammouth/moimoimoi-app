'use client'

import React from 'react'
import clsx from 'clsx'

type HexButtonProps = {
  label: string
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export const HexButton = ({
  label,
  onClick,
  disabled = false,
  className = '',
}: HexButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'group relative px-8 py-3 text-white font-semibold transition-transform duration-150 ease-in-out',
        'active:scale-95',
        'focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      {/* SVG Hexagone en arrière-plan */}
      <svg
        viewBox="0 0 200 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <polygon
          points="20,0 180,0 200,50 180,100 20,100 0,50"
          className="fill-[color:var(--color-primary)] group-hover:fill-[color:var(--color-primary-dark)] transition-colors duration-200"
        />
      </svg>

      {/* Texte centré par-dessus */}
      <span className="relative z-10">{label}</span>
    </button>
  )
}

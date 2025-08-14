'use client'

import React from 'react'
import clsx from 'clsx'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

export const Button = ({
  children,
  onClick,
  type = 'button',
  size = 'md',
  disabled = false,
  className = '',
}: ButtonProps) => {
  const sizeClasses = {
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-6',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'rounded-full font-semibold shadow-md transition-all duration-200 ease-out',
        'hover:scale-[1.03] active:scale-[0.97]',
        'text-white',
        'bg-[color:var(--color-primary)]',
        disabled && 'opacity-50 cursor-not-allowed',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  )
}

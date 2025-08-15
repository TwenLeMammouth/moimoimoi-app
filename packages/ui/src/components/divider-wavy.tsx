import * as React from 'react'
import { cn } from '../lib/cn'

export type DividerWavyProps = React.SVGAttributes<SVGSVGElement> & {
  gradientFrom?: string
  gradientTo?: string
  flipX?: boolean
  flipY?: boolean
}

export function DividerWavy({ className, gradientFrom='oklch(70% 0.16 166)', gradientTo='oklch(58% 0.16 166)', flipX, flipY, ...props }: DividerWavyProps) {
  const scaleX = flipX ? -1 : 1
  const scaleY = flipY ? -1 : 1
  return (
    <svg viewBox="0 0 1200 120" className={cn('w-full h-16', className)} style={{ transform: `scale(${scaleX}, ${scaleY})` }} {...props}>
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={gradientFrom} />
          <stop offset="100%" stopColor={gradientTo} />
        </linearGradient>
      </defs>
      <path d="M0,60 C150,20 300,100 450,60 C600,20 750,100 900,60 C1050,20 1125,40 1200,60" fill="none" stroke="url(#g)" strokeWidth="6" />
      <path d="M0,80 C150,40 300,120 450,80 C600,40 750,120 900,80 C1050,40 1125,60 1200,80" fill="none" stroke="url(#g)" strokeWidth="6" opacity=".5" />
    </svg>
  )
}
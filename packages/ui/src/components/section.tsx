import * as React from 'react'
import { cn } from '../lib/cn'

export function Section({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn('py-10 md:py-16', className)} {...props}>{children}</section>
  )
}

export function SectionTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn('text-2xl md:text-3xl font-bold mb-3', className)} {...props} />
}

export function SectionLead({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-base md:text-lg opacity-80', className)} {...props} />
}
import * as React from 'react'
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl px-4 py-2 font-medium shadow-soft transition-all focus:outline-none focus-visible:ring-2",
  {
    variants: {
      variant: {
        default: "bg-brand text-white hover:opacity-95 active:scale-[.98]",
        ghost: "bg-transparent hover:bg-black/5 dark:hover:bg-white/5",
        outline: "border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5",
      },
      size: {
        sm: "text-sm h-9",
        md: "text-base h-10",
        lg: "text-lg h-12",
      }
    },
    defaultVariants: { variant: "default", size: "md" }
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
)
Button.displayName = "Button"
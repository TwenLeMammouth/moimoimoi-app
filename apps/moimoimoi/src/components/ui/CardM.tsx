import * as React from "react"
import { cn } from "@/lib/utils"

export function Card({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-[color:var(--color-bg,white)] text-[color:var(--color-text,#111)]",
        "border border-[color:var(--color-primary)] rounded-[2rem] px-6 py-8 shadow-lg",
        "transition-all duration-300 ease-out",
        "flex flex-col gap-6",
        className
      )}
      {...props}
    />
  )
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-lg leading-relaxed", className)}
      {...props}
    />
  )
}

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex justify-end items-center mt-4", className)}
      {...props}
    />
  )
}

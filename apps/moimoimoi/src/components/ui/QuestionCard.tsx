import * as React from "react"
import { cn } from "@/lib/utils"

export function QuestionCard({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full max-w-xl mx-auto", // 💡 centrée, largeur contrôlée
        "overflow-hidden rounded-[2rem] border-8 border-[color:var(--color-primary)] shadow-lg bg-white",
        "transition-all duration-300 ease-out",
        className
      )}
      {...props}
    />
  )
}

export function QuestionCardHeader({
  image,
  children,
  className,
}: {
  image?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center px-6 py-6",
        "bg-[color:var(--color-bg-soft,#f0f0f0)]", // 💡 fallback + custom var
        className
      )}
    >
      {image && (
        <img
          src={image}
          alt=""
          className="w-16 h-16 rounded-2xl object-cover mb-4"
        />
      )}
      <div className="text-lg font-semibold leading-snug text-[color:var(--color-text)]">
        {children}
      </div>
    </div>
  )
}


export function QuestionCardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("px-6 py-6 text-base", className)} {...props} />
  )
}

export function QuestionCardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("px-6 pb-6 pt-2 flex justify-end", className)} {...props} />
  )
}

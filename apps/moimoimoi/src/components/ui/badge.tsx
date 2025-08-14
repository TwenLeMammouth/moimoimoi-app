import * as React from "react";

type BadgeVariant = "default" | "secondary" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

function variantClasses(variant: BadgeVariant = "default") {
  switch (variant) {
    case "secondary":
      return "bg-muted text-foreground/80 border-transparent";
    case "outline":
      return "bg-transparent border border-border text-foreground";
    case "default":
    default:
      return "bg-primary/10 text-primary border border-primary/20";
  }
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={[
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium select-none",
          "whitespace-nowrap align-middle",
          variantClasses(variant),
          className,
        ].join(" ")}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge, variantClasses }
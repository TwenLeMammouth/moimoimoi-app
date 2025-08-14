import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={[
          "flex h-10 w-full rounded-xl",
          "border border-input bg-background",
          "px-3 py-2 text-sm shadow-sm outline-none",
          "placeholder:text-muted-foreground",
          "focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        ].join(" ")}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input }
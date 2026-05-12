import * as React from "react"

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full border border-white/20 bg-black px-4 py-3 text-sm outline-none focus:border-white",
          className || ""
        )}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
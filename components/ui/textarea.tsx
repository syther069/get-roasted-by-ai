import * as React from "react"

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "min-h-[120px] w-full border border-white/20 bg-black px-4 py-3 text-sm outline-none focus:border-white",
          className || ""
        )}
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }
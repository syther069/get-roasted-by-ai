import * as React from "react"
import { cn } from "@/lib/utils"

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-[120px] w-full border border-white/20 bg-black px-4 py-3 text-sm outline-none focus:border-white",
        props.className
      )}
    />
  )
}
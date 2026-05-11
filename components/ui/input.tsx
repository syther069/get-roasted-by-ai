import * as React from "react"
import { cn } from "@/lib/utils"

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full border border-white/20 bg-black px-4 py-3 text-sm outline-none focus:border-white",
        props.className
      )}
    />
  )
}
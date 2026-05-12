import { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface BorderCardProps {
  children: ReactNode
  className?: string
}

export function BorderCard({
  children,
  className = ""
}: BorderCardProps) {

  return (
    <div
      className={cn(
        "border border-white/10 bg-black",
        className
      )}
    >
      {children}
    </div>
  )
}
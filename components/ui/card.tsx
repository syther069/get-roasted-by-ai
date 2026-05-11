import { cn } from "@/lib/utils"

export function Card({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("border border-white/10 bg-black", className)}>
      {children}
    </div>
  )
}
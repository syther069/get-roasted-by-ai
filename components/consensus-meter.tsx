"use client"

import { motion } from "framer-motion"

export function ConsensusMeter({ value }: { value: number }) {
  return (
    <div className="border border-white/10 p-4">
      <div className="mb-3 flex items-center justify-between text-xs uppercase">
        <span>Consensus</span>
        <span>{value}%</span>
      </div>

      <div className="h-3 w-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1 }}
          className="h-full bg-white"
        />
      </div>
    </div>
  )
}
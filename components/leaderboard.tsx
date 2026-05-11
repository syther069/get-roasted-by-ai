"use client"

import { useEffect, useState } from "react"
import { getEntries } from "@/lib/storage"
import { RoastEntry } from "@/lib/types"

export function Leaderboard() {
  const [entries, setEntries] = useState<RoastEntry[]>([])

  useEffect(() => {
    setEntries(getEntries())
  }, [])

  return (
    <section
      id="leaderboard"
      className="border-t border-white/10 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-4xl font-bold">Leaderboard</h2>

        <div className="space-y-4">
          {entries.map((entry, i) => (
            <div
              key={entry.id}
              className="flex flex-col justify-between border border-white/10 p-4 md:flex-row"
            >
              <div>
                <p className="text-sm text-white/50">#{i + 1}</p>
                <p className="mt-2">{entry.input}</p>
              </div>

              <div className="mt-4 flex items-center gap-6 md:mt-0">
                <p>{entry.score}/100</p>
                <p>{entry.verdict}</p>
              </div>
            </div>
          ))}

          {entries.length === 0 && (
            <div className="border border-dashed border-white/20 p-10 text-center text-white/40">
              nobody survived yet.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
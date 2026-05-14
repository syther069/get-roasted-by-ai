"use client";

import { useEffect, useState } from "react";

interface RoastEntry {
  id: number;
  input: string;
  roast: string;
  score: number;
  timestamp: number;
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<RoastEntry[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchLeaderboard() {
    try {
      const res = await fetch("/api/leaderboard", { cache: "no-store" });
      const data = await res.json();
      setEntries(data.entries || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(() => {
      fetchLeaderboard();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="validators" className="w-full border-t border-white/[0.06] py-20 md:py-24">
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/25 mb-2.5 font-medium">
              Live Results
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Leaderboard
            </h2>
          </div>

          <div className="flex items-center gap-2 border border-white/[0.07] rounded-full px-3 py-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[11px] text-white/30 tracking-wide">Live</span>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-[13px] text-white/25">Loading leaderboard...</p>
        )}

        {/* Empty */}
        {!loading && entries.length === 0 && (
          <div className="border border-white/[0.06] rounded-xl px-5 py-8 text-center">
            <p className="text-[13px] text-white/25">No roasts yet. Be the first.</p>
          </div>
        )}

        {/* Entries */}
        <div className="space-y-3">
          {entries.map((entry, index) => (
            <div
              key={entry.id}
              className="group border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.03] rounded-xl p-5 transition-colors duration-150"
            >
              <div className="flex items-start justify-between gap-4">

                {/* Rank + roast */}
                <div className="flex items-start gap-4 min-w-0">
                  <span className="text-[11px] text-white/20 font-medium tabular-nums mt-0.5 w-5 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[14px] text-white/75 leading-relaxed">
                    {entry.roast}
                  </p>
                </div>

                {/* Score */}
                <div className="shrink-0 text-right">
                  <p className="text-[15px] font-semibold text-white tabular-nums">
                    {entry.score}
                  </p>
                  <p className="text-[10px] text-white/20 tracking-wide">/100</p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
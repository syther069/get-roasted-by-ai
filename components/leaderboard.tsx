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

      const res = await fetch(
        "/api/leaderboard",
        {
          cache: "no-store",
        }
      );

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
    <section className="w-full border-t border-white/10 py-24 px-6">

      <div className="max-w-5xl mx-auto">

        <h2 className="text-6xl font-bold mb-12">
          Leaderboard
        </h2>

        {loading && (
          <p className="text-zinc-500">
            Loading leaderboard...
          </p>
        )}

        {!loading && entries.length === 0 && (
          <p className="text-zinc-500">
            No roasts yet.
          </p>
        )}

        <div className="space-y-5">

          {entries.map((entry, index) => (

            <div
              key={entry.id}
              className="border border-white/10 rounded-2xl bg-zinc-900 p-6"
            >

              <div className="flex items-center justify-between mb-4">

                <div className="text-2xl font-bold">
                  #{index + 1}
                </div>

                <div className="text-green-400 font-semibold">
                  {entry.score}/100
                </div>

              </div>

              <p className="text-zinc-200 text-lg leading-relaxed">
                {entry.roast}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}
"use client";

import { useState } from "react";

interface RoastResult {
  name: string;
  roast: string;
  score?: number;
}

export default function RoastForm() {
  const [text, setText] = useState("");
  const [roast, setRoast] = useState<RoastResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);
    setRoast(null);

    try {
      const formData = new FormData();
      formData.append("text", text.trim());

      const res = await fetch("/api/roast", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Roast generation failed");
        return;
      }

      if (data.results?.[0]) {
        setRoast(data.results[0]);
      } else {
        setError("No roast returned");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to reach the server");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  }

  return (
    <section id="arena" className="w-full py-16 md:py-24">
      <div className="w-full max-w-3xl mx-auto">

        {/* Input Card */}
        <div className="border border-white/[0.07] bg-white/[0.02] rounded-2xl p-6 md:p-8 space-y-5">

          {/* Card header */}
          <div className="flex items-center justify-between pb-1">
            <p className="text-[13px] font-medium text-white">Paste content to roast</p>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] text-white/30 tracking-wide">Consensus Active</span>
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste a bio, tweet, LinkedIn post, or any internet behavior..."
            rows={7}
            className="w-full bg-black border border-white/[0.07] rounded-xl px-4 py-3.5 text-[14px] text-white placeholder:text-white/20 resize-none focus:outline-none focus:border-white/20 focus:ring-0 transition-colors duration-150 leading-relaxed"
          />

          {/* Status pills */}
          <div className="flex flex-wrap gap-2">
            <span className="border border-white/[0.07] rounded-full px-3 py-1 text-[11px] text-white/35 font-normal">
              Validator Mesh Online
            </span>
            <span className="border border-purple-500/15 bg-purple-500/[0.06] rounded-full px-3 py-1 text-[11px] text-purple-300/60 font-normal">
              Subjective Evaluation Enabled
            </span>
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={loading || !text.trim()}
            className="w-full rounded-xl bg-white text-black text-[13px] font-semibold py-3 hover:bg-white/90 transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? "Analyzing Consensus..." : "Generate Consensus Roast"}
          </button>

        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 border border-red-500/15 bg-red-500/[0.05] rounded-xl px-4 py-3.5 text-[13px] text-red-400/80">
            {error}
          </div>
        )}

        {/* Result */}
        {roast && (
          <div className="mt-4 border border-white/[0.07] bg-white/[0.02] rounded-2xl p-6 md:p-8 space-y-5">

            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/25 mb-2 font-medium">
                  Consensus Verdict
                </p>
                <h3 className="text-[15px] font-semibold text-white">
                  {roast.name}
                </h3>
              </div>

              {roast.score && (
                <div className="border border-white/[0.07] rounded-lg px-3.5 py-2 text-center">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/25 mb-0.5">Score</p>
                  <p className="text-[15px] font-semibold text-white">{roast.score}%</p>
                </div>
              )}
            </div>

            <div className="border border-white/[0.06] bg-black rounded-xl p-5">
              <p className="text-[14px] text-white/80 leading-relaxed">
                {roast.roast}
              </p>
            </div>

          </div>
        )}

        {/* Footer hint */}
        <p className="mt-5 text-center text-[11px] text-white/20 tracking-wide">
          ⌘ + Enter to submit
        </p>

      </div>
    </section>
  );
}
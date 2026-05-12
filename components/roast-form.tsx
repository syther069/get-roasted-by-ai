"use client";

import { useState } from "react";

interface RoastResult {
  name: string;
  roast: string;
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
        setError(data.error || "Something went wrong.");
        return;
      }

      if (data.results?.[0]) {
        setRoast(data.results[0]);
      }
    } catch {
      setError("Failed to reach the server. Try again.");
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
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Roast AI</h1>
          <p className="text-zinc-400 text-sm">
            Paste a bio, tweet, LinkedIn post, or any text. Get roasted.
          </p>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste your bio, tweet, or any text here..."
          rows={6}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-500 transition"
        />

        <button
          onClick={handleSubmit}
          disabled={loading || !text.trim()}
          className="w-full bg-white text-black font-semibold py-3 rounded-xl text-sm hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          {loading ? "Roasting..." : "Roast Me"}
        </button>

        {error && (
          <div className="bg-red-950 border border-red-700 text-red-300 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {roast && (
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-4 space-y-2">
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium">
              {roast.name}
            </p>
            <p className="text-white text-base leading-relaxed">{roast.roast}</p>
          </div>
        )}

        <p className="text-zinc-600 text-xs text-center">
          ⌘ + Enter to submit
        </p>
      </div>
    </div>
  );
}
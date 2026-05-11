"use client"

import { useState } from "react"

import { ConsensusPanel } from "./consensus-panel"

export function RoastForm() {
  const [input, setInput] = useState("")

  const [image, setImage] = useState<File | null>(null)

  const [loading, setLoading] = useState(false)

  const [roasts, setRoasts] = useState([])

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!input && !image) return

    setLoading(true)

    const formData = new FormData()

    formData.append("input", input)

    if (image) {
      formData.append("image", image)
    }

    try {
      const response = await fetch("/api/roast", {
        method: "POST",

        body: formData
      })

      const data = await response.json()

      setRoasts(data.results)

      setSubmitted(true)

    } catch (error) {

      console.error(error)
    }

    setLoading(false)
  }

  return (
    <section
      id="arena"
      className="border-t border-white/10 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">

        <div className="mb-12">

          <p className="text-xs uppercase tracking-[0.4em] text-white/40">
            Roast Arena
          </p>

          <h2 className="mt-4 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
            Submit your digital footprint.
          </h2>

        </div>

        <div className="space-y-6">

          <textarea
            placeholder="Paste bio, tweet, text or anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[180px] w-full border border-white/10 bg-black p-6 text-lg text-white outline-none placeholder:text-white/20"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
            className="w-full border border-white/10 bg-black p-4 text-sm text-white"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="border border-white bg-white px-8 py-4 text-sm font-bold uppercase tracking-[0.3em] text-black transition hover:bg-black hover:text-white"
          >
            {loading
              ? "AI Validators Judging..."
              : "Start Consensus Roast"}
          </button>

        </div>

        {submitted && (
          <div className="mt-16">
            <ConsensusPanel roasts={roasts} />
          </div>
        )}

      </div>
    </section>
  )
}
"use client"
export function RoastForm() {

  const [input, setInput] = useState("")

  const [loading, setLoading] = useState(false)

  const [roast, setRoast] = useState("")

  async function handleSubmit() {

    if (!input.trim()) return

    setLoading(true)

    setRoast("")

    try {

      const formData = new FormData()

      formData.append("input", input)

      const response = await fetch("/api/roast", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      setRoast(
        data?.results?.[0]?.roast ||
        "No roast generated."
      )

    } catch (error) {

      console.error(error)

      setRoast("Something went wrong.")

    } finally {

      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste bio, tweet, meme text, cringe startup post, crypto flex..."
        className="w-full h-[220px] bg-black border border-white/10 p-6 text-white text-3xl outline-none resize-none"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-white text-black px-10 py-5 text-xl tracking-[0.4em] uppercase w-fit"
      >
        {loading
          ? "VALIDATING..."
          : "START CONSENSUS ROAST"}
      </button>

      {roast && (
        <div className="bg-zinc-100 text-black p-10 mt-10">

          <div className="flex justify-between text-sm tracking-[0.4em] uppercase mb-8">
            <span>Consensus Achieved</span>
            <span>Final Verdict</span>
          </div>

          <h2 className="text-5xl font-bold leading-tight">
            {roast}
          </h2>
        </div>
      )}
    </div>
  )
}
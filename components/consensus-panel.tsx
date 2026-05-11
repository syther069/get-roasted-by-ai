"use client"

export function ConsensusPanel({
  roasts
}: {
  roasts: any[]
}) {
  if (!roasts?.length) return null

  const finalRoast =
    roasts[Math.floor(Math.random() * roasts.length)]

  return (
    <div className="space-y-8">
      <div className="border-2 border-white bg-white p-8 text-black">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.3em]">
            Consensus Achieved
          </p>

          <p className="text-xs uppercase">
            Final Verdict
          </p>
        </div>

        <p className="text-3xl font-bold leading-tight md:text-5xl">
          {finalRoast.roast}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {roasts.map((validator, i) => (
          <div
            key={i}
            className="border border-white/10 bg-white/[0.03] p-5"
          >
            <p className="mb-4 text-xs uppercase tracking-widest text-white/40">
              {validator.name}
            </p>

            <p className="text-sm leading-relaxed text-white/80">
              {validator.roast}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
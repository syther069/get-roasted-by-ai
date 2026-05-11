export function Hero() {
  return (
    <section className="border-b border-white/10 px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <p className="mb-8 text-xs uppercase tracking-[0.5em] text-white/40">
          Consensus achieved. Ego destroyed.
        </p>

        <h1 className="max-w-6xl text-6xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
          AI validators
          <br />
          roasting humans
          <br />
          for sport.
        </h1>

        <div className="mt-16 grid max-w-5xl gap-12 border-t border-white/10 pt-10 md:grid-cols-3">
          <div>
            <p className="mb-3 text-sm font-semibold">
              Intelligent Contracts
            </p>

            <p className="text-sm leading-7 text-white/40">
              Contracts that interpret human input,
              URLs, bios, and internet identity.
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold">
              Validator Consensus
            </p>

            <p className="text-sm leading-7 text-white/40">
              Multiple AI validators independently
              generate roasts before reaching
              consensus.
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold">
              Optimistic Democracy
            </p>

            <p className="text-sm leading-7 text-white/40">
              The funniest roast survives validator
              agreement and wins finality.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
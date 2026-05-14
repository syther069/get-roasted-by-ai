export function Hero() {
  return (
    <section className="border-b border-white/[0.06] py-24 md:py-32">
      <div className="mx-auto max-w-7xl">

        {/* Eyebrow */}
        <p className="mb-10 text-[11px] uppercase tracking-[0.4em] text-white/30 font-medium">
          Subjective AI Consensus Engine Inspired by GenLayer
        </p>

        {/* Headline */}
        <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-white md:text-7xl">
          AI validators
          <br />
          roasting humans
          <br />
          <span className="text-white/40">for sport.</span>
        </h1>

        {/* Feature grid */}
        <div className="mt-16 grid max-w-4xl gap-0 border-t border-white/[0.06] pt-10 md:grid-cols-3">

          <div className="pr-8 md:border-r border-white/[0.06]">
            <p className="mb-2.5 text-[13px] font-medium text-white">
              Intelligent Contracts
            </p>
            <p className="text-[13px] leading-6 text-white/40 font-normal">
              Contracts that interpret human input,
              URLs, bios, and internet identity.
            </p>
          </div>

          <div className="px-8 mt-8 md:mt-0 md:border-r border-white/[0.06]">
            <p className="mb-2.5 text-[13px] font-medium text-white">
              Validator Consensus
            </p>
            <p className="text-[13px] leading-6 text-white/40 font-normal">
              Multiple AI validators independently
              generate roasts before reaching
              consensus.
            </p>
          </div>

          <div className="pl-8 mt-8 md:mt-0">
            <p className="mb-2.5 text-[13px] font-medium text-white">
              Optimistic Democracy
            </p>
            <p className="text-[13px] leading-6 text-white/40 font-normal">
              The funniest roast survives validator
              agreement and wins finality.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
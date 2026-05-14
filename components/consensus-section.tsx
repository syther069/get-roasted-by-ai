export default function ConsensusSection() {
  return (
    <section
      id="consensus"
      className="w-full px-6 py-24 bg-black text-white"
    >
      <div className="max-w-5xl mx-auto">

        <div className="mb-12">
          <p className="text-sm tracking-[0.25em] uppercase text-zinc-500 mb-4">
            Consensus Infrastructure
          </p>

          <h2 className="text-5xl font-bold tracking-tight text-white mb-6">
            Consensus Engine
          </h2>

          <p className="text-zinc-300 text-lg max-w-3xl leading-relaxed">
            AI validators simulate subjective consensus analysis inspired by
            GenLayer architecture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Consensus Meter */}
          <div className="border border-zinc-800 rounded-3xl bg-zinc-950 p-8">

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                Consensus Strength
              </h3>

              <span className="text-white font-bold text-2xl">
                87%
              </span>
            </div>

            <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full w-[87%] bg-white rounded-full" />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">

              <div className="px-4 py-2 rounded-full border border-zinc-800 text-sm text-zinc-300">
                3/4 Validators Aligned
              </div>

              <div className="px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-sm text-purple-300">
                Subjective Evaluation Active
              </div>

            </div>

          </div>

          {/* Validator Logs */}
          <div className="border border-zinc-800 rounded-3xl bg-zinc-950 p-8">

            <h3 className="text-xl font-semibold text-white mb-6">
              Validator Activity
            </h3>

            <div className="space-y-4 text-sm">

              <div className="border border-zinc-800 rounded-2xl px-4 py-3 text-zinc-300 bg-black">
                [Kafka] behavioral pattern confirmed
              </div>

              <div className="border border-zinc-800 rounded-2xl px-4 py-3 text-zinc-300 bg-black">
                [Oracle] confidence threshold exceeded
              </div>

              <div className="border border-zinc-800 rounded-2xl px-4 py-3 text-zinc-300 bg-black">
                [Brutus] minor disagreement detected
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
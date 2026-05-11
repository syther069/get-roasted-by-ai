export function AboutSection() {
  return (
    <section
      id="about"
      className="border-t border-white/10 px-6 py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            GenLayer Style Consensus
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            Multiple AI minds.
            <br />
            One brutal outcome.
          </h2>
        </div>

        <div className="space-y-6 text-white/60">
          <p>
            Validators independently generate non-deterministic roasts.
          </p>

          <p>
            Consensus engine selects the funniest response using simulated
            equivalence scoring.
          </p>

          <p>
            Optimistic democracy. Intelligent contracts. Psychological damage.
          </p>
        </div>
      </div>
    </section>
  )
}
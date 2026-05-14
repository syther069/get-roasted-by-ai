export function AboutSection() {
  return (
    <section
      id="about"
      className="border-t border-white/[0.06] py-20 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-20">

        {/* Left */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/25 font-medium mb-5">
            GenLayer Style Consensus
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white leading-[1.1]">
            Multiple AI minds.
            <br />
            <span className="text-white/40">One brutal outcome.</span>
          </h2>
        </div>

        {/* Right */}
        <div className="space-y-5 border-t border-white/[0.06] pt-8 md:border-t-0 md:pt-0 md:border-l md:border-white/[0.06] md:pl-16">
          <p className="text-[13px] text-white/50 leading-relaxed">
            Validators independently generate non-deterministic roasts.
          </p>
          <p className="text-[13px] text-white/50 leading-relaxed">
            Consensus engine selects the funniest response using simulated
            equivalence scoring.
          </p>
          <p className="text-[13px] text-white/50 leading-relaxed">
            Optimistic democracy. Intelligent contracts. Psychological damage.
          </p>
        </div>

      </div>
    </section>
  );
}
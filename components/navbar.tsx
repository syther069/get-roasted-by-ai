export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-3">

          <img
            src="/genlayer-logo.png"
            alt="GenLayer"
            className="w-8 h-8 object-contain"
          />

          <div className="flex flex-col leading-none">
            <span className="text-white font-semibold text-sm tracking-tight">
              RoastLayer AI
            </span>

            <span className="text-zinc-500 text-[11px]">
              Subjective Consensus
            </span>
          </div>

        </div>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-8">

          <a
            href="#arena"
            className="text-[13px] text-zinc-400 hover:text-white transition-colors"
          >
            Arena
          </a>

          <a
            href="#validators"
            className="text-[13px] text-zinc-400 hover:text-white transition-colors"
          >
            Validators
          </a>

          <a
            href="#consensus"
            className="text-[13px] text-zinc-400 hover:text-white transition-colors"
          >
            Consensus
          </a>

        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">

          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

          <span className="text-[12px] text-zinc-400">
            Validator Mesh Online
          </span>

        </div>

      </div>
    </header>
  );
}
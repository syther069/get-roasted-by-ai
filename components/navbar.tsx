"use client"

import Image from "next/image"

export default function Navbar() {
  return (
    <header className="border-b border-white/10">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">

          {/* LOGO */}
          <div className="flex items-center gap-3">

            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-sm border border-white/10 bg-white">

              <Image
                src="/genlayer-logo.png"
                alt="GenLayer"
                width={28}
                height={28}
                className="object-contain"
                priority
              />

            </div>

            <div className="flex items-center gap-2">

              <p className="text-sm uppercase tracking-[0.35em] text-white">
                GenLayer
              </p>

              <div className="h-1 w-1 rounded-full bg-white/30" />

              <p className="text-sm uppercase tracking-[0.35em] text-white/40">
                Get Roasted
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <nav className="hidden items-center gap-10 md:flex">

          <a
            href="#arena"
            className="text-xs uppercase tracking-[0.3em] text-white/40 transition hover:text-white"
          >
            Arena
          </a>

          <a
            href="#validators"
            className="text-xs uppercase tracking-[0.3em] text-white/40 transition hover:text-white"
          >
            Validators
          </a>

          <a
            href="#consensus"
            className="text-xs uppercase tracking-[0.3em] text-white/40 transition hover:text-white"
          >
            Consensus
          </a>

        </nav>

      </div>

    </header>
  )
}
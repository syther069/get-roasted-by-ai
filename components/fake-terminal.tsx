export function FakeTerminal({ roast }: { roast: string }) {
  return (
    <div className="border border-white/10 bg-black p-5 font-mono">
      <div className="mb-4 flex gap-2">
        <div className="h-3 w-3 rounded-full border border-white" />
        <div className="h-3 w-3 rounded-full border border-white" />
        <div className="h-3 w-3 rounded-full border border-white" />
      </div>

      <div className="space-y-2 text-sm text-white/70">
        <p>{">"} booting validators...</p>
        <p>{">"} applying equivalence principle...</p>
        <p>{">"} roast consensus achieved.</p>

        <p className="pt-4 text-lg text-white">{roast}</p>
      </div>
    </div>
  )
}
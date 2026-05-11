import { Button } from "./ui/button"

export function StakingPanel() {
  return (
    <div className="border border-white/10 p-6">
      <p className="text-xs uppercase tracking-widest text-white/50">
        Fake Staking
      </p>

      <h3 className="mt-3 text-2xl">
        Stake points on whether the next roast destroys harder.
      </h3>

      <div className="mt-6 flex gap-4">
        <Button>Bullish on destruction</Button>
        <Button>Defensive coping</Button>
      </div>
    </div>
  )
}
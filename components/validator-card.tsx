import { Validator, ValidatorId, ValidatorVote, InputType } from "./types";

export const VALIDATORS: Record<ValidatorId, Validator> = {
  "gpt-savage": {
    id: "gpt-savage",
    name: "GPT Savage",
    emoji: "🤖",
    personality: "Corporate menace",
    bio: "Fine-tuned on 847TB of internet cruelty. Technically neutral. Emotionally devastating.",
    specialty: "Professional humiliation",
  },
  "sarcasm-9000": {
    id: "sarcasm-9000",
    name: "Sarcasm-9000",
    emoji: "😐",
    personality: "Dead inside, alive for carnage",
    bio: "Trained exclusively on passive-aggressive Reddit comments and LinkedIn posts.",
    specialty: "Weaponized understatement",
  },
  "github-goblin": {
    id: "github-goblin",
    name: "GitHub Goblin",
    emoji: "👺",
    personality: "Code archaeologist",
    bio: "Has read every commit message you've ever written at 3am. All of them.",
    specialty: "Technical humiliation",
  },
  "twitter-demon": {
    id: "twitter-demon",
    name: "Twitter Demon",
    emoji: "🐦",
    personality: "Chronically online",
    bio: "Knows your ratio history. Remembers that tweet you deleted in 2019.",
    specialty: "Social autopsy",
  },
  "brutal-judge": {
    id: "brutal-judge",
    name: "Brutal Judge",
    emoji: "⚖️",
    personality: "Legally accurate, emotionally illegal",
    bio: "Operating under 'if it's true it's not slander' clause. Bar passed. Mercy failed.",
    specialty: "Irrefutable verdicts",
  },
  "meme-prosecutor": {
    id: "meme-prosecutor",
    name: "Meme Prosecutor",
    emoji: "📋",
    personality: "Cultural forensics",
    bio: "Files charges in the court of internet opinion. Conviction rate: 97.3%.",
    specialty: "Viral indictments",
  },
};

const TEXT_ROASTS = [
  "You wrote this yourself. That explains everything. The kind of self-expression that makes therapists unionize.",
  "This text is carrying more unresolved childhood trauma than a Tumblr post from 2011. Impressive density.",
  "You clearly have a lot to say and absolutely nothing to offer. Quantity: achieved. Quality: pending review.",
  "Reading this is like watching someone drown in a kiddie pool and insist they're surfing.",
  "You've somehow made 'trying too hard' and 'not trying at all' coexist in the same paragraph.",
  "This reads like ChatGPT had a breakdown mid-sentence and you decided to keep it.",
  "Strong energy of a LinkedIn post that got 2 likes—one from your mom, one from a bot.",
  "There's a universe where this is impressive. This is not that universe.",
  "You're giving main character energy in a show nobody is watching.",
  "This text is the literary equivalent of a participation trophy. Warm, meaningless, forgotten.",
];

const TWITTER_ROASTS = [
  "Your bio says 'building in public.' Your timeline says 'failing in public.' Respect the honesty.",
  "You've been on this platform since 2009. The algorithm has trauma-bonded with you.",
  "Your engagement rate is so low, your own notifications are muting you.",
  "You tweet 40 times a day and none of it is actionable. That's a gift, actually.",
  "Following 4,000. Followers: 312. The math is not mathing and the algorithm is embarrassed for you.",
  "You changed your bio 11 times this year. The constant reinvention is a cry for help.",
  "Your hot takes are warm at best. Room-temperature, if we're being generous.",
  "You RT'd a 'be kind' thread and replied 'thoughts?' That's your whole personality.",
  "You're the person who adds 'I don't usually share stuff like this but...' before sharing everything.",
  "Your pinned tweet has 3 likes and was posted in 2021. It's your Sistine Chapel.",
];

const GITHUB_ROASTS = [
  "Your commit history reads like a hostage negotiation with your own code.",
  "237 repos, 0 stars from strangers. You're a creator. Of problems, mostly.",
  "Your README says 'work in progress' but the last commit was 3 years ago. That's a will, not a README.",
  "You pushed to main 47 times last Tuesday. The tests don't know what they did to deserve you.",
  "Your variable names are the most creative fiction you've ever written.",
  "You have a 'my first portfolio' repo from 2018 still pinned. Character. Devastating character.",
  "'Fixed bug' appears 89 times in your git log. You are the bug.",
  "Your contribution graph looks like the EKG of someone who gave up but kept breathing.",
  "You forked 160 repos and contributed to zero. Curatorial talent. Nothing else.",
  "Your most popular project has 2 stars, both from sock puppet accounts. Allegedly.",
];

const REASONINGS = [
  "The consensus emerges from the emotional wreckage left in every validator's inference pass.",
  "All 6 nodes agreed this is the most efficient path to existential crisis.",
  "Weighted by cruelty coefficient and verified by the equivalence principle.",
  "Non-deterministic execution converged on maximum damage. Democracy works.",
  "The intelligent contract executed. The ego did not survive.",
  "Validator agreement reached 94%+ before moral override was disabled.",
  "Optimistic consensus: we assume the worst and we're always right.",
  "Three validators wanted to be nicer. They were outvoted. Correctly.",
];

function getRoastPool(inputType: InputType): string[] {
  if (inputType === "twitter") return TWITTER_ROASTS;
  if (inputType === "github") return GITHUB_ROASTS;
  return TEXT_ROASTS;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateValidatorVotes(
  input: string,
  inputType: InputType
): ValidatorVote[] {
  const pool = getRoastPool(inputType);
  const shuffledRoasts = shuffle(pool);
  const validatorIds = Object.keys(VALIDATORS) as ValidatorId[];
  const shuffledValidators = shuffle(validatorIds);

  return shuffledValidators.map((validatorId, i) => {
    const roast = shuffledRoasts[i % shuffledRoasts.length];
    const score = randomBetween(55, 99);
    const confidence = randomBetween(70, 100);
    const reasoning = REASONINGS[i % REASONINGS.length];

    return {
      validatorId,
      roast,
      score,
      confidence,
      reasoning,
      timestamp: Date.now() + i * 200,
    };
  });
}

export function selectWinningRoast(votes: ValidatorVote[]): {
  winner: ValidatorVote;
  consensusPercent: number;
} {
  const sorted = [...votes].sort((a, b) => b.score - a.score);
  const winner = sorted[0];
  const avgScore = votes.reduce((sum, v) => sum + v.score, 0) / votes.length;
  const consensusPercent = Math.min(
    Math.round((winner.score / 100) * 0.6 * 100 + (avgScore / 100) * 0.4 * 100),
    100
  );

  return { winner, consensusPercent };
}

export function calculateVerdict(score: number): "survived" | "destroyed" {
  return score >= 80 ? "destroyed" : "survived";
}
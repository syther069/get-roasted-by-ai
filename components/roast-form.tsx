import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const ROAST_STYLES = [
  "reply guy energy — dry, deadpan, one-liner",
  "quote tweet savage — brief, cuts deep, no mercy",
  "group chat chaos — chaotic, internet-brained, unhinged but accurate",
  "silent observer mode — clinical, detached, makes it worse",
  "main character syndrome detector — exposes the delusion gently then not gently",
  "chronically online linguist — speaks fluent internet, dissects the vibe",
  "concerned friend mode — starts caring, ends devastating",
];

const TONE_MODIFIERS = [
  "be extremely dry and clinical",
  "be chaotically unhinged but accurate",
  "be quietly devastating",
  "be sarcastically supportive",
  "be forensically observational",
  "channel someone who has seen too much of the internet",
  "be the voice of every comment section",
];

const AVOID_PATTERNS = [
  '"bro" more than once',
  '"this post" as a sentence starter',
  '"radiates" or "energy" as the main descriptor',
  '"founder" unless absolutely necessary',
  "starting multiple sentences the same way",
  'generic filler like "you look cringe" or "this is cringe"',
  "name/profession extraction templates",
  "summarizing what the content says",
];

const INTERNET_ARCHETYPES = [
  "LinkedIn thought leader",
  "crypto bag holder",
  "startup bro manifesting",
  "sigma male in training",
  "AI bro who just discovered prompting",
  "fake hustle merchant",
  "engagement farmer",
  "motivation poster generator",
  "Discord server owner energy",
  "someone who says 'big things coming' quarterly",
  "NPC with a personal brand",
  "person who treats their feed as a vision board",
  "chronically online philosopher",
  "someone who learned networking but not conversation",
];

function getRandomElements<T>(arr: T[], count: number): T[] {
  return [...arr]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

function buildSystemPrompt(): string {
  const style =
    ROAST_STYLES[
      Math.floor(Math.random() * ROAST_STYLES.length)
    ];

  const tone =
    TONE_MODIFIERS[
      Math.floor(Math.random() * TONE_MODIFIERS.length)
    ];

  const archetypes = getRandomElements(
    INTERNET_ARCHETYPES,
    4
  );

  const avoidPatterns = getRandomElements(
    AVOID_PATTERNS,
    4
  );

  return `You are a razor-sharp internet-native roast machine.

CURRENT STYLE MODE: ${style}
TONE INSTRUCTION: ${tone}

YOUR ROAST MUST:
- React to the vibe and behavior pattern
- Feel like a real internet reply
- Be funny and devastating
- Be specific to the content
- Never sound repetitive

ARCHETYPES:
${archetypes.map((a) => `- ${a}`).join("\n")}

STRICT PROHIBITIONS:
${avoidPatterns.map((p) => `- Do NOT use ${p}`).join("\n")}

OUTPUT:
One roast only.
Maximum 2 sentences.
No explanation.`;
}

function buildUserPrompt(content: string): string {
  return `CONTENT TO ROAST:

${content}

Generate the roast now.`;
}

function generateScore(roast: string): number {
  return Math.min(
    100,
    Math.max(
      60,
      roast.length + Math.floor(Math.random() * 25)
    )
  );
}

export async function POST(request: NextRequest) {
  try {

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        {
          error: "Missing GROQ_API_KEY",
        },
        { status: 500 }
      );
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const formData = await request.formData();

    const raw =
      formData.get("text") ??
      formData.get("content");

    let content = raw
      ? raw.toString().trim()
      : "";

    if (!content) {
      return NextResponse.json(
        {
          error: "No content provided",
        },
        { status: 400 }
      );
    }

    if (content.length > 5000) {
      content = content.slice(0, 5000);
    }

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: buildSystemPrompt(),
          },
          {
            role: "user",
            content: buildUserPrompt(content),
          },
        ],
        temperature: 1,
        max_tokens: 80,
      });

    const rawRoast =
      completion.choices[0]?.message?.content?.trim() ??
      "";

    const roast =
      rawRoast
        .replace(/^["']|["']$/g, "")
        .trim() ||
      "The AI saw this and chose violence against itself.";

    const score = generateScore(roast);

    return NextResponse.json({
      results: [
        {
          name: "Consensus Judge",
          roast,
          score,
        },
      ],
    });

  } catch (error) {

    console.error("ROAST API ERROR:", error);

    return NextResponse.json(
      {
        error: "Roast generation failed",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: "Roast API running",
    },
    { status: 200 }
  );
}
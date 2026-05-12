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
  return [...arr].sort(() => Math.random() - 0.5).slice(0, count);
}

function buildSystemPrompt(): string {
  const style = ROAST_STYLES[Math.floor(Math.random() * ROAST_STYLES.length)];
  const tone = TONE_MODIFIERS[Math.floor(Math.random() * TONE_MODIFIERS.length)];
  const archetypes = getRandomElements(INTERNET_ARCHETYPES, 4);
  const avoidPatterns = getRandomElements(AVOID_PATTERNS, 4);

  return `You are a razor-sharp internet-native roast machine. Your job is to deliver one devastating, witty roast in 1-2 sentences max.

CURRENT STYLE MODE: ${style}
TONE INSTRUCTION: ${tone}

YOUR ROAST MUST:
- React to the VIBE, BEHAVIOR PATTERN, and PSYCHOLOGICAL ENERGY of the content
- Feel like a perfect tweet reply or group chat response
- Be specific to what's actually in the content
- Sound like a human who has spent too long on the internet and developed a sixth sense for cringe
- Create humor from pattern recognition, not name-dropping

INTERNET ARCHETYPES TO WATCH FOR (if applicable):
${archetypes.map((a) => `- ${a}`).join("\n")}

GOOD ROAST EXAMPLES:
- "This bio looks like it asks people to join a Discord server before saying hello."
- "You type like your screen time report should be classified."
- "This has the energy of someone who says 'big things coming soon' every 3 business days."
- "Your personality feels algorithmically generated for engagement farming."
- "This tweet looks like it lost money in three different bull markets."
- "You sound like someone who turns every conversation into a networking opportunity."
- "The audacity of this post existing in a world with mute buttons."
- "This reads like a LinkedIn post that got too comfortable."
- "You write like someone who discovered 'stoicism' six months ago and hasn't recovered."
- "This has that 'I turned my depression into a productivity system' smell."

STRICT PROHIBITIONS:
${avoidPatterns.map((p) => `- Do NOT use ${p}`).join("\n")}
- Do NOT summarize what the content says
- Do NOT write more than 2 sentences
- Do NOT be generic or use filler insults
- Do NOT start with "Bro," "Oh," "Wow," or "Well,"
- Do NOT repeat sentence structures across your response

OUTPUT: One roast. 1-2 sentences. No preamble. No explanation. Just the roast.`;
}

function buildUserPrompt(content: string): string {
  return `CONTENT TO ROAST:
${content}

Deliver the roast. React to the specific content. Make it hurt with accuracy.`;
}

export async function POST(request: NextRequest) {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  try {
    const formData = await request.formData();
    const raw = formData.get("text") ?? formData.get("content");
    let content = raw ? raw.toString().trim() : "";

    if (!content) {
      return NextResponse.json(
        {
          error: "No content provided to roast",
          results: [
            {
              name: "Consensus Judge",
              roast: "You submitted nothing. Even your prompts have commitment issues.",
            },
          ],
        },
        { status: 400 }
      );
    }

    if (content.length > 5000) {
      content = content.slice(0, 5000) + "...";
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: buildSystemPrompt() },
        { role: "user", content: buildUserPrompt(content) },
      ],
      temperature: 0.95 + Math.random() * 0.3,
      max_tokens: 75,
      top_p: 0.95,
    });

    const raw_roast = completion.choices[0]?.message?.content?.trim() ?? "";
    const roast = raw_roast
      .replace(/^["']|["']$/g, "")
      .replace(/^(Roast:|Response:|Here's the roast:)\s*/i, "")
      .trim() || "The content was so mid it broke my ability to care.";

    return NextResponse.json({
      results: [{ name: "Consensus Judge", roast }],
    });
  } catch (error) {
    console.error("Roast API error:", error);

    const fallbacks = [
      "The server crashed reading this. Even the machines are embarrassed for you.",
      "Something broke trying to process this. The AI took one look and called in sick.",
      "Technical error. The algorithm couldn't handle the levels of cringe detected.",
      "Server timeout. This content weaponized the infrastructure against itself.",
    ];

    const fallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    const status = error instanceof Error && error.message.includes("API") ? 503 : 500;

    return NextResponse.json(
      { error: "Service error", results: [{ name: "Consensus Judge", roast: fallback }] },
      { status }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      error: "Method not allowed. POST your text to get roasted.",
      hint: "Submit FormData with field: text",
    },
    { status: 405 }
  );
}
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
  'starting multiple sentences the same way',
  'generic filler like "you look cringe" or "this is cringe"',
  'name/profession extraction templates',
  'summarizing what the content says',
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
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function buildSystemPrompt(): string {
  const style =
    ROAST_STYLES[Math.floor(Math.random() * ROAST_STYLES.length)];
  const tone =
    TONE_MODIFIERS[Math.floor(Math.random() * TONE_MODIFIERS.length)];
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

STRICT PROHIBITIONS — NEVER DO THESE:
${avoidPatterns.map((p) => `- Do NOT use ${p}`).join("\n")}
- Do NOT summarize what the content says
- Do NOT write more than 2 sentences
- Do NOT be generic or use filler insults
- Do NOT start with "Bro," "Oh," "Wow," or "Well,"
- Do NOT repeat sentence structures across your response

OUTPUT: One roast. 1-2 sentences. No preamble. No explanation. Just the roast.`;
}

function buildUserPrompt(content: string, contentType: string): string {
  const contextHints: Record<string, string> = {
    bio: "This is a personal bio or about section. Look for try-hard personal branding, fake humility, hustle signaling, or attention-seeking identity construction.",
    tweet:
      "This is a tweet or X post. Look for engagement farming, fake profundity, chronically online behavior, or someone performing emotions for the algorithm.",
    meme: "This is meme content or meme text. React to the meme energy, the type of person who would post this, and what it says about their online personality.",
    screenshot:
      "This is a screenshot. React to the conversation dynamics, the energy of whoever is speaking, and what it reveals about their personality.",
    conversation:
      "This is a conversation or chat exchange. Analyze the dynamics, who's the main character, and what behavioral patterns are visible.",
    ocr: "This is text extracted from an image. Treat it as visual content and react to both what it says and the energy of the format.",
    cringe:
      "This is social media cringe content. Go for the jugular — identify the exact archetype and roast the pattern.",
    text: "This is plain text content. React to the vibe, word choices, and psychological energy behind it.",
  };

  const hint = contextHints[contentType] || contextHints.text;

  return `CONTENT TO ROAST:
${content}

CONTEXT: ${hint}

Deliver the roast. React to the specific content. Make it hurt with accuracy.`;
}

export async function POST(request: NextRequest) {
  // Groq client initialized inside handler to avoid build-time env var access
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  try {
    const formData = await request.formData();

    let content = "";
    let contentType = "text";

    const textContent = formData.get("text");
    const bioContent = formData.get("bio");
    const tweetContent = formData.get("tweet");
    const memeContent = formData.get("meme");
    const screenshotContent = formData.get("screenshot");
    const conversationContent = formData.get("conversation");
    const ocrContent = formData.get("ocr");
    const cringeContent = formData.get("cringe");
    const rawContent = formData.get("content");
    const typeField = formData.get("type");

    if (bioContent) {
      content = bioContent.toString();
      contentType = "bio";
    } else if (tweetContent) {
      content = tweetContent.toString();
      contentType = "tweet";
    } else if (memeContent) {
      content = memeContent.toString();
      contentType = "meme";
    } else if (screenshotContent) {
      content = screenshotContent.toString();
      contentType = "screenshot";
    } else if (conversationContent) {
      content = conversationContent.toString();
      contentType = "conversation";
    } else if (ocrContent) {
      content = ocrContent.toString();
      contentType = "ocr";
    } else if (cringeContent) {
      content = cringeContent.toString();
      contentType = "cringe";
    } else if (textContent) {
      content = textContent.toString();
      contentType = "text";
    } else if (rawContent) {
      content = rawContent.toString();
      contentType = typeField ? typeField.toString() : "text";
    }

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        {
          error: "No content provided to roast",
          results: [
            {
              name: "Consensus Judge",
              roast:
                "You submitted nothing. Even your prompts have commitment issues.",
            },
          ],
        },
        { status: 400 }
      );
    }

    if (content.length > 5000) {
      content = content.slice(0, 5000) + "...";
    }

    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(content, contentType);

    const temperatureVariance = 0.95 + Math.random() * 0.3;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: temperatureVariance,
      max_tokens: 75,
      top_p: 0.95,
    });

    const roastText =
      completion.choices[0]?.message?.content?.trim() ||
      "The content was so mid it broke my ability to care.";

    const cleanedRoast = roastText
      .replace(/^["']|["']$/g, "")
      .replace(/^(Roast:|Response:|Here's the roast:)\s*/i, "")
      .trim();

    return NextResponse.json({
      results: [
        {
          name: "Consensus Judge",
          roast: cleanedRoast,
        },
      ],
    });
  } catch (error) {
    console.error("Roast API error:", error);

    const fallbackRoasts = [
      "The server crashed reading this. Even the machines are embarrassed for you.",
      "Something broke trying to process this. The AI took one look and called in sick.",
      "Technical error. The algorithm couldn't handle the levels of cringe detected.",
      "Server timeout. This content weaponized the infrastructure against itself.",
    ];

    const fallback =
      fallbackRoasts[Math.floor(Math.random() * fallbackRoasts.length)];

    if (error instanceof Error && error.message.includes("API")) {
      return NextResponse.json(
        {
          error: "AI service unavailable",
          results: [
            {
              name: "Consensus Judge",
              roast: fallback,
            },
          ],
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        results: [
          {
            name: "Consensus Judge",
            roast: fallback,
          },
        ],
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      error: "Method not allowed. POST your content to get roasted.",
      hint: "Submit FormData with fields: text, bio, tweet, meme, screenshot, conversation, ocr, or cringe",
    },
    { status: 405 }
  );
}
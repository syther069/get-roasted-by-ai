import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  try {

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const formData = await req.formData();

    const input =
      formData.get("input")?.toString().trim() || "";

    if (!input) {
      return NextResponse.json(
        {
          error: "No input provided",
        },
        {
          status: 400,
        }
      );
    }

    const roastStyles = [
      "sarcastic internet humor",
      "twitter quote tweet energy",
      "group chat roasting",
      "dry observational humor",
      "gen z meme sarcasm",
      "chronically online humor",
      "smart teasing",
      "subtle mockery",
    ];

    const randomStyle =
      roastStyles[
        Math.floor(Math.random() * roastStyles.length)
      ];

    const completion =
      await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        temperature: 1.2,

        max_tokens: 70,

        top_p: 0.95,

        frequency_penalty: 1,

        presence_penalty: 1,

        messages: [

          {
            role: "system",

            content: `
You are an elite internet roast AI.

Your job is NOT to summarize user text.

Your job is to:
- understand the vibe
- understand the behavior
- detect cringe
- detect fake hustle
- detect try-hard energy
- detect social media archetypes
- react sarcastically like a real internet user

STYLE:
${randomStyle}

STRICT RULES:
- maximum 2 sentences
- always sound human
- always sound funny
- no generic insults
- no repetitive formats
- no long paragraphs
- no fake villain speeches
- no moral lectures
- never explain the joke
- do not repeat professions/names unnecessarily
- make every response feel fresh
`
          },

          {
            role: "user",

            content: `
Analyze this content and roast the deeper vibe behind it:

"${input}"
`
          }
        ]
      });

    const roast =
      completion.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({
      results: [
        {
          name: "Consensus Judge",

          roast:
            roast ||
            "This has the energy of someone who says 'big things coming soon' every week."
        }
      ]
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        results: [
          {
            name: "Consensus Judge",

            roast:
              "Your online aura feels like a startup pitch made entirely from buzzwords."
          }
        ]
      },
      {
        status: 200,
      }
    );
  }
}
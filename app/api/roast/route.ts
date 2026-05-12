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

      "dry sarcastic internet humor",

      "twitter quote tweet energy",

      "group chat roasting",

      "chronically online humor",

      "subtle psychological mockery",

      "observational meme humor",

      "gen z sarcasm",

      "internet comment section energy",
    ];

    const randomStyle =
      roastStyles[
        Math.floor(Math.random() * roastStyles.length)
      ];

    const completion =
      await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        temperature: 1.2,

        top_p: 0.95,

        max_tokens: 70,

        messages: [

          {
            role: "system",

            content: `
You are an elite internet roast AI.

Your job:
- analyze the deeper vibe behind the content
- detect cringe
- detect fake hustle
- detect attention seeking
- detect try-hard behavior
- detect internet archetypes
- react like a sarcastic Twitter user

STYLE:
${randomStyle}

STRICT RULES:
- maximum 2 sentences
- always sound human
- always sound witty
- never summarize
- no generic insults
- avoid repetitive formats
- avoid profession farming
- avoid repeating names
- sound internet-native
- make every roast feel unique
`
          },

          {
            role: "user",

            content: `
Analyze and roast this content:

"${input}"
`
          }
        ]
      });

    console.log("FULL GROQ RESPONSE:", completion);

    const roast =
      completion?.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({
      results: [
        {
          name: "Consensus Judge",

          roast:
            roast ||
            "This post feels algorithmically generated for engagement farming."
        }
      ]
    });

  } catch (error: any) {

    console.error("FULL ERROR:", error);

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Unknown Groq API error",
      },
      {
        status: 500,
      }
    );
  }
}
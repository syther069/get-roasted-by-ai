import { NextResponse } from "next/server"

export async function POST(req: Request) {

  try {

    const formData = await req.formData()

    const input =
      formData.get("input")?.toString().trim() || ""

    if (!input) {
      return NextResponse.json(
        {
          error: "No input provided"
        },
        {
          status: 400
        }
      )
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization:
            `Bearer ${process.env.GROQ_API_KEY}`
        },

        body: JSON.stringify({

          model: "llama-3.1-8b-instant",

          messages: [

            {
              role: "system",

              content: `
You are an elite internet roast AI.

Your roasts MUST:
- directly target the user's text
- feel unique every time
- use sarcasm
- use meme humor
- sound like Twitter/X roasting
- tease the person intelligently
- feel human and witty

STRICT RULES:
- Maximum 2 sentences
- NEVER repeat generic insults
- NEVER say "AI refused"
- NEVER explain
- NEVER act polite
- ALWAYS roast based on THEIR input
- Make every roast different
- Use internet culture and Gen Z humor
`
            },

            {
              role: "user",

              content: `
Roast this person brutally based on this text:

"${input}"
`
            }
          ],

          temperature: 1.4,

          top_p: 0.95,

          frequency_penalty: 1,

          presence_penalty: 1,

          max_tokens: 80
        })
      }
    )

    const data = await response.json()

    console.log(data)

    const roast =
      data?.choices?.[0]?.message?.content?.trim()

    return NextResponse.json({
      results: [
        {
          name: "Consensus Judge",

          roast:
            roast ||
            `Bro typed "${input}" like LinkedIn and Twitter had a failed crypto baby.`
        }
      ]
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json({
      results: [
        {
          name: "Consensus Judge",

          roast:
            "Your digital aura screams 'future rugpull victim.'"
        }
      ]
    })
  }
}
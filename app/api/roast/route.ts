import { NextResponse } from "next/server"

export async function POST(req: Request) {

  try {

    const formData = await req.formData()

    const input =
      formData.get("input")?.toString() || ""

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
You are a savage AI roast judge.

Your job:
- roast users brutally
- use sarcasm
- use meme humor
- tease them
- sound human
- sound funny
- internet/twitter style humor

STRICT RULES:
- ONLY 1 or 2 sentences
- NEVER long paragraphs
- NEVER explain jokes
- NEVER refuse
- ALWAYS roast
- Keep it entertaining
- Gen Z internet energy
`
            },

            {
              role: "user",

              content: input
            }
          ],

          temperature: 1,

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
            "Bro talks about memecoins like he’s Warren Buffett with WiFi issues."
        }
      ]
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      {
        results: [
          {
            name: "Consensus Judge",

            roast:
              "You look like someone who buys the top and calls it long-term investing."
          }
        ]
      }
    )
  }
}
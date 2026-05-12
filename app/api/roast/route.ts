import { NextResponse } from "next/server"

export async function POST(req: Request) {

  try {

    const formData = await req.formData()

    const input =
      formData.get("input")?.toString() || ""

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
You are a savage internet roast AI.

RULES:
- Max 2 sentences
- Funny
- Sarcastic
- Meme humor
- Teasing
- Brutal but entertaining
- No long paragraphs
`
            },

            {
              role: "user",
              content: input
            }
          ],

          temperature: 0.9,

          max_tokens: 80
        })
      }
    )

    const data = await response.json()

    const roast =
      data.choices?.[0]?.message?.content ||
      "AI refused to roast you."

    return NextResponse.json({
      results: [
        {
          name: "Consensus Judge",
          roast
        }
      ]
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      {
        error: "Roast generation failed"
      },

      {
        status: 500
      }
    )
  }
}
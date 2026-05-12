import { NextResponse } from "next/server"

async function generateTextRoast(input: string) {

  const response = await fetch(
    "https://skin-momentum-albany-ipaq.trycloudflare.com/api/generate",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        model: "mistral",

        prompt: `
You are a brutally funny AI roast judge.

RULES:
- Maximum 2 sentences
- Funny
- Sarcastic
- Internet humor
- No long paragraphs
- Be concise

USER:
${input}

FINAL ROAST:
`,

        stream: false,

        options: {
          temperature: 0.9,
          num_predict: 60
        }
      })
    }
  )

  // SAFE TEXT RESPONSE
  const text = await response.text()

  if (!text) {
    throw new Error("Empty response from Ollama")
  }

  let data

  try {
    data = JSON.parse(text)

  } catch (err) {

    console.error("Invalid JSON:", text)

    throw new Error("Bad JSON response")
  }

  return data.response || "AI refused to roast you."
}

export async function POST(req: Request) {

  try {

    const formData = await req.formData()

    const input =
      formData.get("input")?.toString() || ""

    const roast = await generateTextRoast(input)

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
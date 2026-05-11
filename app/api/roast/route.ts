import { NextResponse } from "next/server"

async function generateTextRoast(input: string) {
  const response = await fetch(
    "http://localhost:11434/api/generate",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        model: "mistral",

        prompt: `
You are a brutally funny internet roast AI.

RULES:
- Maximum 2 sentences
- Funny and sarcastic
- Meme/internet humor
- No paragraphs
- No explanations
- Be concise and savage

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

  const data = await response.json()

  return data.response
}

async function generateImageRoast(
  imageBase64: string,
  input: string
) {
  const response = await fetch(
    "http://localhost:11434/api/generate",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        model: "llava",

        prompt: `
Analyze this image and roast it.

Extra context from user:
${input}

RULES:
- Maximum 2 sentences
- Funny
- Sarcastic
- Internet humor
- Teasing tone
- No explanations
- No long outputs

FINAL ROAST:
`,

        images: [imageBase64],

        stream: false,

        options: {
          temperature: 0.9,
          num_predict: 60
        }
      })
    }
  )

  const data = await response.json()

  return data.response
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const input =
      formData.get("input")?.toString() || ""

    const image =
      formData.get("image") as File | null

    // IMAGE MODE
    if (image) {

      const bytes = await image.arrayBuffer()

      const buffer = Buffer.from(bytes)

      const roast = await generateImageRoast(
        buffer.toString("base64"),
        input
      )

      return NextResponse.json({
        results: [
          {
            name: "LLaVA Vision Consensus",
            roast
          }
        ]
      })
    }

    // TEXT MODE
    const roast = await generateTextRoast(input)

    return NextResponse.json({
      results: [
        {
          name: "Mistral Consensus",
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
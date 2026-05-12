import Groq from "groq-sdk";
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
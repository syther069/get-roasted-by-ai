import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {

  try {

    const filePath = path.join(
      process.cwd(),
      "data",
      "roasts.json"
    );

    if (!fs.existsSync(filePath)) {

      return NextResponse.json({
        entries: [],
      });
    }

    const raw = fs.readFileSync(
      filePath,
      "utf8"
    );

    const parsed = JSON.parse(raw);

    const sorted = parsed.sort(
      (a: any, b: any) => b.score - a.score
    );

    return NextResponse.json({
      entries: sorted,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      entries: [],
    });
  }
}
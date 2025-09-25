import { type NextRequest, NextResponse } from "next/server"
import { generateHealthResources } from "@/lib/ai-content-generator"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const count = Number.parseInt(searchParams.get("count") || "8")
    const language = searchParams.get("language") || "all"

    const resources = await generateHealthResources(count, language)

    return NextResponse.json({
      success: true,
      data: resources,
      generated_at: new Date().toISOString(),
      count: resources.length,
    })
  } catch (error) {
    console.error("Error in AI resources generation:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate resources",
        fallback_message: "Using cached content due to generation error",
      },
      { status: 500 },
    )
  }
}

import { type NextRequest, NextResponse } from "next/server"
import { generateHealthcareFacilities } from "@/lib/ai-content-generator"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const count = Number.parseInt(searchParams.get("count") || "6")
    const region = searchParams.get("region") || "Telangana"

    const facilities = await generateHealthcareFacilities(count, region)

    return NextResponse.json({
      success: true,
      data: facilities,
      generated_at: new Date().toISOString(),
      count: facilities.length,
    })
  } catch (error) {
    console.error("Error in AI facilities generation:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate facilities",
        fallback_message: "Using cached content due to generation error",
      },
      { status: 500 },
    )
  }
}

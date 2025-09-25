import { type NextRequest, NextResponse } from "next/server"
import { generateSystemActivities, generateSystemStatus } from "@/lib/ai-content-generator"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "all"

    const data: any = {}

    if (type === "activities" || type === "all") {
      data.activities = await generateSystemActivities(10)
    }

    if (type === "status" || type === "all") {
      data.systemStatus = await generateSystemStatus()
    }

    return NextResponse.json({
      success: true,
      data,
      generated_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in AI admin data generation:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate admin data",
        fallback_message: "Using cached content due to generation error",
      },
      { status: 500 },
    )
  }
}

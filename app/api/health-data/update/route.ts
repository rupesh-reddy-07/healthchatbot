import { NextResponse } from "next/server"
import { updateHealthData } from "@/lib/health-data-ai"

export async function GET() {
  try {
    const data = await updateHealthData()

    return NextResponse.json({
      success: true,
      data,
      message: "Health data updated successfully",
    })
  } catch (error) {
    console.error("Error updating health data:", error)
    return NextResponse.json({ success: false, error: "Failed to update health data" }, { status: 500 })
  }
}

export async function POST() {
  try {
    const data = await updateHealthData()

    return NextResponse.json({
      success: true,
      data,
      message: "Health data refreshed successfully",
    })
  } catch (error) {
    console.error("Error refreshing health data:", error)
    return NextResponse.json({ success: false, error: "Failed to refresh health data" }, { status: 500 })
  }
}

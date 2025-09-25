import { type NextRequest, NextResponse } from "next/server"
import { healthDataSync } from "@/lib/health-data-sync"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const state = searchParams.get("state")
    const district = searchParams.get("district")
    const severity = searchParams.get("severity")
    const category = searchParams.get("category")

    let alerts = healthDataSync.getAlertsByLocation(state || undefined, district || undefined)

    // Filter by severity if specified
    if (severity) {
      alerts = alerts.filter((alert) => alert.severity === severity)
    }

    // Filter by category if specified
    if (category) {
      alerts = alerts.filter((alert) => alert.category === category)
    }

    return NextResponse.json({
      success: true,
      alerts,
      count: alerts.length,
      lastSyncTime: healthDataSync.getLastSyncTime(),
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Health alerts API error:", error)
    return NextResponse.json({ error: "Failed to fetch alerts" }, { status: 500 })
  }
}

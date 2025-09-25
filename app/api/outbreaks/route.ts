import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location")
    const severity = searchParams.get("severity")
    const active = searchParams.get("active")

    // Mock outbreak/alert data - in a real app, this would come from a database
    const alerts = [
      {
        id: "1",
        title: "Dengue Outbreak Alert - Hyderabad",
        description: "Increased cases of dengue fever reported in several areas of Hyderabad.",
        severity: "high",
        type: "outbreak",
        location: "Hyderabad, Telangana",
        timestamp: "2024-11-10T10:30:00Z",
        isActive: true,
        source: "Telangana Health Department",
      },
      // ... more alert data
    ]

    // Filter based on query parameters
    let filteredAlerts = alerts
    if (location && location !== "all") {
      filteredAlerts = filteredAlerts.filter((alert) => alert.location.includes(location))
    }
    if (severity && severity !== "all") {
      filteredAlerts = filteredAlerts.filter((alert) => alert.severity === severity)
    }
    if (active === "true") {
      filteredAlerts = filteredAlerts.filter((alert) => alert.isActive)
    }

    return NextResponse.json({
      alerts: filteredAlerts,
      total: filteredAlerts.length,
      activeCount: alerts.filter((alert) => alert.isActive).length,
      criticalCount: alerts.filter((alert) => alert.isActive && alert.severity === "critical").length,
    })
  } catch (error) {
    console.error("Outbreaks API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

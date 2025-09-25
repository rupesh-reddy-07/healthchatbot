import { type NextRequest, NextResponse } from "next/server"
import { healthDataSync } from "@/lib/health-data-sync"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { dataType } = await request.json()

    let result
    switch (dataType) {
      case "alerts":
        result = await healthDataSync.syncHealthAlerts()
        break
      case "vaccination":
        result = await healthDataSync.syncVaccinationData()
        break
      case "facilities":
        result = await healthDataSync.syncHealthFacilities()
        break
      case "all":
        const [alerts, vaccination, facilities] = await Promise.all([
          healthDataSync.syncHealthAlerts(),
          healthDataSync.syncVaccinationData(),
          healthDataSync.syncHealthFacilities(),
        ])
        result = { alerts, vaccination, facilities }
        break
      default:
        return NextResponse.json({ error: "Invalid data type" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      data: result,
      lastSyncTime: healthDataSync.getLastSyncTime(),
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Health data sync error:", error)
    return NextResponse.json({ error: "Sync failed" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const dataType = searchParams.get("type")
    const state = searchParams.get("state")
    const district = searchParams.get("district")
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")

    let result
    switch (dataType) {
      case "alerts":
        result = healthDataSync.getAlertsByLocation(state || undefined, district || undefined)
        break
      case "facilities":
        if (lat && lng) {
          result = healthDataSync.getNearbyFacilities({ lat: Number.parseFloat(lat), lng: Number.parseFloat(lng) })
        } else {
          result = await healthDataSync.syncHealthFacilities()
        }
        break
      default:
        return NextResponse.json({ error: "Invalid data type" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      data: result,
      lastSyncTime: healthDataSync.getLastSyncTime(),
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Health data fetch error:", error)
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 })
  }
}

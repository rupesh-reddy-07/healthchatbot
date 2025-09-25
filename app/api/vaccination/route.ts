import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const ageGroup = searchParams.get("ageGroup")
    const status = searchParams.get("status")

    // Mock vaccination data - in a real app, this would come from a database
    const vaccinations = [
      {
        id: "1",
        name: "BCG",
        ageGroup: "Birth",
        description: "Protects against tuberculosis",
        schedule: "Single dose at birth",
        importance: "high",
        nextDue: "2024-12-01",
        status: "due",
      },
      // ... more vaccination data
    ]

    // Filter based on query parameters
    let filteredVaccinations = vaccinations
    if (ageGroup && ageGroup !== "all") {
      filteredVaccinations = filteredVaccinations.filter((v) => v.ageGroup.includes(ageGroup))
    }
    if (status && status !== "all") {
      filteredVaccinations = filteredVaccinations.filter((v) => v.status === status)
    }

    return NextResponse.json({
      vaccinations: filteredVaccinations,
      total: filteredVaccinations.length,
    })
  } catch (error) {
    console.error("Vaccination API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

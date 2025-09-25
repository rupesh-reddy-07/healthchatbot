import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

// Schema for vaccination data
const VaccinationSchema = z.object({
  vaccinations: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      ageGroup: z.string(),
      description: z.string(),
      schedule: z.string(),
      importance: z.enum(["high", "medium", "low"]),
      nextDue: z.string().optional(),
      status: z.enum(["due", "upcoming", "completed", "overdue"]),
    }),
  ),
})

// Schema for health alerts
const AlertSchema = z.object({
  alerts: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      severity: z.enum(["critical", "high", "medium", "low"]),
      type: z.enum(["outbreak", "advisory", "emergency", "update"]),
      location: z.string(),
      timestamp: z.string(),
      isActive: z.boolean(),
      source: z.string(),
      actionRequired: z.string().optional(),
    }),
  ),
})

export async function generateVaccinationSchedule(region = "India") {
  try {
    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: VaccinationSchema,
      prompt: `Generate current vaccination schedule data for ${region}. Include:
      - Latest WHO/government recommended vaccines
      - Current vaccination campaigns
      - Age-appropriate schedules
      - Priority levels based on current health situations
      - Realistic due dates and statuses
      
      Focus on vaccines relevant to rural healthcare in ${region}. Include both routine immunizations and any current special campaigns.`,
      temperature: 0.3,
    })

    return object.vaccinations.map((v) => ({
      ...v,
      nextDue: v.nextDue ? new Date(v.nextDue) : undefined,
    }))
  } catch (error) {
    console.error("Error generating vaccination data:", error)
    return []
  }
}

export async function generateHealthAlerts(region = "India") {
  try {
    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: AlertSchema,
      prompt: `Generate current health alerts and advisories for ${region}. Include:
      - Recent disease outbreaks or health emergencies
      - Seasonal health advisories (monsoon, winter, summer)
      - Government health campaigns and updates
      - Water quality, air quality, or environmental health issues
      - Vaccination drives and health programs
      
      Make alerts realistic and relevant to current health situations in ${region}. Include proper severity levels and actionable advice.`,
      temperature: 0.4,
    })

    return object.alerts.map((a) => ({
      ...a,
      timestamp: new Date(a.timestamp),
    }))
  } catch (error) {
    console.error("Error generating health alerts:", error)
    return []
  }
}

export async function updateHealthData() {
  const [vaccinations, alerts] = await Promise.all([generateVaccinationSchedule(), generateHealthAlerts()])

  return {
    vaccinations,
    alerts,
    lastUpdated: new Date(),
  }
}

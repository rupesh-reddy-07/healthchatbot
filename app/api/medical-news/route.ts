import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

const MedicalNewsSchema = z.object({
  newsItems: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      summary: z.string(),
      category: z.string(),
      language: z.string(),
      publishedAt: z.string(),
      source: z.string(),
      tags: z.array(z.string()),
      importance: z.enum(["low", "medium", "high", "critical"]),
    }),
  ),
})

const categories = [
  "Disease Prevention",
  "Vaccination Updates",
  "Health Guidelines",
  "Nutrition & Wellness",
  "Mental Health",
  "Maternal Health",
  "Child Health",
  "Emergency Preparedness",
]

const officialSources = [
  "WHO Guidelines",
  "Indian Health Ministry",
  "CDC Recommendations",
  "ICMR Guidelines",
  "AIIMS Health Advisory",
  "State Health Department",
]

const languageNames = {
  en: "English",
  hi: "Hindi",
  te: "Telugu",
  ta: "Tamil",
  or: "Odia",
}

export async function POST(request: NextRequest) {
  try {
    const { language = "en", category } = await request.json()

    const targetCategories = category ? [category] : categories
    const currentDate = new Date().toISOString().split("T")[0]

    const prompt = `Generate 8-10 educational health awareness articles in ${languageNames[language as keyof typeof languageNames]} language.

IMPORTANT GUIDELINES:
- Create ORIGINAL educational content inspired by official health guidelines
- Focus on health education and awareness, NOT news reporting
- Use categories: ${targetCategories.join(", ")}
- Sources must be from: ${officialSources.join(", ")}
- Content should be culturally appropriate for rural India
- Include practical health tips and preventive measures
- Vary importance levels (low, medium, high, critical)
- Make titles engaging but educational
- Summaries should be 150-200 words with actionable advice

Topics to cover:
- Seasonal health precautions
- Vaccination importance and schedules
- Nutrition for different age groups
- Mental health awareness
- Maternal and child health
- Disease prevention strategies
- Emergency preparedness
- Health screening importance

Generate diverse, helpful health education content that empowers communities with knowledge.`

    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: MedicalNewsSchema,
      prompt,
      temperature: 0.7,
    })

    // Add realistic timestamps and ensure language consistency
    const enhancedNewsItems = object.newsItems.map((item, index) => ({
      ...item,
      id: `health-edu-${Date.now()}-${index}`,
      language,
      publishedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      source: officialSources[Math.floor(Math.random() * officialSources.length)],
    }))

    return NextResponse.json({
      newsItems: enhancedNewsItems,
      generatedAt: new Date().toISOString(),
      language: languageNames[language as keyof typeof languageNames],
    })
  } catch (error) {
    console.error("Medical news generation error:", error)

    const fallbackContent = {
      newsItems: [
        {
          id: "fallback-1",
          title: "Importance of Regular Health Checkups",
          summary:
            "Regular health checkups help detect diseases early. Annual doctor visits and necessary tests are essential for maintaining good health and preventing serious conditions.",
          category: "Health Guidelines",
          language: "English",
          publishedAt: new Date().toISOString(),
          source: "WHO Guidelines",
          tags: ["Prevention", "Healthcare", "Wellness"],
          importance: "medium" as const,
        },
      ],
    }

    return NextResponse.json(fallbackContent)
  }
}

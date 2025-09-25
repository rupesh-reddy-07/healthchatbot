import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export interface AIGeneratedResource {
  id: string
  title: string
  description: string
  type: "pdf" | "video" | "infographic" | "article" | "checklist"
  category: "prevention" | "symptoms" | "treatment" | "vaccination" | "emergency" | "nutrition"
  language: "en" | "hi" | "te" | "ta" | "or" | "all"
  content?: string
  downloadUrl?: string
  viewUrl?: string
  fileSize?: string
  duration?: string
  lastUpdated: Date
  isPopular: boolean
}

export interface AIGeneratedFacility {
  id: string
  name: string
  type: "hospital" | "clinic" | "government" | "emergency"
  address: string
  city: string
  state: string
  phone: string
  whatsapp?: string
  email?: string
  website?: string
  services: string[]
  hours: string
  coordinates: { lat: number; lng: number }
  isEmergency: boolean
  rating?: number
}

export interface AIGeneratedActivity {
  id: string
  type: "alert" | "chat" | "resource" | "user"
  title: string
  description: string
  timestamp: Date
  severity?: "low" | "medium" | "high"
  icon: string
}

export interface AIGeneratedSystemStatus {
  service: string
  status: "online" | "offline" | "degraded" | "maintenance"
  uptime: string
  lastCheck: Date
}

export async function generateHealthResources(count = 8, language = "all"): Promise<AIGeneratedResource[]> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      temperature: 0.7,
      prompt: `Generate ${count} realistic health education resources for rural Indian communities. 
      
      Focus on:
      - Preventive healthcare, disease symptoms, treatments, vaccination, emergency care, nutrition
      - Culturally appropriate content for rural India
      - Mix of formats: PDFs, videos, infographics, articles, checklists
      - Educational content that avoids copyright issues
      - Language preference: ${language === "all" ? "multilingual support" : language}
      
      Return as JSON array with this exact structure:
      {
        "id": "unique_id",
        "title": "Resource Title",
        "description": "Brief description of the resource content",
        "type": "pdf|video|infographic|article|checklist",
        "category": "prevention|symptoms|treatment|vaccination|emergency|nutrition",
        "language": "en|hi|te|ta|or|all",
        "fileSize": "X.X MB" (for PDFs/downloads),
        "duration": "X:XX" (for videos),
        "isPopular": true/false (30% should be popular)
      }
      
      Make titles specific and actionable. Descriptions should be 1-2 sentences explaining the value.`,
    })

    const resources = JSON.parse(text)
    return resources.map((resource: any, index: number) => ({
      ...resource,
      id: `ai_${Date.now()}_${index}`,
      downloadUrl:
        resource.type === "pdf" || resource.type === "checklist" ? `/resources/${resource.id}.pdf` : undefined,
      viewUrl: resource.type !== "pdf" ? `/resources/${resource.id}` : undefined,
      lastUpdated: new Date(),
    }))
  } catch (error) {
    console.error("Error generating health resources:", error)
    return []
  }
}

export async function generateHealthcareFacilities(count = 6, region = "Telangana"): Promise<AIGeneratedFacility[]> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      temperature: 0.6,
      prompt: `Generate ${count} realistic healthcare facilities for ${region}, India. 
      
      Include:
      - Mix of hospitals, clinics, government offices, emergency services
      - Real-sounding Indian names and addresses
      - Appropriate phone numbers (use +91 prefix)
      - Realistic services for each facility type
      - Proper coordinates for ${region} region
      - Emergency facilities should be 24/7
      
      Return as JSON array with this exact structure:
      {
        "id": "unique_id",
        "name": "Facility Name",
        "type": "hospital|clinic|government|emergency",
        "address": "Street address",
        "city": "City name",
        "state": "${region}",
        "phone": "+91-XX-XXXX-XXXX",
        "whatsapp": "+91-XXXXXXXXXX" (optional, for hospitals/clinics),
        "email": "email@domain.com" (optional),
        "website": "https://website.com" (optional),
        "services": ["Service 1", "Service 2", "Service 3"],
        "hours": "Operating hours",
        "coordinates": {"lat": XX.XXXX, "lng": XX.XXXX},
        "isEmergency": true/false,
        "rating": X.X (optional, 3.5-4.5 range)
      }
      
      Make names authentic and services appropriate for rural healthcare.`,
    })

    const facilities = JSON.parse(text)
    return facilities.map((facility: any, index: number) => ({
      ...facility,
      id: `ai_facility_${Date.now()}_${index}`,
    }))
  } catch (error) {
    console.error("Error generating healthcare facilities:", error)
    return []
  }
}

export async function generateSystemActivities(count = 10): Promise<AIGeneratedActivity[]> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      temperature: 0.8,
      prompt: `Generate ${count} realistic system activities for a health chatbot admin dashboard.
      
      Include:
      - Recent alerts published, chat interactions, resource updates, user activities
      - Mix of severity levels and activity types
      - Realistic timestamps (recent activities)
      - Appropriate icons for each activity type
      
      Return as JSON array with this exact structure:
      {
        "id": "unique_id",
        "type": "alert|chat|resource|user",
        "title": "Activity Title",
        "description": "Brief description",
        "timestamp": "2024-12-XX recent date",
        "severity": "low|medium|high" (optional),
        "icon": "lucide-icon-name"
      }
      
      Make activities realistic for a healthcare system in rural India.`,
    })

    const activities = JSON.parse(text)
    return activities.map((activity: any, index: number) => ({
      ...activity,
      id: `ai_activity_${Date.now()}_${index}`,
      timestamp: new Date(activity.timestamp),
    }))
  } catch (error) {
    console.error("Error generating system activities:", error)
    return []
  }
}

export async function generateSystemStatus(): Promise<AIGeneratedSystemStatus[]> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      temperature: 0.3,
      prompt: `Generate realistic system status for a health chatbot platform.
      
      Include status for:
      - Chat Service
      - Alert System  
      - Database
      - API Services
      - WhatsApp Integration
      - SMS Gateway
      - AI Processing
      - File Storage
      
      Return as JSON array with this exact structure:
      {
        "service": "Service Name",
        "status": "online|offline|degraded|maintenance",
        "uptime": "XX.X%" or "X days",
        "lastCheck": "recent timestamp"
      }
      
      Most services should be online, maybe 1-2 with minor issues.`,
    })

    const statuses = JSON.parse(text)
    return statuses.map((status: any) => ({
      ...status,
      lastCheck: new Date(status.lastCheck),
    }))
  } catch (error) {
    console.error("Error generating system status:", error)
    return []
  }
}

// Multi-language content generation
export async function generateMultilingualContent(
  content: string,
  targetLanguages: string[] = ["hi", "te", "ta", "or"],
): Promise<Record<string, string>> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      temperature: 0.3,
      prompt: `Translate the following health content into ${targetLanguages.join(", ")} languages.
      Keep medical terminology accurate and culturally appropriate for rural Indian communities.
      
      Original content: "${content}"
      
      Return as JSON object with language codes as keys:
      {
        "hi": "Hindi translation",
        "te": "Telugu translation", 
        "ta": "Tamil translation",
        "or": "Odia translation"
      }
      
      Ensure translations are natural and medically accurate.`,
    })

    return JSON.parse(text)
  } catch (error) {
    console.error("Error generating multilingual content:", error)
    return {}
  }
}

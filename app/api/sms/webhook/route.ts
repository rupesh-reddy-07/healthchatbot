import { type NextRequest, NextResponse } from "next/server"
import { processRAGQuery, isMedicalEmergency, generateEmergencyResponse } from "@/lib/rag-system"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

// SMS webhook handler (Twilio format)
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const from = formData.get("From") as string
    const body = formData.get("Body") as string
    const to = formData.get("To") as string

    if (!from || !body) {
      return new Response("Bad Request", { status: 400 })
    }

    if (!process.env.OPENAI_API_KEY) {
      // Attempt best-effort reply; if Twilio creds missing, this will no-op with a logged error
      await sendSMS(to, from, "The AI service is not configured. Please try again later or use the web chat.")
      return new Response("OK", { status: 200 })
    }

    await handleSMSMessage(from, body, to)

    return new Response("OK", { status: 200 })
  } catch (error) {
    console.error("SMS webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function handleSMSMessage(from: string, message: string, to: string) {
  try {
    const language = detectLanguage(message)

    // Check for emergency
    if (isMedicalEmergency(message)) {
      const emergencyResponse = generateEmergencyResponse(language)
      await sendSMS(to, from, emergencyResponse)
      return
    }

    // Process through RAG system
    const ragResponse = processRAGQuery({
      query: message,
      language,
    })

    // Generate AI response
    const { text: aiResponse } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: ragResponse.generatedPrompt,
      maxTokens: 800, // Shorter for SMS
      temperature: 0.3,
    })

    // Keep SMS responses concise
    let smsResponse = aiResponse
    if (smsResponse.length > 1500) {
      smsResponse = smsResponse.substring(0, 1500) + "... (continued online)"
    }

    // Add source count if available
    if (ragResponse.retrievedDocuments.length > 0) {
      smsResponse += `\n\n📚 Based on ${ragResponse.retrievedDocuments.length} medical source(s)`
    }

    await sendSMS(to, from, smsResponse)
  } catch (error) {
    console.error("Error handling SMS message:", error)
    await sendSMS(
      to,
      from,
      "I'm sorry, I'm having trouble processing your message. Please try again later or visit our website.",
    )
  }
}

async function sendSMS(from: string, to: string, message: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN

  if (!accountSid || !authToken) {
    console.error("Twilio credentials not configured")
    return
  }

  try {
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        From: from,
        To: to,
        Body: message,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("Twilio API error:", error)
    }
  } catch (error) {
    console.error("Error sending SMS:", error)
  }
}

function detectLanguage(text: string): "en" | "hi" | "te" | "ta" | "or" | "kn" {
  // Updated return type
  // Simple language detection based on character sets
  const hindiPattern = /[\u0900-\u097F]/
  const teluguPattern = /[\u0C00-\u0C7F]/
  const tamilPattern = /[\u0B80-\u0BFF]/
  const odiaPattern = /[\u0B00-\u0B7F]/
  const kannadaPattern = /[\u0C80-\u0CFF]/

  if (teluguPattern.test(text)) return "te"
  if (hindiPattern.test(text)) return "hi"
  if (tamilPattern.test(text)) return "ta"
  if (odiaPattern.test(text)) return "or"
  if (kannadaPattern.test(text)) return "kn"
  return "en"
}

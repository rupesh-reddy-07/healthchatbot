import { type NextRequest, NextResponse } from "next/server"
import { processRAGQuery, isMedicalEmergency, generateEmergencyResponse } from "@/lib/rag-system"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

// WhatsApp webhook verification
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "health_bot_verify_token"

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WhatsApp webhook verified")
    return new Response(challenge, { status: 200 })
  }

  return new Response("Forbidden", { status: 403 })
}

// WhatsApp message handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Process WhatsApp webhook payload
    if (body.object === "whatsapp_business_account") {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.field === "messages") {
            const messages = change.value.messages
            if (messages) {
              for (const message of messages) {
                await handleWhatsAppMessage(message, change.value.metadata.phone_number_id)
              }
            }
          }
        }
      }
    }

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("WhatsApp webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function handleWhatsAppMessage(message: any, phoneNumberId: string) {
  try {
    const { from, text, type } = message

    if (type !== "text") {
      await sendWhatsAppMessage(phoneNumberId, from, "I can only process text messages at the moment.")
      return
    }

    if (!process.env.OPENAI_API_KEY) {
      await sendWhatsAppMessage(
        phoneNumberId,
        from,
        "The AI service is not configured. Please try again later or use the web chat.",
      )
      return
    }

    const userMessage = text.body
    const language = detectLanguage(userMessage) // Simple language detection

    // Check for emergency
    if (isMedicalEmergency(userMessage)) {
      const emergencyResponse = generateEmergencyResponse(language)
      await sendWhatsAppMessage(phoneNumberId, from, emergencyResponse)
      return
    }

    // Process through RAG system
    const ragResponse = processRAGQuery({
      query: userMessage,
      language,
    })

    // Generate AI response
    const { text: aiResponse } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: ragResponse.generatedPrompt,
      maxTokens: 1000,
      temperature: 0.3,
    })

    // Add source information if available
    let responseWithSources = aiResponse
    if (ragResponse.retrievedDocuments.length > 0) {
      const sources = ragResponse.retrievedDocuments
        .slice(0, 3)
        .map((doc) => `• ${doc.title}`)
        .join("\n")
      responseWithSources += `\n\n📚 Sources:\n${sources}`
    }

    await sendWhatsAppMessage(phoneNumberId, from, responseWithSources)
  } catch (error) {
    console.error("Error handling WhatsApp message:", error)
    await sendWhatsAppMessage(
      phoneNumberId,
      message.from,
      "I'm sorry, I'm having trouble processing your message. Please try again later.",
    )
  }
}

async function sendWhatsAppMessage(phoneNumberId: string, to: string, message: string) {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN

  if (!accessToken) {
    console.error("WhatsApp access token not configured")
    return
  }

  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: {
          body: message,
        },
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("WhatsApp API error:", error)
    }
  } catch (error) {
    console.error("Error sending WhatsApp message:", error)
  }
}

function detectLanguage(text: string): "en" | "hi" | "te" | "ta" | "or" | "kn" {
  // Updated return type
  // Simple language detection based on character sets
  const hindiPattern = /[\u0900-\u097F]/
  const teluguPattern = /[\u0C00-\u0C7F]/
  const tamilPattern = /[\u0B80-\u0BFF]/ // Added Unicode patterns for new languages
  const odiaPattern = /[\u0B00-\u0B7F]/
  const kannadaPattern = /[\u0C80-\u0CFF]/

  if (teluguPattern.test(text)) return "te"
  if (hindiPattern.test(text)) return "hi"
  if (tamilPattern.test(text)) return "ta" // Added detection for new languages
  if (odiaPattern.test(text)) return "or"
  if (kannadaPattern.test(text)) return "kn"
  return "en"
}

export const dynamic = "force-dynamic"

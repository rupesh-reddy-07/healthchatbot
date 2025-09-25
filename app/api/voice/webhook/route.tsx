import type { NextRequest } from "next/server"
import { processRAGQuery, isMedicalEmergency, generateEmergencyResponse } from "@/lib/rag-system"
import { formatResponseForChannel } from "@/lib/channel-adapters"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

// Voice webhook handler (Twilio Voice)
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const speechResult = formData.get("SpeechResult") as string
    const from = formData.get("From") as string
    const callSid = formData.get("CallSid") as string

    if (!speechResult || !from) {
      return generateVoiceResponse("I didn't understand that. Please try again.")
    }

    const language = detectLanguage(speechResult)

    // Check for emergency
    if (isMedicalEmergency(speechResult)) {
      const emergencyResponse = generateEmergencyResponse(language)
      return generateVoiceResponse(emergencyResponse)
    }

    // Process through RAG system
    const ragResponse = processRAGQuery({
      query: speechResult,
      language,
    })

    // Generate AI response
    const { text: aiResponse } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: ragResponse.generatedPrompt,
      maxTokens: 600, // Shorter for voice
      temperature: 0.3,
    })

    // Format for voice channel
    const voiceResponse = formatResponseForChannel(aiResponse, "voice", ragResponse.retrievedDocuments)

    return generateVoiceResponse(voiceResponse.content)
  } catch (error) {
    console.error("Voice webhook error:", error)
    return generateVoiceResponse("I'm sorry, I'm having trouble processing your request. Please try again.")
  }
}

function generateVoiceResponse(message: string) {
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice" language="en-US">${message}</Say>
    <Gather input="speech" action="/api/voice/webhook" method="POST" speechTimeout="3">
        <Say voice="alice">You can ask me another health question, or say goodbye to end the call.</Say>
    </Gather>
    <Say voice="alice">Thank you for using HealthBot. Take care!</Say>
</Response>`

  return new Response(twiml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}

function detectLanguage(text: string): "en" | "hi" | "te" | "ta" | "or" | "kn" {
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

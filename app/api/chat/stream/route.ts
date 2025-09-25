import type { NextRequest } from "next/server"
import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import { processRAGQuery, isMedicalEmergency, generateEmergencyResponse } from "@/lib/rag-system"

export const maxDuration = 30

export async function POST(request: NextRequest) {
  try {
    const { message, language = "en", location, userContext } = await request.json()

    // Check for medical emergencies first
    if (isMedicalEmergency(message)) {
      const emergencyResponse = generateEmergencyResponse(language)
      return new Response(emergencyResponse, {
        headers: { "Content-Type": "text/plain" },
      })
    }

    // Process query through RAG system
    const ragResponse = processRAGQuery({
      query: message,
      language,
      location,
      userContext,
    })

    // Stream AI response using retrieved context
    const result = streamText({
      model: openai("gpt-4o-mini"),
      prompt: ragResponse.generatedPrompt,
      maxTokens: 1000,
      temperature: 0.3,
    })

    return result.toTextStreamResponse({
      headers: {
        "X-Retrieved-Sources": JSON.stringify(ragResponse.retrievedDocuments.map((doc) => doc.title)),
        "X-Context-Used": ragResponse.retrievedDocuments.length > 0 ? "true" : "false",
      },
    })
  } catch (error) {
    console.error("Stream chat API error:", error)
    return new Response("Error processing request", { status: 500 })
  }
}

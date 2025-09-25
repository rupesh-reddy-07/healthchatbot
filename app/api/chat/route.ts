import { type NextRequest, NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { processRAGQuery, isMedicalEmergency, generateEmergencyResponse } from "@/lib/rag-system"

export const maxDuration = 30

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          message: "AI service is not configured. Please set up an AI integration in your project settings.",
          error: "Missing API configuration",
          timestamp: new Date().toISOString(),
        },
        { status: 503 },
      )
    }

    const { message, language = "en", location, userContext } = await request.json()

    if (isMedicalEmergency(message)) {
      const emergencyResponse = generateEmergencyResponse(language)
      return NextResponse.json({
        message: emergencyResponse,
        language,
        timestamp: new Date().toISOString(),
        isEmergency: true,
        sources: [],
      })
    }

    const ragResponse = processRAGQuery({
      query: message,
      language,
      location,
      userContext,
    })

    const systemPrompt = `You are a helpful and informative AI health assistant. Your primary goal is to provide accurate, health-aware information based on verified medical knowledge.
    When responding to user queries, always adhere to the following guidelines:
    1.  **Explain the condition:** Clearly describe any medical conditions mentioned or inferred in the user's query.
    2.  **Provide awareness:** Offer relevant information to increase the user's understanding of the condition, its causes, symptoms, and potential impacts.
    3.  **Suggest prevention:** Include actionable advice on how to prevent the condition or manage its risk factors.
    4.  **Offer general tips:** Provide general health and wellness tips related to the query.
    5.  **Maintain a helpful and empathetic tone:** Be supportive and understanding in your responses.
    6.  **Format for readability:** Use bullet points, bold text, and clear paragraphs to make the information easy to digest.
    7.  **Always include the disclaimer:** Conclude every non-emergency response with the following disclaimer: "Disclaimer: This information is for general knowledge and informational purposes only, and does not constitute medical advice. Always consult with a qualified healthcare professional for any health concerns or before making any decisions related to your health or treatment."
    `

    const fullPrompt = `${systemPrompt}\n\n${ragResponse.generatedPrompt}`

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: fullPrompt,
      maxTokens: 1000,
      temperature: 0.3,
    })

    const response = {
      message: text,
      language,
      timestamp: new Date().toISOString(),
      isEmergency: false,
      sources: ragResponse.retrievedDocuments.map((doc) => ({
        title: doc.title,
        category: doc.category,
        tags: doc.tags,
      })),
      retrievedContext: ragResponse.context,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Chat API error:", error)

    const errorMessages = {
      en: "I'm sorry, I'm having trouble processing your request right now. Please try again or consult a healthcare professional.",
      hi: "मुझे खुशी है, मुझे अभी आपके अनुरोध को संसाधित करने में परेशानी हो रही है। कृपया पुनः प्रयास करें या किसी स्वास्थ्य पेशेवर से सलाह लें।",
      te: "క్షమించండి, ప్రస్తుతం మీ అభ్యర్థనాను ప్రాసెస్ చేయడంలో నాకు ఇబ్బంది ఉంది. దయచేసి మళ్లీ ప్రయత్నించండి లేదా ఆరోగ్య నిపుణుడిని సంప్రదించండి।",
    }

    const language = request.headers.get("accept-language")?.includes("hi")
      ? "hi"
      : request.headers.get("accept-language")?.includes("te")
        ? "te"
        : "en"

    return NextResponse.json(
      {
        message: errorMessages[language as keyof typeof errorMessages],
        error: "Internal server error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

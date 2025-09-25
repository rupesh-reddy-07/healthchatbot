import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { NextResponse } from "next/server"
import { MessagingResponse, validateRequest } from "twilio/lib/webhooks"

export async function POST(request: Request) {
  const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN
  const url = request.url
  const requestBody = await request.text() // Read body as text for validation

  if (!twilioAuthToken) {
    console.error("[v0] TWILIO_AUTH_TOKEN is not set.")
    return new NextResponse("Server configuration error.", { status: 500 })
  }

  const signature = request.headers.get("x-twilio-signature")
  if (!signature) {
    console.error("[v0] Missing Twilio signature header.")
    return new NextResponse("Unauthorized: Missing signature.", { status: 401 })
  }

  const isValid = validateRequest(twilioAuthToken, signature, url, requestBody)

  if (!isValid) {
    console.error("[v0] Invalid Twilio signature.")
    return new NextResponse("Unauthorized: Invalid signature.", { status: 401 })
  }

  try {
    // Parse formData after validation, as request.text() consumes the body
    const formData = new URLSearchParams(requestBody)
    const incomingMessage = formData.get("Body")?.toString() || ""
    // const from = formData.get("From")?.toString() || ""; // PII, not logging directly

    const { text } = await generateText({
      model: openai("gpt-4o-mini"), // Using a smaller, faster model for SMS
      prompt: `The user is asking a health-related question via SMS. Respond in a supportive, professional, and easy-to-understand tone.
      
      Guidelines:
      1. First, explain the condition in simple terms.
      2. Then, give clear awareness information: what it is, how it spreads (if applicable), and who is at risk.
      3. Provide prevention tips: lifestyle changes, hygiene practices, vaccination (if available), diet, exercise, and early warning signs.
      4. Emphasize that this is general awareness, not a medical diagnosis, and recommend consulting a healthcare professional for personal concerns.
      
      Format: Use bullet points or short paragraphs for clarity. Keep responses concise for SMS.
      Avoid: Giving prescriptions, dosage details, or direct medical treatments.
      
      User's message: "${incomingMessage}"`,
    })

    let responseText = text
    const disclaimer =
      "\n\nDisclaimer: This is general awareness, not medical advice. Consult a healthcare professional for personal concerns."
    const maxSmsLength = 1600 // Standard SMS segment limit is 160 characters, but Twilio supports concatenation up to 1600.

    if ((responseText + disclaimer).length > maxSmsLength) {
      responseText = responseText.substring(0, maxSmsLength - disclaimer.length - 3) + "..." // Truncate and add ellipsis
    }
    responseText += disclaimer

    const twiml = new MessagingResponse()
    twiml.message(responseText)

    return new NextResponse(twiml.toString(), {
      headers: {
        "Content-Type": "text/xml",
      },
    })
  } catch (error) {
    console.error("[v0] Error in Twilio SMS route:", error)
    const twiml = new MessagingResponse()
    twiml.message("Sorry, I'm having trouble responding right now. Please try again later.")
    return new NextResponse(twiml.toString(), {
      headers: {
        "Content-Type": "text/xml",
      },
      status: 500,
    })
  }
}

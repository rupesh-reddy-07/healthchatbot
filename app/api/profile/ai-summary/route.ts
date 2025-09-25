import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { fileName, fileType, doctorName, hospitalName, uploadDate } = await request.json()

    if (!fileName) {
      return NextResponse.json({ error: "File name required" }, { status: 400 })
    }

    // Generate AI summary based on file information
    const prompt = `Generate a brief 2-line medical summary for a healthcare document with the following details:
    - File name: ${fileName}
    - File type: ${fileType || "medical document"}
    - Doctor: ${doctorName || "Not specified"}
    - Hospital: ${hospitalName || "Not specified"}
    - Upload date: ${uploadDate}
    
    Create a realistic medical summary that would be helpful for patients and healthcare providers. Keep it concise and professional.`

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
      temperature: 0.3,
      maxTokens: 100,
    })

    return NextResponse.json({
      success: true,
      summary: text.trim(),
    })
  } catch (error) {
    console.error("AI Summary error:", error)
    return NextResponse.json({ error: "Failed to generate AI summary" }, { status: 500 })
  }
}

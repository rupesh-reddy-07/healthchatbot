import { type NextRequest, NextResponse } from "next/server"
import { retrieveRelevantDocuments } from "@/lib/medical-knowledge"

export async function POST(request: NextRequest) {
  try {
    const { query, language = "en", limit = 5 } = await request.json()

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    // Retrieve relevant medical documents
    const documents = retrieveRelevantDocuments(query, language, limit)

    return NextResponse.json({
      query,
      language,
      documents: documents.map((doc) => ({
        id: doc.id,
        title: doc.title,
        content: doc.content,
        category: doc.category,
        tags: doc.tags,
      })),
      count: documents.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Medical search API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

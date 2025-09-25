import { type NextRequest, NextResponse } from "next/server"

// Mock database - in production, use a real database
let mockFiles = [
  {
    id: "1",
    name: "Aadhaar_Card.pdf",
    type: "government",
    category: "Aadhaar Card",
    uploadDate: "2024-01-15",
    size: "2.1 MB",
  },
  {
    id: "2",
    name: "Arogyasri_Card.pdf",
    type: "government",
    category: "Arogyasri Card",
    uploadDate: "2024-01-20",
    size: "1.8 MB",
  },
  {
    id: "3",
    name: "Blood_Test_Report.pdf",
    type: "medical",
    uploadDate: "2024-02-10",
    size: "3.2 MB",
    aiSummary:
      "Blood test conducted at Apollo Hospital on 10 Feb 2024. Normal glucose levels, slight vitamin D deficiency noted.",
    doctorName: "Dr. Priya Sharma",
    hospitalName: "Apollo Hospital",
  },
  {
    id: "4",
    name: "Prescription_Fever.pdf",
    type: "medical",
    uploadDate: "2024-02-28",
    size: "1.5 MB",
    aiSummary: "Consulted Dr. Ramesh for Fever on 28 Feb 2024. Prescribed Paracetamol and rest for 3 days.",
    doctorName: "Dr. Ramesh Reddy",
    hospitalName: "Government Hospital",
  },
]

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      files: mockFiles,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const fileId = searchParams.get("id")

    if (!fileId) {
      return NextResponse.json({ error: "File ID required" }, { status: 400 })
    }

    // Remove file from mock database
    mockFiles = mockFiles.filter((file) => file.id !== fileId)

    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 })
  }
}

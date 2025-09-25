import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const type = formData.get("type") as string
    const doctorName = formData.get("doctorName") as string
    const hospitalName = formData.get("hospitalName") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File too large" }, { status: 400 })
    }

    // In a real application, you would:
    // 1. Upload file to cloud storage (AWS S3, Google Cloud, etc.)
    // 2. Save file metadata to database
    // 3. Generate AI summary for medical files
    // 4. Return file URL and metadata

    // Simulate file processing
    const fileId = Date.now().toString()
    const fileName = file.name
    const fileSize = `${(file.size / 1024 / 1024).toFixed(1)} MB`
    const uploadDate = new Date().toISOString().split("T")[0]

    // Generate AI summary for medical files
    let aiSummary = ""
    if (type === "medical") {
      // Simulate AI analysis
      aiSummary = `Medical document uploaded on ${new Date().toLocaleDateString()}. AI analysis will be completed shortly.`
      if (doctorName) {
        aiSummary += ` Consulted with ${doctorName}.`
      }
      if (hospitalName) {
        aiSummary += ` Treatment at ${hospitalName}.`
      }
    }

    const fileRecord = {
      id: fileId,
      name: fileName,
      type,
      uploadDate,
      size: fileSize,
      ...(type === "medical" && {
        aiSummary,
        doctorName: doctorName || "",
        hospitalName: hospitalName || "",
      }),
    }

    return NextResponse.json({
      success: true,
      file: fileRecord,
      message: "File uploaded successfully",
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}

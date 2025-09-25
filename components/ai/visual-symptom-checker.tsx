"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Camera, Eye, AlertTriangle, CheckCircle, Brain, ImageIcon } from "lucide-react"

interface VisualAnalysis {
  id: string
  imageUrl: string
  analysis: {
    condition: string
    confidence: number
    description: string
    recommendations: string[]
    urgency: "low" | "medium" | "high"
    similarConditions: string[]
  }
  timestamp: Date
}

const mockAnalyses: VisualAnalysis[] = [
  {
    id: "1",
    imageUrl: "/skin-rash.jpg",
    analysis: {
      condition: "Contact Dermatitis",
      confidence: 85,
      description: "Appears to be an allergic reaction causing redness and inflammation of the skin.",
      recommendations: [
        "Avoid known allergens",
        "Apply cool compress to reduce inflammation",
        "Use over-the-counter antihistamines",
        "Consult dermatologist if symptoms persist",
      ],
      urgency: "medium",
      similarConditions: ["Eczema", "Allergic Reaction", "Heat Rash"],
    },
    timestamp: new Date(),
  },
]

export function VisualSymptomChecker() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [description, setDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyses, setAnalyses] = useState<VisualAnalysis[]>(mockAnalyses)
  const [currentAnalysis, setCurrentAnalysis] = useState<VisualAnalysis | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis: VisualAnalysis = {
        id: Date.now().toString(),
        imageUrl: imagePreview!,
        analysis: {
          condition: "Possible Skin Irritation",
          confidence: 78,
          description:
            "The image shows signs of skin irritation with redness and possible inflammation. This could be due to various factors including allergic reactions, infections, or environmental irritants.",
          recommendations: [
            "Keep the area clean and dry",
            "Avoid scratching or rubbing the affected area",
            "Apply a gentle, fragrance-free moisturizer",
            "Monitor for changes in size, color, or symptoms",
            "Consult a healthcare provider if symptoms worsen",
          ],
          urgency: "medium",
          similarConditions: ["Contact Dermatitis", "Eczema", "Fungal Infection", "Heat Rash"],
        },
        timestamp: new Date(),
      }

      setAnalyses([mockAnalysis, ...analyses])
      setCurrentAnalysis(mockAnalysis)
      setIsAnalyzing(false)
      setSelectedImage(null)
      setImagePreview(null)
      setDescription("")
    }, 3000)
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "Seek immediate medical attention"
      case "medium":
        return "Consider consulting a healthcare provider"
      case "low":
        return "Monitor and follow general care guidelines"
      default:
        return "Unknown urgency"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Visual Symptom Checker</h2>
        <p className="text-muted-foreground">
          Upload images of skin conditions, rashes, or other visible symptoms for AI analysis
        </p>
      </div>

      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-700">
          <strong>Medical Disclaimer:</strong> This AI analysis is for informational purposes only and should not
          replace professional medical diagnosis. Always consult healthcare providers for proper medical evaluation.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              Upload Image for Analysis
            </CardTitle>
            <CardDescription>Take a photo or upload an image of the affected area</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image-upload">Select Image</Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="cursor-pointer"
              />
            </div>

            {imagePreview && (
              <div className="space-y-2">
                <Label>Image Preview</Label>
                <div className="border rounded-lg p-4">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="max-w-full h-48 object-contain mx-auto rounded"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="description">Additional Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Describe any symptoms, pain level, duration, or other relevant details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <Button onClick={analyzeImage} disabled={!selectedImage || isAnalyzing} className="w-full">
              {isAnalyzing ? (
                <>
                  <Brain className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing Image...
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Analyze Image
                </>
              )}
            </Button>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Ensure good lighting and clear image quality</p>
              <p>• Include a ruler or coin for size reference if possible</p>
              <p>• Avoid blurry or heavily filtered images</p>
            </div>
          </CardContent>
        </Card>

        {currentAnalysis && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-secondary" />
                AI Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{currentAnalysis.analysis.condition}</h3>
                <Badge variant="outline" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  {currentAnalysis.analysis.confidence}% confidence
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getUrgencyColor(currentAnalysis.analysis.urgency)}`} />
                <span className="text-sm font-medium">{getUrgencyText(currentAnalysis.analysis.urgency)}</span>
              </div>

              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{currentAnalysis.analysis.description}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Recommendations</h4>
                <ul className="space-y-1">
                  {currentAnalysis.analysis.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Similar Conditions</h4>
                <div className="flex flex-wrap gap-2">
                  {currentAnalysis.analysis.similarConditions.map((condition, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {analyses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              Previous Analyses
            </CardTitle>
            <CardDescription>Your recent visual symptom analyses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="border rounded-lg p-3 cursor-pointer hover:bg-muted"
                  onClick={() => setCurrentAnalysis(analysis)}
                >
                  <img
                    src={analysis.imageUrl || "/placeholder.svg"}
                    alt="Analysis"
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{analysis.analysis.condition}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {analysis.analysis.confidence}%
                      </Badge>
                      <div className={`w-2 h-2 rounded-full ${getUrgencyColor(analysis.analysis.urgency)}`} />
                    </div>
                    <p className="text-xs text-muted-foreground">{analysis.timestamp.toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

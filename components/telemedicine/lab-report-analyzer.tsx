"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, AlertTriangle, CheckCircle, TrendingUp, TrendingDown } from "lucide-react"

interface LabResult {
  parameter: string
  value: number
  unit: string
  normalRange: string
  status: "normal" | "high" | "low" | "critical"
  description: string
  recommendations: string[]
}

interface LabReport {
  id: string
  patientName: string
  testDate: Date
  reportType: string
  results: LabResult[]
  overallRisk: "low" | "moderate" | "high"
  summary: string
}

const sampleLabResults: LabResult[] = [
  {
    parameter: "Hemoglobin",
    value: 11.5,
    unit: "g/dL",
    normalRange: "12.0-15.5",
    status: "low",
    description: "Hemoglobin carries oxygen in your blood. Low levels may indicate anemia.",
    recommendations: [
      "Include iron-rich foods like spinach, lentils, and lean meat",
      "Consider iron supplements after consulting a doctor",
      "Get adequate vitamin C to improve iron absorption",
    ],
  },
  {
    parameter: "Blood Sugar (Fasting)",
    value: 110,
    unit: "mg/dL",
    normalRange: "70-100",
    status: "high",
    description: "Slightly elevated fasting glucose may indicate pre-diabetes risk.",
    recommendations: [
      "Reduce refined sugar and carbohydrate intake",
      "Increase physical activity to 30 minutes daily",
      "Monitor blood sugar regularly",
      "Consult an endocrinologist for detailed evaluation",
    ],
  },
  {
    parameter: "Total Cholesterol",
    value: 180,
    unit: "mg/dL",
    normalRange: "<200",
    status: "normal",
    description: "Your cholesterol levels are within the healthy range.",
    recommendations: ["Maintain current healthy diet", "Continue regular exercise", "Recheck annually"],
  },
  {
    parameter: "Vitamin D",
    value: 15,
    unit: "ng/mL",
    normalRange: "30-100",
    normalRange: "30-100",
    status: "low",
    description: "Vitamin D deficiency can affect bone health and immune function.",
    recommendations: [
      "Get 15-20 minutes of sunlight exposure daily",
      "Include vitamin D rich foods like fatty fish and fortified milk",
      "Consider vitamin D3 supplements",
      "Retest after 3 months of supplementation",
    ],
  },
]

export function LabReportAnalyzer() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [labReport, setLabReport] = useState<LabReport | null>(null)
  const [manualEntry, setManualEntry] = useState(false)
  const [manualData, setManualData] = useState({
    parameter: "",
    value: "",
    unit: "",
    normalRange: "",
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const analyzeReport = async () => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const report: LabReport = {
        id: Date.now().toString(),
        patientName: "Sample Patient",
        testDate: new Date(),
        reportType: "Complete Blood Count + Metabolic Panel",
        results: sampleLabResults,
        overallRisk: "moderate",
        summary:
          "Your lab results show some areas that need attention. You have mild anemia and slightly elevated blood sugar, but your cholesterol levels are good. Focus on improving iron intake and managing blood sugar through diet and exercise.",
      }

      setLabReport(report)
      setIsAnalyzing(false)
      setAnalysisComplete(true)
    }, 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-600 bg-green-50 border-green-200"
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "low":
        return "text-blue-600 bg-blue-50 border-blue-200"
      case "critical":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "high":
        return <TrendingUp className="h-4 w-4 text-orange-600" />
      case "low":
        return <TrendingDown className="h-4 w-4 text-blue-600" />
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-500"
      case "moderate":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Lab Report Analyzer</h2>
        <p className="text-muted-foreground">Upload your lab reports for AI-powered analysis and recommendations</p>
      </div>

      {!analysisComplete ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Upload Lab Report
              </CardTitle>
              <CardDescription>Upload your lab report PDF or image file for instant analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Drop your lab report here</p>
                  <p className="text-sm text-muted-foreground">Supports PDF, JPG, PNG files up to 10MB</p>
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="max-w-xs mx-auto"
                  />
                </div>
              </div>

              {uploadedFile && (
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <FileText className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <Button onClick={analyzeReport} disabled={isAnalyzing}>
                    {isAnalyzing ? "Analyzing..." : "Analyze Report"}
                  </Button>
                </div>
              )}

              {isAnalyzing && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <span className="text-sm">AI is analyzing your lab report...</span>
                  </div>
                  <Progress value={66} className="w-full" />
                  <p className="text-xs text-muted-foreground">
                    This may take a few moments. We're extracting data and comparing with normal ranges.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manual Entry</CardTitle>
              <CardDescription>Don't have a digital report? Enter your lab values manually</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={() => setManualEntry(!manualEntry)} className="w-full">
                {manualEntry ? "Hide Manual Entry" : "Enter Values Manually"}
              </Button>

              {manualEntry && (
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="parameter">Test Parameter</Label>
                    <Input
                      id="parameter"
                      value={manualData.parameter}
                      onChange={(e) => setManualData({ ...manualData, parameter: e.target.value })}
                      placeholder="e.g., Hemoglobin"
                    />
                  </div>
                  <div>
                    <Label htmlFor="value">Value</Label>
                    <Input
                      id="value"
                      value={manualData.value}
                      onChange={(e) => setManualData({ ...manualData, value: e.target.value })}
                      placeholder="e.g., 12.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Input
                      id="unit"
                      value={manualData.unit}
                      onChange={(e) => setManualData({ ...manualData, unit: e.target.value })}
                      placeholder="e.g., g/dL"
                    />
                  </div>
                  <div>
                    <Label htmlFor="normalRange">Normal Range</Label>
                    <Input
                      id="normalRange"
                      value={manualData.normalRange}
                      onChange={(e) => setManualData({ ...manualData, normalRange: e.target.value })}
                      placeholder="e.g., 12.0-15.5"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Lab Report Analysis
                <Badge className={`${getRiskColor(labReport?.overallRisk || "low")} text-white`}>
                  {labReport?.overallRisk} Risk
                </Badge>
              </CardTitle>
              <CardDescription>
                Report Date: {labReport?.testDate.toLocaleDateString()} | Type: {labReport?.reportType}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>AI Analysis Summary:</strong> {labReport?.summary}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Detailed Results</h3>
            {labReport?.results.map((result, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(result.status)}
                      <h4 className="font-semibold">{result.parameter}</h4>
                    </div>
                    <Badge className={getStatusColor(result.status)}>{result.status}</Badge>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Your Value</p>
                      <p className="text-lg font-bold text-primary">
                        {result.value} {result.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Normal Range</p>
                      <p className="font-medium">
                        {result.normalRange} {result.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p
                        className={`font-medium capitalize ${
                          result.status === "normal"
                            ? "text-green-600"
                            : result.status === "high"
                              ? "text-orange-600"
                              : result.status === "low"
                                ? "text-blue-600"
                                : "text-red-600"
                        }`}
                      >
                        {result.status}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">What this means:</p>
                      <p className="text-sm">{result.description}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Recommendations:</p>
                      <ul className="text-sm space-y-1">
                        {result.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => {
                setAnalysisComplete(false)
                setUploadedFile(null)
                setLabReport(null)
              }}
            >
              Analyze Another Report
            </Button>
            <Button variant="outline">Download Analysis Report</Button>
            <Button variant="outline">Share with Doctor</Button>
          </div>
        </div>
      )}
    </div>
  )
}

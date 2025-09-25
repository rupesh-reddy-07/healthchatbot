"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VisualSymptomChecker } from "@/components/ai/visual-symptom-checker"
import { FamilyHealthProfiles } from "@/components/ai/family-health-profiles"
import { Camera, Users, Brain, Mic } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AIAssistantPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">AI Health Assistant</h1>
        <p className="text-muted-foreground">
          Advanced AI-powered tools for visual symptom analysis and family health management
        </p>
      </div>

      <Tabs defaultValue="visual" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="visual" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Visual Analysis
          </TabsTrigger>
          <TabsTrigger value="family" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Family Profiles
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex items-center gap-2">
            <Mic className="h-4 w-4" />
            Voice Assistant
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="visual">
          <VisualSymptomChecker />
        </TabsContent>

        <TabsContent value="family">
          <FamilyHealthProfiles />
        </TabsContent>

        <TabsContent value="voice">
          <Card>
            <CardHeader>
              <CardTitle>Voice-Based Health Assistant</CardTitle>
              <CardDescription>Coming soon - voice-powered health consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This section will include voice-based symptom reporting, medication reminders, and health consultations
                in multiple languages for better accessibility.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>AI Health Insights</CardTitle>
              <CardDescription>Coming soon - predictive health analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This section will provide AI-powered health predictions, risk assessments, and personalized health
                recommendations based on your family's health data.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

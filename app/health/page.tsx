"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NutritionPlanner } from "@/components/health/nutrition-planner"
import { SymptomTracker } from "@/components/health/symptom-tracker"
import { Utensils, Activity, Heart, TrendingUp } from "lucide-react"

export default function HealthPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Health Management</h1>
        <p className="text-muted-foreground">
          Comprehensive tools to track and improve your health with AI-powered insights
        </p>
      </div>

      <Tabs defaultValue="nutrition" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="nutrition" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            Nutrition
          </TabsTrigger>
          <TabsTrigger value="symptoms" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Symptoms
          </TabsTrigger>
          <TabsTrigger value="wellness" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Wellness
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="nutrition">
          <NutritionPlanner />
        </TabsContent>

        <TabsContent value="symptoms">
          <SymptomTracker />
        </TabsContent>

        <TabsContent value="wellness">
          <Card>
            <CardHeader>
              <CardTitle>Wellness Dashboard</CardTitle>
              <CardDescription>Coming soon - comprehensive wellness tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This section will include medication reminders, exercise tracking, sleep analysis, and mental health
                monitoring.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Health Analytics</CardTitle>
              <CardDescription>Coming soon - detailed health insights and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This section will show health trends, progress tracking, and predictive health insights based on your
                data.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

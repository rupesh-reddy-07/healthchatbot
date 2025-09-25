"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HealthDashboard } from "@/components/analytics/health-dashboard"
import { ProgressTracker } from "@/components/analytics/progress-tracker"
import { TrendingUp, Target, BarChart3, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Health Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive health tracking with progress monitoring and goal achievement
        </p>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Goals & Progress
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <HealthDashboard />
        </TabsContent>

        <TabsContent value="progress">
          <ProgressTracker />
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Health Trends Analysis</CardTitle>
              <CardDescription>Coming soon - advanced trend analysis and predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This section will include predictive analytics, seasonal health patterns, and long-term trend analysis
                based on your health data.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Health Reports</CardTitle>
              <CardDescription>Coming soon - comprehensive health reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This section will generate detailed health reports for sharing with healthcare providers, including
                progress summaries and health insights.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

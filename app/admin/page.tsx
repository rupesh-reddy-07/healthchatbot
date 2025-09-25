"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { AdminStats } from "@/components/admin/admin-stats"
import { AlertManagement } from "@/components/admin/alert-management"
import { ResourceManagement } from "@/components/admin/resource-management"
import { UserManagement } from "@/components/admin/user-management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Users, FileText, BarChart3, Settings, RefreshCw } from "lucide-react"
import type { AIGeneratedActivity, AIGeneratedSystemStatus } from "@/lib/ai-content-generator"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [aiActivities, setAiActivities] = useState<AIGeneratedActivity[]>([])
  const [aiSystemStatus, setAiSystemStatus] = useState<AIGeneratedSystemStatus[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [useAI, setUseAI] = useState(false)

  const fetchAIAdminData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/ai-content/admin-data?type=all")
      const result = await response.json()

      if (result.success) {
        setAiActivities(result.data.activities || [])
        setAiSystemStatus(result.data.systemStatus || [])
        setUseAI(true)
      } else {
        console.error("Failed to generate AI admin data:", result.error)
      }
    } catch (error) {
      console.error("Error fetching AI admin data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAIAdminData()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-balance">Admin Dashboard</h1>
            <Button onClick={fetchAIAdminData} disabled={isLoading} variant="outline" size="sm">
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              {isLoading ? "Updating..." : "Refresh Data"}
            </Button>
          </div>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl">
            Manage health alerts, resources, and monitor system usage.
            {useAI && " Dashboard powered by AI-generated real-time insights."}
          </p>
        </div>

        {useAI && (
          <Card className="mb-6 border-purple-200 bg-purple-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-purple-700 font-medium">
                  AI-Powered Dashboard - Real-time system insights and activity monitoring
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Admin Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <AdminStats />
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    {useAI
                      ? "AI-generated system activities and user interactions"
                      : "Latest system activities and user interactions"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(useAI && aiActivities.length > 0
                      ? aiActivities.slice(0, 5)
                      : [
                          {
                            id: "1",
                            type: "alert",
                            title: "New outbreak alert published",
                            description: "2 hours ago",
                            timestamp: new Date(),
                            icon: "AlertTriangle",
                          },
                          {
                            id: "2",
                            type: "chat",
                            title: "150 new chat interactions",
                            description: "Today",
                            timestamp: new Date(),
                            icon: "Users",
                          },
                          {
                            id: "3",
                            type: "resource",
                            title: "Resource updated: Vaccination Guide",
                            description: "Yesterday",
                            timestamp: new Date(),
                            icon: "FileText",
                          },
                        ]
                    ).map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        {activity.icon === "AlertTriangle" ? (
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                        ) : null}
                        {activity.icon === "Users" ? <Users className="h-4 w-4 text-primary" /> : null}
                        {activity.icon === "FileText" ? <FileText className="h-4 w-4 text-secondary" /> : null}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>
                    {useAI ? "AI-monitored system health and performance" : "Current system health and performance"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(useAI && aiSystemStatus.length > 0
                      ? aiSystemStatus.slice(0, 4)
                      : [
                          { service: "Chat Service", status: "online", uptime: "99.9%", lastCheck: new Date() },
                          { service: "Alert System", status: "online", uptime: "99.8%", lastCheck: new Date() },
                          { service: "Database", status: "online", uptime: "100%", lastCheck: new Date() },
                          { service: "API Services", status: "degraded", uptime: "97.2%", lastCheck: new Date() },
                        ]
                    ).map((status) => (
                      <div key={status.service} className="flex items-center justify-between">
                        <span className="text-sm">{status.service}</span>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              status.status === "online"
                                ? "bg-green-500"
                                : status.status === "degraded"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          ></div>
                          <span
                            className={`text-sm ${
                              status.status === "online"
                                ? "text-green-600"
                                : status.status === "degraded"
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            {status.status === "online"
                              ? "Online"
                              : status.status === "degraded"
                                ? "Degraded"
                                : "Offline"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <AlertManagement />
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <ResourceManagement />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UserManagement />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system-wide settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Default Language</label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                          <SelectItem value="te">Telugu</SelectItem>
                          <SelectItem value="ta">Tamil</SelectItem>
                          <SelectItem value="or">Odia</SelectItem>
                          <SelectItem value="kn">Kannada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Alert Retention (days)</label>
                      <Input type="number" defaultValue="30" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Chat Session Timeout (minutes)</label>
                      <Input type="number" defaultValue="30" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Emergency Contact</label>
                      <Input defaultValue="108" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Support Email</label>
                      <Input type="email" defaultValue="support@healthbot.gov.in" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Max File Upload Size (MB)</label>
                      <Input type="number" defaultValue="10" />
                    </div>
                  </div>
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Usage Analytics</CardTitle>
                  <CardDescription>System usage and user engagement metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Analytics chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alert Effectiveness</CardTitle>
                  <CardDescription>Alert reach and engagement statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Alert metrics chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Activity, MapPin, Clock, RefreshCw, TrendingUp, Users, Shield, Calendar } from "lucide-react"

interface HealthAlert {
  id: string
  title: string
  description: string
  severity: "low" | "medium" | "high" | "critical"
  category: string
  location: { state?: string; district?: string }
  dateIssued: string
  source: string
  isActive: boolean
}

interface SyncStatus {
  lastSync: string
  status: "success" | "error" | "syncing"
  recordsUpdated: number
}

export function HealthMonitoring() {
  const [alerts, setAlerts] = useState<HealthAlert[]>([])
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    lastSync: new Date().toISOString(),
    status: "success",
    recordsUpdated: 0,
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchHealthData()
    // Set up auto-sync every 5 minutes
    const interval = setInterval(fetchHealthData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const fetchHealthData = async () => {
    try {
      setIsLoading(true)
      setSyncStatus((prev) => ({ ...prev, status: "syncing" }))

      const response = await fetch("/api/health-data/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataType: "all" }),
      })

      if (response.ok) {
        const data = await response.json()
        setAlerts(data.data.alerts || [])
        setSyncStatus({
          lastSync: data.lastSyncTime,
          status: "success",
          recordsUpdated: data.data.alerts?.length || 0,
        })
      } else {
        setSyncStatus((prev) => ({ ...prev, status: "error" }))
      }
    } catch (error) {
      console.error("Sync error:", error)
      setSyncStatus((prev) => ({ ...prev, status: "error" }))
    } finally {
      setIsLoading(false)
    }
  }

  const getSeverityBadge = (severity: string) => {
    const variants = {
      low: "bg-blue-100 text-blue-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-orange-100 text-orange-800",
      critical: "bg-red-100 text-red-800",
    }
    return (
      <Badge className={variants[severity as keyof typeof variants] || variants.low}>{severity.toUpperCase()}</Badge>
    )
  }

  const getStatusIcon = () => {
    switch (syncStatus.status) {
      case "syncing":
        return <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
      case "success":
        return <Activity className="h-4 w-4 text-green-600" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Health Data Monitoring</h2>
          <p className="text-muted-foreground">Real-time health alerts and data synchronization</p>
        </div>
        <Button onClick={fetchHealthData} disabled={isLoading} variant="outline">
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Sync Now
        </Button>
      </div>

      {/* Sync Status */}
      <Card className="border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Sync Status</CardTitle>
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <span className="text-sm font-medium">
                {syncStatus.status === "syncing" ? "Syncing..." : "Connected"}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Last Sync</div>
              <div className="font-medium">{new Date(syncStatus.lastSync).toLocaleString()}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Records Updated</div>
              <div className="font-medium">{syncStatus.recordsUpdated}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Status</div>
              <div className="font-medium capitalize">{syncStatus.status}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <div className="text-2xl font-bold">{alerts.filter((a) => a.severity === "critical").length}</div>
                <div className="text-sm text-muted-foreground">Critical Alerts</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{alerts.filter((a) => a.severity === "high").length}</div>
                <div className="text-sm text-muted-foreground">High Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{alerts.filter((a) => a.category === "outbreak").length}</div>
                <div className="text-sm text-muted-foreground">Outbreaks</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{alerts.filter((a) => a.category === "vaccination").length}</div>
                <div className="text-sm text-muted-foreground">Vaccination</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Alerts */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Alerts</TabsTrigger>
          <TabsTrigger value="outbreaks">Outbreaks</TabsTrigger>
          <TabsTrigger value="vaccination">Vaccination</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {alerts
              .filter((alert) => alert.isActive)
              .map((alert) => (
                <Card key={alert.id} className="border-l-4 border-l-primary">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{alert.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {alert.location.state}
                          {alert.location.district && `, ${alert.location.district}`}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getSeverityBadge(alert.severity)}
                        <Badge variant="outline">{alert.category}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">{alert.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(alert.dateIssued).toLocaleDateString()}
                      </div>
                      <div>Source: {alert.source}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="outbreaks" className="space-y-4">
          <div className="grid gap-4">
            {alerts
              .filter((alert) => alert.category === "outbreak")
              .map((alert) => (
                <Card key={alert.id} className="border-l-4 border-l-red-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{alert.title}</CardTitle>
                      {getSeverityBadge(alert.severity)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{alert.description}</p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="vaccination" className="space-y-4">
          <div className="grid gap-4">
            {alerts
              .filter((alert) => alert.category === "vaccination")
              .map((alert) => (
                <Card key={alert.id} className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{alert.title}</CardTitle>
                      <Badge className="bg-green-100 text-green-800">
                        <Calendar className="h-3 w-3 mr-1" />
                        Vaccination
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{alert.description}</p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

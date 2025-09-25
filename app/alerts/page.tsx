"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { AlertCard } from "@/components/alerts/alert-card"
import { AlertSubscription } from "@/components/alerts/alert-subscription"
import { AlertTriangle, Bell, Search, Filter, Clock, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Alert {
  id: string
  title: string
  description: string
  severity: "critical" | "high" | "medium" | "low"
  type: "outbreak" | "advisory" | "emergency" | "update"
  location: string
  timestamp: Date
  isActive: boolean
  source: string
  actionRequired?: string
}

const fallbackAlerts: Alert[] = [
  {
    id: "1",
    title: "Dengue Outbreak Alert - Hyderabad",
    description:
      "Increased cases of dengue fever reported in several areas of Hyderabad. Take preventive measures against mosquito breeding.",
    severity: "high",
    type: "outbreak",
    location: "Hyderabad, Telangana",
    timestamp: new Date("2024-11-10T10:30:00"),
    isActive: true,
    source: "Telangana Health Department",
    actionRequired: "Eliminate stagnant water, use mosquito repellents, seek medical attention for fever",
  },
  {
    id: "2",
    title: "Seasonal Flu Vaccination Drive",
    description:
      "Free flu vaccination available at all government health centers. Recommended for elderly and children.",
    severity: "medium",
    type: "advisory",
    location: "Andhra Pradesh",
    timestamp: new Date("2024-11-08T14:15:00"),
    isActive: true,
    source: "AP Health Department",
  },
  {
    id: "3",
    title: "Water Quality Advisory - Visakhapatnam",
    description: "Temporary water quality issues in certain areas. Boil water before consumption until further notice.",
    severity: "critical",
    type: "emergency",
    location: "Visakhapatnam, Andhra Pradesh",
    timestamp: new Date("2024-11-12T08:45:00"),
    isActive: true,
    source: "Municipal Corporation",
    actionRequired: "Boil water for 5 minutes before drinking, use bottled water if possible",
  },
  {
    id: "4",
    title: "COVID-19 Guidelines Update",
    description: "Updated guidelines for COVID-19 prevention and treatment. New protocols for healthcare facilities.",
    severity: "medium",
    type: "update",
    location: "All Districts",
    timestamp: new Date("2024-11-05T16:20:00"),
    isActive: true,
    source: "Ministry of Health",
  },
  {
    id: "5",
    title: "Malaria Prevention Campaign",
    description: "Intensive malaria prevention activities in rural areas. Free testing and treatment available.",
    severity: "low",
    type: "advisory",
    location: "Rural Areas - Telangana",
    timestamp: new Date("2024-11-01T11:00:00"),
    isActive: false,
    source: "National Vector Borne Disease Control Programme",
  },
]

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(fallbackAlerts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSeverity, setSelectedSeverity] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [showActiveOnly, setShowActiveOnly] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    updateAlertsData()

    // Set up auto-refresh every 30 minutes
    const interval = setInterval(updateAlertsData, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const updateAlertsData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/health-data/update")
      const result = await response.json()

      if (result.success && result.data.alerts.length > 0) {
        setAlerts(result.data.alerts)
        setLastUpdated(new Date(result.data.lastUpdated))
        toast({
          title: "Alerts Updated",
          description: "Health alerts updated with latest information",
        })
      }
    } catch (error) {
      console.error("Failed to update alerts data:", error)
      toast({
        title: "Update Failed",
        description: "Using cached data. Please try refreshing later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = selectedSeverity === "all" || alert.severity === selectedSeverity
    const matchesType = selectedType === "all" || alert.type === selectedType
    const matchesLocation = selectedLocation === "all" || alert.location.includes(selectedLocation)
    const matchesActive = !showActiveOnly || alert.isActive

    return matchesSearch && matchesSeverity && matchesType && matchesLocation && matchesActive
  })

  const activeAlertsCount = alerts.filter((alert) => alert.isActive).length
  const criticalAlertsCount = alerts.filter((alert) => alert.isActive && alert.severity === "critical").length

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Health Alerts & Advisories</h1>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl">
                AI-powered real-time health alerts, disease outbreaks, and important health advisories.
              </p>
            </div>
            <div className="text-right">
              <Button
                onClick={updateAlertsData}
                disabled={isLoading}
                variant="outline"
                size="sm"
                className="mb-2 bg-transparent"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                {isLoading ? "Updating..." : "Refresh Alerts"}
              </Button>
              {lastUpdated && (
                <p className="text-xs text-muted-foreground">Last updated: {lastUpdated.toLocaleString()}</p>
              )}
            </div>
          </div>
        </div>

        {/* Alert Summary */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card className="border-2">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Bell className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{activeAlertsCount}</p>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-destructive/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-destructive" />
                <div>
                  <p className="text-2xl font-bold text-destructive">{criticalAlertsCount}</p>
                  <p className="text-sm text-muted-foreground">Critical Alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-secondary" />
                <div>
                  <p className="text-2xl font-bold">AI</p>
                  <p className="text-sm text-muted-foreground">Powered Updates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert Subscription */}
        <AlertSubscription />

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search alerts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="outbreak">Outbreak</SelectItem>
                    <SelectItem value="advisory">Advisory</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="update">Update</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="Visakhapatnam">Visakhapatnam</SelectItem>
                    <SelectItem value="Vijayawada">Vijayawada</SelectItem>
                    <SelectItem value="Warangal">Warangal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={showActiveOnly ? "default" : "outline"}
                  onClick={() => setShowActiveOnly(!showActiveOnly)}
                  size="sm"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Active Only
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No alerts found matching your criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filteredAlerts.map((alert) => <AlertCard key={alert.id} alert={alert} />)
          )}
        </div>

        {/* Information Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl">AI-Powered Health Monitoring</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-primary">Smart Features</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Real-time outbreak detection</li>
                  <li>• Seasonal health predictions</li>
                  <li>• Regional risk assessment</li>
                  <li>• Automated alert generation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Data Sources</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Government health departments</li>
                  <li>• WHO and international agencies</li>
                  <li>• Local health monitoring systems</li>
                  <li>• AI-powered trend analysis</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

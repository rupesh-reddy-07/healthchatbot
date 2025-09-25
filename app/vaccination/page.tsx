"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { VaccinationCalendar } from "@/components/vaccination/vaccination-calendar"
import { VaccinationCard } from "@/components/vaccination/vaccination-card"
import { Calendar, Search, Filter, Bell, Download, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Vaccination {
  id: string
  name: string
  ageGroup: string
  description: string
  schedule: string
  importance: "high" | "medium" | "low"
  nextDue?: Date
  status: "due" | "upcoming" | "completed" | "overdue"
}

const fallbackVaccinations: Vaccination[] = [
  {
    id: "1",
    name: "BCG",
    ageGroup: "Birth",
    description: "Protects against tuberculosis",
    schedule: "Single dose at birth",
    importance: "high",
    nextDue: new Date("2024-12-01"),
    status: "due",
  },
  {
    id: "2",
    name: "Hepatitis B",
    ageGroup: "Birth, 6 weeks, 10 weeks, 14 weeks",
    description: "Protects against Hepatitis B infection",
    schedule: "4 doses: Birth, 6, 10, 14 weeks",
    importance: "high",
    nextDue: new Date("2024-11-15"),
    status: "overdue",
  },
  {
    id: "3",
    name: "DPT",
    ageGroup: "6 weeks, 10 weeks, 14 weeks",
    description: "Protects against Diphtheria, Pertussis, and Tetanus",
    schedule: "3 primary doses + boosters",
    importance: "high",
    nextDue: new Date("2024-12-15"),
    status: "upcoming",
  },
  {
    id: "4",
    name: "Polio (OPV)",
    ageGroup: "6 weeks, 10 weeks, 14 weeks",
    description: "Protects against Poliomyelitis",
    schedule: "3 primary doses + boosters",
    importance: "high",
    nextDue: new Date("2024-12-20"),
    status: "upcoming",
  },
  {
    id: "5",
    name: "MMR",
    ageGroup: "9 months, 16-24 months",
    description: "Protects against Measles, Mumps, and Rubella",
    schedule: "2 doses: 9 months, 16-24 months",
    importance: "high",
    status: "completed",
  },
  {
    id: "6",
    name: "Rotavirus",
    ageGroup: "6 weeks, 10 weeks, 14 weeks",
    description: "Protects against severe diarrhea",
    schedule: "3 doses with other vaccines",
    importance: "medium",
    nextDue: new Date("2025-01-10"),
    status: "upcoming",
  },
]

export default function VaccinationPage() {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>(fallbackVaccinations)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    updateVaccinationData()
  }, [])

  const updateVaccinationData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/health-data/update")
      const result = await response.json()

      if (result.success && result.data.vaccinations.length > 0) {
        setVaccinations(result.data.vaccinations)
        setLastUpdated(new Date(result.data.lastUpdated))
        toast({
          title: "Data Updated",
          description: "Vaccination schedule updated with latest information",
        })
      }
    } catch (error) {
      console.error("Failed to update vaccination data:", error)
      toast({
        title: "Update Failed",
        description: "Using cached data. Please try refreshing later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredVaccinations = vaccinations.filter((vaccination) => {
    const matchesSearch =
      vaccination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vaccination.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAgeGroup = selectedAgeGroup === "all" || vaccination.ageGroup.includes(selectedAgeGroup)
    const matchesStatus = selectedStatus === "all" || vaccination.status === selectedStatus

    return matchesSearch && matchesAgeGroup && matchesStatus
  })

  const upcomingCount = vaccinations.filter((v) => v.status === "due" || v.status === "overdue").length

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Vaccination Schedule</h1>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl">
                Stay up-to-date with AI-powered, real-time vaccination schedules and recommendations.
              </p>
            </div>
            <div className="text-right">
              <Button
                onClick={updateVaccinationData}
                disabled={isLoading}
                variant="outline"
                size="sm"
                className="mb-2 bg-transparent"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                {isLoading ? "Updating..." : "Refresh Data"}
              </Button>
              {lastUpdated && (
                <p className="text-xs text-muted-foreground">Last updated: {lastUpdated.toLocaleString()}</p>
              )}
            </div>
          </div>
        </div>

        {/* Alert for Due Vaccinations */}
        {upcomingCount > 0 && (
          <Card className="mb-6 border-destructive/50 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-destructive" />
                <div>
                  <p className="font-medium text-destructive">
                    {upcomingCount} vaccination{upcomingCount > 1 ? "s" : ""} need attention
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Some vaccinations are due or overdue. Please consult your healthcare provider.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search vaccinations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Age Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ages</SelectItem>
                    <SelectItem value="Birth">Birth</SelectItem>
                    <SelectItem value="6 weeks">6 Weeks</SelectItem>
                    <SelectItem value="10 weeks">10 Weeks</SelectItem>
                    <SelectItem value="14 weeks">14 Weeks</SelectItem>
                    <SelectItem value="9 months">9 Months</SelectItem>
                    <SelectItem value="16-24 months">16-24 Months</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="due">Due Now</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  onClick={() => setViewMode("list")}
                  size="sm"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  List
                </Button>
                <Button
                  variant={viewMode === "calendar" ? "default" : "outline"}
                  onClick={() => setViewMode("calendar")}
                  size="sm"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Calendar
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {viewMode === "calendar" ? (
          <VaccinationCalendar vaccinations={filteredVaccinations} />
        ) : (
          <div className="grid gap-4">
            {filteredVaccinations.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No vaccinations found matching your criteria.</p>
                </CardContent>
              </Card>
            ) : (
              filteredVaccinations.map((vaccination) => (
                <VaccinationCard key={vaccination.id} vaccination={vaccination} />
              ))
            )}
          </div>
        )}

        {/* Information Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl">AI-Powered Health Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-primary">Real-Time Updates</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• AI-generated vaccination schedules</li>
                  <li>• Current health campaign information</li>
                  <li>• Regional health recommendations</li>
                  <li>• Seasonal vaccination priorities</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Smart Features</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Automatic data refresh</li>
                  <li>• Personalized recommendations</li>
                  <li>• Emergency vaccination alerts</li>
                  <li>• Multi-language support</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

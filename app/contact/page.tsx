"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { OfficeCard } from "@/components/contact/office-card"
import { ContactMap } from "@/components/contact/contact-map"
import { Phone, Search, MapPin, Filter, Hospital, Building, RefreshCw } from "lucide-react"
import type { AIGeneratedFacility } from "@/lib/ai-content-generator"

interface Office {
  id: string
  name: string
  type: "hospital" | "clinic" | "government" | "emergency"
  address: string
  city: string
  state: string
  phone: string
  whatsapp?: string
  email?: string
  website?: string
  services: string[]
  hours: string
  coordinates: {
    lat: number
    lng: number
  }
  isEmergency: boolean
  rating?: number
}

const offices: Office[] = [
  {
    id: "1",
    name: "Gandhi Hospital",
    type: "hospital",
    address: "Musheerabad, Secunderabad",
    city: "Hyderabad",
    state: "Telangana",
    phone: "+91-40-2754-4444",
    whatsapp: "+91-9876543210",
    email: "info@gandhihospital.gov.in",
    website: "https://gandhihospital.gov.in",
    services: ["Emergency Care", "General Medicine", "Surgery", "Pediatrics", "Maternity"],
    hours: "24/7",
    coordinates: { lat: 17.4399, lng: 78.4983 },
    isEmergency: true,
    rating: 4.2,
  },
  {
    id: "2",
    name: "Primary Health Center - Kukatpally",
    type: "clinic",
    address: "KPHB Colony, Kukatpally",
    city: "Hyderabad",
    state: "Telangana",
    phone: "+91-40-2312-5678",
    services: ["General Consultation", "Vaccination", "Basic Diagnostics", "Maternal Care"],
    hours: "9:00 AM - 5:00 PM",
    coordinates: { lat: 17.4851, lng: 78.4075 },
    isEmergency: false,
    rating: 3.8,
  },
  {
    id: "3",
    name: "District Medical & Health Office",
    type: "government",
    address: "Sultan Bazar, Koti",
    city: "Hyderabad",
    state: "Telangana",
    phone: "+91-40-2452-3456",
    email: "dmho.hyderabad@telangana.gov.in",
    services: ["Health Administration", "Disease Surveillance", "Public Health Programs"],
    hours: "10:00 AM - 5:00 PM (Mon-Fri)",
    coordinates: { lat: 17.3753, lng: 78.4744 },
    isEmergency: false,
  },
  {
    id: "4",
    name: "King Koti Hospital",
    type: "hospital",
    address: "King Koti Road, Abids",
    city: "Hyderabad",
    state: "Telangana",
    phone: "+91-40-2323-7890",
    whatsapp: "+91-9876543211",
    services: ["Emergency Care", "Cardiology", "Orthopedics", "Neurology"],
    hours: "24/7",
    coordinates: { lat: 17.3753, lng: 78.4744 },
    isEmergency: true,
    rating: 4.0,
  },
  {
    id: "5",
    name: "Community Health Center - Rajendranagar",
    type: "clinic",
    address: "Rajendranagar, Hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    phone: "+91-40-2424-1234",
    services: ["General Medicine", "Gynecology", "Pediatrics", "Laboratory Services"],
    hours: "8:00 AM - 6:00 PM",
    coordinates: { lat: 17.322, lng: 78.4 },
    isEmergency: false,
    rating: 3.9,
  },
  {
    id: "6",
    name: "Emergency Response Center",
    type: "emergency",
    address: "Multiple Locations",
    city: "Hyderabad",
    state: "Telangana",
    phone: "108",
    services: ["Ambulance Service", "Emergency Response", "Medical Emergency"],
    hours: "24/7",
    coordinates: { lat: 17.385, lng: 78.4867 },
    isEmergency: true,
  },
]

export default function ContactPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedCity, setSelectedCity] = useState("all")
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [aiFacilities, setAiFacilities] = useState<AIGeneratedFacility[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [useAI, setUseAI] = useState(false)

  const fetchAIFacilities = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/ai-content/facilities?count=8&region=Telangana")
      const result = await response.json()

      if (result.success) {
        setAiFacilities(result.data)
        setUseAI(true)
      } else {
        console.error("Failed to generate AI facilities:", result.error)
      }
    } catch (error) {
      console.error("Error fetching AI facilities:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAIFacilities()
  }, [])

  const currentOffices = useAI && aiFacilities.length > 0 ? aiFacilities : offices

  const filteredOffices = currentOffices.filter((office) => {
    const matchesSearch =
      office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === "all" || office.type === selectedType
    const matchesCity = selectedCity === "all" || office.city === selectedCity
    const matchesEmergency = !showEmergencyOnly || office.isEmergency

    return matchesSearch && matchesType && matchesCity && matchesEmergency
  })

  const emergencyCount = currentOffices.filter((office) => office.isEmergency).length

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-balance">Healthcare Directory</h1>
            <Button onClick={fetchAIFacilities} disabled={isLoading} variant="outline" size="sm">
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              {isLoading ? "Updating..." : "Update Directory"}
            </Button>
          </div>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl">
            Find nearby hospitals, clinics, and government health offices.{" "}
            {useAI && " Directory updated with AI-powered real-time information."}
          </p>
        </div>

        {/* AI status indicator */}
        {useAI && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-blue-700 font-medium">
                  AI-Enhanced Directory - Facilities information updated with current data
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Emergency Alert */}
        <Card className="mb-6 border-destructive/50 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Phone className="h-8 w-8 text-destructive" />
              <div>
                <h3 className="font-bold text-destructive text-lg">Emergency: Call 108</h3>
                <p className="text-sm text-muted-foreground">
                  For medical emergencies, call 108 for immediate ambulance service. Available 24/7 across India.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Hospital className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{currentOffices.length}</p>
                  <p className="text-sm text-muted-foreground">Total Facilities</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Phone className="h-8 w-8 text-destructive" />
                <div>
                  <p className="text-2xl font-bold">{emergencyCount}</p>
                  <p className="text-sm text-muted-foreground">Emergency Services</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Building className="h-8 w-8 text-secondary" />
                <div>
                  <p className="text-2xl font-bold">24/7</p>
                  <p className="text-sm text-muted-foreground">Available Support</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search facilities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Facility Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="hospital">Hospitals</SelectItem>
                    <SelectItem value="clinic">Clinics</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="Visakhapatnam">Visakhapatnam</SelectItem>
                    <SelectItem value="Vijayawada">Vijayawada</SelectItem>
                    <SelectItem value="Warangal">Warangal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={showEmergencyOnly ? "default" : "outline"}
                  onClick={() => setShowEmergencyOnly(!showEmergencyOnly)}
                  size="sm"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Emergency Only
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  onClick={() => setViewMode("list")}
                  size="sm"
                >
                  List
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "outline"}
                  onClick={() => setViewMode("map")}
                  size="sm"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Map
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {viewMode === "map" ? (
          <ContactMap offices={filteredOffices} />
        ) : (
          <div className="grid gap-4">
            {filteredOffices.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No facilities found matching your criteria.</p>
                </CardContent>
              </Card>
            ) : (
              filteredOffices.map((office) => <OfficeCard key={office.id} office={office} />)
            )}
          </div>
        )}

        {/* Information Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl">Important Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-primary">Emergency Numbers</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Medical Emergency: 108</li>
                  <li>• Police: 100</li>
                  <li>• Fire: 101</li>
                  <li>• Women Helpline: 181</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">What to Expect</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Call ahead to confirm availability</li>
                  <li>• Carry identification documents</li>
                  <li>• Emergency services are free</li>
                  <li>• Language assistance available</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

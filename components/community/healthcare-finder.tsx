"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Navigation,
  Hospital,
  Stethoscope,
  Pill,
  Ambulance,
  Search,
  Filter,
} from "lucide-react"

interface HealthcareFacility {
  id: string
  name: string
  type: "hospital" | "clinic" | "pharmacy" | "emergency"
  address: string
  phone: string
  distance: number
  rating: number
  availability: "open" | "closed" | "24/7"
  services: string[]
  emergency: boolean
  coordinates: { lat: number; lng: number }
}

const sampleFacilities: HealthcareFacility[] = [
  {
    id: "1",
    name: "City General Hospital",
    type: "hospital",
    address: "123 Main Street, Downtown",
    phone: "+1-555-0123",
    distance: 2.3,
    rating: 4.5,
    availability: "24/7",
    services: ["Emergency Care", "Surgery", "ICU", "Maternity", "Cardiology"],
    emergency: true,
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: "2",
    name: "Community Health Clinic",
    type: "clinic",
    address: "456 Oak Avenue, Midtown",
    phone: "+1-555-0456",
    distance: 1.8,
    rating: 4.2,
    availability: "open",
    services: ["General Practice", "Vaccinations", "Health Checkups", "Minor Surgery"],
    emergency: false,
    coordinates: { lat: 40.7589, lng: -73.9851 },
  },
  {
    id: "3",
    name: "MedPlus Pharmacy",
    type: "pharmacy",
    address: "789 Pine Street, Uptown",
    phone: "+1-555-0789",
    distance: 0.9,
    rating: 4.0,
    availability: "open",
    services: ["Prescription Drugs", "OTC Medicines", "Health Consultations", "Medical Supplies"],
    emergency: false,
    coordinates: { lat: 40.7831, lng: -73.9712 },
  },
  {
    id: "4",
    name: "Emergency Medical Center",
    type: "emergency",
    address: "321 Emergency Blvd, Central",
    phone: "+1-555-0321",
    distance: 3.1,
    rating: 4.7,
    availability: "24/7",
    services: ["Emergency Care", "Trauma", "Urgent Care", "Ambulance"],
    emergency: true,
    coordinates: { lat: 40.7505, lng: -73.9934 },
  },
]

export function HealthcareFinder() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [facilities, setFacilities] = useState<HealthcareFacility[]>(sampleFacilities)
  const [selectedFacility, setSelectedFacility] = useState<HealthcareFacility | null>(null)

  const filteredFacilities = facilities.filter((facility) => {
    const matchesSearch =
      facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === "all" || facility.type === selectedType
    return matchesSearch && matchesType
  })

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }

  const getDirections = (facility: HealthcareFacility) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${facility.coordinates.lat},${facility.coordinates.lng}`
    window.open(url, "_blank")
  }

  const callFacility = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hospital":
        return <Hospital className="h-4 w-4" />
      case "clinic":
        return <Stethoscope className="h-4 w-4" />
      case "pharmacy":
        return <Pill className="h-4 w-4" />
      case "emergency":
        return <Ambulance className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "24/7":
        return "bg-green-500"
      case "open":
        return "bg-blue-500"
      case "closed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Healthcare Finder</h2>
          <p className="text-muted-foreground">Find nearby hospitals, clinics, and pharmacies</p>
        </div>
        <Button onClick={getCurrentLocation} variant="outline" className="flex items-center gap-2 bg-transparent">
          <Navigation className="h-4 w-4" />
          Get Location
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Search Healthcare Facilities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Search by name or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <Tabs value={selectedType} onValueChange={setSelectedType}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="hospital">Hospitals</TabsTrigger>
              <TabsTrigger value="clinic">Clinics</TabsTrigger>
              <TabsTrigger value="pharmacy">Pharmacies</TabsTrigger>
              <TabsTrigger value="emergency">Emergency</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {filteredFacilities.map((facility) => (
            <Card
              key={facility.id}
              className={`cursor-pointer transition-colors ${
                selectedFacility?.id === facility.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedFacility(facility)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(facility.type)}
                    <h3 className="font-semibold">{facility.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getAvailabilityColor(facility.availability)}`} />
                    <span className="text-xs text-muted-foreground">{facility.availability}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {facility.address} • {facility.distance} km away
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{facility.rating}</span>
                    </div>
                    {facility.emergency && (
                      <Badge variant="destructive" className="text-xs">
                        Emergency
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {facility.services.slice(0, 3).map((service, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                    {facility.services.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{facility.services.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedFacility && (
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getTypeIcon(selectedFacility.type)}
                {selectedFacility.name}
              </CardTitle>
              <CardDescription>{selectedFacility.address}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Distance</p>
                  <p className="text-2xl font-bold text-primary">{selectedFacility.distance} km</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Rating</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-bold">{selectedFacility.rating}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Services Available</p>
                <div className="flex flex-wrap gap-2">
                  {selectedFacility.services.map((service, idx) => (
                    <Badge key={idx} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm">
                  Status: <strong>{selectedFacility.availability}</strong>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => callFacility(selectedFacility.phone)} className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Call
                </Button>
                <Button
                  onClick={() => getDirections(selectedFacility)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Navigation className="h-4 w-4" />
                  Directions
                </Button>
              </div>

              {selectedFacility.emergency && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700">
                    <Ambulance className="h-4 w-4" />
                    <span className="font-medium">Emergency Services Available</span>
                  </div>
                  <p className="text-sm text-red-600 mt-1">This facility provides 24/7 emergency medical care</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

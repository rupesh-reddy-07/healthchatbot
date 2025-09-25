"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { MapPin, Search } from "lucide-react"

interface LocationSelectorProps {
  value: string
  onChange: (location: string) => void
}

const commonLocations = [
  "Hyderabad, Telangana",
  "Visakhapatnam, Andhra Pradesh",
  "Vijayawada, Andhra Pradesh",
  "Warangal, Telangana",
  "Guntur, Andhra Pradesh",
  "Nellore, Andhra Pradesh",
  "Kurnool, Andhra Pradesh",
  "Rajahmundry, Andhra Pradesh",
]

export function LocationSelector({ value, onChange }: LocationSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDetecting, setIsDetecting] = useState(false)

  const filteredLocations = commonLocations.filter((location) =>
    location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const detectLocation = () => {
    setIsDetecting(true)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          const { latitude, longitude } = position.coords
          onChange(`Location: ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`)
          setIsDetecting(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsDetecting(false)
        },
      )
    } else {
      setIsDetecting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="bg-transparent">
          <MapPin className="h-4 w-4 mr-2" />
          {value || "Select Location"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-2 space-y-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={detectLocation}
            disabled={isDetecting}
            className="w-full bg-transparent"
          >
            <MapPin className="h-4 w-4 mr-2" />
            {isDetecting ? "Detecting..." : "Use Current Location"}
          </Button>
        </div>
        <div className="max-h-48 overflow-y-auto">
          {filteredLocations.map((location) => (
            <DropdownMenuItem key={location} onClick={() => onChange(location)}>
              {location}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

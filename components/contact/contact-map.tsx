"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

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

interface ContactMapProps {
  offices: Office[]
}

export function ContactMap({ offices }: ContactMapProps) {
  // This is a placeholder for the map component
  // In a real implementation, you would use a mapping library like Leaflet or Google Maps
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Healthcare Facilities Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Interactive map would be displayed here</p>
            <p className="text-sm text-muted-foreground mt-2">
              Showing {offices.length} facilities in the selected area
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {offices.slice(0, 4).map((office) => (
            <div key={office.id} className="text-center p-2 bg-muted/50 rounded">
              <h4 className="font-medium text-sm text-balance">{office.name}</h4>
              <p className="text-xs text-muted-foreground">{office.type}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

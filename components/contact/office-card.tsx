"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  MapPin,
  Clock,
  Mail,
  Globe,
  MessageCircle,
  Navigation,
  Star,
  Hospital,
  Building,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"

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

interface OfficeCardProps {
  office: Office
}

export function OfficeCard({ office }: OfficeCardProps) {
  const getTypeIcon = () => {
    switch (office.type) {
      case "hospital":
        return <Hospital className="h-4 w-4" />
      case "clinic":
        return <Hospital className="h-4 w-4" />
      case "government":
        return <Building className="h-4 w-4" />
      case "emergency":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Building className="h-4 w-4" />
    }
  }

  const getTypeColor = () => {
    switch (office.type) {
      case "hospital":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "clinic":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "government":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
      case "emergency":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  const handleCall = () => {
    window.open(`tel:${office.phone}`, "_self")
  }

  const handleWhatsApp = () => {
    if (office.whatsapp) {
      window.open(`https://wa.me/${office.whatsapp.replace(/[^0-9]/g, "")}`, "_blank")
    }
  }

  const handleDirections = () => {
    const query = encodeURIComponent(`${office.name}, ${office.address}, ${office.city}`)
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank")
  }

  return (
    <Card
      className={cn("transition-all hover:shadow-md", office.isEmergency && "border-destructive/50 bg-destructive/5")}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={cn("flex items-center gap-1", getTypeColor())}>
                {getTypeIcon()}
                {office.type}
              </Badge>
              {office.isEmergency && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Emergency
                </Badge>
              )}
              {office.rating && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {office.rating}
                </Badge>
              )}
            </div>
            <CardTitle className="text-xl text-balance">{office.name}</CardTitle>
            <CardDescription className="text-base">
              {office.address}, {office.city}, {office.state}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{office.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{office.hours}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>
                {office.city}, {office.state}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {office.email && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{office.email}</span>
              </div>
            )}
            {office.website && (
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">Website Available</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-sm text-muted-foreground mb-2">Services Available</h4>
          <div className="flex flex-wrap gap-1">
            {office.services.slice(0, 4).map((service, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {service}
              </Badge>
            ))}
            {office.services.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{office.services.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <Button size="sm" onClick={handleCall} className="flex-1 sm:flex-none">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
          {office.whatsapp && (
            <Button size="sm" variant="outline" onClick={handleWhatsApp} className="bg-transparent">
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={handleDirections} className="bg-transparent">
            <Navigation className="h-4 w-4 mr-2" />
            Directions
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
